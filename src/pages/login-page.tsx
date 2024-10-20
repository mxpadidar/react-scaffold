import useAuth from "@/hooks/use-auth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

type SignInForm = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { isAuthenticated, login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit } = useForm<SignInForm>({
    defaultValues: { email: "user@example.com", password: "string" },
  });

  useEffect(() => {
    const redirect = new URLSearchParams(location.search).get("redirect");
    if (isAuthenticated) {
      navigate(redirect || "/");
    }
  }, [isAuthenticated, navigate, location.search]);

  return (
    <div className="mx-auto w-96">
      <form onSubmit={handleSubmit((data) => login(data))}>
        <div className="form-group">
          <label htmlFor="email">email:</label>
          <input type="email" {...register("email")} />
        </div>
        <div className="form-group">
          <label htmlFor="password">password:</label>
          <input type="password" {...register("password")} />
        </div>
        <button type="submit" className="submit-btn">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
