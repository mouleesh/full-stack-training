import React from 'react'
import { Box, TextareaAutosize } from '@mui/material'

function Create() {
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
        <TextareaAutosize
            minRows={3}
            placeholder="Question"
            style={{ width: 200 }}
        />
    </Box>
  )
}

export default Create