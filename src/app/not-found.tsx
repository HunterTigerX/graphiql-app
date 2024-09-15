import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="main">
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
        <Box>
          <Typography variant="h1" component="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {"Oops! The page you're looking for doesn't exist."}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {" It looks like the page you're trying to reach is no longer available, or the URL is incorrect."}
          </Typography>
          <Button component={Link} href="/" variant="contained" color="primary" sx={{ mt: 3 }}>
            {'Go to Home Page'}
          </Button>
        </Box>
      </Container>
    </main>
  );
}
