import { Button, useTheme } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { Link } from "react-router";
import { Launch } from "@mui/icons-material";

function SubHeader(props){
    const theme = useTheme();

    return <div style={{display: "flex", justifyContent: "flex-end", gap: 5}}>
        <Link target="_blank" to={"/"} style={{textDecoration: "none"}}><Button variant="contained" color="primary" startIcon={<Launch />}> Preview</Button></Link>
        <Link to={"/login"} style={{textDecoration: "none"}}><Button variant="contained" color="primary" startIcon={<LoginIcon />}> Login</Button></Link>
    </div>
}

export default SubHeader;