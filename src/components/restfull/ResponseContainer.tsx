import React from 'react';
import { Box, Typography } from '@mui/material';
import { ILanguage } from '@/interfaces/interfaces';

interface ResponseContainerProps {
  status: number | undefined;
  responseBody: string;
  languageData: ILanguage;
}

export default function ResponseContainer({ status, responseBody, languageData }: ResponseContainerProps) {
  return (
    <Box sx={{ width: '100%' }} className="response-container">
      <Typography variant="h6" component="h3" fontWeight={600}>
        {languageData.status}: <em>{status}</em>
      </Typography>
      <Typography variant="h6" component="h3" fontWeight={600}>
        {languageData.bodyJson}:
      </Typography>
      <Box
        sx={{
          maxHeight: '200px',
          minHeight: '150px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
        }}
      >
        <Typography variant="body1" component="pre">
          {responseBody}
        </Typography>
      </Box>
    </Box>
  );
}
