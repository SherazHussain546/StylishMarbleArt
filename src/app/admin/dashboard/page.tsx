
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Users, BarChart, ExternalLink, Search, ImageIcon } from 'lucide-react';
import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-secondary">
        <div className="p-8 space-y-6 w-full max-w-4xl">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-24" />
          </div>
          <Skeleton className="h-8 w-64" />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
          </div>
           <Skeleton className="h-64 rounded-lg mt-8" />
        </div>
      </div>
    );
  }

  // The AuthProvider should handle the redirect, but as a fallback:
  if (!user) {
    return null; 
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
             <span className="text-sm text-muted-foreground hidden md:inline">Welcome, {user.email}</span>
             <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Content Management</h2>
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gallery Management</CardTitle>
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                 <Button disabled>Manage Gallery</Button>
                <p className="text-xs text-muted-foreground mt-2">Feature coming soon.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Website Analytics</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">--</div>
                <p className="text-xs text-muted-foreground">Analytics data loading...</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Page</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">--</div>
                <p className="text-xs text-muted-foreground">Analytics data loading...</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">View on Google Analytics</CardTitle>
                 <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Button size="sm" asChild variant="outline">
                    <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer">
                        Open Analytics
                    </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-2">Connect via Google Console</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
            <h2 className="text-2xl font-semibold tracking-tight my-4">Search Engine Data</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Top Search Keyword</CardTitle>
                    <Search className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">--</div>
                    <p className="text-xs text-muted-foreground">Search Console data loading...</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Search Clicks</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">--</div>
                    <p className="text-xs text-muted-foreground">Search Console data loading...</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">View on Search Console</CardTitle>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <Button size="sm" asChild variant="outline">
                        <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
                            Open Search Console
                        </a>
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">Connect via Google Console</p>
                </CardContent>
              </Card>
            </div>
        </section>
      </main>
    </>
  );
}
