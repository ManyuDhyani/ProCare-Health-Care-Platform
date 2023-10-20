import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = (data) => {
  let isAuth = false;
  const location = useLocation();
  let user = location.state && location.state.user;
  // if (localStorage.getItem("session_auth") == true) isAuth = true;
  if (user && user.email) isAuth = true;
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;