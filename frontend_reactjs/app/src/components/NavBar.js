import React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useMediaQuery, useTheme } from '@mui/material';

const NavBar = () => {
  const [state, setState] = React.useState({ left: false });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event.key === 'Tab') || (event.key === 'Shift'))
    ) {
      return;
    }
    setState({ left: open });
  };

  const list = () => (
    <Box
      sx={{ width: isMobile ? 150 : 250 }} // Adjust drawer width based on screen size
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className={`flex items-center justify-between p-4 ${isMobile ? 'w-full' : 'w-3/4'} mx-auto`}>
      <div className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-4'}`}>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon className='text-black' />
        </Button>
        <span className={`text-xl font-bold text-black ${isMobile ? 'text-lg' : ''}`}>
          ThriftAll Around
        </span>
      </div>
      <div className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-4'}`}>
        <Button className='flex items-center' size={isMobile ? 'small' : 'medium'}>
          <AccountCircleIcon className='text-black' />
          <span className={`ml-1 text-black ${isMobile ? 'text-sm' : ''}`}>Sign In</span>
        </Button>
        {!isMobile && (
          <Button className='flex items-center' size={isMobile ? 'small' : 'medium'}>
            <SearchIcon className='text-black' />
            <span className={`ml-1 text-black ${isMobile ? 'text-sm' : ''}`}>Search</span>
          </Button>
        )}
      </div>
      <SwipeableDrawer
        anchor='left'
        open={state.left}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
};

export default NavBar;
