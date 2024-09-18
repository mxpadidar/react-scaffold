import useAuth from "@/hooks/use-auth";
import { APP_NAME } from "@/settings";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { signOut, signedIn } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/sign-in");
  };

  return (
    <nav className="flex container mx-auto items-center h-24 justify-between">
      <div className="flex gap-4">
        <Link to="/">{APP_NAME}</Link>
        <Link to="/">Home</Link>
        {signedIn && <Link to="/profile">Profile</Link>}
      </div>

      {signedIn ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <div className="flex gap-4">
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
