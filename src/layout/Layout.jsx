import React from 'react'
import { Box, Container } from '@mui/material';
import Header from './Header';
import SideBar from './SideBar';
import { Outlet } from 'react-router';

function Layout() {
  return (<Box sx={{ flexGrow: 1 }}>
    <Header />

    <Box sx={{ display: 'flex', mt: "60px", minHeight: 'calc(100vh - 60px)', direction: 'column' }}>
        {/* Side Bar */}
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <SideBar />
            
            {/* Main content */}
            <Box sx={{ ml: "240px", width: "100%" }}>
                <Container sx={{ py: 3 }}>
                    <Outlet />
                </Container>
            </Box>
        </Box>
        <Box sx={{ backgroundColor: "grey", height: "40px", width: "100%", position: "fixed", bottom: 0 }}>
            <p style={{ color: "white", textAlign: "center", marginTop: "10px" }}>© 2025 Full Stack Training</p>
        </Box>
        
    </Box>
  </Box>)
}

export default Layout