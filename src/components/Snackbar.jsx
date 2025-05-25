import React from 'react';
import SnackbarNative from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { closeSnackbar } from '../slices/snackbarSlice';

// Alert wrapper for MUI Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snackbar = () => {
    const dispatch = useDispatch();
    // Select snackbar state from redux store
    const { open, message, type } = useSelector((state) => state.snackbar);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        dispatch(closeSnackbar());
    };

    return (
        <SnackbarNative
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert onClose={handleClose} severity={type || 'info'} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </SnackbarNative>
    );
};

export default Snackbar;