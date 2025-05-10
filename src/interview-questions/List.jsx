import React, { useEffect, useState } from 'react'
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import CreateModal from './CreateModal';
import AnswerModal from './AnswerModal';
import axios from 'axios';

function List() {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const [createQuestionModal, setCreateQuestionModal] = useState(false);
    const [answerModal, setAnswerModal] = useState(false);

    useEffect(() => {
        
        axios.get('http://localhost:4000/questions')
        .then((response) => {
            setQuestions(response.data);
        });


    }, []) //This runs after mounting of component.

    const handleClose = () => {
        setCreateQuestionModal(false);
    }

    return (
        <>
            <Box sx={{p: 2, width: "100%", margin: "0 auto"}}>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button onClick={() => setCreateQuestionModal(true)} variant='contained'>Create Question</Button>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S No.</TableCell>
                            <TableCell>Questions</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions.map(question => (
                            <TableRow key={question.id}>
                                <TableCell>{question.id}</TableCell>
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
                </Table>
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