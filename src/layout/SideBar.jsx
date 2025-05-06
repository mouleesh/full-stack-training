import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Drafts, Inbox } from '@mui/icons-material';

function SideBar() {
  return (
    <Box component="nav" sx={{ width: 240, flexShrink: 0, backgroundColor: "lightgray" }}>
        <nav>
        <List>
            <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                <Inbox />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
            </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                <Drafts />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
            </ListItemButton>
            </ListItem>
        </List>
        </nav>
    </Box>
  )
}

export default SideBar