import { Box, Table, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

function SubjectSlide() {
  return (
     <>
              <Box>
                   <Table>
                       <TableHead>
                           <TableRow>
                               <TableCell>S No.</TableCell>
                               <TableCell>Item</TableCell>
                               <TableCell>Actions</TableCell>                 
                           </TableRow>
                        </TableHead>  
                   </Table>
               </Box>
     </>          
  )
}

export default SubjectSlide