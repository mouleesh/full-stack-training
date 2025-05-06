import React, { useEffect, useState } from 'react'
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

function List() {
    const [questions, setQuestions] = useState([]);

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

    return (
        <Box sx={{p: 2, width: "70%", margin: "0 auto"}}>
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
    )
}

export default List