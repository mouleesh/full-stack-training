import React, { useEffect } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Home, QuestionAnswer } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const selectedMenuStyles = {
    backgroundColor: "#5a8d03",
    color: "white"
}

function SideBar() {
    const navigate = useNavigate();

    return (
        <Box component="nav" sx={{ width: 240, flexShrink: 0, backgroundColor: "lightgray" }}>
            <nav>
            <List>
                <ListItem disablePadding sx={location.pathname === "/home" ? selectedMenuStyles : {}}>
                    <ListItemButton onClick={() => {navigate('/home')}}>
                        <ListItemIcon>
                            <Home sx={{color: location.pathname === "/home" ? "white" : ""}}/>
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={location.pathname === "/interview-questions" ? selectedMenuStyles : {}}>
                    <ListItemButton onClick={() => {navigate('/interview-questions')}}>
                        <ListItemIcon>
                            <QuestionAnswer sx={{color: location.pathname === "/interview-questions" ? "white" : ""}}/>
                        </ListItemIcon>
                        <ListItemText primary="Interview Questions" />
                    </ListItemButton>
                </ListItem>
                
            </List>
            </nav>
        </Box>
    )
}

export default SideBar