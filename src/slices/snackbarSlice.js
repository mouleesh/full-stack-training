import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    message: '',
    type: 'info', // can be 'success', 'error', 'warning', or 'info'
}

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        showSnackbar: (state, action) => {
            state.open = true;
            state.message = action.payload.message || '';
            state.type = action.payload.type || 'info';
        },
         closeSnackbar: (state) => {
            state.open = false;
            state.message = '';
            state.type = 'info'; 
        },
    }
})

export const { showSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;