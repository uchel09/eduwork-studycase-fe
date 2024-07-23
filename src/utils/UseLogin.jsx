import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user || token) {
      navigate("/");
    }
  },[user,token]);
};

export const useLoginProfile = () => {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [user,token]);
};
