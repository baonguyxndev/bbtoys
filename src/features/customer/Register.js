import { Button } from "@mui/material";
import "./styles/Register.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

const Register = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    comfirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [slideDirection, setSlideDirection] = useState("");

  const handleToggle = () => {
    setSlideDirection("slide-right");
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
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.comfirmPassword.trim()) {
      newErrors.comfirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.comfirmPassword) {
      newErrors.comfirmPassword = "Passwords do not match";
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
    // Clear error when user starts typing
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Register failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (platform) => {
    console.log(`Register with ${platform}`);
  };

  return (
    <div className="register">
      <div className="container">
        <div className={`form-wrapper ${slideDirection}`}>
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
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
                type="email"
                name="email"
                placeholder={errors.email || "Email"}
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              <IoIosMail />
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
            <div className="input-wrapper">
              <input
                type="password"
                name="comfirmPassword"
                placeholder={errors.comfirmPassword || "Confirm Password"}
                value={formData.comfirmPassword}
                onChange={handleChange}
                className={errors.comfirmPassword ? "error" : ""}
              />
              <FaLock />
            </div>
            <Button type="submit" className="btn-register" disabled={isLoading}>
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register"
              )}
            </Button>
            <p>or register with social platforms</p>
            <div className="social-icons">
              <a href="/" onClick={() => handleSocialRegister("Google")}>
                <FaGoogle />
              </a>
              <a href="/" onClick={() => handleSocialRegister("Facebook")}>
                <FaFacebookF />
              </a>
            </div>
          </form>
        </div>

        <div className={`toggle-wrapper ${slideDirection}`}>
          <div className={`toggle-panel toggle-right ${slideDirection}`}>
            <h1>Welcome back!</h1>
            <p>Already have an account? </p>
            <Button onClick={handleToggle} className="btn-login">
              Login now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
