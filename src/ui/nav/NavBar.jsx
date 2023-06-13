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
        <div style={{ borderBottom: '1px solid white' }}>
          <Button  component={Link} to="/" color="inherit">
            Grafica
          </Button>
          <Button  component={Link} to="/data" color="inherit">
            Datos
          </Button>
          <Button  component={Link} to="/tasks" color="inherit">
            Tareas
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
