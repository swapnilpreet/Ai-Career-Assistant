import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}){
    const User = JSON.parse(sessionStorage.getItem("loggedInuser"))

    if(!User){
        return <Navigate to="/login"/>;
    }

    return children;
}

