import { createContext, useContext, useState } from "react";
import { RenderHeader } from "../components/structure/Header";
import { RenderMenu, RenderRoutes } from "../components/structure/RenderNavigation";

// Create AuthContext for accessing authentication data
const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {

     // State to manage user details
     const [ user, setUser ] = useState({ name: "", isAuthenticated: false, memberId: null });

     // Login function that makes an API call to authenticate the user
    const login = async (userName, password) => {
      try {
        const response = await fetch("/members/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, password }),
        });

        // Check for successful response
        if (!response.ok) {
          const errorData = await response.json(); // Try to get error message from server
          throw new Error(errorData?.message || "Login failed"); // Use server message or default
        }

        // Parse the JSON response
        const data = await response.json();

        // Validate response format (optional)
        if (!data || !data.memberid) {
          throw new Error("Invalid response format from server"); // More specific error message
        }

        // If successful login, set user data and return success message
        setUser({ name: userName, isAuthenticated: true, memberid: data.memberid, firstname: data.firstName});
        return "success";
      } catch (error) {
        throw error; // Re-throw the error for handling in the component
      }

     };

     // Logout function that clears user data
     const logout = () => {
          setUser({ name: "", isAuthenticated: false, memberId: null });
     };

     return (
          <AuthContext.Provider value={{ user, login, logout }}>
               <>
                    <RenderHeader />
                    <RenderMenu />
                    <RenderRoutes />
               </>
          </AuthContext.Provider>
     );
};
