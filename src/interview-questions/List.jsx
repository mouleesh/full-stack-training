import { useEffect, useState, useTransition } from 'react'
import { Box, Button, CircularProgress, IconButton, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography } from '@mui/material'
import CreateModal from './CreateModal';
import AnswerModal from './AnswerModal';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionsInStore } from '../slices/questionSlice';
import { API_URL } from '../../constant';
import { AddCircle, Visibility } from '@mui/icons-material';

function List() {
    const [isPending, startTransition] = useTransition()
    const dispatch = useDispatch();

    const [subjects, setSubjects] = useState([]);

    const [questions, setQuestions] = useState([]); //We are not using this state as we are using redux store to manage the questions.
    const [loading, setLoading] = useState(true);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const [createQuestionModal, setCreateQuestionModal] = useState(false);
    const [answerModal, setAnswerModal] = useState(false);
    
    const questionsFromStore = useSelector((store) => store.questions.questions);

    useEffect(() => {
        // Fetch questions from the API and set them in the state
        axios.get(`${API_URL}/questions`)
        .then((response) => {
            setQuestions(response.data);
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
    }

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
                : 
                <Table>
                    <TableHead>
                        <TableRow sx={{backgroundColor: "gainsboro"}}>
                            <TableCell sx={{ fontWeight: "bold" }}>S No.</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Subject</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Questions</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questionsFromStore.map((question, index) => (
                            <TableRow key={question._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{question?.subject?.name}</TableCell>
                                <TableCell>{question.question}</TableCell>
                                <TableCell>
                                    <IconButton>
                                        <Visibility onClick={() => {
                                            setAnswerModal(true); 
                                            setSelectedQuestion(question)
                                        }}  />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>}
                
            </Box>
            <CreateModal 
                open={createQuestionModal} 
                handleClose={handleClose}
                subjects={subjects}
                questionsFromStore={questionsFromStore}/>
            <AnswerModal 
                open={answerModal} 
                handleClose={() => {setAnswerModal(false);setSelectedQuestion(null);}} 
                selectedQuestion={selectedQuestion}/>
        </>
    )
}

export default List