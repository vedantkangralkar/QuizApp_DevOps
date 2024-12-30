import axios from 'axios';

const API_URL = 'https://quiz-webapp-with-admin-panel-2.onrender.com/api/quizzes';

const quizService = {
    // Fetch all quizzes with pagination, using token for authorization
    getAllQuizzes: async (page = 1, limit = 10) => {
        // console.log(localStorage.getItem('token'));
        // console.log("sdfsdf");
        try {
            const response = await axios.get('https://quiz-webapp-with-admin-panel-2.onrender.com/api/quizzes', {
                params: { page, limit },
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
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

    // Fetch a quiz by its ID
    getQuizById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
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

    // Submit quiz answers and remaining time
    submitQuizResults: async (quizId, { answers, timeRemaining }, token) => {
        try {
            const response = await axios.post(`${API_URL}/${quizId}/results`, { answers, timeRemaining }
                , {
                headers: { 'x-auth-token': token },
            }
        );
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

    // Retrieve quiz results using the quiz ID and token
    getQuizResults: async (quizId, token) => {
        try {
            const response = await axios.get(`${API_URL}/${quizId}/results`, {
                headers: { 'x-auth-token': token },
            });
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

    // Create a new quiz with the given data
    createQuiz: async (quizData, token) => {
        try {
            const response = await axios.post(API_URL, quizData, {
                headers: { 'x-auth-token': token },
            });
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

    // Update an existing quiz by its ID
    updateQuiz: async (id, quizData, token) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, quizData, {
                headers: { 'x-auth-token': token },
            });
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

    // Delete a quiz by its ID
    deleteQuiz: async (id, token) => {
        // console.log("---");
        try {
            const response = await axios.delete(`${API_URL}/${id}`, {
                headers: { 'x-auth-token': token },
            });
            return response.data;
        } catch (error) {
            alert(error.message);
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

export default quizService;
