'use client';
import styles from './Form.module.css';
import { FC, useState } from 'react';
import { isValidEmail, isValidPassword } from '@/utils/validation';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IState } from '@/interfaces/interfaces';
import { useSelector } from 'react-redux';

type FormProps = {
  title: string;
  handleClick: (email: string, password: string) => void;
};

export const Form: FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const languageData = useSelector((state: IState) => state.main.languageData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;

    if (!isValidEmail(email)) {
      setEmailError(languageData.invalidEmail);
      valid = false;
    } else {
      setEmailError('');
    }

    if (!isValidPassword(password)) {
      setPasswordError(languageData.invalidPassword);
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    handleClick(email, password);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        id="email"
        label={languageData.email}
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        id="password"
        label={languageData.password}
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!passwordError}
        helperText={passwordError}
      />
      <Button type="submit" variant="contained" size="large">
        {title}
      </Button>
    </form>
  );
};
