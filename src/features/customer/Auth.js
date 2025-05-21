import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleAuth = () => {
    setIsLogin(!isLogin);
    navigate(isLogin ? "/register" : "/login");
  };

  return (
    <div className="auth-container">
      <div className={`auth-wrapper ${isLogin ? "login" : "register"}`}>
        {isLogin ? (
          <Login onToggle={toggleAuth} />
        ) : (
          <Register onToggle={toggleAuth} />
        )}
      </div>
    </div>
  );
};

export default Auth;
