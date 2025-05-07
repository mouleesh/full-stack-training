import React, { useEffect, useState } from 'react'
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import CreateModal from './CreateModal';

function List() {
    const [questions, setQuestions] = useState([]);
    const [createQuestionModal, setCreateQuestionModal] = useState(false);

    useEffect(() => {
        setQuestions([
            {
                id: 1,
                text: "What are states and props in React?"
            },
            {
                id: 2,
                text: "What are component lifecycle methods in React?"
            }
        ])
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
                                <TableCell>{question.text}</TableCell>
                                <TableCell>
                                    <Button variant='contained'>View Answers</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <CreateModal open={createQuestionModal} handleClose={handleClose}/>
        </>
    )
}

export default List