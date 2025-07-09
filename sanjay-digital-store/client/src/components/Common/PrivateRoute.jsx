import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './PrivateRoute.css'; // For any additional styling

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Assuming your AuthContext has loading state

  if (loading) {
    return (
      <div className="private-route-loading">
        <div className="loading-spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    // Optional: You could add a message to localStorage to show on login page
    sessionStorage.setItem('authRedirectMessage', 'Please login to access this page');
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default PrivateRoute;