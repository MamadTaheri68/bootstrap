import { createContext, useState } from "react";
import { useRouter } from "next/router";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   const handleErrors = (message) => {
      const errors = [];
      Object.keys(message).map((key) => {
         message[key].map((e) => {
            errors.push(e);
         });
      });
      return errors.join();
   };

   // Register user
   const register = async (user) => {
      setError(null);
      setLoading(true);
      const res = await fetch("/api/auth/register", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
         },
         body: JSON.stringify(user),
      });
      const data = await res.json();
      if (res.ok) {
         setLoading(false);
         router.push("/auth/login");
      } else {
         setError(handleErrors(data.message));
         setLoading(false);
      }

      console.log(data);
   };

   // Login user
   const login = async (user) => {
      console.log(user);
   };

   // Logout user
   const logout = async () => {
      console.log("logout");
   };

   // Check if user logged in
   const checkUserLoggedIn = async () => {
      console.log("logout");
   };

   return (
      <AuthContext.Provider value={{ error, loading, register, login, logout, checkUserLoggedIn }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthContextProvider;
