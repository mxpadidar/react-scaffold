import useAuth from "@/hooks/use-auth";
import settings from "@/utils/settings";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex container mx-auto items-center h-24 justify-between">
      <div className="flex gap-4">
        <Link to="/">{settings.APP_NAME}</Link>
        <Link to="/">Home</Link>
        {isAuthenticated && <Link to="/profile">Profile</Link>}
        {isAuthenticated && <Link to="/profile/update">Update Profile</Link>}
      </div>

      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <div className="flex gap-4">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
