import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { API_URL } from '../../../constant';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../slices/snackbarSlice';


const List = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/contact-form`);   
                    
            setContacts(res.data);
        } catch (err) {
            console.error("Error fetching contacts:", err);
            dispatch(showSnackbar({
                message: "Failed to fetch contacts",
                type: "error" 
            }))
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleResolve = async (id) => {
        setUpdatingId(id);
        try {
            await axios.patch(`${API_URL}/contact-form/${id}`, { status: 'resolved' });
            setContacts((prev) =>
                prev.map((item) =>
                    item._id === id
                        ? { ...item, status: 'resolved' }
                        : item
                )
            );
            dispatch(showSnackbar({
                message: "Contact status updated successfully",
                type: "success"
            }));
        } catch (err) {
            console.error("Error updating contact status:", err);
            dispatch(showSnackbar({
                message: "Failed to update contact status",
                type: "error"
            }));
        }
        setUpdatingId(null);
    };

    const columns = [
        { field: 'sno', headerName: 'S No.', width: 80, renderCell: (params) => {
            return params.api.getRowIndexRelativeToVisibleRows(params.id) + 1
        }},
        { field: 'name', headerName: 'Name', flex: 2, },
        { field: 'mobile', headerName: 'Mobile', flex: 2, },
        { field: 'email', headerName: 'Email', flex: 2, },
        { field: 'message', headerName: 'Message', flex: 2, },
        {
            field: 'createdAt',
            headerName: 'Created At',
            flex: 2,
            valueGetter: (params) => params ? new Date(params).toLocaleString() : '',
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: (params) => (
                <span
                    style={{
                        color: params.value === 'resolved' ? 'green' : 'orange',
                        fontWeight: 600,
                    }}
                >
                    {params.value}
                </span>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 2,
            renderCell: (params) =>
                params.row.status !== 'resolved' ? (
                    <Button
                        variant="contained"
                        color="success"
                        size="small"
                        disabled={updatingId === params.row._id}
                        onClick={() => handleResolve(params.row._id)}
                    >
                        {updatingId === params.row._id ? (
                            <CircularProgress size={18} />
                        ) : (
                            'Mark Resolved'
                        )}
                    </Button>
                ) : null,
            sortable: false,
            filterable: false,
        },
    ];

    return (
        <Box sx={{ width: '100%', p: 2 }}>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                <Typography variant='h5' sx={{fontWeight: "bold"}}>Contact Requests</Typography>
            </div>
            <DataGrid
                rows={contacts}
                columns={columns}
                getRowId={(row) => {
                    return row._id
                }}
                loading={loading}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50]}
                disableSelectionOnClick
                sx={{
                    bgcolor: theme.palette.background.paper,
                    borderRadius: 2,
                }}
            />
        </Box>
    );
};

export default List;