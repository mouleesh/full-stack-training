import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextareaAutosize, Typography } from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { API_URL } from '../../../constant';
import { useDispatch } from 'react-redux';
import { setQuestionsInStore } from '../../slices/questionSlice';

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

const initialState = {
    title: "",
    question: "",
    answer: "",
    subject: "",
    topic: "",
    codeSnippet: "",
    example: ""
}

function CreateModal({open, handleClose, subjects, questionsFromStore, selectedQuestion}) {
    const dispatch = useDispatch();
    const [topics, setTopics] = useState([]);

    const [questionDetails, setQuestionDetails] = useState(initialState);

    useEffect(() => {
        if (selectedQuestion && open) {
            setTopics(subjects.find(subject => subject._id === selectedQuestion.subject._id)?.topics || []);
            setQuestionDetails({
                title: selectedQuestion.title,
                question: selectedQuestion.question,
                answer: selectedQuestion.answer,
                subject: selectedQuestion.subject._id,
                topic: selectedQuestion.topic._id,
                codeSnippet: selectedQuestion?.codeSnippet,
                example: selectedQuestion?.example
            });
        }
    }, [open, selectedQuestion]);

    const handleSubjectChange = (event) => {
        const subjectId = event.target.value;
        setQuestionDetails({
            ...questionDetails, 
            subject: subjectId,
            topic: ""
        });
        const selectedSubject = subjects.find(subject => subject._id === subjectId);

        if (selectedSubject) {
            setTopics(selectedSubject.topics);
        } else {
            setTopics([]);
        }
    }

    const handleSubmit = () => {
        const payload = {
            title: questionDetails.title,
            question: questionDetails.question,
            answer: questionDetails.answer,
            subject: questionDetails.subject,
            topic: questionDetails.topic,
            codeSnippet: questionDetails?.codeSnippet,
            example: questionDetails?.example
        };

        if (selectedQuestion?._id) {
            axios.put(`${API_URL}/questions/${selectedQuestion._id}`, payload)
                .then((res) => {
                    const updatedQuestions = questionsFromStore.map(q => 
                        q._id === selectedQuestion._id ? res.data : q
                    );
                    dispatch(setQuestionsInStore(updatedQuestions));
                    setQuestionDetails(initialState);
                    setTopics([]);
                    handleClose();
                })
                .catch((err) => console.error(err));
        } else  {
             axios.post(`${API_URL}/questions`, payload).then((response) => {
                dispatch(setQuestionsInStore([...questionsFromStore, response.data]));
                setQuestionDetails(initialState);
                setTopics([]);
                handleClose();

            }).catch((error) => {
                console.error("Error creating question:", error);
            });
        }
    }

    const handleReset = () => {
        setQuestionDetails(initialState);
        setTopics([]);
    }

    const handleCloseLocal = () => {
        handleClose();
        handleReset();
    }

    return (
        <Modal
            open={open}
            onClose={handleCloseLocal}
            >
            <Box sx={style}>
                <Typography variant="h5" component="h2" sx={{fontWeight: "bold"}}> {selectedQuestion ? "Update Question" : "Create Question"} </Typography>

                <Box sx={{display: "flex", flexDirection: "column", gap: 2, marginTop: 2}}>
                    <FormControl fullWidth>
                        <InputLabel id="question-create-subject">Subject</InputLabel>
                        <Select
                            labelId="question-create-subject"
                            value={questionDetails.subject}
                            label="Subject"
                            onChange={handleSubjectChange}
                        >
                            {subjects.map(subject => (
                                <MenuItem key={subject._id} value={subject._id}>{subject.name}</MenuItem>
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
                                <MenuItem key={topic._id} value={topic._id}>{topic.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextareaAutosize 
                        minRows={3}
                        InputLabelProps={{ shrink: true }}
                        value={questionDetails.title}
                        onChange={(e) => setQuestionDetails({...questionDetails, title: e.target.value})}
                        placeholder="Question Title"
                        labelId="question-create-title"
                        style={{padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />

                    <TextareaAutosize 
                        minRows={5}
                        value={questionDetails.question}
                        onChange={(e) => setQuestionDetails({...questionDetails, question: e.target.value})}
                        placeholder="Enter your detailed question here"
                        style={{padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />

                    <TextareaAutosize 
                        minRows={5}
                        value={questionDetails.answer}
                        onChange={(e) => setQuestionDetails({...questionDetails, answer: e.target.value})}
                        placeholder="Answer"
                        style={{padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />

                    <TextareaAutosize 
                        minRows={5}
                        value={questionDetails.codeSnippet}
                        onChange={(e) => setQuestionDetails({...questionDetails, codeSnippet: e.target.value})}
                        placeholder="Code Snippet (optional)"
                        style={{padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />

                    <TextareaAutosize 
                        minRows={5}
                        value={questionDetails.example}
                        onChange={(e) => setQuestionDetails({...questionDetails, example: e.target.value})}
                        placeholder="Example (optional)"
                        style={{padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                    
                    <Grid container spacing={2} sx={{marginTop: 2, justifyContent: "center"}}>
                        <Grid item xs={4}>
                            <Button onClick={handleSubmit} variant='contained'>{selectedQuestion ? "Update" : "Create"}</Button>
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