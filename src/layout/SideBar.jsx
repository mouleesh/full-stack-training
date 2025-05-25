import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { Dashboard, Group, MarkUnreadChatAlt, QuestionAnswer, Subject } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import "./sideBar.css";


function SideBar() {
    const navigate = useNavigate();
    const theme = useTheme();

    const selectedMenuStyles = {
        backgroundColor: theme.palette.primary.main,
        color: "white"
    }

    return (
        <Box position={"fixed"} component="nav" sx={{ width: 240, flexShrink: 0, backgroundColor: "lightgray", height: "100vh"}}>
            <nav>
            <List>
                <ListItem className={'side-menu-option'} disablePadding sx={location.pathname === "/admin/dashboard" ? selectedMenuStyles : {}}>
                    <ListItemButton onClick={() => {navigate('dashboard')}}>
                        <ListItemIcon>
                            <Dashboard sx={{color: location.pathname === "/admin/dashboard" ? "white" : ""}}/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={location.pathname === "/admin/interview-questions" ? selectedMenuStyles : {}}>
                    <ListItemButton onClick={() => {navigate('interview-questions')}}>
                        <ListItemIcon>
                            <QuestionAnswer sx={{color: location.pathname === "admin/interview-questions" ? "white" : ""}}/>
                        </ListItemIcon>
                        <ListItemText primary="Interview Questions" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={location.pathname === "/admin/subjects" ? selectedMenuStyles : {}}>
                    <ListItemButton onClick={() => {navigate('subjects')}}>
                        <ListItemIcon>
                            <Subject sx={{color: location.pathname === "/admin/subjects" ? "white" : ""}}/>
                        </ListItemIcon>
                        <ListItemText primary="Subjects & Topics" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={location.pathname === "/admin/users" ? selectedMenuStyles : {}}>
                    <ListItemButton onClick={() => {navigate('users')}}>
                        <ListItemIcon>
                            <Group sx={{color: location.pathname === "/admin/users" ? "white" : ""}}/>
                        </ListItemIcon>
                        <ListItemText primary="Manage Users" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={location.pathname === "/admin/contact-form" ? selectedMenuStyles : {}}>
                    <ListItemButton onClick={() => {navigate('contact-form')}}>
                        <ListItemIcon>
                            <MarkUnreadChatAlt sx={{color: location.pathname === "/admin/contact-form" ? "white" : ""}}/>
                        </ListItemIcon>
                        <ListItemText primary="Contact Form" />
                    </ListItemButton>
                </ListItem>
                
            </List>
            </nav>
        </Box>
    )
}

export default SideBar