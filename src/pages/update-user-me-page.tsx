import useUpdateUserMeMutation from "@/services/api/update-user-me-mutation";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const UpdateUserMePage = () => {
  const navigate = useNavigate();

  const mutation = useUpdateUserMeMutation({
    successFn: () => navigate("/profile"),
    errorFn: (error) => console.error(error),
  });

  const { register, handleSubmit } = useForm({
    defaultValues: { first_name: "", last_name: "" },
  });

  const onSubmit = (data: { first_name: string; last_name: string }) =>
    mutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="first_name">First Name:</label>
        <input type="text" {...register("first_name")} />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Last Name:</label>
        <input type="text" {...register("last_name")} />
      </div>
      <button type="submit" className="submit-btn">
        Update User
      </button>
    </form>
  );
};

export default UpdateUserMePage;
