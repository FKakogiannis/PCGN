import React from 'react';
import { Typography } from '@mui/material';

function Footer() {
    const year = new Date().getFullYear();
    return (
        <Typography variant="body2" align="center">
        © {year} Wodanaz Cultural Association. All rights reserved.
        </Typography>
  );
}

export default Footer;
