import SignUpC from "../components/SignUp/SignUpC";
import { useLogin } from "../utils/useLogin";

const SignUp = () => {
  useLogin();
  return (
    <div>
      <SignUpC />
    </div>
  );
};

export default SignUp;
