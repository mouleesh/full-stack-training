import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, TextareaAutosize, TextField, Typography } from '@mui/material'
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
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: "80vh",
    overflowY: "auto",
};

const initialState = {
    title: "",
    question: "",
    answer: "",
    subject: "",
    topic: "",
    codeSnippet: "",
    example: "",
    difficulty: "beginner" 
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
                example: selectedQuestion?.example,
                difficulty: selectedQuestion.difficulty,
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
            example: questionDetails?.example,
            difficulty: questionDetails.difficulty,
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
                            style={{backgroundColor: "white"}}
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
                            style={{backgroundColor: "white"}}
                        >
                            {topics.map(topic => (
                                <MenuItem key={topic._id} value={topic._id}>{topic.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        {/* <InputLabel id="question-create-title">Question Title</InputLabel>  */}
                        <TextField
                            multiline 
                            minRows={3}
                            label="Question Title"
                            value={questionDetails.title}
                            onChange={(e) => setQuestionDetails({...questionDetails, title: e.target.value})}
                            style={{backgroundColor: "white"}}
                            labelId="question-create-title"
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            multiline 
                            minRows={5}
                            value={questionDetails.question}
                            onChange={(e) => setQuestionDetails({...questionDetails, question: e.target.value})}
                            style={{backgroundColor: "white"}}
                            label="Detailed Question"
                        />
                    </FormControl>
                    
                    <FormControl fullWidth>
                        <TextField
                            multiline 
                            minRows={5}
                            value={questionDetails.answer}
                            onChange={(e) => setQuestionDetails({...questionDetails, answer: e.target.value})}
                            style={{backgroundColor: "white"}}
                            label="Answer"
                        />
                    </FormControl>
                    
                    <FormControl fullWidth>
                        <TextField
                            multiline 
                            minRows={5}
                            value={questionDetails.codeSnippet}
                            onChange={(e) => setQuestionDetails({...questionDetails, codeSnippet: e.target.value})}
                            style={{backgroundColor: "white"}}
                            label="Code Snippet (optional)"
                        />
                    </FormControl>
                    
                    <FormControl fullWidth>
                        <TextField 
                            multiline
                            minRows={3}
                            value={questionDetails.example}
                            onChange={(e) => setQuestionDetails({...questionDetails, example: e.target.value})}
                            style={{backgroundColor: "white"}}
                            label="Example (optional)"
                        />
                    </FormControl>

                    {/* Below are the radio box which will capture the question difficulty level - Beginner, Intermediatary & Advanced */}
                     <FormControl>
                        <FormLabel id="question-create-difficulty">Difficulty Level</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="question-create-difficulty"
                            name="difficulty"
                            required
                            value={questionDetails.difficulty}
                            onChange={(e) => setQuestionDetails({...questionDetails, difficulty: e.target.value})}
                        >
                            <FormControlLabel value="beginner" control={<Radio />} label="Beginner" />
                            <FormControlLabel value="intermediate" control={<Radio />} label="Intermediate" />
                            <FormControlLabel value="advanced" control={<Radio />} label="Advanced" />
                        </RadioGroup>
                    </FormControl>
                    
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