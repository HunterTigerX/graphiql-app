'use client';
import Link from 'next/link';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IState } from '@/interfaces/interfaces';
import { useSelector } from 'react-redux';

export default function NoHistory() {
  const languageData = useSelector((state: IState) => state.main.languageData);

  return (
    <>
      <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={4}>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
          <Typography variant="h4" component="p">
            {languageData.noRequests}
          </Typography>
          <Typography variant="h4" component="p">
            {languageData.empty}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Button variant="contained" size="large" component={Link} href="/restfull">
            {languageData.restHeader}
          </Button>
          <Button variant="contained" size="large" component={Link} href="/GRAPHQL">
            {languageData.graphQlHeader}
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
