import React from 'react'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';


function Header() {
  return (
    <AppBar position="static">
        <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant='h6'>Full Stack Training</Typography>

            <Button color='inherit' startIcon={<LoginIcon />}> Login</Button>
        </Toolbar>
    </AppBar>
  )
}

export default Header