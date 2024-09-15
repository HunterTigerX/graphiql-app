'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Login } from '@/components/Login/Login';
import Loader from '@/components/Loader/Loader';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { IState, RootState } from '@/interfaces/interfaces';

export default function LoginPage() {
  const router = useRouter();
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);
  const languageData = useSelector((state: IState) => state.main.languageData);

  useEffect(() => {
    if (isAuth) {
      router.push('/');
    }
  }, [isAuth, router]);

  if (isAuth) {
    return <Loader />;
  }

  return (
    <main className="main">
      <div className="container">
        <Stack direction="column" justifyContent="space-between" alignItems="flex-start" spacing={3}>
          <Typography variant="h3" component="p" fontWeight={600}>
            {languageData.signIn}
          </Typography>
          <Login />
          <Typography variant="h6" component="p">
            {languageData.notRegistered} <Link href="/signup">{languageData.createAccount}</Link>
          </Typography>
        </Stack>
      </div>
    </main>
  );
}
