import { Outlet, Navigate, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import useAuthStore from "@/lib/authStore";
import { useState, useEffect } from "react";
import SidebarToggleButton from "@/components/buttons/SidebarToggleButton";

const entities = ["users", "products", "orders", "leads", "opportunities"];

function AuthLayout() {
  const location = useLocation();
  const { token, isTokenExpired } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleSidebarToggle = (e) => {
      setSidebarOpen(e.detail.isOpen);
    };
    window.addEventListener("sidebarToggle", handleSidebarToggle);
    return () =>
      window.removeEventListener("sidebarToggle", handleSidebarToggle);
  }, []);

  if (!token || isTokenExpired()) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Top Navigation */}
      <div className="h-12 w-full fixed top-0 left-0 z-10 bg-blue-600 shadow flex items-center">
        {/* Sidebar toggle button */}
        <div className="w-16">
          <SidebarToggleButton />
        </div>

        <Navigation />
      </div>

      {/* Body layout starts below nav */}
      <div className="flex flex-grow pt-12 min-h-0">
        {" "}
        /{/* Sidebar */}
        <div
          className={`bg-gray-800 text-white transition-all duration-300 ${
            sidebarOpen ? "w-64" : "w-16"
          }`}
        >
          <Sidebar isOpen={sidebarOpen} />
        </div>
        {/* Main content area */}
        <main className="flex-grow bg-gray-100 overflow-y-auto">
          <Outlet context={{ entities }} />
        </main>
      </div>
    </div>
  );
}

export default AuthLayout;
