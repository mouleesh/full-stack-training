import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextareaAutosize, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function CreateModal({open, handleClose}) {
    const [subjects, setSubjects] = useState([]);
    const [topics, setTopics] = useState([]);

    const [questionDetails, setQuestionDetails] = useState({
        question: "",
        answer: "",
        subject: "",
        topic: ""
    });

    useEffect(() => {
        setSubjects([
            {
                id: 1,
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
            {
                id: 2,
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
                id: 3,
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
                id: 4,
                name: "Typescript",
                topics: [
                    {
                        id: 1,
                        name: "Types"
                    },
                    {
                        id: 2,
                        name: "Interfaces"
                    },
                    {
                        id: 3,
                        name: "Generics"
                    }
                ]
            }
        ])
    }, [])

    const handleSubjectChange = (event) => {
        const subjectId = event.target.value;
        setQuestionDetails({
            ...questionDetails, 
            subject: subjectId,
            topic: ""
        });
        const selectedSubject = subjects.find(subject => subject.id === subjectId);

        if (selectedSubject) {
            setTopics(selectedSubject.topics);
        } else {
            setTopics([]);
        }
    }

    const handleSubmit = () => {
        console.log("Question Details: ", questionDetails);
    }

    const handleReset = () => {
        setQuestionDetails({
            question: "",
            answer: "",
            subject: "",
            topic: ""
        });
        setTopics([]);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            >
            <Box sx={style}>
                <Typography variant="h5" component="h2" sx={{fontWeight: "bold"}}> Create Question </Typography>

                <Box sx={{display: "flex", flexDirection: "column", gap: 2, marginTop: 2}}>
                    <TextareaAutosize 
                        minRows={5}
                        value={questionDetails.question}
                        onChange={(e) => setQuestionDetails({...questionDetails, question: e.target.value})}
                        placeholder="Enter your question here"
                        style={{padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />

                    <TextareaAutosize 
                        minRows={5}
                        value={questionDetails.answer}
                        onChange={(e) => setQuestionDetails({...questionDetails, answer: e.target.value})}
                        placeholder="Answer"
                        style={{padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />

                    <FormControl fullWidth>
                        <InputLabel id="question-create-subject">Subject</InputLabel>
                        <Select
                            labelId="question-create-subject"
                            value={questionDetails.subject}
                            label="Subject"
                            onChange={handleSubjectChange}
                        >
                            {subjects.map(subject => (
                                <MenuItem key={subject.id} value={subject.id}>{subject.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="question-create-topic">Topic</InputLabel>
                        <Select
                            labelId="question-create-topic"
                            value={questionDetails.topic}
                            label="Topic"
                            onChange={(e) => setQuestionDetails({...questionDetails, topic: e.target.value})}
                        >
                            {topics.map(topic => (
                                <MenuItem key={topic.id} value={topic.id}>{topic.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
                    <Grid container spacing={2} sx={{marginTop: 2, justifyContent: "center"}}>
                        <Grid item xs={4}>
                            <Button onClick={handleSubmit} variant='contained'>Create</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button onClick={() => {handleReset();handleClose()}} variant='outlined'>Close</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button onClick={handleReset} variant='outlined'>Reset</Button>
                        </Grid>
                    </Grid>
                </Box>

                {/* <Button variant='contained' onClick={handleClose}>Close</Button> */}
                
            </Box>
        </Modal>
    )
}

export default CreateModal