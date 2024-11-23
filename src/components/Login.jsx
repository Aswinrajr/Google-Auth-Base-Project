
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const decodeJWT = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  const handleSuccess = (credentialResponse) => {
    const user = decodeJWT(credentialResponse.credential);
    console.log("User Info:", user);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard");
  };

  const handleFailure = () => {
    console.error("Login Failed");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="logo">
            <div className="logo-circle">
              <i className="lock-icon">🔒</i>
            </div>
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to continue to your account</p>
        </div>

        <div className="login-form">
          <div className="google-btn-container">
            <GoogleLogin 
              onSuccess={handleSuccess} 
              onError={handleFailure}
            />
          </div>

          <div className="divider">
            <span>Secure login powered by Google</span>
          </div>

          <div className="features-grid">
            <div className="feature-item">
              <h3>Secure</h3>
              <p>End-to-end encryption</p>
            </div>
            <div className="feature-item">
              <h3>Protected</h3>
              <p>Two-factor authentication</p>
            </div>
          </div>
        </div>

        <div className="login-footer">
          <p>
            By continuing, you agree to our{' '}
            <a href="#">Terms of Service</a> and{' '}
            <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>

      <div className="help-text">
        <a href="#">Need help? Contact Support</a>
      </div>
    </div>
  );
};

export default Login;