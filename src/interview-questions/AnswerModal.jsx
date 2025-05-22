import { Box, Button, Modal, TextareaAutosize, Typography } from '@mui/material'
import React from 'react'

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

function AnswerModal({open, handleClose, selectedQuestion}) {
  return (
    <Modal
        open={open}
        onClose={handleClose}
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Answer
            </Typography>
            <br />
            <b>Q: {selectedQuestion?.question}</b>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2, marginTop: 2}}>
                <TextareaAutosize 
                    sx={{width: "100%", marginTop: "10px"}}
                    readOnly
                    minRows={5}
                    value={selectedQuestion?.answer}
                />
            </Box>
            <Box sx={{display: "flex", justifyContent: "flex-end", marginTop: 2}}>
                <Button onClick={handleClose} style={{padding: "10px 20px", backgroundColor: "#1976d2", color: "white", border: "none", borderRadius: "5px"}}>Close</Button>
            </Box>
        </Box>
    </Modal>
  )
}

export default AnswerModal