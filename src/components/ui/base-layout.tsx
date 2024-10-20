import Navbar from "@/components/ui/navbar";
import { setRedirectToSignIn } from "@/services/axios-instance";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const BaseLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setRedirectToSignIn(() => navigate("/login"));
  }, [navigate]);

  return (
    <React.Fragment>
      <header className="bg-primary text-dark">
        <Navbar />
      </header>
      <main className="min-h-screen container mx-auto py-10">
        <Outlet />
      </main>
    </React.Fragment>
  );
};

export default BaseLayout;
