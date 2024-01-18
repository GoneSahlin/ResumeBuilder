import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MediaCard from '@/components/MediaCard';
import { Container } from '@mui/material';

export default function HomePage() {
  return (
    <Box sx={{ display: 'flex' }}>
      <div>
        <Container>
          <Typography gutterBottom variant="h2" component="div">
            Resume Builder
          </Typography>
          <Typography gutterBottom variant="h4" component="div">
            Build and manage multiple resumes easily.
          </Typography>

          
          <Typography gutterBottom component="div">
            Fill out information on cv page, and then select components to add to resume on resume page.
          </Typography>
          
        </Container>
      </div>      
    </Box>
  );
}
