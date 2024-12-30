import axios from 'axios';

const API_URL = 'https://quiz-webapp-with-admin-panel-2.onrender.com/api/auth';

const authService = {
    // Register a new user and store token in local storage
    register: async (userData) => {
        // console.log(userData);
        try {
            const response = await axios.post(`${API_URL}/register`, userData);
            localStorage.setItem('token', response.data.token);
            return response.data.token;
        } catch (error) {
            if (error.response) {
                throw error.response.data; 
            } else if (error.request) {
                throw { msg: "No response from server" };
            } else {
                throw { msg: error.message };
            }
        }
    },

    // Login an existing user and store token in local storage
    login: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/login`, userData);
            localStorage.setItem('token', response.data.token);

            return response.data;
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw { msg: "No response from server" };
            } else {
                throw { msg: error.message };
            }
        }
    },
};

export default authService;
