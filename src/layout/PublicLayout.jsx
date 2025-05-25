import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import Home from "../home/Home";
import Footer from "./Footer";

const PublicLayout = () => {
    const location = useLocation();
    
    return (
        <>
            <Header hideLoginButton={true} />
            <main>
                {location.pathname === "/" ? <Home /> : <Outlet /> }
            </main>
            <Footer />
        </>
    );
};

export default PublicLayout;