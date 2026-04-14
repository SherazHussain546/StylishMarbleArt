'use client';

import { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Plus, Heart, Camera, Loader2, User, Upload, Calendar, Share2, GitGraph, ArrowDown, ArrowUp, Users, UserPlus, Info, MessageCircle, Landmark, Sparkles } from 'lucide-react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const honorifics = [
    { id: 'none', en: 'None', ur: 'کوئی نہیں' },
    { id: 'mr', en: 'Mr.', ur: 'مسٹر' },
    { id: 'mrs', en: 'Mrs.', ur: 'مسمات' },
    { id: 'ms', en: 'Ms.', ur: 'مس' },
    { id: 'dr', en: 'Dr.', ur: 'ڈاکٹر' },
    { id: 'prof', en: 'Prof.', ur: 'پروفیسر' },
    { id: 'haji', en: 'Haji', ur: 'حاجی' },
    { id: 'hakeem', en: 'Hakeem', ur: 'حکیم' },
    { id: 'shaheed', en: 'Shaheed (Martyr)', ur: 'شہید' },
    { id: 'major', en: 'Major', ur: 'میجر' },
    { id: 'captain', en: 'Captain', ur: 'کیپٹن' },
    { id: 'havildar', en: 'Havildar', ur: 'حوالدار' },
];

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
  const [viewingFamily, setViewingFamily] = useState<any | null>(null);
  const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);
  
  // Handle URL search param for direct sharing
  useEffect(() => {
    const q = searchParams.get('search');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const [newMemorial, setNewMemorial] = useState({
    isAlive: false,
    honorific: 'none',
    deceasedName: '',
    fatherName: '',
    motherName: '',
    stepFatherName: '',
    stepMotherName: '',
    husbandName: '',
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
    
    const queryTerm = searchQuery.toLowerCase();
    const matches: string[] = [];
    
    memorials.forEach((m: any) => {
      // Hide living members from suggestions
      if (m.isAlive) return;

      if (m.deceasedName.toLowerCase().includes(queryTerm) && !matches.includes(m.deceasedName)) {
        matches.push(m.deceasedName);
      }
      if (m.graveyardName && m.graveyardName.toLowerCase().includes(queryTerm) && !matches.includes(m.graveyardName)) {
        matches.push(m.graveyardName);
      }
    });

    return matches.filter(s => s.toLowerCase() !== queryTerm).slice(0, 5);
  }, [memorials, searchQuery]);

  const filteredMemorials = useMemo(() => {
    if (!memorials) return [];
    const q = searchQuery.toLowerCase();
    return memorials.filter((m: any) => 
      !m.isAlive && ( // Hide living members from search results
        m.deceasedName.toLowerCase().includes(q) ||
        (m.graveyardName && m.graveyardName.toLowerCase().includes(q))
      )
    );
  }, [memorials, searchQuery]);

  // Enhanced Family Lineage Logic
  const familyConnections = useMemo(() => {
    if (!viewingFamily || !memorials) return { ancestors: [], spouse: null, wives: [], children: [] };

    const name = viewingFamily.deceasedName.toLowerCase();
    const findMatch = (relName: string) => relName ? memorials.find((m: any) => m.deceasedName.toLowerCase() === relName.toLowerCase()) : null;

    const ancestors = [
        { label: language === 'en' ? 'Father' : 'والد', name: viewingFamily.fatherName, match: findMatch(viewingFamily.fatherName), role: 'father' },
        { label: language === 'en' ? 'Mother' : 'والدہ', name: viewingFamily.motherName, match: findMatch(viewingFamily.motherName), role: 'mother' },
        { label: language === 'en' ? 'Step-Father' : 'سوتیلے والد', name: viewingFamily.stepFatherName, match: findMatch(viewingFamily.stepFatherName), role: 'stepFather' },
        { label: language === 'en' ? 'Step-Mother' : 'سوتیلی والدہ', name: viewingFamily.stepMotherName, match: findMatch(viewingFamily.stepMotherName), role: 'stepMother' },
    ].filter(a => a.name || a.match);

    return {
        ancestors,
        spouse: findMatch(viewingFamily.husbandName),
        wives: memorials.filter((m: any) => m.husbandName && m.husbandName.toLowerCase() === name).slice(0, 4),
        children: memorials.filter((m: any) => 
            (m.fatherName && m.fatherName.toLowerCase() === name) ||
            (m.motherName && m.motherName.toLowerCase() === name) ||
            (m.stepFatherName && m.stepFatherName.toLowerCase() === name) ||
            (m.stepMotherName && m.stepMotherName.toLowerCase() === name)
        )
    };
  }, [viewingFamily, memorials, language]);

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
      latitude: newMemorial.isAlive ? null : 24.8778 + (Math.random() - 0.5) * 0.01,
      longitude: newMemorial.isAlive ? null : 67.1952 + (Math.random() - 0.5) * 0.01,
      createdAt: serverTimestamp(),
    };

    const ref = collection(db, 'memorials');
    addDoc(ref, data)
      .then(() => {
        toast({ 
            title: 'Success', 
            description: language === 'en' 
                ? 'Record added! You can now build your family tree.' 
                : 'ریکارڈ شامل کر دیا گیا! اب آپ اپنا خاندانی شجرہ بنا سکتے ہیں۔' 
        });
        setIsAdding(false);
        setIsPinDialogOpen(false);
        setNewMemorial({ 
            isAlive: false,
            honorific: 'none',
            deceasedName: '', 
            fatherName: '', 
            motherName: '', 
            stepFatherName: '', 
            stepMotherName: '', 
            husbandName: '',
            dateOfBirth: '', 
            dateOfDeath: '', 
            islamicDate: '', 
            graveyardName: '',
            imageUrl: '',
            publisherName: '',
            publisherEmail: '',
            publisherPhone: '',
        });
      })
      .catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: ref.path,
          operation: 'create',
          requestResourceData: data,
        });
        errorEmitter.emit('permission-error', permissionError);
        setIsAdding(false);
      });
  };

  const handleShare = async (m: any) => {
    if (!m) return;
    const shareUrl = `${window.location.origin}/locator?search=${encodeURIComponent(m.deceasedName)}`;
    const shareText = language === 'en' 
        ? `Explore the family lineage of ${m.deceasedName} at Stylish Marble Art's Memorial Registry.` 
        : `${m.deceasedName} کا خاندانی شجرہ سٹائلش ماربل آرٹ کی میموریل رجسٹری پر دیکھیں۔`;

    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Stylish Marble Art - Family Registry',
                text: shareText,
                url: shareUrl,
            });
            return;
        } catch (err) {
            // Ignored or user cancelled
        }
    }

    try {
        await navigator.clipboard.writeText(shareUrl);
        toast({ title: 'Link Copied', description: 'Family tree link copied to clipboard.' });
    } catch (clipboardErr) {
        toast({ variant: 'destructive', title: 'Share Failed', description: 'Could not copy link to clipboard.' });
    }
  };

  const handleRequestUpdate = (m: any) => {
    const whatsappNumber = "+923083401606".replace(/\D/g, '');
    const message = `Hello Stylish Marble Art, I would like to update the status for:
*Name:* ${m.deceasedName}
*Current Status:* ${m.isAlive ? 'Alive' : 'Deceased'}
*Graveyard:* ${m.graveyardName || 'N/A'}

I have new information regarding their funeral / resting place to add to the family tree.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const careServices = [
    { id: 'cleaning', name: { en: 'Grave Cleanliness', ur: 'قبر کی صفائی' }, color: "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100" },
    { id: 'watering', name: { en: 'Watering Service', ur: 'قبر کو پانی دینا' }, color: "bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100" },
    { id: 'planting', name: { en: 'Planting & Care', ur: 'پودے لگانا' }, color: "bg-green-50 text-green-900 border-green-200 hover:bg-green-100" },
    { id: 'custom', name: { en: 'Custom Service', ur: 'کسٹم سروس' }, color: "border-primary/10 hover:bg-primary hover:text-white" },
  ];

  const handleGetQuote = (m: any, serviceId: string) => {
    const service = careServices.find(s => s.id === serviceId);
    const serviceName = service?.name.en || 'General Service';
    const whatsappNumber = "+923083401606".replace(/\D/g, '');
    const title = m.honorific && m.honorific !== 'none' ? honorifics.find(h => h.id === m.honorific)?.en + ' ' : '';
    
    const message = `Hello Stylish Marble Art, I would like a quote for:
*Service:* ${serviceName}
*Name:* ${title}${m.deceasedName}
*Graveyard:* ${m.graveyardName || 'Not Specified'}

Please provide details on pricing and timeline.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleAddMissingRelative = (name: string, role: string) => {
    let updatedNewMemorial = { 
        ...newMemorial,
        deceasedName: name || '',
    };
    
    if (viewingFamily) {
        if (role === 'father') updatedNewMemorial.deceasedName = viewingFamily.fatherName || '';
        if (role === 'mother') updatedNewMemorial.deceasedName = viewingFamily.motherName || '';
        if (role === 'child') {
            updatedNewMemorial.deceasedName = '';
            updatedNewMemorial.fatherName = viewingFamily.deceasedName;
        }
    }

    setNewMemorial(updatedNewMemorial);
    setViewingFamily(null);
    setIsPinDialogOpen(true);
  };

  const RelativeSlot = ({ title, name, match, role }: { title: string, name: string | undefined, match: any, role: any }) => {
    return (
        <div className="space-y-2">
            <Label className="text-[9px] uppercase opacity-60 px-2">{title}</Label>
            {match ? (
                <Card className="bg-primary/5 border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors shadow-sm" onClick={() => setViewingFamily(match)}>
                    <CardContent className="p-3 text-sm font-bold text-primary flex justify-between items-center h-12">
                        <div className="flex flex-col">
                            <span className="truncate max-w-[120px]">{match.deceasedName}</span>
                            <span className="text-[8px] opacity-60 font-normal truncate max-w-[120px]">
                                {match.isAlive ? (language === 'en' ? 'Alive' : 'زندہ') : match.graveyardName}
                            </span>
                        </div>
                        <ArrowUp className="h-3 w-3 opacity-40" />
                    </CardContent>
                </Card>
            ) : (
                <Button variant="outline" className="w-full text-xs border-dashed flex items-center justify-between h-12" onClick={() => handleAddMissingRelative(name || '', role)}>
                    <div className="flex flex-col items-start">
                        <span className="opacity-40 text-[8px] font-bold uppercase">{language === 'en' ? 'Not in List' : 'فہرست میں نہیں'}</span>
                        <span className="truncate max-w-[120px]">{name || (language === 'en' ? `Add ${title}` : `${title} شامل کریں`)}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-60">
                        <Plus className="h-3 w-3" />
                        <span className="text-[8px] font-bold uppercase">{language === 'en' ? 'Add' : 'شامل کریں'}</span>
                    </div>
                </Button>
            )}
        </div>
    );
  };

  return (
    <div className="bg-secondary/10 min-h-screen pb-24">
      {/* Hero Content Section */}
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Image src="/SMAHeader.png" alt="Texture" fill className="object-cover grayscale" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto text-primary-foreground">
                <div className="inline-block bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                    {language === 'en' ? 'A Free Community Registry' : 'ایک مفت کمیونٹی رجسٹری'}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    {pageContent.title[language]}
                </h1>
                <p className="text-xl opacity-90 leading-relaxed mb-10 max-w-3xl mx-auto">
                    {language === 'en' 
                        ? 'Preserve your family history. Add family members—both living and deceased—to build a searchable digital lineage for future generations.' 
                        : 'اپنے خاندان کی تاریخ کو محفوظ رکھیں۔ آنے والی نسلوں کے لیے تلاش کے قابل ڈیجیٹل شجرہ بنانے کے لیے اپنے خاندان کے افراد کو شامل کریں۔'}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" variant="secondary" className="rounded-full px-10 font-bold" onClick={() => document.getElementById('search-tool')?.scrollIntoView({ behavior: 'smooth' })}>
                        <Search className="mr-2 h-5 w-5" />
                        {language === 'en' ? 'Search Registry' : 'رجسٹری تلاش کریں'}
                    </Button>
                    <Dialog open={isPinDialogOpen} onOpenChange={setIsPinDialogOpen}>
                        <DialogTrigger asChild>
                            <Button size="lg" variant="outline" className="rounded-full px-10 font-bold bg-transparent text-white border-white hover:bg-white hover:text-primary">
                                <Plus className="mr-2 h-5 w-5" />
                                {language === 'en' ? 'Add Person to Tree' : 'شجرہ میں فرد شامل کریں'}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold">{language === 'en' ? 'Add to Family Registry' : 'فہرست میں شامل کریں'}</DialogTitle>
                                <DialogDescription className="text-lg">
                                    {language === 'en' ? 'Preserve your family heritage. Add relatives to help family members find their roots.' : 'اپنے خاندان کا ورثہ محفوظ کریں۔ رشتہ داروں کو شامل کریں تاکہ خاندان کے افراد اپنی جڑیں تلاش کر سکیں۔'}
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleAddMemorial} className="space-y-6 py-4">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between bg-primary/5 p-4 rounded-xl border border-primary/10">
                                        <div className="space-y-0.5">
                                            <Label className="text-base font-bold">{language === 'en' ? 'Is this person alive?' : 'کیا یہ فرد زندہ ہے؟'}</Label>
                                            <p className="text-xs text-muted-foreground">{language === 'en' ? 'Turn off if adding a deceased memorial.' : 'اگر مرحوم کا کتبہ شامل کر رہے ہیں تو اسے بند کر دیں۔'}</p>
                                        </div>
                                        <Switch 
                                            checked={newMemorial.isAlive} 
                                            onCheckedChange={(val) => setNewMemorial({...newMemorial, isAlive: val})} 
                                        />
                                    </div>

                                    <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2">
                                        <User className="h-5 w-5 text-primary" />
                                        {language === 'en' ? 'Personal Information' : 'فرد کی معلومات'}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>{language === 'en' ? 'Title / Rank' : 'لقب / عہدہ'}</Label>
                                            <Select value={newMemorial.honorific} onValueChange={(v) => setNewMemorial({...newMemorial, honorific: v})}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {honorifics.map(h => (
                                                        <SelectItem key={h.id} value={h.id}>{h[language]}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>{language === 'en' ? 'Full Name' : 'پورا نام'}</Label>
                                            <Input required value={newMemorial.deceasedName} onChange={(e) => setNewMemorial({...newMemorial, deceasedName: e.target.value})} placeholder="e.g. Muhammad Ahmed" />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label>{language === 'en' ? 'Father\'s Name' : 'والد کا نام'}</Label>
                                            <Input value={newMemorial.fatherName} onChange={(e) => setNewMemorial({...newMemorial, fatherName: e.target.value})} placeholder="e.g. Abdullah Khan" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>{language === 'en' ? 'Mother\'s Name' : 'والدہ کا نام'}</Label>
                                            <Input value={newMemorial.motherName} onChange={(e) => setNewMemorial({...newMemorial, motherName: e.target.value})} />
                                        </div>
                                        
                                        {!newMemorial.isAlive && (
                                            <>
                                                <div className="space-y-2">
                                                    <Label>{language === 'en' ? 'Step-Father' : 'سوتیلے والد'}</Label>
                                                    <Input value={newMemorial.stepFatherName} onChange={(e) => setNewMemorial({...newMemorial, stepFatherName: e.target.value})} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>{language === 'en' ? 'Step-Mother' : 'سوتیلی والدہ'}</Label>
                                                    <Input value={newMemorial.stepMotherName} onChange={(e) => setNewMemorial({...newMemorial, stepMotherName: e.target.value})} />
                                                </div>
                                            </>
                                        )}
                                        
                                        <div className="space-y-2 md:col-span-2">
                                            <Label>{language === 'en' ? 'Husband\'s Name (If Married Female)' : 'شوہر کا نام'}</Label>
                                            <Input value={newMemorial.husbandName} onChange={(e) => setNewMemorial({...newMemorial, husbandName: e.target.value})} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>{language === 'en' ? 'Date of Birth' : 'تاریخ پیدائش'}</Label>
                                            <Input type="date" value={newMemorial.dateOfBirth} onChange={(e) => setNewMemorial({...newMemorial, dateOfBirth: e.target.value})} />
                                        </div>
                                        
                                        {!newMemorial.isAlive && (
                                            <>
                                                <div className="space-y-2">
                                                    <Label>{language === 'en' ? 'Date of Death' : 'تاریخ وفات'}</Label>
                                                    <Input type="date" required value={newMemorial.dateOfDeath} onChange={(e) => setNewMemorial({...newMemorial, dateOfDeath: e.target.value})} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>{language === 'en' ? 'Islamic Date (Optional)' : 'اسلامی تاریخ (اختیاری)'}</Label>
                                                    <Input placeholder="e.g. 15 Ramadan" value={newMemorial.islamicDate} onChange={(e) => setNewMemorial({...newMemorial, islamicDate: e.target.value})} />
                                                </div>
                                                <div className="space-y-2 md:col-span-2">
                                                    <Label>{pageContent.graveyardLabel[language]}</Label>
                                                    <Input placeholder="e.g. Wadi-e-Hussain" value={newMemorial.graveyardName} onChange={(e) => setNewMemorial({...newMemorial, graveyardName: e.target.value})} />
                                                    <p className="text-[10px] text-muted-foreground italic mt-1">
                                                        {language === 'en' ? 'Each family member can have their own location.' : 'خاندان کے ہر فرد کا اپنا مقام ہو سکتا ہے۔'}
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label>{language === 'en' ? 'Photo (Optional)' : 'تصویر (اختیاری)'}</Label>
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
                                        <Info className="h-5 w-5 text-primary" />
                                        {language === 'en' ? 'Your Contact Details (Confidential)' : 'آپ کے رابطے کی تفصیلات'}
                                    </h3>
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
                                            <Label>{language === 'en' ? 'Phone Number' : 'فون نمبر'}</Label>
                                            <Input required value={newMemorial.publisherPhone} onChange={(e) => setNewMemorial({...newMemorial, publisherPhone: e.target.value})} placeholder="e.g. +92 300 1234567" />
                                        </div>
                                    </div>
                                </div>

                                <DialogFooter className="pt-4">
                                <Button type="submit" className="w-full h-12 text-lg" disabled={isAdding || uploading}>
                                    {isAdding ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : language === 'en' ? 'Add to Tree' : 'شجرہ میں شامل کریں'}
                                </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
      </section>

      {/* Encouragement Banner */}
      <section className="container mx-auto px-4 -mt-12 mb-12 relative z-20">
        <Card className="bg-background shadow-2xl border-none overflow-hidden rounded-[2.5rem]">
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
                <div className="md:col-span-4 bg-primary p-10 flex flex-col justify-center text-primary-foreground relative">
                    <Sparkles className="h-12 w-12 mb-6 opacity-50" />
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
                        {pageContent.encouragement.title[language]}
                    </h2>
                    <div className="h-1 w-12 bg-white/30 rounded-full"></div>
                </div>
                <div className="md:col-span-8 p-10 flex flex-col justify-center bg-white/50 backdrop-blur-sm">
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed italic">
                        "{pageContent.encouragement.description[language]}"
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <Landmark className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-sm font-bold text-primary uppercase tracking-widest">
                            {language === 'en' ? 'A Gift to Future Generations' : 'آنے والی نسلوں کے لیے ایک تحفہ'}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
      </section>

      {/* Main Search Tool Section */}
      <section id="search-tool" className="container mx-auto px-4 py-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-16">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input 
                    placeholder={language === 'en' ? "Search by name or graveyard..." : "نام یا قبرستان سے تلاش کریں..."}
                    className="pl-10 h-14 bg-background border-primary/20 shadow-md text-lg rounded-xl"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    />
                    {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-2 bg-background border rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        {suggestions.map((val) => (
                        <button
                            key={val}
                            type="button"
                            className="w-full text-left px-6 py-3 hover:bg-primary/5 text-sm transition-colors border-b last:border-0 flex items-center gap-3"
                            onClick={() => {
                            setSearchQuery(val);
                            setShowSuggestions(false);
                            }}
                        >
                            <MapPin className="h-4 w-4 text-primary/40" />
                            <span className="font-medium">{val}</span>
                        </button>
                        ))}
                    </div>
                    )}
                </div>
                <Button size="lg" className="h-14 shadow-lg px-8 rounded-xl" onClick={() => setIsPinDialogOpen(true)}>
                    <Plus className="mr-2 h-5 w-5" />
                    {language === 'en' ? 'Add Person' : 'فرد شامل کریں'}
                </Button>
            </div>

            {/* Results Grid - ONLY SHOW DECEASED */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[400px]">
                {isLoading ? (
                    <div className="col-span-full flex flex-col items-center justify-center p-12">
                        <Loader2 className="animate-spin h-12 w-12 text-primary mb-4" />
                        <p className="font-medium text-muted-foreground">{language === 'en' ? 'Accessing records...' : 'ریکارڈز تک رسائی حاصل کی جا رہی ہے...'}</p>
                    </div>
                ) : filteredMemorials.length > 0 ? (
                    filteredMemorials.map((m: any) => (
                    <Card key={m.id} className="flex flex-col h-full shadow-md hover:shadow-2xl transition-all border-t-4 border-primary group overflow-hidden bg-background">
                        {m.imageUrl ? (
                        <div className="relative aspect-square w-full bg-muted overflow-hidden border-b">
                            <img 
                            src={m.imageUrl} 
                            alt={m.deceasedName} 
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                            <div className="absolute top-3 right-3 flex gap-2">
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
                        ) : (
                            <div className="p-4 bg-muted/20 flex justify-between items-center border-b">
                                <Badge variant="outline">MEMORIAL</Badge>
                                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={() => handleShare(m)}>
                                    <Share2 className="h-4 w-4 text-primary" />
                                </Button>
                            </div>
                        )}
                        
                        <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                {m.honorific && m.honorific !== 'none' && (
                                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                                        {honorifics.find(h => h.id === m.honorific)?.[language] || m.honorific}
                                    </span>
                                )}
                                <h3 className="font-bold text-2xl text-foreground leading-tight">{m.deceasedName}</h3>
                            </div>
                            {(m.fatherName || m.husbandName) && (
                                <p className="text-sm text-muted-foreground italic">
                                    {m.fatherName && `${language === 'en' ? 's/o ' : 'ولد '} ${m.fatherName}`}
                                    {m.fatherName && m.husbandName && ' | '}
                                    {m.husbandName && `${language === 'en' ? 'w/o ' : 'زوجہ '} ${m.husbandName}`}
                                </p>
                            )}
                            </div>
                        </div>

                        <div className="mb-4 space-y-2">
                            {m.graveyardName && (
                                <div className="flex items-center gap-2 text-primary">
                                    <MapPin className="h-4 w-4" />
                                    <span className="text-sm font-bold uppercase tracking-wider">{m.graveyardName}</span>
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-muted">
                                <div className="space-y-1">
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Born</div>
                                    <div className="text-sm font-semibold flex items-center gap-1.5">
                                        <Calendar className="h-3 w-3 text-primary" />
                                        {m.dateOfBirth || 'N/A'}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Died</div>
                                    <div className="text-sm font-semibold flex items-center gap-1.5">
                                        <Heart className="h-3 w-3 text-red-500" /> {m.dateOfDeath || 'N/A'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto space-y-4">
                            <Button 
                                variant="outline" 
                                className="w-full text-xs font-bold gap-2 border-primary/20 text-primary hover:bg-primary/5"
                                onClick={() => setViewingFamily(m)}
                            >
                                <Users className="h-4 w-4" />
                                {language === 'en' ? 'Family Connections' : 'خاندانی تعلقات'}
                            </Button>

                            <div className="space-y-2">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-center text-muted-foreground mb-1">Inquire About Care Service</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {careServices.map((s) => (
                                        <button 
                                            key={s.id} 
                                            type="button"
                                            className={cn(
                                                "text-[10px] h-auto py-3 px-2 transition-all whitespace-normal leading-tight text-center font-bold border rounded-md",
                                                s.color
                                            )}
                                            onClick={() => handleGetQuote(m, s.id)}
                                        >
                                            {s.name[language]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-24 bg-background rounded-3xl border-2 border-dashed shadow-inner">
                    <Search className="h-16 w-16 mx-auto mb-4 opacity-10 text-primary" />
                    <p className="text-2xl font-bold text-muted-foreground">No memorials found.</p>
                    <p className="text-muted-foreground mt-2">Try searching for a different name, or add a new family member above.</p>
                    </div>
                )}
            </div>
        </div>
      </section>

      {/* Advanced Family Tree Building Modal */}
      <Dialog open={!!viewingFamily} onOpenChange={() => setViewingFamily(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <div className="flex items-center justify-between gap-4">
                    <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
                        <GitGraph className="h-6 w-6 text-primary" />
                        {language === 'en' ? 'Family Connections' : 'خاندانی تعلقات'}
                    </DialogTitle>
                    <Button variant="ghost" size="icon" onClick={() => handleShare(viewingFamily)} title={language === 'en' ? 'Share Tree' : 'شجرہ شیئر کریں'}>
                        <Share2 className="h-5 w-5 text-primary" />
                    </Button>
                </div>
                <DialogDescription>
                    {language === 'en' 
                        ? `Trace the history of ${viewingFamily?.deceasedName}. You can add any missing relatives below.` 
                        : `${viewingFamily?.deceasedName} کی خاندانی تاریخ دیکھیں۔ آپ نیچے کسی بھی لاپتہ رشتہ دار کو شامل کر سکتے ہیں۔`}
                </DialogDescription>
            </DialogHeader>
            
            <div className="py-8 space-y-10 flex flex-col items-center">
                {/* Linked Relatives Grid */}
                <div className="w-full">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center mb-4">
                        {language === 'en' ? 'Parents & Connections' : 'والدین اور تعلقات'}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {familyConnections.ancestors.map((anc, idx) => (
                            <RelativeSlot key={idx} title={anc.label} name={anc.name} match={anc.match} role={anc.role} />
                        ))}
                        <Button variant="outline" className="sm:col-span-2 border-dashed border-primary/30 h-12 gap-2" onClick={() => handleAddMissingRelative('', 'custom')}>
                            <UserPlus className="h-4 w-4" />
                            {language === 'en' ? 'Add Another Relative' : 'دیگر رشتہ دار شامل کریں'}
                        </Button>
                    </div>
                </div>

                <ArrowDown className="h-6 w-6 text-primary opacity-30" />

                {/* Current Person & Spouse */}
                <div className="w-full flex flex-col items-center gap-4">
                    <Card className="w-full max-w-sm border-2 border-primary shadow-xl scale-105 bg-background relative z-10">
                        <CardContent className="p-6 text-center">
                            <div className="flex justify-center mb-2">
                                {viewingFamily?.isAlive && <Badge className="bg-green-500 text-[8px]">ALIVE</Badge>}
                            </div>
                            <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{language === 'en' ? 'Focus Person' : 'منتخب فرد'}</div>
                            <h3 className="text-xl font-bold">{viewingFamily?.deceasedName}</h3>
                            <div className="text-xs text-muted-foreground">{viewingFamily?.isAlive ? (language === 'en' ? 'Active in Tree' : 'شجرہ میں فعال') : viewingFamily?.graveyardName}</div>
                            
                            {/* Action for living person in tree */}
                            {viewingFamily?.isAlive && (
                                <Button 
                                    size="sm" 
                                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold gap-2 h-8"
                                    onClick={() => handleRequestUpdate(viewingFamily)}
                                >
                                    <MessageCircle className="h-3 w-3" />
                                    {language === 'en' ? 'Notify Death / Update' : 'وفات کی اطلاع'}
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                    <div className="w-full max-w-sm space-y-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center">
                            {language === 'en' ? 'Spouses' : 'شریک حیات'}
                        </div>
                        
                        {viewingFamily?.husbandName ? (
                            <RelativeSlot title={language === 'en' ? 'Husband' : 'شوہر'} name={viewingFamily?.husbandName} match={familyConnections.spouse} role="husband" />
                        ) : (
                            <div className="grid grid-cols-1 gap-2">
                                {familyConnections.wives.map((wife: any, idx: number) => (
                                    <RelativeSlot key={wife.id} title={language === 'en' ? `Wife ${idx + 1}` : `اہلیہ ${idx + 1}`} name={wife.deceasedName} match={wife} role="wife" />
                                ))}
                                {familyConnections.wives.length < 4 && (
                                    <Button variant="outline" className="w-full text-xs border-dashed flex items-center justify-between h-12" onClick={() => handleAddMissingRelative('', 'husband')}>
                                        <div className="flex flex-col items-start">
                                            <span className="opacity-40 text-[8px] font-bold uppercase">{language === 'en' ? 'New Link' : 'نیا ریکارڈ'}</span>
                                            <span>{language === 'en' ? 'Add Spouse' : 'شریک حیات شامل کریں'}</span>
                                        </div>
                                        <Plus className="h-3 w-3 opacity-60" />
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <ArrowDown className="h-6 w-6 text-primary opacity-30" />

                {/* Descendants (Children) */}
                <div className="w-full">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center mb-4">{language === 'en' ? 'Descendants' : 'اولاد / نسل'}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {familyConnections.children.map((child: any) => (
                            <Card key={child.id} className="bg-secondary/20 hover:bg-primary/5 transition-colors cursor-pointer border-dashed" onClick={() => setViewingFamily(child)}>
                                <CardContent className="p-3 flex justify-between items-center h-12">
                                    <div className="flex flex-col">
                                        <p className="font-bold text-sm truncate max-w-[120px]">{child.deceasedName}</p>
                                        {child.isAlive ? (
                                            <span className="text-[8px] text-green-600 font-bold uppercase">Alive</span>
                                        ) : (
                                            <span className="text-[8px] opacity-60 truncate max-w-[120px]">{child.graveyardName}</span>
                                        )}
                                    </div>
                                    <ArrowUp className="h-4 w-4 text-primary rotate-180" />
                                </CardContent>
                            </Card>
                        ))}
                        <Button variant="outline" size="sm" className="rounded-xl border-dashed h-12 flex items-center justify-between" onClick={() => handleAddMissingRelative('', 'child')}>
                            <div className="flex flex-col items-start">
                                <span className="opacity-40 text-[8px] font-bold uppercase">{language === 'en' ? 'Add Relation' : 'نیا ریکارڈ'}</span>
                                <span>{language === 'en' ? 'Add a Child' : 'اولاد شامل کریں'}</span>
                            </div>
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="flex-1 gap-2" onClick={() => handleShare(viewingFamily)}>
                    <Share2 className="h-4 w-4" />
                    {language === 'en' ? 'Share Tree' : 'شجرہ شیئر کریں'}
                </Button>
                <DialogClose asChild>
                    <Button variant="secondary" className="flex-1">{language === 'en' ? 'Close Registry' : 'بند کریں'}</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Professional Care Services Marketing Section */}
      <section className="bg-white py-24 border-y">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
                    {language === 'en' ? 'Honoring Legacies with Professional Care' : 'پیشہ ورانہ دیکھ بھال کے ساتھ میراث کا احترام'}
                </h2>
                <div className="text-lg text-muted-foreground leading-relaxed">
                    {language === 'en' 
                        ? 'At Stylish Marble Art, we understand that visiting a graveyard can be difficult for those living abroad. While our digital family registry is a free gift to the community, our dedicated teams in Karachi provide professional maintenance services to ensure your loved one\'s final resting place remains beautiful and dignified.' 
                        : 'سٹائلش ماربل آرٹ میں، ہم سمجھتے ہیں کہ بیرون ملک مقیم افراد کے لیے قبرستان جانا مشکل ہو سکتا ہے۔ اگرچہ ہماری ڈیجیٹل خاندانی رجسٹری کمیونٹی کے لیے ایک مفت تحفہ ہے، ہماری کراچی میں وقف ٹیمیں پیشہ ورانہ دیکھ بھال کی خدمات فراہم کرتی ہیں تاکہ یہ یقینی بنایا جا سکے کہ آپ کے پیارے کی آخری آرام گاہ خوبصورت اور باوقار رہے۔'}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {careServices.map((s) => (
                    <Card key={s.id} className="border-none shadow-lg hover:shadow-xl transition-shadow text-center group">
                        <CardHeader>
                            <CardTitle className="text-xl">{s.name[language]}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-8">
                            <Button variant="link" className="font-bold text-primary" onClick={() => document.getElementById('search-tool')?.scrollIntoView({ behavior: 'smooth' })}>
                                {language === 'en' ? 'Get a Price Quote' : 'قیمت معلوم کریں'}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      {/* Map View Section */}
      <section className="container mx-auto px-4 pt-24">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">{language === 'en' ? 'Karachi Cemetery Interactive Map' : 'کراچی قبرستان کا انٹرایکٹو نقشہ'}</h2>
            <div className="text-muted-foreground max-w-2xl mx-auto">{language === 'en' ? 'Visualize exact grave locations across Wadi-e-Hussain, Mewa Shah, and major city cemeteries to plan your next visit.' : 'اپنی اگلی زیارت کی منصوبہ بندی کرنے کے لیے وادی حسین، میوہ شاہ، اور شہر کے بڑے قبرستانوں میں قبروں کے صحیح مقامات دیکھیں۔'}</div>
        </div>
        <div className="bg-background rounded-[3rem] shadow-2xl overflow-hidden h-[600px] relative border-8 border-white group">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/10">
                <div className="text-center p-8">
                    <MapPin className="h-24 w-24 mx-auto mb-6 text-primary opacity-20 transition-transform group-hover:scale-110 duration-500" />
                    <div className="font-bold text-3xl uppercase tracking-widest opacity-20">Cemetery Map View</div>
                    <div className="text-sm mt-4 max-w-xs mx-auto opacity-40">Markers will appear here for searched graves in Karachi's major graveyards.</div>
                </div>
            </div>
            <div className="absolute top-8 left-8 bg-primary/90 backdrop-blur-md text-white px-8 py-3 rounded-full text-sm font-bold shadow-2xl flex items-center gap-3">
                <MapPin className="h-5 w-5" />
                {filteredMemorials.filter(m => !m.isAlive).length} {language === 'en' ? 'Graves Located' : 'قبریں مل گئیں'}
            </div>
        </div>
      </section>
    </div>
  );
}
