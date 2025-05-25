import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { Box, CircularProgress, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router';
import { API_URL } from '../../constant';

const Navigation = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const theme = useTheme();

    const {subjectId} = useParams();

    useEffect(() => {
        axios.get(`${API_URL}/subjects`)
            .then((res) => {
                setSubjects(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (subjectId) {
            setSelectedSubject(subjectId);
        }
    }, [subjectId]);

    if (loading) {
        return (
            <Box component="nav" sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box component="nav" sx={{ mt: "60px" }}>
            <List sx={{ display: 'flex', flexDirection: 'row', backgroundColor: theme.palette.tertiary.main, padding: 0}}>
                {subjects.map((subject) => (
                    <ListItem key={subject._id} disablePadding >
                        <ListItemButton
                            component={RouterLink}
                            to={`/subjects/${subject._id}`}
                            onClick={() => setSelectedSubject(subject._id)}
                            sx={{
                                p: 0,
                                textAlign: 'center',

                                // color: "white",
                                bgcolor: selectedSubject === subject._id ? theme.palette.secondary.main : 'transparent',
                                '&:hover': {
                                    bgcolor: theme.palette.secondary.main,
                                },
                            }}
                        >
                            <ListItemText primary={subject.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Navigation;
