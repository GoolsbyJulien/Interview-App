import User from "./classes/User";
import { useUser } from "./pages/Homepage/LoginPage";

export const useAuth = () => {


    const { setCurrentUser } = useUser();

    const googleLogin = async (token) => {
        try {
            const response = await fetch('http://localhost:5026/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Token: token || "-1" })
            });

            const data = await response.json();
            const user = new User(data.email, data.tokens);
            setCurrentUser(user);
            return user;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };

    return { googleLogin };
};