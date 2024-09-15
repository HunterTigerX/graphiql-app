'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import { Form } from '../Form/Form';
import { setUser } from '../../reducers/reducers/userSlice';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { IState } from '@/interfaces/interfaces';

export const SingUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const languageData = useSelector((state: IState) => state.main.languageData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const userName = user.email!.split('@')[0];

        dispatch(
          setUser({
            userName: userName,
            email: user.email,
            id: user.uid,
            token: token,
          })
        );

        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch, router]);

  const handleSignUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password).catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please try another one.');
      } else {
        setError(error.message);
      }
    });
  };

  return (
    <Stack spacing={2}>
      {error && <Alert severity="error">{error}</Alert>}
      <Form title={languageData.signProcess} handleClick={handleSignUp} />
    </Stack>
  );
};
