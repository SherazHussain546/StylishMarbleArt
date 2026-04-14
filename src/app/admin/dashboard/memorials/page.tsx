
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { ArrowLeft, Trash2, MapPin, User, Mail, Phone, MessageCircle, Search, QrCode, Download, Edit2, Loader2, Heart, Calendar, Users, Info } from 'lucide-react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import QRCode from 'qrcode';

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

export default function AdminMemorialLeadsPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [qrCodeData, setQrCodeData] = useState<{ url: string, name: string } | null>(null);
  const [generatingQR, setGeneratingQR] = useState(false);
  
  // Edit State
  const [editingMemorial, setEditingMemorial] = useState<any | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const memorialsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'memorials'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: memorials, isLoading: loading } = useCollection<any>(memorialsQuery);

  const filteredMemorials = useMemo(() => {
    if (!memorials) return [];
    if (!searchTerm) return memorials;
    
    const term = searchTerm.toLowerCase();
    return memorials.filter((m: any) => 
      m.deceasedName.toLowerCase().includes(term) ||
      (m.graveyardName && m.graveyardName.toLowerCase().includes(term)) ||
      m.publisherName.toLowerCase().includes(term)
    );
  }, [memorials, searchTerm]);

  const handleDelete = (id: string) => {
    if (!window.confirm('Delete this record? This cannot be undone.')) return;
    const docRef = doc(db, 'memorials', id);
    
    deleteDoc(docRef)
      .catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
      });
    
    toast({ title: 'Success', description: 'Record deleted.' });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMemorial) return;

    setIsUpdating(true);
    const docRef = doc(db, 'memorials', editingMemorial.id);
    const { id, createdAt, ...updateData } = editingMemorial;

    updateDoc(docRef, updateData)
      .catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });

    toast({ title: 'Updated', description: 'Record details updated successfully.' });
    setEditingMemorial(null);
    setIsUpdating(false);
  };

  const generateQRCode = async (m: any) => {
    setGeneratingQR(true);
    try {
      const memorialUrl = `${window.location.origin}/locator?search=${encodeURIComponent(m.deceasedName)}`;
      const dataUrl = await QRCode.toDataURL(memorialUrl, {
        width: 1024,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      setQrCodeData({ url: dataUrl, name: m.deceasedName });
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to generate QR code.' });
    } finally {
      setGeneratingQR(false);
    }
  };

  const downloadQR = () => {
    if (!qrCodeData) return;
    const link = document.createElement('a');
    link.href = qrCodeData.url;
    link.download = `QR_${qrCodeData.name.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
            <Link href="/admin/dashboard">
                <ArrowLeft className="h-4 w-4" />
            </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Family Tree Leads</h1>
        </div>
        <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search by name or graveyard..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <div className="grid gap-8">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
          </div>
        ) : filteredMemorials && filteredMemorials.length > 0 ? (
          filteredMemorials.map((m: any) => (
            <Card key={m.id} className={cn("overflow-hidden border-l-4", m.isAlive ? "border-green-500" : "border-primary")}>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="md:col-span-1 relative aspect-square bg-muted">
                  {m.imageUrl ? (
                    <img 
                        src={m.imageUrl} 
                        alt={m.deceasedName} 
                        className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-muted-foreground bg-secondary/20">
                        <User className="h-12 w-12 opacity-20" />
                    </div>
                  )}
                  {m.isAlive && (
                    <div className="absolute top-2 left-2">
                        <Badge className="bg-green-500">ALIVE</Badge>
                    </div>
                  )}
                </div>
                <div className="md:col-span-3 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {m.honorific && m.honorific !== 'none' && (
                            <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                                {honorifics.find(h => h.id === m.honorific)?.en || m.honorific}
                            </span>
                        )}
                        <h2 className="text-2xl font-bold text-primary">{m.deceasedName}</h2>
                      </div>
                      <div className="space-y-0.5 text-xs text-muted-foreground italic">
                        {m.fatherName && <p>Father: {m.fatherName}</p>}
                        {m.motherName && <p>Mother: {m.motherName}</p>}
                        {m.husbandName && <p>Husband: {m.husbandName}</p>}
                      </div>
                      {!m.isAlive && m.graveyardName && (
                        <div className="flex items-center gap-1 text-sm font-semibold text-primary mt-2">
                            <MapPin className="h-3 w-3" />
                            {m.graveyardName}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                        {!m.isAlive && (
                            <Button variant="outline" size="icon" onClick={() => generateQRCode(m)} title="Generate QR Code" disabled={generatingQR}>
                                <QrCode className="h-4 w-4 text-blue-600" />
                            </Button>
                        )}
                        <Button variant="outline" size="icon" onClick={() => setEditingMemorial(m)} title="Edit Record">
                            <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(m.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Registry Info</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="font-semibold">Born:</span> <span>{m.dateOfBirth || 'N/A'}</span>
                        {!m.isAlive && (
                            <>
                                <span className="font-semibold">Died:</span> <span>{m.dateOfDeath || 'N/A'}</span>
                                <span className="font-semibold">Islamic:</span> <span>{m.islamicDate || 'N/A'}</span>
                            </>
                        )}
                        <span className="font-semibold">Added:</span> <span>{m.createdAt?.seconds ? format(new Date(m.createdAt.seconds * 1000), 'PPP') : 'N/A'}</span>
                      </div>
                    </div>

                    <div className="space-y-2 bg-primary/5 p-4 rounded-lg border border-primary/10">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">Publisher (Potential Client)</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-primary" />
                          <span className="font-medium">{m.publisherName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-primary" />
                          <a href={`mailto:${m.publisherEmail}`} className="text-blue-600 hover:underline">{m.publisherEmail}</a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-primary" />
                          <a href={`tel:${m.publisherPhone}`} className="text-blue-600 hover:underline">{m.publisherPhone}</a>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button asChild size="sm" className="w-full bg-green-600 hover:bg-green-700">
                            <a href={`https://wa.me/${m.publisherPhone.replace(/\D/g, '')}?text=Hello%20${m.publisherName},%20this%20is%20Stylish%20Marble%20Art.%20We%20received%20your%20family%20registry%20entry%20for%20${m.deceasedName}.`} target="_blank">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Contact via WhatsApp
                            </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-24 border-2 border-dashed rounded-xl">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
            <h3 className="text-lg font-medium">No Matching Records</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search term or wait for new submissions.</p>
          </div>
        )}
      </div>

      {/* Edit Memorial Dialog */}
      <Dialog open={!!editingMemorial} onOpenChange={() => setEditingMemorial(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Record Details</DialogTitle>
            <DialogDescription>Correct or update information for this registry record.</DialogDescription>
          </DialogHeader>
          {editingMemorial && (
            <form onSubmit={handleUpdate} className="space-y-6 py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-primary/5 p-4 rounded-xl border border-primary/10">
                    <div className="space-y-0.5">
                        <Label className="text-base font-bold">Is this person alive?</Label>
                        <p className="text-xs text-muted-foreground">Updating this will change how the record is displayed.</p>
                    </div>
                    <Switch 
                        checked={editingMemorial.isAlive} 
                        onCheckedChange={(val) => setEditingMemorial({...editingMemorial, isAlive: val})} 
                    />
                </div>

                <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Title / Rank</Label>
                        <Select value={editingMemorial.honorific || 'none'} onValueChange={(v) => setEditingMemorial({...editingMemorial, honorific: v})}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {honorifics.map(h => (
                                    <SelectItem key={h.id} value={h.id}>{h.en}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input required value={editingMemorial.deceasedName} onChange={(e) => setEditingMemorial({...editingMemorial, deceasedName: e.target.value})} />
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Father's Name</Label>
                        <Input value={editingMemorial.fatherName || ''} onChange={(e) => setEditingMemorial({...editingMemorial, fatherName: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <Label>Mother's Name</Label>
                        <Input value={editingMemorial.motherName || ''} onChange={(e) => setEditingMemorial({...editingMemorial, motherName: e.target.value})} />
                    </div>
                    
                    {!editingMemorial.isAlive && (
                        <>
                            <div className="space-y-2">
                                <Label>Step-Father</Label>
                                <Input value={editingMemorial.stepFatherName || ''} onChange={(e) => setEditingMemorial({...editingMemorial, stepFatherName: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <Label>Step-Mother</Label>
                                <Input value={editingMemorial.stepMotherName || ''} onChange={(e) => setEditingMemorial({...editingMemorial, stepMotherName: e.target.value})} />
                            </div>
                        </>
                    )}
                    
                    <div className="space-y-2 md:col-span-2">
                        <Label>Husband's Name</Label>
                        <Input value={editingMemorial.husbandName || ''} onChange={(e) => setEditingMemorial({...editingMemorial, husbandName: e.target.value})} />
                    </div>

                    <div className="space-y-2">
                        <Label>Date of Birth</Label>
                        <Input type="date" value={editingMemorial.dateOfBirth} onChange={(e) => setEditingMemorial({...editingMemorial, dateOfBirth: e.target.value})} />
                    </div>
                    
                    {!editingMemorial.isAlive && (
                        <>
                            <div className="space-y-2">
                                <Label>Date of Death</Label>
                                <Input type="date" required value={editingMemorial.dateOfDeath} onChange={(e) => setEditingMemorial({...editingMemorial, dateOfDeath: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <Label>Islamic Date</Label>
                                <Input placeholder="e.g. 15 Ramadan" value={editingMemorial.islamicDate} onChange={(e) => setEditingMemorial({...editingMemorial, islamicDate: e.target.value})} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Graveyard Name</Label>
                                <Input value={editingMemorial.graveyardName} onChange={(e) => setEditingMemorial({...editingMemorial, graveyardName: e.target.value})} />
                            </div>
                        </>
                    )}
                    
                    <div className="space-y-2 md:col-span-2">
                        <Label>Photo URL</Label>
                        <Input value={editingMemorial.imageUrl} onChange={(e) => setEditingMemorial({...editingMemorial, imageUrl: e.target.value})} placeholder="https://..." />
                    </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Publisher Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Publisher Name</Label>
                        <Input required value={editingMemorial.publisherName} onChange={(e) => setEditingMemorial({...editingMemorial, publisherName: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <Label>Publisher Email</Label>
                        <Input required type="email" value={editingMemorial.publisherEmail} onChange={(e) => setEditingMemorial({...editingMemorial, publisherEmail: e.target.value})} />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <Label>Publisher Phone</Label>
                        <Input required value={editingMemorial.publisherPhone} onChange={(e) => setEditingMemorial({...editingMemorial, publisherPhone: e.target.value})} />
                    </div>
                </div>
              </div>

              <DialogFooter className="pt-4">
                <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Changes'}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!qrCodeData} onOpenChange={() => setQrCodeData(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Unique Digital Link QR</DialogTitle>
            <DialogDescription>
              Shareable link for {qrCodeData?.name}. Print this code to place on physical documents or headstones.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border">
            {qrCodeData && (
                <img 
                    src={qrCodeData.url} 
                    alt={`QR Code for ${qrCodeData.name}`} 
                    className="w-64 h-64 shadow-sm"
                />
            )}
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="ghost" onClick={() => setQrCodeData(null)}>Close</Button>
            <Button onClick={downloadQR} className="bg-blue-600 hover:bg-blue-700">
                <Download className="mr-2 h-4 w-4" />
                Download .PNG
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
