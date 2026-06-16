import { toast } from "react-toastify";
import { create } from "zustand";

type User = {
  _id: string;
  username: string;
  email: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;

  getUser: () => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  getUser: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/me`,
        {
          credentials: "include",
        },
      );

      const data = await response.json();

      if (response.ok) {
        set({
          user: data.user,
          isAuthenticated: true,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({
        loading: false,
      });
    }
  },

  logout: async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );
    const data = await response.json();
    if (!response.ok) {
      toast.error("Logout Unsuccessfull");
    } else {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
      toast.success("Logout Successfull");
    }
  },
}));
