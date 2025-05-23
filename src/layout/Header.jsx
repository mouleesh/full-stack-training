import { AppBar, Toolbar, Typography } from '@mui/material';
import SubHeader from './SubHeader';
import ColorWrapperHOC from './ColorHOC';

function Header() {

  const ColorSubHeader = ColorWrapperHOC(SubHeader);

  return (
    <AppBar position="fixed" sx={{height: "60px", backgroundColor: ""}}>
        <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant='h6'>Full Stack Training</Typography>

            <ColorSubHeader />


        </Toolbar>
    </AppBar>
  )
}

export default Header

//props.children example.
function TypographyClone(props){

    return <h1 style={{color: "red"}}>{props.children}</h1>
}