import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import React from 'react';

interface MethodSelectProps {
  method: string;
  setMethod: (method: string) => void;
}

export default function MethodSelect({ method, setMethod }: MethodSelectProps) {
  const onChangeMethodHandler = (e: SelectChangeEvent) => {
    setMethod(e.target.value as string);
  };

  return (
    <Select size="small" name="method" id="method" value={method} onChange={onChangeMethodHandler} sx={{ width: 100 }}>
      <MenuItem value="GET">GET</MenuItem>
      <MenuItem value="POST">POST</MenuItem>
      <MenuItem value="PUT">PUT</MenuItem>
      <MenuItem value="DELETE">DELETE</MenuItem>
      <MenuItem value="HEAD">HEAD</MenuItem>
      <MenuItem value="OPTIONS">OPTIONS</MenuItem>
      <MenuItem value="PATCH">PATCH</MenuItem>
    </Select>
  );
}
