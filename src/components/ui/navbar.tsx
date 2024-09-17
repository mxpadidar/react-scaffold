import { APP_NAME } from "@/settings";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex container mx-auto items-center h-24 justify-between">
      <div className="flex gap-4">
        <Link to="/">{APP_NAME}</Link>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <div className="flex gap-4">
        <Link to="/sign-in">Sign In</Link>
        <Link to="/sign-up">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
