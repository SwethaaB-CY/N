import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface AuthCardProps {
  closeAuth: () => void;
}

const AuthCard: React.FC<AuthCardProps> = ({ closeAuth }) => {
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [userType, setUserType] = useState<"Student" | "Admin" | "Recruiter" | "Placement Officer">("Student");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(closeAuth, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value as "Student" | "Admin" | "Recruiter" | "Placement Officer");
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
  
    if (isSignup && !validatePassword(formData.password)) {
      setError("Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.");
      return;
    }
  
    if (isSignup && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      let response;
      if (isSignup) {
        response = await axios.post("http://localhost:5000/auth/signup", {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          userType,
        });
  
        alert("Signup successful! Please log in.");
        setIsSignup(false);
      } else {
        response = await axios.post("http://localhost:5000/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        console.log("🔥 New Token from Backend:", response.data.token);
  
        const token = response?.data?.token;
        const userType = response?.data?.userType;
  
        if (!token) {
          setError("Invalid login credentials. Please try again.");
          return;
        }
  
        localStorage.setItem("token", token);
        localStorage.setItem("userType", userType);
  
        alert("Login successful!");
  
        const dashboardRoutes: Record<string, string> = {
          Student: "/dashboard/student-dashboard",
          Recruiter: "/dashboard/recruiter-dashboard",
          Admin: "/dashboard/admin-dashboard",
          "Placement Officer": "/dashboard/placement-dashboard",
        };
  
        if (!dashboardRoutes[userType]) {
          setError("Invalid user type. Please contact support.");
          return;
        }
  
        router.push(dashboardRoutes[userType]);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };
  
  
  
  return (
    <div className={`auth-overlay ${visible ? "show" : "hide"}`}>
      <div className={`auth-card ${visible ? "slide-in" : "slide-out"}`}>
        <button className="close-btn" onClick={handleClose}>✖</button>
        <h2>{isSignup ? "Sign Up" : "Login"} </h2>

        {isSignup && (
          <div className="select-container">
            <select id="user-type" value={userType} onChange={handleUserTypeChange}>
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Placement Officer">Placement Officer</option>
            </select>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            </>
          )}

          {!isSignup && (
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          )}

          <div className="password-container">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)} role="button" tabIndex={0}>
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>

          {isSignup && (
            <div className="password-container">
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
              <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)} role="button" tabIndex={0}>
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          )}

          {!isSignup && (
            <p className="forgot-password">
              <span onClick={() => router.push("/forgot-password")} role="button" tabIndex={0}>
                Forgot Password?
              </span>
            </p>
          )}

          <button className="auth-btn" type="submit">
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <button className="google-btn" type="button">
            <img src="/google-logo.png" alt="Google Logo" className="google-logo" />
            Login with Google
          </button>

          <p className="toggle-text">
            {isSignup ? "Already have an account?" : "Don't have an account?"}  
            <span onClick={() => setIsSignup(!isSignup)} role="button" tabIndex={0}>
              {isSignup ? " Login" : " Sign up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthCard;
