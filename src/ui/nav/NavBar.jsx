import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ alignSelf: 'center', fontWeight: 'bold' }}>
          G-DATA
        </Typography>
        <div>
          <Button color="inherit"  to="/">
            Grafica
          </Button>
          <Button color="inherit"  to="/datos">
            Datos
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;