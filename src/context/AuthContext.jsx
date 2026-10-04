import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isLoggedIn") === "true", // refresh la inga irundhu padikkum
  );

  const authenticated = () => {
    setIsAuthenticated((prev) => !prev);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
