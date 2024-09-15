import { Avatar, Card, CardContent, Typography, Box, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
type TeamMemberProps = {
  name: string;
  role: string;
  description: string;
  imageSrc: string;
  githubLink: string;
};

const TeamMemberCard = ({ name, role, description, imageSrc, githubLink }: TeamMemberProps) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
        <Avatar src={imageSrc} alt={name} sx={{ width: 80, height: 80, margin: '0 auto', mb: 2 }} />
        <Typography variant="h6" component="div" gutterBottom>
          {name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {role}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Link href={githubLink} target="_blank" rel="noopener" sx={{ textDecoration: 'none' }}>
          <IconButton>
            <GitHubIcon />
          </IconButton>
          <Typography variant="body2" color="text.primary">
            GitHub
          </Typography>
        </Link>
      </Box>
    </Card>
  );
};

export default TeamMemberCard;
