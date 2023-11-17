import { Navigate, useLocation, Outlet } from "react-router";

function RequireAuth() {
    let token = sessionStorage.getItem('token');
    const location = useLocation();
    if (token) {
        return <Outlet></Outlet>
    }
    else {
       return <Navigate to={'/'} state={{from:location}} replace></Navigate>
    }
}

export default RequireAuth