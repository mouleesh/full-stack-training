import { Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { Link } from "react-router";

function SubHeader(props){

    return <Button color="inherit" style={{backgroundColor: props.color}} startIcon={<LoginIcon />}> <Link to={"/login"}>Login</Link></Button>
}

export default SubHeader;