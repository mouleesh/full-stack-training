import { Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { Link } from "react-router";
import { Launch } from "@mui/icons-material";

function SubHeader(props){

    return <div style={{display: "flex", justifyContent: "flex-end", gap: 5}}>
        <Button color="inherit" style={{backgroundColor: props.color}} startIcon={<Launch color="primary"/>}> <Link target="_blank" to={"/"} style={{textDecoration: "none"}}>Preview</Link></Button>
        <Button color="inherit" style={{backgroundColor: props.color}} startIcon={<LoginIcon color="primary"/>}> <Link to={"/login"} style={{textDecoration: "none"}}>Login</Link></Button>
    </div>
}

export default SubHeader;