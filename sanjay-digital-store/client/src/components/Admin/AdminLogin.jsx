import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminLogin.css'; // Import the CSS file

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     // Temporary development check (remove in production)
//     if (username === "admin" && password === "admin123") {
//       await login(username, password);
//       navigate('/admin/dashboard');
//     } else {
//       throw new Error('Invalid credentials');
//     }
//   } catch (err) {
//     setError('Invalid credentials');
//   }
// };
  return (
    <div className="admin-login-container">
      <div className="login-form-wrapper">
        <div className="login-header">
          <h2>Admin Login</h2>
        </div>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-inputs">
            <div className="input-group">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="form-input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="form-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="submit-button">
            <button
              type="submit"
              className="login-button"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;