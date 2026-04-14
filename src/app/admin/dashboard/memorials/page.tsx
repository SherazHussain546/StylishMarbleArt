
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ArrowLeft, Trash2, MapPin, User, Mail, Phone, MessageCircle, Search, QrCode, Download, Loader2 } from 'lucide-react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import QRCode from 'qrcode';

export default function AdminMemorialLeadsPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [qrCodeData, setQrCodeData] = useState<{ url: string, name: string } | null>(null);
  const [generatingQR, setGeneratingQR] = useState(false);

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
    if (!window.confirm('Delete this memorial entry? This cannot be undone.')) return;
    const docRef = doc(db, 'memorials', id);
    
    deleteDoc(docRef)
      .catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
      });
    
    toast({ title: 'Success', description: 'Lead deleted.' });
  };

  const generateQRCode = async (m: any) => {
    setGeneratingQR(true);
    try {
      const memorialUrl = `${window.location.origin}/locator?search=${encodeURIComponent(m.deceasedName)}`;
      // Generate standard high-quality PNG data URL
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
            <h1 className="text-3xl font-bold tracking-tight">Memorial Locator Leads</h1>
        </div>
        <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search leads..." 
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
            <Card key={m.id} className="overflow-hidden border-l-4 border-green-500">
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="md:col-span-1 relative h-48 md:h-full bg-muted">
                  <img 
                    src={m.imageUrl || 'https://picsum.photos/seed/placeholder/400/400'} 
                    alt={m.deceasedName} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="md:col-span-3 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-primary">{m.deceasedName}</h2>
                      <p className="text-sm text-muted-foreground italic">{m.parentName}</p>
                      {m.graveyardName && (
                        <div className="flex items-center gap-1 text-sm font-semibold text-primary mt-1">
                            <MapPin className="h-3 w-3" />
                            {m.graveyardName}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => generateQRCode(m)} title="Generate QR Code">
                            <QrCode className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(m.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Memorial Info</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="font-semibold">Born:</span> <span>{m.dateOfBirth || 'N/A'}</span>
                        <span className="font-semibold">Died:</span> <span>{m.dateOfDeath || 'N/A'}</span>
                        <span className="font-semibold">Islamic:</span> <span>{m.islamicDate || 'N/A'}</span>
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
                            <a href={`https://wa.me/${m.publisherPhone.replace(/\D/g, '')}?text=Hello%20${m.publisherName},%20this%20is%20Stylish%20Marble%20Art.%20We%20received%20your%20memorial%20entry%20for%20${m.deceasedName}.`} target="_blank">
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
            <h3 className="text-lg font-medium">No Matching Memorial Leads</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search term or wait for new submissions.</p>
          </div>
        )}
      </div>

      <Dialog open={!!qrCodeData} onOpenChange={() => setQrCodeData(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Grave QR Code</DialogTitle>
            <DialogDescription>
              Unique digital link for {qrCodeData?.name}. Print this code to place on the physical headstone.
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
