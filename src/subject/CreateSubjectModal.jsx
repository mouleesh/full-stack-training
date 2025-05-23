import { AddCircle, Delete } from "@mui/icons-material";
import {
    Box,
    Button,
    IconButton,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function CreateSubjectModal({
    open,
    handleClose,
    selectedSubject = null,
    onSave,
}) {
    const [subjectDetails, setSubjectDetails] = useState(
        selectedSubject || { name: "", topics: [] }
    );

    // Reset form when modal opens/closes or selectedSubject changes
    useEffect(() => {        
        setSubjectDetails(selectedSubject || { name: "", topics: [] });
    }, [open, selectedSubject]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubjectDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleTopicChange = (index, value) => {
        const updatedTopics = [...subjectDetails.topics];
        updatedTopics[index] = value;
        setSubjectDetails((prevDetails) => ({
            ...prevDetails,
            topics: updatedTopics,
        }));
    };

    const handleAddTopic = () => {
        setSubjectDetails((prevDetails) => ({
            ...prevDetails,
            topics: [...prevDetails.topics, ""],
        }));
    };

    const handleRemoveTopic = (index) => {
        const updatedTopics = [...subjectDetails.topics];
        updatedTopics.splice(index, 1);
        setSubjectDetails((prevDetails) => ({
            ...prevDetails,
            topics: updatedTopics,
        }));
    };

    const handleCreateOrEditSubject = () => {
        onSave(subjectDetails);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6" component="h2" mb={2}>
                    {selectedSubject ? "Edit Subject" : "Create Subject"}
                </Typography>
                <TextField
                    label="Subject Name"
                    name="name"
                    value={subjectDetails.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                {subjectDetails.topics.map((topic, index) => (
                    <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <TextField
                            label={`Topic ${index + 1}`}
                            value={topic.name} //Giving topic.name to handle the edit flow, in the create flow it is just a string. Caution: Scope for issues.
                            onChange={(e) => handleTopicChange(index, e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <IconButton
                            onClick={() => handleRemoveTopic(index)}
                            aria-label="delete topic"
                            color="error"
                            size="small"
                        >
                            <Delete />
                        </IconButton>
                    </Box>
                ))}
                <Button
                    onClick={handleAddTopic}
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircle />}
                    sx={{ mt: 2, mb: 2 }}
                >
                    Add Topic
                </Button>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: 2,
                        flexDirection: "row",
                        gap: 2,
                    }}
                >
                    <Button onClick={handleClose} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateOrEditSubject}
                        variant="contained"
                        color="primary"
                        disabled={!subjectDetails?.name?.trim()}
                    >
                        {selectedSubject ? "Update" : "Create"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}