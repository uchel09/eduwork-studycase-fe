import { useNavigate } from "react-router-dom";
import LoginC from "../components/Login/LoginC";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  console.log(isAuthenticated);
  return (
    <div>
      <LoginC />
    </div>
  );
}

export default LoginPage;
