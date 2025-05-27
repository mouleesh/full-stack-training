import { AddCircle, Delete, Edit, Visibility } from '@mui/icons-material';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import ListTopicModal from './ListTopicModal';
import "./subject.css";
import CreateSubjectModal from './CreateSubjectModal';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { API_URL } from '../../../constant';
import { DataGrid } from '@mui/x-data-grid';

function List() {
    const theme = useTheme();
    
    const [subjects, setSubjects] = React.useState([]);
    const [createSubjectModalOpen, setCreateSubjectModalOpen] = React.useState(false);
    const [isTopicModalOpen, setIsTopicModalOpen] = React.useState(false);
    const [selectedSubject, setSelectedSubject] = React.useState(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = React.useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/subjects`).then((response) => {
            setSubjects(response.data);
        }).catch((error) => {
            console.error("Error fetching subjects:", error);
        });
    }, [])

    //Make an API call to create or edit subject then update the subjects state
    const handleCreateOrEditSubject = (subject) => {
        if (subject._id) {
            axios.put(`${API_URL}/subjects/${subject._id}`, subject).then((response) => {
                
                setSubjects([...subjects.map((sub) => (sub._id === subject._id ? response.data.data : sub))]);
                setCreateSubjectModalOpen(false);
                setSelectedSubject(null);
            }).catch((error) => {
                console.error("Error updating subject:", error);
            });
        } else {
            axios.post(`${API_URL}/subjects`, subject).then((response) => {
                setSubjects([...subjects, response.data.data]);
                setCreateSubjectModalOpen(false);
                setSelectedSubject(null);

            }).catch((error) => {
                console.error("Error creating subject:", error);
            });
        }
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/subjects/${id}`).then(() => {
            setSubjects(subjects.filter((subject) => subject._id !== id));
            setDeleteConfirmationOpen(false);
        }).catch((error) => {
            console.error("Error deleting subject:", error);
        });
    }

     const columns = [
        { field: 'sno', headerName: 'S No.', flex: 1, renderCell: (params) => {
            return params.api.getRowIndexRelativeToVisibleRows(params.id) + 1
        } },
        { field: 'name', headerName: 'Subject Name', flex: 3 },
        { field: 'topics', headerName: '# of Topics', flex: 1, valueGetter: (params) => params.length || 0 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 2,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: "flex" }}>
                    <IconButton onClick={() => { setSelectedSubject(params.row); setIsTopicModalOpen(true); }}>
                        <Visibility color='primary' />
                    </IconButton>
                    <IconButton onClick={() => { setSelectedSubject(params.row); setCreateSubjectModalOpen(true); }}>
                        <Edit color='primary' />
                    </IconButton>
                    <IconButton onClick={() => { setSelectedSubject(params.row); setDeleteConfirmationOpen(true); }}>
                        <Delete color='error' />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <>
            <ListTopicModal 
                isTopicModalOpen={isTopicModalOpen} 
                handleClose={() => {setIsTopicModalOpen(false); setSelectedSubject(null);}}
                selectedSubject={selectedSubject}/>

            <CreateSubjectModal
                open={createSubjectModalOpen}
                handleClose={() => {setCreateSubjectModalOpen(false); setSelectedSubject(null);}}
                selectedSubject={selectedSubject}
                onSave={handleCreateOrEditSubject}
            />

            <DeleteConfirmationDialog 
                open={deleteConfirmationOpen}
                onClose={() => {
                    setDeleteConfirmationOpen(false);
                    setSelectedSubject(null);
                }}
                onConfirm={() => {
                    handleDelete(selectedSubject._id);
                }}
                subjectName={selectedSubject ? selectedSubject.name : ""}
            />

            <Box sx={{p: 2, width: "90%", margin: "0 auto"}}>
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                    <Typography variant='h5' sx={{fontWeight: "bold"}}>Subjects</Typography>
                    <Button onClick={() => setCreateSubjectModalOpen(true)} variant='contained' startIcon={<AddCircle />}>Create Subject</Button>
                </div>
                <div style={{ width: "100%" }}>
                    <DataGrid
                        rows={subjects}
                        columns={columns}
                        getRowId={(row) => row._id}
                        pageSize={10}
                        rowsPerPageOptions={[10, 20, 50]}
                        disableSelectionOnClick
                        sx={{
                            bgcolor: theme.palette.background.paper,
                            borderRadius: 2,
                        }}
                    />
                </div>
            </Box>
        </>          
    )
}

export default List;

function DeleteConfirmationDialog({ open, onClose, onConfirm, subjectName }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Subject</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete the subject <b>"{subjectName}"</b>? Deleting a subject will also remove all the topics under it. This action is irrevocable.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="error" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}