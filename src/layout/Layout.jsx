import React from 'react'
import { Box, Container } from '@mui/material';
import Header from './Header';
import SideBar from './SideBar';
import { Outlet } from 'react-router';

function Layout() {
  return (<>
    <Header />

    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Side Bar */}
        <SideBar />
        
        {/* Main content */}
        <Box width={"100%"}>
            <Container sx={{ py: 3 }}>
                <Outlet />
            </Container>
        </Box>
    </Box>
  </>)
}

export default Layout