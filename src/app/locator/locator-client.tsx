'use client';

import { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Plus, Heart, Camera, Loader2, User, Upload, MessageCircle, Calendar, Share2 } from 'lucide-react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'next/navigation';

export default function LocatorPageClient() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const db = useFirestore();
  const searchParams = useSearchParams();
  const pageContent = content.locatorPage;

  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Handle URL search param for direct sharing
  useEffect(() => {
    const q = searchParams.get('search');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const [newMemorial, setNewMemorial] = useState({
    deceasedName: '',
    parentName: '',
    dateOfBirth: '',
    dateOfDeath: '',
    islamicDate: '',
    graveyardName: '',
    imageUrl: '',
    publisherName: '',
    publisherEmail: '',
    publisherPhone: '',
  });

  // Firestore Sync
  const memorialsRef = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'memorials'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: memorials, isLoading } = useCollection<any>(memorialsRef);

  const suggestions = useMemo(() => {
    if (!memorials || searchQuery.length < 1) return [];
    const uniqueNames = Array.from(new Set(memorials.map((m: any) => m.deceasedName))) as string[];
    return uniqueNames.filter((name: string) => 
      name.toLowerCase().includes(searchQuery.toLowerCase()) && 
      name.toLowerCase() !== searchQuery.toLowerCase()
    ).slice(0, 5);
  }, [memorials, searchQuery]);

  const filteredMemorials = useMemo(() => {
    if (!memorials) return [];
    return memorials.filter((m: any) => 
      m.deceasedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.graveyardName && m.graveyardName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [memorials, searchQuery]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 800000) {
      toast({
        variant: 'destructive',
        title: 'File Too Large',
        description: 'Please use an image under 800KB for direct storage.',
      });
      return;
    }

    setUploading(true);
    try {
      const reader = new FileReader();
      const dataUrl = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      setNewMemorial({ ...newMemorial, imageUrl: dataUrl });
    } catch (err) {
      toast({ variant: 'destructive', title: 'Upload Failed', description: 'Could not process image.' });
    } finally {
      setUploading(false);
    }
  };

  const handleAddMemorial = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMemorial.publisherName || !newMemorial.publisherEmail || !newMemorial.publisherPhone) {
        toast({ variant: 'destructive', title: 'Missing Info', description: 'Please provide your details as the publisher.' });
        return;
    }

    setIsAdding(true);

    const data = {
      ...newMemorial,
      latitude: 24.8778 + (Math.random() - 0.5) * 0.01, // Mocking GPS for MVP
      longitude: 67.1952 + (Math.random() - 0.5) * 0.01,
      createdAt: serverTimestamp(),
    };

    const ref = collection(db, 'memorials');
    addDoc(ref, data)
      .catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: ref.path,
          operation: 'create',
          requestResourceData: data,
        });
        errorEmitter.emit('permission-error', permissionError);
      });

    toast({ title: 'Success', description: 'Memorial location pinned successfully. Our team will review the details.' });
    setIsAdding(false);
    setNewMemorial({ 
        deceasedName: '', 
        parentName: '', 
        dateOfBirth: '', 
        dateOfDeath: '', 
        islamicDate: '', 
        graveyardName: '',
        imageUrl: '',
        publisherName: '',
        publisherEmail: '',
        publisherPhone: '',
    });
  };

  const handleShare = async (m: any) => {
    const shareUrl = `${window.location.origin}/locator?search=${encodeURIComponent(m.deceasedName)}`;
    const shareText = language === 'en' 
        ? `View the memorial for ${m.deceasedName} at Stylish Marble Art.` 
        : `${m.deceasedName} کی یادگار سٹائلش ماربل آرٹ پر دیکھیں۔`;

    let shared = false;
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Stylish Marble Art - Memorial',
                text: shareText,
                url: shareUrl,
            });
            shared = true;
        } catch (err) {
            if ((err as Error).name !== 'AbortError') {
                console.warn('Native share failed, falling back to clipboard copy:', err);
            } else {
                return;
            }
        }
    }

    if (!shared) {
        try {
            await navigator.clipboard.writeText(shareUrl);
            toast({ title: 'Link Copied', description: 'Memorial link copied to clipboard.' });
        } catch (clipboardErr) {
            toast({ variant: 'destructive', title: 'Share Failed', description: 'Could not copy link to clipboard.' });
        }
    }
  };

  const services = [
    { id: 'cleaning', name: { en: 'Grave Cleanliness', ur: 'قبر کی صفائی' } },
    { id: 'watering', name: { en: 'Watering Service', ur: 'قبر کو پانی دینا' } },
    { id: 'planting', name: { en: 'Planting & Care', ur: 'پودے لگانا' } },
    { id: 'custom', name: { en: 'Custom Service', ur: 'کسٹم سروس' } },
  ];

  const handleGetQuote = (m: any, serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    const serviceName = service?.name.en || 'General Service';
    const whatsappNumber = "+923083401606".replace(/\D/g, '');
    
    const message = `Hello Stylish Marble Art, I would like a quote for:
*Service:* ${serviceName}
*Deceased:* ${m.deceasedName}
*Parentage:* ${m.parentName}
*Graveyard:* ${m.graveyardName || 'Not Specified'}
*Dates:* ${m.dateOfBirth} to ${m.dateOfDeath}
${m.islamicDate ? `*Islamic Date:* ${m.islamicDate}` : ''}

Please provide details on pricing and timeline.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-secondary/10 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <header className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">{pageContent.title[language]}</h1>
          <p className="text-lg text-muted-foreground">{pageContent.description[language]}</p>
        </header>

        <div className="flex flex-col md:flex-row gap-4 mb-16 max-w-4xl mx-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              placeholder={pageContent.searchPlaceholder[language]} 
              className="pl-10 h-12 bg-background border-primary/20 shadow-sm"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {suggestions.map((name) => (
                  <button
                    key={name}
                    type="button"
                    className="w-full text-left px-4 py-2 hover:bg-muted text-sm transition-colors border-b last:border-0 flex items-center gap-2"
                    onClick={() => {
                      setSearchQuery(name);
                      setShowSuggestions(false);
                    }}
                  >
                    <Search className="h-3 w-3 opacity-50" />
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="h-12 shadow-lg px-8">
                <Plus className="mr-2 h-5 w-5" />
                {pageContent.addMemorial[language]}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{pageContent.addMemorial[language]}</DialogTitle>
                <DialogDescription>
                    {language === 'en' ? 'Fill in the details below to pin a loved one\'s grave location.' : 'اپنے پیارے کی قبر کا مقام پن کرنے کے لیے نیچے دی گئی تفصیلات بھریں۔'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddMemorial} className="space-y-6 py-4">
                
                <div className="space-y-4">
                    <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2">
                        <Heart className="h-5 w-5 text-primary" />
                        {language === 'en' ? 'Deceased Information' : 'مرحوم کی معلومات'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>{language === 'en' ? 'Deceased Name' : 'مرحوم کا نام'}</Label>
                            <Input required value={newMemorial.deceasedName} onChange={(e) => setNewMemorial({...newMemorial, deceasedName: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>{language === 'en' ? 'Father/Mother Name' : 'والد/والدہ کا نام'}</Label>
                            <Input value={newMemorial.parentName} onChange={(e) => setNewMemorial({...newMemorial, parentName: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>{language === 'en' ? 'Date of Birth' : 'تاریخ پیدائش'}</Label>
                            <Input type="date" value={newMemorial.dateOfBirth} onChange={(e) => setNewMemorial({...newMemorial, dateOfBirth: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>{language === 'en' ? 'Date of Death' : 'تاریخ وفات'}</Label>
                            <Input type="date" required value={newMemorial.dateOfDeath} onChange={(e) => setNewMemorial({...newMemorial, dateOfDeath: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>{language === 'en' ? 'Islamic Date (Optional)' : 'اسلامی تاریخ (اختیاری)'}</Label>
                            <Input placeholder="e.g. 15 Ramadan" value={newMemorial.islamicDate} onChange={(e) => setNewMemorial({...newMemorial, islamicDate: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>{pageContent.graveyardLabel[language]}</Label>
                            <Input placeholder="e.g. Wadi-e-Hussain" value={newMemorial.graveyardName} onChange={(e) => setNewMemorial({...newMemorial, graveyardName: e.target.value})} />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label>{language === 'en' ? 'Deceased Photo' : 'مرحوم کی تصویر'}</Label>
                        <Tabs defaultValue="upload" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="upload">
                                <Upload className="mr-2 h-4 w-4" />
                                {language === 'en' ? 'Upload' : 'اپ لوڈ'}
                            </TabsTrigger>
                            <TabsTrigger value="url">
                                <Camera className="mr-2 h-4 w-4" />
                                {language === 'en' ? 'Link' : 'لنک'}
                            </TabsTrigger>
                            </TabsList>
                            <TabsContent value="upload" className="space-y-4 pt-4 border rounded-md p-4 bg-muted/20">
                            <div className="flex items-center gap-4">
                                <Input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                                disabled={uploading}
                                className="bg-background"
                                />
                                {uploading && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
                            </div>
                            {newMemorial.imageUrl && newMemorial.imageUrl.startsWith('data:') && (
                                <div className="relative h-32 w-32 rounded-lg overflow-hidden border-2 border-primary/20 shadow-sm mx-auto">
                                <img src={newMemorial.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                                </div>
                            )}
                            <p className="text-[10px] text-muted-foreground uppercase font-bold text-center">Max Size: 800KB</p>
                            </TabsContent>
                            <TabsContent value="url" className="pt-4">
                            <Input 
                                placeholder="https://..." 
                                value={newMemorial.imageUrl.startsWith('data:') ? '' : newMemorial.imageUrl} 
                                onChange={(e) => setNewMemorial({...newMemorial, imageUrl: e.target.value})} 
                            />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        {language === 'en' ? 'Your Contact Details (Confidential)' : 'آپ کے رابطے کی تفصیلات'}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        {language === 'en' ? 'This information is only visible to the workshop admin for service inquiries.' : 'یہ معلومات صرف سروس انکوائری کے لیے ورکشاپ ایڈمن کو نظر آئے گی۔'}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>{language === 'en' ? 'Your Name' : 'آپ کا نام'}</Label>
                            <Input required value={newMemorial.publisherName} onChange={(e) => setNewMemorial({...newMemorial, publisherName: e.target.value})} placeholder="e.g. Zahid Khan" />
                        </div>
                        <div className="space-y-2">
                            <Label>{language === 'en' ? 'Your Email' : 'آپ کا ای میل'}</Label>
                            <Input required type="email" value={newMemorial.publisherEmail} onChange={(e) => setNewMemorial({...newMemorial, publisherEmail: e.target.value})} placeholder="e.g. zahid@example.com" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label>{language === 'en' ? 'Phone Number (with Country Code)' : 'فون نمبر (کنٹری کوڈ کے ساتھ)'}</Label>
                            <Input required value={newMemorial.publisherPhone} onChange={(e) => setNewMemorial({...newMemorial, publisherPhone: e.target.value})} placeholder="e.g. +92 300 1234567" />
                        </div>
                    </div>
                </div>

                <div className="bg-muted p-4 rounded-md text-center">
                  <p className="text-xs text-muted-foreground uppercase font-bold mb-2">Pin Location</p>
                  <p className="text-sm">Click on the map at the workshop to set exact GPS.</p>
                  <div className="h-24 bg-secondary/50 rounded flex items-center justify-center border-2 border-dashed border-primary/20 mt-2">
                    <MapPin className="h-8 w-8 text-primary opacity-50" />
                  </div>
                </div>

                <DialogFooter className="pt-4">
                  <Button type="submit" className="w-full h-12 text-lg" disabled={isAdding || uploading}>
                    {isAdding ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : pageContent.addMemorial[language]}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                <div className="col-span-full flex justify-center p-12"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
              ) : filteredMemorials.length > 0 ? (
                filteredMemorials.map((m: any) => (
                  <Card key={m.id} className="flex flex-col h-full shadow-md hover:shadow-xl transition-all border-t-4 border-primary group overflow-hidden bg-background">
                    <div className="relative h-56 w-full bg-muted overflow-hidden">
                      <img 
                        src={m.imageUrl || 'https://picsum.photos/seed/memorial/400/300'} 
                        alt={m.deceasedName} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                        <div className="bg-primary/90 backdrop-blur text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                            {m.graveyardName || 'Karachi Graveyard'}
                        </div>
                        <Button 
                            variant="secondary" 
                            size="icon" 
                            className="rounded-full h-8 w-8 shadow-lg"
                            onClick={() => handleShare(m)}
                        >
                            <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <div className="space-y-1 mb-4">
                        <h3 className="font-bold text-2xl text-foreground leading-tight">{m.deceasedName}</h3>
                        <p className="text-sm text-muted-foreground italic">
                          {language === 'en' ? 's/o d/o ' : 'ولد/بنت '} {m.parentName}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-muted">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Born</p>
                            <p className="text-sm font-semibold flex items-center gap-1.5">
                                <Calendar className="h-3 w-3 text-primary" />
                                {m.dateOfBirth || 'N/A'}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Died</p>
                            <p className="text-sm font-semibold flex items-center gap-1.5">
                                <Heart className="h-3 w-3 text-red-500" />
                                {m.dateOfDeath || 'N/A'}
                            </p>
                        </div>
                        {m.islamicDate && (
                            <div className="col-span-2 space-y-1">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Islamic Date</p>
                                <p className="text-sm font-semibold italic text-primary">{m.islamicDate}</p>
                            </div>
                        )}
                      </div>

                      <div className="mt-auto space-y-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-center text-muted-foreground mb-1">Inquire About Care Service</p>
                        <div className="grid grid-cols-2 gap-2">
                            {services.map((s) => (
                                <Button 
                                    key={s.id} 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-[10px] h-auto py-3 px-2 hover:bg-primary hover:text-white transition-all border-primary/10 whitespace-normal leading-tight text-center"
                                    onClick={() => handleGetQuote(m, s.id)}
                                >
                                    {s.name[language]}
                                </Button>
                            ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-24 bg-muted/20 rounded-xl border-2 border-dashed">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-10" />
                  <p className="text-lg font-medium text-muted-foreground">No matching graves found.</p>
                  <p className="text-sm text-muted-foreground">Try searching for a different name or browse the list.</p>
                </div>
              )}
           </div>

           {/* Map View at Bottom */}
           <div className="mt-24">
              <div className="text-center mb-12">
                 <h2 className="text-3xl font-bold text-primary mb-2">{language === 'en' ? 'Karachi Cemetery Interactive Map' : 'کراچی قبرستان کا انٹرایکٹو نقشہ'}</h2>
                 <p className="text-muted-foreground">{language === 'en' ? 'Visualize exact grave locations across the city cemeteries.' : 'شہر بھر کے قبرستانوں میں قبروں کے صحیح مقامات دیکھیں۔'}</p>
              </div>
              <div className="bg-background rounded-[2.5rem] shadow-2xl overflow-hidden h-[600px] relative border-8 border-white">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/5">
                   <div className="text-center p-8">
                      <MapPin className="h-20 w-20 mx-auto mb-6 text-primary opacity-20" />
                      <p className="font-bold text-2xl uppercase tracking-widest opacity-20">Karachi Cemetery Map View</p>
                      <p className="text-sm mt-2 max-w-xs mx-auto">Markers will appear here for searched graves in Karachi's major graveyards.</p>
                   </div>
                </div>
                <div className="absolute top-6 left-6 bg-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2">
                   <MapPin className="h-4 w-4" />
                   {filteredMemorials.length} Graves Located
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
