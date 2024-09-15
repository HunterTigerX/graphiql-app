'use client';
import styles from './Header.module.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { setUser, removeUser } from '../../reducers/reducers/userSlice';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import Loader from '../Loader/Loader';
import ColorToggleButton from '../ToggleBtn/ToggleBtn';
import icon from '../../../public/icons.png';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import { auth } from '@/firebase';
import { IState, RootState } from '@/interfaces/interfaces';
import { enLanguage, ruLanguage } from '@/languages/languages';
import { changeLanguage } from '@/reducers/actions/actions';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { getPageRoute } from '@/methods/graphql/urlConverter';

interface HeaderProps {
  isScrolled: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  const dispatch = useDispatch();
  const dispatchMain = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const [initialLoading, setInitialLoading] = useState(true);
  const languageData = useSelector((state: IState) => state.main.languageData);
  const [buttonStatus, setButtonStatus] = useState<'login' | 'signup' | 'else'>('else');
  const pathname = usePathname();

  useEffect(() => {
    const correntRouteIsLogin = getPageRoute(window.location.href);
    if (correntRouteIsLogin === '/login') {
      setButtonStatus('login');
    } else {
      setButtonStatus('signup');
    }
  }, [pathname]);

  useEffect(() => {
    setInitialLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userName = user.email!.split('@')[0];
        const token = await user.getIdToken();

        dispatch(
          setUser({
            userName: userName,
            email: user.email,
            id: user.uid,
            token: token,
          })
        );
      } else {
        dispatch(removeUser());
      }

      setInitialLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const language = localStorage.getItem('language_data');
    if (language !== 'ru') {
      dispatchMain(changeLanguage(enLanguage));
    } else {
      dispatchMain(changeLanguage(ruLanguage));
    }
  }, []);

  const changeToSignUp = async () => {
    setButtonStatus('signup');
  };
  const changeToSignIn = async () => {
    setButtonStatus('login');
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());
      router.push('/');
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <IconButton color="primary" aria-label="logo">
            <Link href="/">
              <Image priority src={icon} alt="Logo" width={40} height={40} />
            </Link>
          </IconButton>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={6}>
            <ColorToggleButton />
            {user.isAuthenticated ? (
              <Button
                variant="outlined"
                size="medium"
                component={Link}
                href="/"
                onClick={handleLogOut}
                className={`${styles.link} ${isScrolled ? styles.linkScrolled : ''}`}
              >
                {languageData.signOut}
              </Button>
            ) : (
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Button
                  variant={buttonStatus === 'login' ? 'contained' : 'outlined'}
                  size="medium"
                  onClick={changeToSignIn}
                  component={Link}
                  href="/login"
                  className={`${styles.link} ${isScrolled ? styles.linkScrolled : ''}`}
                >
                  {languageData.signIn}
                </Button>
                <Button
                  variant={buttonStatus !== 'signup' ? 'outlined' : 'contained'}
                  size="medium"
                  onClick={changeToSignUp}
                  component={Link}
                  href="/signup"
                  className={`${styles.link} ${isScrolled ? styles.linkScrolled : ''}`}
                >
                  {languageData.signUp}
                </Button>
              </Stack>
            )}
          </Stack>
        </Stack>
      </div>
    </header>
  );
};
