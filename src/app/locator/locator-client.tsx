
'use client';

import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, MapPin, Plus, Heart, Droplets, Leaf, Trash2, Camera, Loader2, Phone, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

export default function LocatorPageClient() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const db = useFirestore();
  const pageContent = content.locatorPage;

  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newMemorial, setNewMemorial] = useState({
    deceasedName: '',
    parentName: '',
    dateOfBirth: '',
    dateOfDeath: '',
    islamicDate: '',
    imageUrl: '',
  });

  // Firestore Sync
  const memorialsRef = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'memorials'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: memorials, isLoading } = useCollection<any>(memorialsRef);

  const filteredMemorials = useMemo(() => {
    if (!memorials) return [];
    return memorials.filter((m: any) => 
      m.deceasedName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [memorials, searchQuery]);

  const handleAddMemorial = async (e: React.FormEvent) => {
    e.preventDefault();
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

    toast({ title: 'Success', description: 'Memorial location pinned successfully.' });
    setIsAdding(false);
    setNewMemorial({ deceasedName: '', parentName: '', dateOfBirth: '', dateOfDeath: '', islamicDate: '', imageUrl: '' });
  };

  const services = [
    { icon: Trash2, name: { en: 'Grave Cleaning', ur: 'قبر کی صفائی' }, price: '1500 PKR' },
    { icon: Droplets, name: { en: 'Watering Service', ur: 'پانی دینا' }, price: '500 PKR' },
    { icon: Leaf, name: { en: 'Planting & Maintenance', ur: 'پودے لگانا' }, price: '3000 PKR' },
    { icon: Camera, name: { en: 'Photo/Video Update', ur: 'تصویر/ویڈیو اپ ڈیٹ' }, price: 'Free' },
  ];

  const whatsappNumber = "+923083401606".replace(/\D/g, '');

  return (
    <div className="bg-secondary/10 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <header className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">{pageContent.title[language]}</h1>
          <p className="text-lg text-muted-foreground">{pageContent.description[language]}</p>
        </header>

        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              placeholder={pageContent.searchPlaceholder[language]} 
              className="pl-10 h-12 bg-background border-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="h-12 shadow-lg">
                <Plus className="mr-2 h-5 w-5" />
                {pageContent.addMemorial[language]}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{pageContent.addMemorial[language]}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddMemorial} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
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
                   <Label>{language === 'en' ? 'Photo URL' : 'تصویر کا لنک'}</Label>
                   <Input placeholder="https://..." value={newMemorial.imageUrl} onChange={(e) => setNewMemorial({...newMemorial, imageUrl: e.target.value})} />
                </div>
                <div className="md:col-span-2 bg-muted p-4 rounded-md text-center">
                  <p className="text-xs text-muted-foreground uppercase font-bold mb-2">Pin Location</p>
                  <p className="text-sm">Click on the map at the workshop to set exact GPS.</p>
                  <div className="h-32 bg-secondary/50 rounded flex items-center justify-center border-2 border-dashed border-primary/20">
                    <MapPin className="h-8 w-8 text-primary opacity-50" />
                  </div>
                </div>
                <DialogFooter className="md:col-span-2 pt-4">
                  <Button type="submit" className="w-full" disabled={isAdding}>
                    {isAdding ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : pageContent.addMemorial[language]}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Map View Toggle or Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-background rounded-3xl shadow-xl overflow-hidden h-[600px] relative border-4 border-white">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                 {/* This would be the Google Map component with custom markers */}
                 <div className="text-center p-8">
                    <MapPin className="h-16 w-16 mx-auto mb-4 text-primary opacity-20" />
                    <p className="font-bold text-xl uppercase tracking-widest opacity-20">Karachi Cemetery Map View</p>
                    <p className="text-sm mt-2">Markers will appear here for searched graves.</p>
                 </div>
              </div>
              {/* Overlay results count */}
              <div className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                 {filteredMemorials.length} Memorials Found
              </div>
           </div>

           <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2">
              {isLoading ? (
                <div className="flex justify-center p-12"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
              ) : filteredMemorials.length > 0 ? (
                filteredMemorials.map((m: any) => (
                  <Card key={m.id} className="hover:shadow-lg transition-all border-l-4 border-primary">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border">
                          <Image 
                            src={m.imageUrl || 'https://picsum.photos/seed/memorial/200/200'} 
                            alt={m.deceasedName} 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-bold text-lg">{m.deceasedName}</h3>
                          <p className="text-xs text-muted-foreground mb-1">
                            {language === 'en' ? 's/o d/o ' : 'ولد/بنت '} {m.parentName}
                          </p>
                          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-primary">
                             <span>{m.dateOfBirth} - {m.dateOfDeath}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t space-y-3">
                         <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                            {pageContent.servicesTitle[language]}
                         </p>
                         <div className="grid grid-cols-2 gap-2">
                            {services.map((s, idx) => {
                              const Svg = s.icon;
                              return (
                                <Button 
                                  key={idx} 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-[10px] h-auto py-2 justify-start font-medium"
                                  asChild
                                >
                                  <a href={`https://wa.me/${whatsappNumber}?text=Inquiry%20about%20${s.name.en}%20for%20${m.deceasedName}`} target="_blank">
                                    <Svg className="mr-2 h-3 w-3" />
                                    {s.name[language]}
                                  </a>
                                </Button>
                              )
                            })}
                         </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 bg-muted/20 rounded-xl">
                  <Search className="h-10 w-10 mx-auto mb-2 opacity-10" />
                  <p className="text-sm text-muted-foreground">No matches found.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
