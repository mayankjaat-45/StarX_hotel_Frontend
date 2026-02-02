import { createContext, useContext, useEffect, useState } from "react";
import api, { publicApi } from "../lib/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me/");
      setUser(res.data.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUser(null);
      } else {
        console.error("Fetch user failed", err);
      }
    }
  };

  useEffect(() => {
    let mounted = true;
    const token = localStorage.getItem("access");

    if (!token) {
      setLoading(false);
      return;
    }

    fetchUser().finally(() => {
      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const login = async (credentials) => {
    const res = await publicApi.post("/login/", credentials);

    localStorage.setItem("access", res.data.data.access);
    localStorage.setItem("refresh", res.data.data.refresh);

    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
