import { jwtDecode } from "jwt-decode";

export const decodedUser = (token) => {
  const decoded = jwtDecode(token);
  let { name, email, password, role, avatar } = decoded;
  if (!role) {
    role = "user";
  }
  return {
    name,
    email,
    password,
    role,
    avatar,
  };
};
