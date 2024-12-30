import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import { FaCaretDown } from 'react-icons/fa'; // Import the icon
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('False');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    // This function handles user registration and token storage
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // Check if both password fields match before register
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const data = await authService.register({ username, password, role });
            login(data.token);
            // If registration succeeds, navigate to login
            navigate('/login');
        } catch (err) {
            setError(err.msg || 'Registration failed');
        }
    };

    // Toggles between light and dark themes
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Automatically populates the login form with demo credentials
    const handleDemoClick = () => {
        navigate('/login', { state: { username: 'rohit_nain', password: '123456789' } });
    };

    return (
        <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className={`max-w-md w-full space-y-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-10 rounded-xl shadow-md`}>
                <div className="flex justify-between items-center">
                    <h2 className={`text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Register
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
                    {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
                    <div className="rounded-md shadow-sm space-y-4"> {/* Added margin */}
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
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
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                    isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
                                } placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                required
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                    isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
                                } placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="role" className="sr-only">Role</label>
                            <select
                                id="role"
                                name="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                    isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
                                } placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            >
                                <option value="False">User</option>
                                <option value="True">Admin</option>
                            </select>
                            <FaCaretDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" /> {/* Added icon */}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                                isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                            Register
                        </button>
                        <br></br>
                        <button
                            type="submit"
                            onClick={handleDemoClick}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                                isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                            Auto Login For Demo User
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <Link
                        to="/login"
                        className={`text-sm ${isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}`}
                    >
                        Already have an account? Sign In
                    </Link>
                </div>
                <div className="text-center mt-4">
                </div>
            </div>
        </div>
    );
};

export default Register;

