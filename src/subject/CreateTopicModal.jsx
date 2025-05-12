import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CreateTopicModal = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Create Subject
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Create Subject</Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <TextField
                        fullWidth
                        label="Subject Name"
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Subject Description"
                        variant="outlined"
                        margin="normal"
                    />
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="primary" onClick={handleClose}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateTopicModal;