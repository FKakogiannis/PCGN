import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { initFirebaseUI, uiConfig } from './utils/firebase';

const LoginPage = () => {
  useEffect(() => {
    const ui = initFirebaseUI();
    
    ui.start('#firebaseui-auth-container', uiConfig);

    return () => {
      ui.reset();  
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login to Your Account
      </Typography>
      
     
      <div id="firebaseui-auth-container"></div>
    </Box>
  );
};

export default LoginPage;
