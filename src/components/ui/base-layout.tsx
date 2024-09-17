import Navbar from "@/components/ui/navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const BaseLayout: React.FC = () => {
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
