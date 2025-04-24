import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      tokenExpiration: null,

      login: (token, user, expiresAt) => {
        set({
          token,
          user,
          isAuthenticated: true,
          tokenExpiration: expiresAt * 1000,
        });

        localStorage.setItem("token", token);
      },

      isTokenExpired: () => {
        const expiration = get().tokenExpiration;
        if (!expiration) return true;

        const now = Date.now();
        return now >= expiration;
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          tokenExpiration: null,
        });
        localStorage.removeItem("token");
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;