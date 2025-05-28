import { Box, Button, Container, Paper, TextareaAutosize, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../slices/snackbarSlice";
import axios from "axios";
import { API_URL } from "../../constant";

function Contact() {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [contact, setContact] = useState({
        name: "",
        mobile: "",
        email: "",
        message: ""
    });

    // Function to validate the contact form and send the request to API.
    const handleRequestCallback = () => {
        if (!contact.name || !contact.mobile || !contact.message) {
            dispatch(showSnackbar({
                message: "Please fill in all the fields!",
                type: "error"
            }));
            return;
        }

        if (contact.mobile && !/^\d{10}$/.test(contact.mobile)) {
            dispatch(showSnackbar({
                message: "Please check the mobile number!"
            }));
        }
        
        axios.post(`${API_URL}/contact-form`, contact).then(() => {
            // Reset the form after submission
            setContact({
                name: "",
                mobile: "",
                email: "",
                message: ""
            });
            dispatch(showSnackbar({
                message: "Your request has been submitted successfully!",
                type: "success"
            }));
        }).catch((error) => {
            console.log("Unable to submit the contact request form", error);

            dispatch(showSnackbar({
                message: "Something went wrong, Please try again later!",
                type: "error"
            }))
            
        });
    }

    return (
    <Container maxWidth="lg" id="contact" sx={{ mb: 8, mt: 6 }}>
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
                sx={{ fontWeight: 700, mb: 1, color: theme.palette.primary.main }}
            >
                Contact Us
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 60 }}>
                <div>
                    <Typography variant="subtitle1" sx={{ mb: 3, color: "#424242" }}>
                        Have questions or need a call back? Reach out to us!
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body1" sx={{ color: "#212121" }}>
                            <b>Mobile:</b> +91 9566661619
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#212121" }}>
                            <b>Email:</b> gggmouleesh@gmail.com
                        </Typography>
                        <br />
                        <Typography variant="body1" sx={{ color: "#212121", mb: 1 }}>
                            <b>Address:</b> 906, 9th Floor, Elevaar, Velachery - Tambaram Main Rd, MGR Nagar, Pallikaranai, Chennai, Tamil Nadu 600100
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            {/* Replace the coordinates below with your actual coordinates */}
                            <iframe
                                title="Location Map"
                                width="100%"
                                height="180"
                                frameBorder="0"
                                style={{ border: 0, borderRadius: 8 }}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1310.4897214074017!2d80.19724352229966!3d12.925737046462825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d5250d152f7%3A0x252fa9cc422a3e16!2sElevaar%20-%20Krishna%20Group!5e0!3m2!1sen!2sin!4v1748082477291!5m2!1sen!2sin"
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0"
                            />
                        </Box>
                    </Box>
                </div>
                <div>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            minWidth: { xs: 220, md: 320 },
                            bgcolor: "#f5f7fa",
                            p: 3,
                            borderRadius: 2,
                            boxShadow: 1,
                        }}
                        autoComplete="off"
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            Request a Callback
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <TextField
                                label="Your Name"
                                name="name"
                                value={contact.name}
                                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                                variant="outlined"
                                size="small"
                                fullWidth
                                style={{ backgroundColor: "white" }}
                            />
                            <TextField
                                label="Mobile Number"
                                variant="outlined"
                                name="mobile"
                                value={contact.mobile}
                                onChange={(e) => setContact({ ...contact, mobile: e.target.value })}
                                size="small"
                                type="tel"
                                fullWidth
                                style={{ backgroundColor: "white" }}
                            />
                            <TextField
                                label="Email (optional)"
                                variant="outlined"
                                size="small"
                                name="email"
                                value={contact.email}
                                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                                type="email"
                                fullWidth
                                style={{ backgroundColor: "white" }}
                            />
                            <TextField 
                                multiline
                                minRows={3}
                                name="message"
                                value={contact.message}
                                onChange={(e) => setContact({ ...contact, message: e.target.value })}
                                label="Your Message"
                                style={{ backgroundColor: "white" }}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleRequestCallback}
                            sx={{ mt: 2, fontWeight: 700, borderRadius: 1, color: theme.palette.tertiary.main }}
                            type="submit"
                        >
                            Request Callback
                        </Button>
                    </Box>
                </div>
            </div>
        </Paper>
    </Container>)
}

export default Contact;