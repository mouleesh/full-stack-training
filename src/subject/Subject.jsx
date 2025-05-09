import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import TopicModal from './TopicModal';
import "./subject.css";

function Subject() {
    const [subjects, setSubjects] = React.useState([]);
    const [isTopicModalOpen, setIsTopicModalOpen] = React.useState(false);
    const [selectedSubject, setSelectedSubject] = React.useState(null);

    useEffect(() => {
        setSubjects([
            {
                id: 1,
                name: "React JS",
                topics: [
                    {
                        id: 1,
                        name: "Hooks"
                    },
                    {
                        id: 2,
                        name: "State Management"
                    },
                    {
                        id: 3,
                        name: "Component Lifecycle"
                    }
                ]
            },
            {
                id: 2,
                name: "Node JS",
                topics: [
                    {
                        id: 1,
                        name: "Express"
                    },
                    {
                        id: 2,
                        name: "MongoDB"
                    },
                    {
                        id: 3,
                        name: "Mongoose"
                    }
                ]
            },
            {
                id: 3,
                name: "Javascript",
                topics: [
                    {
                        id: 1,
                        name: "Closure"
                    },
                    {
                        id: 2,
                        name: "Callbacks"
                    },
                    {
                        id: 3,
                        name: "Hoisting"
                    },
                    {
                        id: 4,
                        name: "Promises"
                    }
                ]
            },
        ])
    }, [])

    return (
        <>
            <TopicModal 
                isTopicModalOpen={isTopicModalOpen} 
                handleClose={() => {setIsTopicModalOpen(false); setSelectedSubject(null);}}
                selectedSubject={selectedSubject}/>
            <Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S No.</TableCell>
                            <TableCell>Item</TableCell>
                            <TableCell>Actions</TableCell>                 
                        </TableRow>
                    </TableHead>  
                    <TableBody>
                        {subjects.map(subject => (
                            <TableRow key={subject.id}>
                                <TableCell>{subject.id}</TableCell>
                                <TableCell>{subject.name}</TableCell>
                                <TableCell>
                                    <Box sx={{display: "flex", gap: 2}}>
                                        <Button 
                                            variant='contained'
                                            onClick={() => {
                                                setSelectedSubject(subject);
                                                setIsTopicModalOpen(true); 
                                            }} 
                                            className={'action-button'}>View Topics</Button>
                                        
                                        <Button variant='contained' className={'action-button'}>{<Edit style={{color: "white"}} />}</Button>
                                        
                                        <Delete 
                                            style={{
                                                color: "red", 
                                                cursor: "pointer", 
                                                fontSize: "24px"
                                            }} 
                                            onClick={() => handleDelete(subject.id)} 
                                        />
                                        
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </>          
    )
}

export default Subject;