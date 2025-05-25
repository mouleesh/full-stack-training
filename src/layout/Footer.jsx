import { Box, Typography } from "@mui/material";

function Footer() {
    return  <>
        <Box
            sx={{
                bgcolor: "#212121",
                color: "#fff",
                py: 1,
                // mt: 2,
                height: "20px",
                textAlign: "center",
                position: "relative"
            }}>
            <Typography variant="body2">
                © {new Date().getFullYear()} MERN Interview Hub. All rights reserved.
            </Typography>
        </Box>
    </>
}

export default Footer;