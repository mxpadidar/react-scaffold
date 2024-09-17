import useAuth from "@/hooks/use-auth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type SignInForm = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const { isAuthenticated, login } = useAuth();

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<SignInForm>({
    defaultValues: { email: "email@example.com", password: "password" },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

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

export default SignInPage;
