import React from 'react';
import { Typography, TextField } from '@mui/material';
import { ILanguage } from '@/interfaces/interfaces';

interface RequestBodyEditorProps {
  requestBody: string;
  onChangeRequestBody: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  updateUrl: () => void;
  languageData: ILanguage;
}

export default function RequestBodyEditor({
  requestBody,
  onChangeRequestBody,
  updateUrl,
  languageData,
}: RequestBodyEditorProps) {
  return (
    <div className="body-container">
      <Typography variant="h6" component="h3" fontWeight={600}>
        {languageData.json}
      </Typography>
      <TextField
        value={requestBody}
        onChange={onChangeRequestBody}
        onBlur={updateUrl}
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        sx={{ resize: 'none' }}
      />
    </div>
  );
}
