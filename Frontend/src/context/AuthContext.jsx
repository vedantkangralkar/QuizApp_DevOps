import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // This effect syncs 'token' with local storage whenever it changes
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    // 'login' updates the token state, triggering the effect above
    const login = (token) => setToken(token);
    // 'logout' resets the token to null, removing it from local storage
    const logout = () => setToken(null);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
