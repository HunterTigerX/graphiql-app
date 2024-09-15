import React from 'react';
import { TextField, Button } from '@mui/material';
import { ILanguage } from '@/interfaces/interfaces';

interface UrlInputProps {
  urlToSend: string;
  onChangeEndpointHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  languageData: ILanguage;
}

export default function UrlInput({ urlToSend, onChangeEndpointHandler, languageData }: UrlInputProps) {
  return (
    <>
      <TextField
        id="text"
        value={urlToSend}
        placeholder={languageData.enterUrl}
        variant="outlined"
        size="small"
        onChange={onChangeEndpointHandler}
        sx={{ flex: 1 }}
      />
      <Button type="submit" variant="outlined" size="small">
        {languageData.send}
      </Button>
    </>
  );
}
