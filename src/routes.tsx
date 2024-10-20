import BaseLayout from "@/components/ui/base-layout";
import HomePage from "@/pages/home-page";
import NotFoundPage from "@/pages/not-found-page";
import ProfilePage from "@/pages/profile-page";
import RegistrationPage from "@/pages/registration-page";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/protected-route";
import LoginPage from "./pages/login-page";
import UpdateUserMePage from "./pages/update-user-me-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/update",
        element: (
          <ProtectedRoute>
            <UpdateUserMePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegistrationPage />,
      },
    ],
  },
]);

export default router;
