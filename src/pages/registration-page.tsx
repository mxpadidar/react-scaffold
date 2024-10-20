import { useForm } from "react-hook-form";

type RegistrationForm = {
  email: string;
  password: string;
  password_confirm: string;
};

const RegistrationPage = () => {
  const { register, handleSubmit } = useForm<RegistrationForm>({
    defaultValues: {
      email: "user@example.com",
      password: "password",
      password_confirm: "password",
    },
  });

  const onSubmit = (data: RegistrationForm) => {
    console.log(data);
  };

  return (
    <div className="mx-auto w-96">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">email:</label>
          <input type="email" {...register("email")} />
        </div>
        <div className="form-group">
          <label htmlFor="password">password:</label>
          <input type="password" {...register("password")} />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirm">confirm password:</label>
          <input type="password" {...register("password_confirm")} />
        </div>
        <button type="submit" className="submit-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
