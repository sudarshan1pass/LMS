import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  
  if (!token) {
    return <Navigate to="/Login" />;
  }

  // ✅ agar login hai
  return children;
}

export default PrivateRoute;