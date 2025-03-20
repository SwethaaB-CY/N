import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetToken, setResetToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.token) {
      setResetToken(router.query.token as string);
    }
    console.log("Token from URL:", router.query.token); // Debugging
  }, [router.query.token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    console.log("Sending reset request with:", { resetToken, newPassword: password }); // Debugging

    if (!resetToken) {
      setError("Invalid or missing reset token");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/reset-password", { resetToken, newPassword: password });
      setMessage(response.data.message);

      // Redirect to AuthCard.tsx after 3 seconds
      setTimeout(() => router.push("/"), 3000); 
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <br></br>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br></br>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
