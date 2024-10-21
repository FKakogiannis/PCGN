import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { signOutUser } from './utils/firebase'; 

import BoardGameIcon from './assets/boardGames.svg?react';
import RpgIcon from './assets/rpgs.svg?react';
import WargameIcon from './assets/wargames.svg?react';

const categories = [
  { name: 'Board Games', icon: <BoardGameIcon style={{ width: '24px', height: '24px' }} /> },
  { name: 'RPGs', icon: <RpgIcon style={{ width: '24px', height: '24px' }} /> },
  { name: 'Wargames', icon: <WargameIcon style={{ width: '24px', height: '24px' }} /> }
];

function ResponsiveAppBar({ onSelectCategory }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      console.log('User signed out');
      window.location.href = "/login"; 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton component="a" href="/" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} color="inherit">
            <AdbIcon />
          </IconButton>

          {/* Category Icons */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center', alignItems: 'center' } }}>
            {categories.map((category) => (
              <Tooltip key={category.name} title={category.name} arrow>
                <IconButton
                  onClick={() => onSelectCategory(category.name.toLowerCase())}
                  sx={{ color: 'white' }}
                >
                  {category.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>

          {/* User Avatar with Sign Out */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Sign out">
              <IconButton onClick={handleSignOut} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
