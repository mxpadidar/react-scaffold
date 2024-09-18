import useAuth from "@/hooks/use-auth";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="border-b mb-4">User Profile</h1>
      <div className="grid gap-2">
        <div>
          <strong>id: </strong> {user?.id}
        </div>

        <div>
          <strong>email: </strong> {user?.email}
        </div>

        <div>
          <strong>first name:</strong> {user?.firstName ?? "no first name"}
        </div>

        <div>
          <strong>last name:</strong> {user?.lastName ?? "no last name"}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
