import { useEffect, useState, useTransition } from 'react'
import { Box, Button, CircularProgress, IconButton, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography, useTheme } from '@mui/material'
import CreateModal from './CreateModal';
import AnswerModal from './AnswerModal';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionsInStore } from '../../slices/questionSlice';
import { API_URL } from '../../../constant';
import { AddCircle, Delete, Edit, Visibility } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';


function List() {
    const [isPending, startTransition] = useTransition()
    const dispatch = useDispatch();
    const theme = useTheme();

    const [subjects, setSubjects] = useState([]);

    // const [questions, setQuestions] = useState([]); //We are not using this state as we are using redux store to manage the questions.
    const [loading, setLoading] = useState(true);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const [createQuestionModal, setCreateQuestionModal] = useState(false);
    const [answerModal, setAnswerModal] = useState(false);

    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
    
    const questionsFromStore = useSelector((store) => store.questions.questions);

    useEffect(() => {
        // Fetch questions from the API and set them in the state
        axios.get(`${API_URL}/questions`)
        .then((response) => {
            // setQuestions(response.data);
            dispatch(setQuestionsInStore(response.data)); // This is where we set the questions in the redux store

            startTransition(() => {
                setLoading(false);
            });

        }).catch((error) => {
            console.error("Error fetching questions:", error);
            setLoading(false);
        });

        // Fetch subjects from the API and set them in the state
        axios.get(`${API_URL}/subjects`).then((response) => {
            setSubjects(response.data);
        }).catch((error) => {
            console.error("Error fetching subjects:", error);
        })
    }, []); //This runs after mounting of component.

    const handleClose = () => {
        setCreateQuestionModal(false);
        setSelectedQuestion(null);
    }

    const handleDelete = () => {
        axios.delete(`${API_URL}/questions/${selectedQuestion._id}`).then(() => {
            // Remove the deleted question from the redux store
            dispatch(setQuestionsInStore(questionsFromStore.filter((question) => question._id !== selectedQuestion._id)));
            setOpenDeleteConfirmation(false);
            setSelectedQuestion(null);
        }).catch((error) => {
            console.error("Error deleting question:", error);
        });
    }

    const columns = [
        { field: 'sno', headerName: 'S No.', flex: 1, renderCell: (params) => {
            return params.api.getRowIndexRelativeToVisibleRows(params.id) + 1
        }},
        { field: 'subject', headerName: 'Subject',flex: 2, valueGetter: (params) => params.name },
        { field: 'title', headerName: 'Title', flex: 3 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 2,
            sortable: false,
            renderCell: (params) => (
            <>
                <IconButton onClick={() => { setAnswerModal(true); setSelectedQuestion(params.row); }}>
                <Visibility color="primary" />
                </IconButton>
                <IconButton onClick={() => { setCreateQuestionModal(true); setSelectedQuestion(params.row); }}>
                <Edit color="primary" />
                </IconButton>
                <IconButton onClick={() => { setOpenDeleteConfirmation(true); setSelectedQuestion(params.row); }}>
                <Delete color="error" />
                </IconButton>
            </>
            ),
        },
    ];

    return (
        <>
            <Box sx={{p: 2, width: "100%", margin: "0 auto"}}>
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                    <Typography variant='h5' sx={{fontWeight: "bold"}}>Interview Questions</Typography>
                    <Button onClick={() => setCreateQuestionModal(true)} variant='contained' startIcon={<AddCircle />}>Create Question</Button>
                </div>
                
                {loading === true  ? 
                <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                    <CircularProgress />
                </div> 
                : (
                    <div style={{ width: '100%' }}>
                        <DataGrid
                            rows={questionsFromStore}
                            columns={columns}
                            pageSize={10}
                            getRowId={(row) => row._id}
                            rowsPerPageOptions={[10, 20, 50]}
                            disableSelectionOnClick
                            sx={{
                                bgcolor: theme.palette.background.paper,
                                borderRadius: 2,
                            }}
                        />
                    </div>)}
                
            </Box>
            <CreateModal 
                open={createQuestionModal} 
                handleClose={handleClose}
                subjects={subjects}
                questionsFromStore={questionsFromStore}
                selectedQuestion={selectedQuestion}/>
            <AnswerModal 
                open={answerModal} 
                handleClose={() => {setAnswerModal(false);setSelectedQuestion(null);}} 
                selectedQuestion={selectedQuestion}/>
            <DeleteConfirmationDialog
                open={openDeleteConfirmation}
                onClose={() => {setOpenDeleteConfirmation(false); setSelectedQuestion(null);}} 
                onConfirm={handleDelete}
                questionName={selectedQuestion ? selectedQuestion.question : ""}/>
        </>
    )
}

export default List


function DeleteConfirmationDialog({ open, onClose, onConfirm, questionName }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Question</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete the question <b>"{questionName}"</b>? This action is irrevocable.
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