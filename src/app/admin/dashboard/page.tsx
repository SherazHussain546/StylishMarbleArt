'use client';

import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogOut, ImageIcon, MessageSquare, Settings, MapPin, AlertCircle, ShieldAlert, Loader2 } from 'lucide-react';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { useAuth } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AdminDashboardPage() {
  const { user, loading } = useUser();
  const db = useFirestore();
  const auth = useAuth();
  const router = useRouter();

  // Verify database admin status
  const adminDocRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'roles_admin', user.uid);
  }, [db, user]);

  const { data: adminDoc, isLoading: adminLoading } = useDoc(adminDocRef);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-secondary">
        <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="font-medium">Verifying Session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; 
  }

  const isDatabaseAdmin = !!adminDoc;

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
             <span className="text-sm text-muted-foreground hidden md:inline">{user.email}</span>
             <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container py-8 md:py-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your website content and business leads.</p>
          </div>
          
          {!adminLoading && !isDatabaseAdmin && (
             <div className="flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-lg border border-amber-200 text-sm font-medium">
                <ShieldAlert className="h-4 w-4" />
                Database Write Access: Denied
             </div>
          )}
        </div>

        {!adminLoading && !isDatabaseAdmin && (
          <Alert variant="destructive" className="bg-destructive/5 border-destructive/20 text-destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Missing Administrative Permissions</AlertTitle>
            <AlertDescription className="space-y-2">
              <p>Your authentication is valid, but your account is not registered in the <strong>roles_admin</strong> database collection. You can view data, but you will not be able to delete or update records.</p>
              <div className="bg-destructive/10 p-4 rounded-lg mt-4 space-y-3">
                <p className="text-sm font-bold">To fix this, follow these steps:</p>
                <ol className="text-xs list-decimal pl-4 space-y-1">
                    <li>Go to your Firebase Console.</li>
                    <li>Open <strong>Firestore Database</strong>.</li>
                    <li>Create a collection named <code>roles_admin</code> if it doesn't exist.</li>
                    <li>Add a new document with this ID: <code className="bg-background px-1 rounded font-bold">{user.uid}</code></li>
                    <li>You don't need any fields in the document; the ID is what counts.</li>
                </ol>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold">Gallery</CardTitle>
              <ImageIcon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
               <CardDescription className="mb-4">Upload new photos of your work and manage the public portfolio.</CardDescription>
               <Button asChild className="w-full">
                  <Link href="/admin/dashboard/gallery">Manage Gallery</Link>
               </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold">Messages</CardTitle>
              <MessageSquare className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
               <CardDescription className="mb-4">Read and manage inquiries sent through the contact form.</CardDescription>
               <Button asChild className="w-full" variant="secondary">
                  <Link href="/admin/dashboard/messages">View Inbox</Link>
               </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold">Memorial Leads</CardTitle>
              <MapPin className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
               <CardDescription className="mb-4">View grave locator submissions and publisher contact details for sales.</CardDescription>
               <Button asChild className="w-full" variant="outline">
                  <Link href="/admin/dashboard/memorials">Manage Leads</Link>
               </Button>
            </CardContent>
          </Card>

          <Card className="opacity-60 grayscale hover:grayscale-0 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold">Settings</CardTitle>
              <Settings className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
               <CardDescription className="mb-4">Configure website metadata, phone numbers, and address.</CardDescription>
               <Button disabled className="w-full" variant="ghost">
                  Coming Soon
               </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
