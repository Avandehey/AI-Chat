import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/UserProvider";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setUser({
      loggedIn: false,
      username: "",
      token: "",
    });
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  }, []); 

  return <div>Logging out...</div>;
}