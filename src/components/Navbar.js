import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Cloud, AccountCircle, Logout } from '@mui/icons-material';
import { logout } from '../store/user';
import classes from '../assets/css/components/Navbar.module.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/login');
  };

  return (
    <AppBar className={classes.nav__container} position="static">
      <Toolbar>
        <Cloud style={{ marginRight: '0.5em' }} />
        <Typography variant={isMobile ? 'h6' : 'h5'} style={{ flexGrow: 1 }}>
          Weather App
        </Typography>
        {!isMobile && (
          <>
            <AccountCircle style={{ marginRight: '0.5em' }} />
            <Typography variant="body1" style={{ marginRight: '1em' }}>
              {username}
            </Typography>
          </>
        )}
        <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>
          {isMobile ? '' : 'Logout'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
