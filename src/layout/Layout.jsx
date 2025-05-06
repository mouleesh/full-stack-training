import React from 'react'
import ListInterviewQuestions from '../interview-questions/List';
import { Box, Container } from '@mui/material';
import Header from './Header';
import SideBar from './SideBar';

function Layout() {
  return (<>
    <Header />

    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Side Bar */}
        <SideBar />
        
        {/* Main content */}
        <Box component="main" sx={{ flexGrow: 1 }}>
            <Container maxWidth="lg" sx={{ py: 3 }}>
            <ListInterviewQuestions />
            </Container>
        </Box>
    </Box>
  </>)
}

export default Layout