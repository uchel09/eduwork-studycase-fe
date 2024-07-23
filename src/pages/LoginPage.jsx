import LoginC from "../components/Login/LoginC";
import { useLogin } from "../utils/useLogin";

function LoginPage() {
  useLogin()
  return (
    <div>
      <LoginC />
    </div>
  );
}

export default LoginPage;
