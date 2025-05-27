import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useTheme,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../constant";
import { useParams } from "react-router";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; 
import Navigation from "./layout/Navigation";
import { ArrowDropDown, FilterListAlt } from "@mui/icons-material";

const LandingPage = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [copied, setCopied] = useState(false);

    const selectedQuestion = questions.find(q => q._id === selectedId);
    const theme = useTheme();
    const {subjectId} = useParams();

    useEffect(() => {
        if(subjectId) {
            axios.get(`${API_URL}/questions?subject_id=${subjectId}`).then((res) => {
                setQuestions(res.data);
                setSelectedId(res.data[0]?._id);
            }).catch((err) => {
                console.error("Error fetching questions:", err);
            })
        }
    }, [subjectId])

    return (<>
        <Navigation />
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                minHeight: "100vh",
                bgcolor: "#f8f9fa",
                py: 5,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    display: "flex",
                    width: { xs: "100vw", md: "85vw", lg: "85vw" },
                    // maxWidth: 1100,
                    borderRadius: 3,
                    overflow: "hidden",
                }}
            >
                {/* Left Section */}
                <Box
                    sx={{
                        width: "30%",
                        bgcolor: "#f5f7fa",
                        borderRight: "1px solid #e0e0e0",
                    }}
                >   
                    <div style={{ 
                        marginBottom: "20px", 
                        backgroundColor: "lightgrey", 
                        height: 60, 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-between", 
                        padding: "0 20px"
                    }}
                    >
                        <Typography
                            variant="h6"
                            align="center"
                            sx={{ 
                                fontWeight: "bold", 
                                fontSize: "1.2rem" 
                            }}
                        >
                            Questions
                        </Typography>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ 
                                height: 30, 
                                minWidth: 60, 
                                fontSize: "0.8rem", 
                                textTransform: "none" 
                            }}
                            startIcon={<FilterListAlt />}
                            endIcon={<ArrowDropDown />}
                            onClick={() => {
                                // Implement filter functionality here
                                console.log("Filter button clicked");
                            }}
                        >Filter</Button>
                    </div>

                    <List disablePadding>
                        {questions.map(q => (
                            <ListItem
                                key={q._id}
                                disablePadding
                                sx={{
                                    bgcolor: selectedId === q._id ? theme.palette.tertiary.main : "transparent",
                                    borderLeft: selectedId === q._id ? `4px solid ${theme.palette.primary.main}` : "4px solid transparent",
                                    transition: "background 0.2s, color 0.2s",
                                    "&:hover": {
                                        bgcolor: theme.palette.tertiary.main,
                                    },
                                }}
                            >
                                <ListItemButton
                                    selected={selectedId === q._id}
                                    onClick={() => setSelectedId(q._id)}
                                    sx={{
                                        px: 3,
                                        py: 1.5,
                                    }}
                                >
                                    <ListItemText
                                        primary={q.title}
                                        primaryTypographyProps={{
                                            fontWeight: selectedId === q._id ? "bold" : "normal",
                                            color: selectedId === q._id ? theme.palette.primary.main : "#222",
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                
                {/* Right Section */}
                <Box sx={{ width: "70%", p: 5 }}>
                    <Typography color={theme.palette.primary.main} variant="h5" sx={{ mb: 2 }}>
                        {selectedQuestion?.title}
                    </Typography>
                    <Typography color={theme.palette.secondary.main} variant="h6" sx={{ mb: 2 }}>
                        {selectedQuestion?.question}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#444", fontSize: "1.1rem" }}>
                        {selectedQuestion?.answer}
                    </Typography>
                    {selectedQuestion?.example && (
                        <Box sx={{ mt: 2, p: 2}}>
                            <Typography variant="subtitle1" sx={{ mb: 1, color: theme.palette.primary.main, }}>
                                Example
                            </Typography>
                            
                            {selectedQuestion.example}
                            
                        </Box>
                    )}
                    {selectedQuestion?.codeSnippet && (
                        <Box sx={{ mt: 3, bgcolor: "gainsboro", p: 2, borderRadius: 2, position: "relative" }}>
                            <Typography variant="subtitle1" sx={{ mb: 1, color: theme.palette.primary.main, fontWeight: "bold" }}>
                                Code
                            </Typography>
                            <Box sx={{ position: "absolute", top: 16, right: 16 }}>
                                <Button
                                    size="small"
                                    sx={{height: 20, minWidth: 60, fontSize: "0.8rem", textTransform: "none"}}
                                    variant="contained"
                                    onClick={async () => {
                                        await navigator.clipboard.writeText(selectedQuestion.codeSnippet);
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 1500);
                                    }}
                                >
                                    {copied ? "Copied!" : "Copy"}
                                </Button>
                            </Box>
                            <Paper
                                sx={{
                                    bgcolor: "white",
                                    color: "black",
                                    borderLeft: `2px solid ${theme.palette.primary.main}`,
                                    fontFamily: "Fira Mono, monospace",
                                    fontSize: "1rem",
                                    p: 2,
                                    overflowX: "auto",
                                    whiteSpace: "pre-wrap",
                                }}
                            >
                                <pre style={{ margin: 0 }}><code dangerouslySetInnerHTML={{
                                    __html: hljs.highlight(selectedQuestion.codeSnippet, { language: 'javascript' }).value
                                }}/></pre>
                            </Paper>
                        </Box>
                    )}
                </Box>
            </Paper>
        </Box>
    </>
    );
};

export default LandingPage;