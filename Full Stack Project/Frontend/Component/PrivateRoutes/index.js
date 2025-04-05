import { Navigate, Outlet } from "react-router-dom";
import Auth from "../../Auth";

function PrivateRoutes() {
    return Auth.isAuthenticatedUser() ?  <Outlet /> : <Navigate to='/'/>;
};
export default PrivateRoutes;