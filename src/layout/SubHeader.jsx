import { Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';

function SubHeader(props){

    return <Button color="inherit" style={{backgroundColor: props.color}} startIcon={<LoginIcon />}> Login</Button>
}

export default SubHeader;