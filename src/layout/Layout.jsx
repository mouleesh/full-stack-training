import React from 'react'
import { Box, Container } from '@mui/material';
import Header from './Header';
import SideBar from './SideBar';
import { Outlet } from 'react-router';

function Layout() {
  return (<>
    <Header />

    <Box sx={{ display: 'flex', minHeight: '100vh', direction: 'column' }}>
        {/* Side Bar */}
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <SideBar />
            
            {/* Main content */}
            <Box width={"100%"}>
                <Container sx={{ py: 3 }}>
                    <Outlet />
                </Container>
            </Box>
        </Box>
        <Box sx={{ backgroundColor: "grey", height: "40px", width: "100%", position: "fixed", bottom: 0 }}>
            <p style={{ color: "white", textAlign: "center", marginTop: "10px" }}>© 2025 Full Stack Training</p>
        </Box>
        
    </Box>
  </>)
}

export default Layout