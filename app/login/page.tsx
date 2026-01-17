'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to home page since login is handled there
    router.push('/');
  }, [router]);

  return null;
}