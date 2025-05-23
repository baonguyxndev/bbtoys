import { Button } from "@mui/material";
import "./styles/Login.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/contexts/AuthContext";

const Login = ({ onToggle }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [slideDirection, setSlideDirection] = useState("");

  const handleToggle = () => {
    setSlideDirection("slide-left");
    setTimeout(() => {
      onToggle();
      setSlideDirection("");
    }, 600);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/assets/data/customers.json");
      if (!response.ok) {
        throw new Error("Failed to fetch customer data");
      }
      const customers = await response.json();
      const user = customers.find(
        (customer) =>
          customer.username === formData.username &&
          customer.password === formData.password
      );

      if (user) {
        login(user);
        navigate(`/customer/${user.id}`);
      } else {
        setErrors({
          username: "Invalid username or password",
          password: "Invalid username or password",
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({
        username: "An error occurred during login",
        password: "An error occurred during login",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (platform) => {
    console.log(`Login with ${platform}`);
  };

  return (
    <div className="login">
      <div className="container">
        <div className={`form-wrapper ${slideDirection}`}>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-wrapper">
              <input
                type="text"
                name="username"
                placeholder={errors.username || "Username"}
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? "error" : ""}
              />
              <FaUser />
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                name="password"
                placeholder={errors.password || "Password"}
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
              />
              <FaLock />
            </div>
            <div className="fogot-password-link">
              <a href="/">Forgot password?</a>
            </div>
            <Button type="submit" className="btn-login" disabled={isLoading}>
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
            <p>or login with social platforms</p>
            <div className="social-icons">
              <a href="/" onClick={() => handleSocialLogin("Google")}>
                <FaGoogle />
              </a>
              <a href="/" onClick={() => handleSocialLogin("Facebook")}>
                <FaFacebookF />
              </a>
            </div>
          </form>
        </div>

        <div className={`toggle-wrapper ${slideDirection}`}>
          <div className={`toggle-panel toggle-left ${slideDirection}`}>
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account? </p>
            <Button onClick={handleToggle} className="btn-register">
              Register now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
