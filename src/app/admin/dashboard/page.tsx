
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="p-8 space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
          </div>
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
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>
      <main className="p-4 md:p-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome, {user.email}</p>

        <div className="mt-8">
            <h2 className="text-2xl font-semibold tracking-tight">Website Analytics</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Analytics cards will go here in Phase 2 */}
            </div>
            <div className="mt-6 text-center text-muted-foreground">
                <p>Analytics and Search Engine data will be displayed here in the next phase.</p>
            </div>
        </div>
      </main>
    </>
  );
}
