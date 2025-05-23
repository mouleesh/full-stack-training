import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { Home, QuestionAnswer, Subject } from '@mui/icons-material';
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
                <ListItem className={'side-menu-option'} disablePadding sx={location.pathname === "/admin/home" ? selectedMenuStyles : {}}>
                    <ListItemButton onClick={() => {navigate('home')}}>
                        <ListItemIcon>
                            <Home sx={{color: location.pathname === "/admin/home" ? "white" : ""}}/>
                        </ListItemIcon>
                        <ListItemText primary="Home" />
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
                
            </List>
            </nav>
        </Box>
    )
}

export default SideBar