import { useEffect, useState, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete, AddCircle } from '@mui/icons-material';
import axios from 'axios';
import {
    Box,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    useTheme,
    Stack,
    Switch,
} from '@mui/material';
import { API_URL } from '../../../constant';
import CreateUserModal from "./CreateUserModal";
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../slices/snackbarSlice';

export default function List() {
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, user: null });
    const theme = useTheme();

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/users`);
            setUsers(res.data);
        } catch (e) {
            dispatch(showSnackbar({
                message: "Failed to fetch users",
                type: "error"
            }))
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleAdd = () => {
        setEditingUser(null);
        setModalOpen(true);
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setModalOpen(true);
    };

    const handleDelete = (user) => {
        setDeleteDialog({ open: true, user });
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`${API_URL}/users/${deleteDialog.user._id}`);
            dispatch(showSnackbar({
                message: "User deleted",
                type: "success"
            }))
            
            fetchUsers();
        } catch {
            dispatch(showSnackbar({
                message: "Failed to delete user",
                type: "error"
            }))
        }
        setDeleteDialog({ open: false, user: null });
    };

    const handleModalSubmit = async (user) => {
        try {
            if (editingUser) {
                await axios.patch(`${API_URL}/users/${editingUser._id}`, user);
                dispatch(showSnackbar({
                    message: "User updated",
                    type: "success"
                }))
            } else {
                await axios.post(`${API_URL}/users`, user);
                dispatch(showSnackbar({
                    message: "User created",
                    type: "success"
                }))
            }
            setModalOpen(false);
            fetchUsers();
        } catch {
            dispatch(showSnackbar({
                message: "Failed to save user",
                type: "error"
            }));

        }
    };

    const handleStatusToggle = async (user) => {
        try {
            await axios.patch(`${API_URL}/users/${user._id}`, {
                status: user.status === 'active' ? 'inactive' : 'active',
            });
            dispatch(showSnackbar({
                message: "User status updated",
                type: "success"
            }));
            fetchUsers();
        } catch {
            dispatch(showSnackbar({
                message: "Failed to update user status",
                type: "error"
            }));
            console.error("Failed to update user status", error);
        }
    };

    const columns = [
        { field: 'sno', headerName: 'S No.', width: 80, renderCell: (params) => {
            return params.api.getRowIndexRelativeToVisibleRows(params.id) + 1
        }},
        { field: 'name', headerName: 'Name', flex: 1, minWidth: 120 },
        { field: 'email', headerName: 'Email', flex: 1, minWidth: 180 },
        { field: 'role', headerName: 'Role', width: 120 },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => (
                <Switch
                    checked={params.value === 'active'}
                    color="primary"
                    onChange={() => handleStatusToggle(params.row)}
                    inputProps={{ 'aria-label': 'toggle status' }}
                />
            ),
            sortable: false,
            filterable: false,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <IconButton
                        aria-label="edit"
                        color="primary"
                        onClick={() => handleEdit(params.row)}
                        size="small"
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => handleDelete(params.row)}
                        size="small"
                    >
                        <Delete />
                    </IconButton>
                </Stack>
            ),
            sortable: false,
            filterable: false,
        },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                }}
            >
                <Typography variant='h5' sx={{fontWeight: "bold"}}>Manage Users</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddCircle />}
                    onClick={handleAdd}
                    sx={{
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                    }}
                >
                    Create User
                </Button>
            </Box>
            <DataGrid
                rows={users}
                columns={columns}
                loading={loading}
                getRowId={(row) => {
                    return row._id
                }}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 50]}
                disableSelectionOnClick
                sx={{
                    bgcolor: theme.palette.background.paper,
                    borderRadius: 2,
                }}
            />
            <CreateUserModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleModalSubmit}
                initialData={editingUser}
            />
            <DeleteConfirmationDialog
                open={deleteDialog.open}
                user={deleteDialog.user}
                onClose={() => setDeleteDialog({ open: false, user: null })}
                onConfirm={confirmDelete} />
        </Box>
    );
}

function DeleteConfirmationDialog({ open, user, onClose, onConfirm }) {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to delete user{' '}
                    <b>{user?.name}</b>?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}