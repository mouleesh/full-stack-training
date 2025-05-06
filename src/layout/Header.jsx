import React from 'react'
import { AppBar, Button, IconButton, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';


function Header() {
  return (
    <AppBar position="static">
        <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <Menu />
            </IconButton>

            <Button color='inherit' startIcon={<LoginIcon />}> Login</Button>
        </Toolbar>
    </AppBar>
  )
}

export default Header