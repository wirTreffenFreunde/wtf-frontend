import React, { useState } from "react";
import axios from "axios";

const UserContext = React.createContext();

function useUserContext() {
    const context = React.useContext(UserContext);
    if (context === undefined) {
        throw new Error("UserContext must be used within a MapProvider");
    }
    return context;
}

function UserProvider({ children }) {
    // input fields for everyone
    const [user, setUser] = useState(localStorage.getItem('token') || sessionStorage.getItem('token') || null);

  
   

    
    const value = {
        user,
        setUser
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider, useUserContext };