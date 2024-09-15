import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Stack } from '@mui/material';
import { ILanguage } from '@/interfaces/interfaces';

interface HeadersManagerProps {
  headers: {
    [key: string]: string;
  }[];
  setHeaders: React.Dispatch<
    React.SetStateAction<
      {
        [key: string]: string;
      }[]
    >
  >;
  languageData: ILanguage;
}

export default function HeadersManager({ headers, setHeaders, languageData }: HeadersManagerProps) {
  const [headerKey, setHeaderKey] = useState<string>('');
  const [headerValue, setHeaderValue] = useState<string>('');
  const [isEditHeader, setEditHeader] = useState<boolean>(false);
  const [editKey, setEditKey] = useState<string | null>(null);
  const [initialEditKey, setInitialEditKey] = useState<string | null>(null);

  const addHeader = () => {
    if (headerKey && headerValue) {
      setHeaders((prevHeaders) => [...prevHeaders, { key: headerKey, value: headerValue }]);
      setHeaderKey('');
      setHeaderValue('');
    }
  };

  const deleteHeader = (key: string) => {
    setHeaders((prevHeaders) => prevHeaders.filter((header) => header.key !== key));
  };

  const editHeader = (key: string) => {
    const headerToEdit = headers.find((header) => header.key === key);
    if (headerToEdit) {
      setHeaderKey(headerToEdit.key);
      setHeaderValue(headerToEdit.value);
      setInitialEditKey(key);
      setEditKey(key);
      setEditHeader(true);
    }
  };

  const saveHeader = () => {
    if (editKey && headerValue && initialEditKey) {
      setHeaders((prevHeaders) =>
        prevHeaders.map((header) => (header.key === initialEditKey ? { key: headerKey, value: headerValue } : header))
      );
      setHeaderKey('');
      setHeaderValue('');
      setEditKey(null);
      setInitialEditKey(null);
      setEditHeader(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '15px' }}>
      <Typography variant="h6" component="h3" fontWeight={600}>
        {languageData.headersHeader}:
      </Typography>
      <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
        <TextField
          label={languageData.headerKey}
          variant="standard"
          value={headerKey}
          onChange={(e) => setHeaderKey(e.target.value)}
        />
        <TextField
          label={languageData.headerValue}
          variant="standard"
          value={headerValue}
          onChange={(e) => setHeaderValue(e.target.value)}
        />
        <Button variant="outlined" size="small" onClick={addHeader}>
          {languageData.addHeader ? languageData.addHeader.toUpperCase() : languageData.addHeader}
        </Button>
        {isEditHeader && (
          <Button variant="outlined" size="small" onClick={saveHeader}>
            Save
          </Button>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {headers.map(({ key, value }) => (
          <Typography
            variant="h6"
            component="div"
            key={key}
            sx={{ display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Box sx={{ overflowX: 'auto', display: 'flex', gap: '5px' }}>
              <Typography variant="body2" sx={{ flexShrink: 0 }}>
                {key}:
              </Typography>
              <Typography variant="body2" sx={{ flexGrow: 1, maxWidth: '1300px' }}>
                {value}
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" size="small" onClick={() => editHeader(key)}>
                {languageData.edit}
              </Button>
              <Button variant="outlined" size="small" onClick={() => deleteHeader(key)}>
                {languageData.delete}
              </Button>
            </Stack>
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
