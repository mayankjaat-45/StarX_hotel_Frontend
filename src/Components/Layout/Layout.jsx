import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-(--bg-cream)">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-14">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
