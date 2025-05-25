import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { API_URL } from '../../constant';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../slices/snackbarSlice';

const Login = () => {
    const dispatch = useDispatch();

    const [values, setValues] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        axios.post(`${API_URL}/login`, values)
        .then((response) => {
            if (response.status === 200) {
                console.log('Login successful:', response.data);
                dispatch(showSnackbar({
                    message: 'Login successful!',
                    type: 'success',
                }));
            }
            
            setLoading(false);
        }).catch((error) => {
            if (error.response) {
                setError('Invalid username or password');
            } else {
                setError('An error occurred. Please try again later.');
            }
            setLoading(false);
        });
    };

    return (<>
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f5f5f5"
        >
            <Paper elevation={3} sx={{ p: 4, minWidth: 320 }}>
                <Typography variant="h5" mb={2} align="center">
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        name="username"
                        type="text"
                        value={values.username}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    {error && (
                        <Typography color="error" variant="body2" mt={1}>
                            {error}
                        </Typography>
                    )}
                    <Box mt={2} display="flex" justifyContent="center">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            fullWidth
                        >
                            {loading ? <CircularProgress size={24} /> : 'Login'}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    </>
    );
};

export default Login;