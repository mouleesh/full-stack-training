import { Box, Typography, useTheme } from "@mui/material";

function Footer() {
    const theme = useTheme();

    return  <>
        <Box
            sx={{
                bgcolor: theme.palette.primary.main,
                color: "#000000",
                py: 1,
                // mt: 2,
                height: "20px",
                textAlign: "center",
                position: "relative",
            }}>
            <Typography variant="body2">
                © {new Date().getFullYear()} MERN Interview Hub. All rights reserved.
            </Typography>
        </Box>
    </>
}

export default Footer;