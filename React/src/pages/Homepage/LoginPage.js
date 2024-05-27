import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../auth";

// UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {currentUser ?
                 children  :

                <LoginPage />
            }
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
function LoginPage() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const { currentUser } = useUser();
    const { googleLogin } = useAuth();
    useEffect(() => {
        const cookie = localStorage.getItem("login");
        if (cookie) {
            googleLogin(cookie).then(() => setLoggedIn(true));
        }
    }, [googleLogin]);

    const handleLoginSuccess = (res) => {
        localStorage.setItem("login", res.credential);
        googleLogin(res.credential).then(() => setLoggedIn(true));
    };
    if (!isLoggedIn) {
        return (
            <div>
                <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
        );
    } else {
        return (
            <div>

                {currentUser.email}
            </div>
        );
    }
}