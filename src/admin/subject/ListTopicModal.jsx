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

function ListTopicModal({isTopicModalOpen, handleClose, selectedSubject}) {
  return (
    <Modal
        open={isTopicModalOpen}
        onClose={handleClose}
        >
        <Box sx={style} >
            <Typography variant="h6" component="h2" gutterBottom>
                Topics under {selectedSubject?.name || "Subject"}
            </Typography>
            {selectedSubject?.topics && selectedSubject.topics.length > 0 ? (
                <ul>
                    {selectedSubject.topics.map((topic, idx) => (
                        <li key={idx}>
                            <Typography variant="body1">{topic.name}</Typography>
                        </li>
                    ))}
                </ul>
            ) : (
                <Typography variant="body2" color="text.secondary">
                    No topics available.
                </Typography>
            )}
            <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
                Close
            </Button>
        </Box>
    </Modal>
  )
}

export default ListTopicModal