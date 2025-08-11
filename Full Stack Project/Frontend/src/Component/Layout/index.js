import Footer from "../Footer";
import Header from "../Header";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
        <div className="m-0 p-0 w-100">
            <div className="shadow position-fixed w-100 m-0 p-0" style={{zIndex:5}}>
                <Header />
            </div>
            <Outlet />
            <div className="shadow d-flex w-100 m-0 p-0">
                <Footer />
            </div>
        </div>
        </>
    )
}

export default Layout;