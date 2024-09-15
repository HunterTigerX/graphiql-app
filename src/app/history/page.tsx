'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader/Loader';
import HistoryModule from '@/components/History/History';
import NoHistory from '@/components/History/NoHistory';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';

export default function HistoryPage() {
  const router = useRouter();
  const [savedState, setSavedState] = useState<string | null | false>(null);
  const [loginStatus, setLoginStatus] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginStatus(true);
      } else {
        setLoginStatus(false);
        router.push('/');
      }
      setInitialLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

  useEffect(() => {
    const storageStatus = typeof window !== 'undefined' ? window.localStorage.getItem('history_data') : false;
    setSavedState(storageStatus);
  }, []);

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <main className="main">
      <div className="container">{loginStatus ? savedState ? <HistoryModule /> : <NoHistory /> : <Loader />}</div>
    </main>
  );
}
