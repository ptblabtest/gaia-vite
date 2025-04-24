import { useEffect, useState } from "react";
import useAuthStore from "@lib/authStore";

const AuthWrapper = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isTokenExpired = useAuthStore((state) => state.isTokenExpired);
  const logout = useAuthStore((state) => state.logout);
  const [attempts, setAttempts] = useState(0);
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (isTokenExpired()) {
      logout();
      window.location.href = "/auth/login";
      return;
    }

    if (isAuthenticated) {
      setCanRender(true);
      setAttempts(0);
    } else if (attempts < 5) {
      const retryTimeout = setTimeout(() => {
        setAttempts((prev) => prev + 1);
      }, 500);

      return () => clearTimeout(retryTimeout);
    } else {
      window.location.href = "/auth/login";
    }
  }, [isAuthenticated, isTokenExpired, logout, attempts]);

  if (!canRender) return null;

  return <>{children}</>;
};

export default AuthWrapper;
