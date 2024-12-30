import { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';
import { AuthContext } from '../context/AuthContext';
// import { FaCaretDown } from 'react-icons/fa'; // Import the icon

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (location.state) {
            setUsername(location.state.username || '');
            setPassword(location.state.password || '');
        }
    }, [location.state]);

    // Handles login or registration (depending on isLogin) and navigates on success
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // If isLogin is true, attempt login; otherwise do registration
            if (isLogin) {
                const data = await authService.login({ username, password });
                login(data.token);
                if(data.role==="True"){
                    navigate('/admin');
                }
                if(data.role==="False"){
                navigate('/');
                }
            } else {
                await authService.register({ username, email, password });
                setIsLogin(true);
                setError('Registration successful. Please log in.');
            }
        } catch (err) {
            setError(err.msg || (isLogin ? 'Login failed' : 'Registration failed'));
        }
    };

    // Toggles dark/light mode
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className={`max-w-md w-full space-y-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-10 rounded-xl shadow-md`}>
                <div className="flex justify-between items-center">
                    <h2 className={`text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </h2>
                    <button
                        onClick={toggleTheme}
                        className={`px-4 py-2 rounded-md ${
                            isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'
                        }`}
                    >
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <p className={`text-sm font-medium ${error.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                            {error}
                        </p>
                    )}
                    <div className="rounded-md shadow-sm space-y-4"> {/* Added margin */}
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                    isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
                                } placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        {!isLogin && (
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                        isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
                                    } placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        )}
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                    isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
                                } placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                                isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <button
                        onClick={() => {
                            if (isLogin) {
                                navigate('/register');
                            } else {
                                setIsLogin(true);
                            }
                        }}
                        className={`text-sm ${isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}`}
                    >
                        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;

