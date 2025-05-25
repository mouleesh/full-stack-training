import { AppBar, Toolbar, Typography, useTheme } from '@mui/material';
import SubHeader from './SubHeader';
import ColorWrapperHOC from './ColorHOC';
import { Link } from 'react-router';

function Header({hideLoginButton}) {
  const theme = useTheme();
  const ColorSubHeader = ColorWrapperHOC(SubHeader);

  return (
    <AppBar position="fixed" sx={{height: "60px", backgroundColor: "#353839"}}>
        <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
            <div style={{display: "flex", alignItems: "center"}}>
              <Link to={"/"}>
                <img src="/logo3.png" alt="logo" style={{width: "50px", height: "50px", marginRight: "24px"}} />
              </Link>
              {/* <Typography variant='h6'>FULL STACK TRAINING</Typography> */}
            </div>

            {!hideLoginButton && <ColorSubHeader />}

        </Toolbar>
    </AppBar>
  )
}

export default Header

//props.children example.
function TypographyClone(props){

    return <h1 style={{color: "red"}}>{props.children}</h1>
}