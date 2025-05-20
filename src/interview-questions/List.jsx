import React, { useEffect, useState, useTransition } from 'react'
import { Box, Button, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import CreateModal from './CreateModal';
import AnswerModal from './AnswerModal';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionsInStore } from '../slices/questionSlice';
import { API_URL } from '../../constant';

function List() {
    const [isPending, startTransition] = useTransition()
    const dispatch = useDispatch();

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const [createQuestionModal, setCreateQuestionModal] = useState(false);
    const [answerModal, setAnswerModal] = useState(false);
    
    const questionsFromStore = useSelector((store) => store.questions.questions);

    useEffect(() => {
        axios.get(`${API_URL}/questions`)
        .then((response) => {
            setQuestions(response.data); // This is where we set the questions in the state
            dispatch(setQuestionsInStore(response.data)); // This is where we set the questions in the redux store

            startTransition(() => {
                setLoading(false);
            });

        }).catch((error) => {
            console.error("Error fetching questions:", error);
            setLoading(false);
        });
    }, []); //This runs after mounting of component.

    const handleClose = () => {
        setCreateQuestionModal(false);
    }

    return (
        <>
            <Box sx={{p: 2, width: "100%", margin: "0 auto"}}>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button onClick={() => setCreateQuestionModal(true)} variant='contained'>Create Question</Button>
                </div>
                
                {loading === true 
                ? 
                <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                    <CircularProgress />
                </div> 
                : 
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S No.</TableCell>
                            <TableCell>Questions</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questionsFromStore.map((question, index) => (
                            <TableRow key={question._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{question.question}</TableCell>
                                <TableCell>
                                    <Button 
                                        onClick={() => {
                                            setAnswerModal(true); 
                                            setSelectedQuestion(question)
                                        }} 
                                        variant='contained'
                                    >
                                        View Answers
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>}
                
            </Box>
            <CreateModal open={createQuestionModal} handleClose={handleClose}/>
            <AnswerModal 
                open={answerModal} 
                handleClose={() => {setAnswerModal(false);setSelectedQuestion(null);}} 
                selectedQuestion={selectedQuestion}/>
        </>
    )
}

export default List