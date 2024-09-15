'use client';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import { Typography, Button, Stack } from '@mui/material';
import Link from 'next/link';
import { IState } from '@/interfaces/interfaces';
import { useSelector } from 'react-redux';
import MainInform from '@/components/MainInform/MainInform';

const HomePage = () => {
  const [user, setUser] = useState<string | null>(null);
  const languageData = useSelector((state: IState) => state.main.languageData);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userName = user.email!.split('@')[0];
        setUser(userName);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <main className="main">
      <div className="container">
        {user ? (
          <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="h3" component="p">
              {languageData.welcomeBack}, {user}!
            </Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <Button variant="contained" size="large" component={Link} href="/GET">
                {languageData.restHeader}
              </Button>
              <Button variant="contained" size="large" component={Link} href="/GRAPHQL">
                {languageData.graphQlHeader}
              </Button>
              <Button variant="contained" size="large" component={Link} href="/history">
                {languageData.history}
              </Button>
            </Stack>
            <MainInform />
          </Stack>
        ) : (
          <>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
              <Typography variant="h3" component="h1" gutterBottom>
                {languageData.welcome}
              </Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Button variant="outlined" size="large" component={Link} href="/login">
                  {languageData.signIn}
                </Button>
                <Button variant="contained" size="large" component={Link} href="/signup">
                  {languageData.signUp}
                </Button>
              </Stack>
              <MainInform />
            </Stack>
          </>
        )}
      </div>
    </main>
  );
};

export default HomePage;
