import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Login.css";
import logo from "../assets/logo.png";
import axios from "axios";
import { useUser } from "./UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuperAdminLogin = () => {
  const { setUser } = useUser();
  const [password, setPassword] = useState("");
  const [roleName, setRoleName] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userId") {
      setUserId(value);
      console.log("userId:", value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const isEmail = (name) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (userId && password) {
      try {
        let response;
        let role = "";

        if (isEmail(userId)) {
          response = await axios.post("http://localhost:8080/api/companyUser/login", {
            userId: userId,
            password: password,
          });

          if (response.status === 200 && response.data === "login successful") {
            role = "CompanyUser";
            setRoleName(role);
          }
        } else {
          response = await axios.post("http://localhost:8080/api/internalUser/login", {
            userId: userId,
            password: password,
          });

          if (response.status === 200 && response.data === "login successful") {
            const res = await axios.get(`http://localhost:8080/api/internalUser/getUser/${userId}`);
            role = res.data.systemUser.userRole;
            setRoleName(role);
          }
        }

        if (response.status === 200 && response.data === "login successful") {
          toast.success(`Login Successful as ${role}!`, {
            position: "top-right",
            autoClose: 1000,
            onClose: () => {
              setUser(userId, role);
              navigate(`/admin/${role}`);
            }
          });
        }
      } catch (error) {
        let errorMessage = "An error occurred while logging in";
        
        if (error.response) {
          if (error.response.status === 401) {
            errorMessage = "Login Failed: Invalid Credentials";
          } else if (error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
          }
        }
        
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Login Failed: Please fill in all fields", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <div className="login-card">
        <div className="form-login">
          <div className="login-header">
            <h2>Welcome !</h2>
            <p>Access your administration dashboard</p>
          </div>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Employee Number or Email</label>
              <input
                type="text"
                name="userId"
                value={userId}
                onChange={handleChange}
                required
                placeholder="Enter your employee ID or email"
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <span className="button-loader"></span>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>

        <div className="logo-section">
          <div className="logo-container">
            <img src={logo} alt="Company Logo" className="logo-image" />
          </div>
          <div className="powered-by">
            <p>Powered by SLT Mobitel</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLogin;