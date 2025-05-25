import SchoolIcon from "@mui/icons-material/School";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import CodeIcon from "@mui/icons-material/Code";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    AppBar,
    Toolbar,
    Container,
    Paper, 
    useTheme,
    TextField,
    TextareaAutosize} from "@mui/material";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constant";
import Contact from "./Contact";

const features = [
{
    icon: <QuestionAnswerIcon color="primary" sx={{ fontSize: 40 }} />,
    title: "Latest Interview Questions",
    desc: "Stay updated with the most recent and frequently asked MERN stack interview questions.",
},
{
    icon: <CodeIcon color="secondary" sx={{ fontSize: 40 }} />,
    title: "Simple Answers & Examples",
    desc: "Get concise answers and practical code examples to help you understand concepts quickly.",
},
{
    icon: <SchoolIcon color="success" sx={{ fontSize: 40 }} />,
    title: "Learn MERN Stack",
    desc: "Master MongoDB, Express, React, and Node.js with our curated learning paths and resources.",
},
{
    icon: <TrendingUpIcon color="warning" sx={{ fontSize: 40 }} />,
    title: "Boost Your Career",
    desc: "Prepare confidently for interviews and land your dream job in web development.",
},
];

const Home = () => {
    const theme = useTheme();
    const [subjectId, setSubjectId] = useState("");

    useEffect(() => {
        axios.get(`${API_URL}/subjects`).then((res) => {
            if (res.data && res.data.length > 0) {
                const subId = res.data.find((sub) => {
                    if (sub.name.toLowerCase().includes("html")) {
                       return true;
                    }
                })
                
                if(subId) {
                    setSubjectId(subId._id);
                }
            }
        }).catch((err) => {
            console.error("Error fetching subjects:", err);
        });
    }, [])

    return (
        <Box sx={{ bgcolor: "#f5f7fa", minHeight: "100vh", mt: "60px" }}>
            {/* AppBar */}
            {/* <AppBar position="static" sx={{ bgcolor: "#212121" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
                        MERN Interview Hub
                    </Typography>
                    <Button color="inherit" href="#features">
                        Features
                    </Button>
                    <Button color="inherit" href="#about">
                        About
                    </Button>
                    <Button color="inherit" href="#get-started">
                        Get Started
                    </Button>
                </Toolbar>
            </AppBar> */}

            {/* Hero Section */}
            <Box
                sx={{
                    py: { xs: 6, md: 10 },
                    px: 2,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 60%, #fff 100%)`,
                    color: "#fff",
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            fontSize: { xs: "2.2rem", md: "3.2rem" },
                            letterSpacing: 1,
                        }}
                    >
                        Ace Your MERN Stack Interviews
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4, color: "#e3f2fd" }}>
                        The ultimate platform to learn, practice, and master MERN stack interview questions with clear answers and real-world examples.
                    </Typography>
                    <Button
                        variant="contained"
                        color="tertiary"
                        size="large"
                        sx={{
                            fontWeight: 700,
                            px: 4,
                            py: 1.5,
                            borderRadius: 1,
                            boxShadow: 2,
                        }}
                    >
                        <Link to={`/subjects/${subjectId}`} style={{textDecoration: "none"}}> Get Started </Link>
                    </Button>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" id="features" sx={{ mt: 8, mb: 6 }}>
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ fontWeight: 700, mb: 4, color: "#1976d2" }}
                >
                    Why Choose MERN Interview Hub?
                </Typography>
                <Grid sx={{ display: "flex", justifyContent: "center", direction: "row", gap: 2}}>
                    {features.map((feature, idx) => (
                        <div key={idx}>
                            <Card
                                sx={{
                                    height: 240,
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    transition: "transform 0.2s",
                                    "&:hover": { transform: "translateY(-8px) scale(1.03)" },
                                }}
                            >
                                <CardContent sx={{ textAlign: "center" }}>
                                    {feature.icon}
                                    <Typography
                                        variant="h6"
                                        sx={{ mt: 2, fontWeight: 600, color: "#212121" }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1, color: "#616161" }}>
                                        {feature.desc}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </Grid>
            </Container>

            {/* About Section */}
            <Container maxWidth="lg" id="about" sx={{ mb: 5 }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 3, md: 5 },
                        borderRadius: 4,
                        background: "#fff",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, mb: 2, color: "#1976d2" }}
                    >
                        About MERN Interview Hub
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#424242" }}>
                        MERN Interview Hub is your one-stop solution for preparing for MERN stack interviews. Whether you are a beginner or an experienced developer, our platform offers a comprehensive collection of the latest interview questions, clear and concise answers, and practical code examples. Our mission is to help you learn efficiently and succeed in your career.
                    </Typography>
                    <br />
                    <b>What you get:</b>
                    <ul style={{ color: "#424242", listStyleType: "disc", paddingLeft: "20px"}}>
                        <li style={{ marginBottom: "8px" }}>Handpicked questions covering MongoDB, Express, React, and Node.js</li>
                        <li style={{ marginBottom: "8px" }}>Easy-to-understand answers and code snippets</li>
                        <li style={{ marginBottom: "8px" }}>Regularly updated content to match industry trends</li>
                        <li>Learning paths and tips for cracking interviews</li>
                    </ul>
                    
                </Paper>
            </Container>

            {/* Call to Action */}
            <Box
                id="get-started"
                sx={{
                    py: 6,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 60%, #fff 100%)`,
                    color: "#fff",
                    textAlign: "center",
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, mb: 2, letterSpacing: 1 }}
                    >
                        Ready to Start Learning?
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, color: "#e3f2fd" }}>
                        Explore our question bank and boost your MERN stack skills today!
                    </Typography>
                    <Button
                        variant="contained"
                        color="tertiary"
                        size="large"
                        sx={{
                            fontWeight: 700,
                            px: 4,
                            py: 1.5,
                            borderRadius: 1,
                            boxShadow: 2,
                        }}
                    >
                        <Link style={{textDecoration: "none"}} to={`/subjects/${subjectId}`}> Browse Questions </Link>
                    </Button>
                </Container>
            </Box>
            
            {/* Contact Section */}
            <Contact />
        </Box>
    );
};

export default Home;