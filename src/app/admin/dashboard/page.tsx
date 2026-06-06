'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogOut, ImageIcon, MessageSquare, Settings, MapPin, Loader2 } from 'lucide-react';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { useAuth } from '@/firebase';

export default function AdminDashboardPage() {
  const { user, loading } = useUser();
  const auth = useAuth();
  const router = useRouter();

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
        </div>
        
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