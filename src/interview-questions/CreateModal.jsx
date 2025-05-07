import { Box, Button, Modal, Typography } from '@mui/material'
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

function CreateModal({open, handleClose}) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            >
            <Box sx={style}>
                <Typography variant="h6" component="h2"> Text in a modal </Typography>

                <Button variant='contained' onClick={handleClose}>Close</Button>
                
            </Box>
        </Modal>
    )
}

export default CreateModal