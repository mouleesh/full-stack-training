import React from 'react';
import { useNavigate } from 'react-router';
import { 
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          p: 4,
          borderRadius: 2,
          border: 'grey 1px solid',
        }}
      >
        <ErrorOutlineIcon 
          color="error" 
          sx={{ fontSize: 80, mb: 2 }} 
        />
        
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          404
        </Typography>
        
        
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Oops! Page not found
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          
         <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate(-1)}
            sx={{ px: 4 }}
          >
            Go Back
          </Button>
          
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate('/')}
            sx={{ px: 4 }}
          >
            Go Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFoundPage;