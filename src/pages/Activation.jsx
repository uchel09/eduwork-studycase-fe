import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
// import { server } from "../server";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

function ActivationPage() {
  const navigate = useNavigate();
  const { activationToken } = useParams();

  if (!activationToken) {
    // Handle invalid token
    console.error("Invalid activation token");
    return <div>Invalid Token</div>;
  }

  const decoded = jwtDecode(activationToken);
  if (!decoded || !decoded.email || !decoded.name) {
    // Handle invalid decoded data
    console.error("Invalid decoded data in the token");
    return <div>Invalid Token Data</div>;
  }

  let { name, email, password, avatar, role } = decoded;
  if (!role) {
    role = "user";
  }

  const activationEmail = async () => {
    try {
      const res = await axios.post(
        `http://localhost:4000/users/activation`,
        {
          name,
          email,
          password,
          avatar,
          role,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      toast(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen gap-4">
      <p>Activate your account here</p>
      <button onClick={activationEmail} className="bg-blue-400 rounded-lg p-4">
        Click to confirm
      </button>
    </div>
  );
}

export default ActivationPage;
