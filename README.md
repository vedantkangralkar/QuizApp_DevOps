# Quiz-WebApp-with-Admin-Panel

Quiz-WebApp-with-Admin-Panel is a comprehensive online quiz web application built using the MERN stack (MongoDB, Express.js, React, and Node.js). It features a user-friendly interface for quiz participants and a powerful admin panel for managing quizzes and tracking user performance.

## Features

- **User Authentication:** Secure sign-up and login functionality using JWT.
- **Responsive Design:** Optimized for desktops, tablets, and mobile devices.
- **Admin Panel:** Manage quizzes, categories, and users.
- **Real-time Results:** Instant feedback on quiz performance.
- **Analytics Dashboard:** Track user engagement and quiz statistics.
- **Interactive UI:** Intuitive and user-friendly interface built with React.
- **Dark/Light Mode:** Toggle between dark and light themes.

## Technologies Used

- **Frontend:** React, JavaScript, HTML, CSS
- **Backend:** Express.js, Node.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** [Specify your deployment platform, e.g., Heroku, Vercel]

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/rohit141914/Quiz-WebApp-with-Admin-Panel.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd Quiz-WebApp-with-Admin-Panel
    ```
3. **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```
4. **Install frontend dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```
5. **Configure environment variables:**
    - Create a `.env` file in both `backend` and `frontend` directories.
    - Add necessary configurations (e.g., MongoDB URI, JWT secret).

6. **Run the application:**
    ```bash
    cd backend
    nodemon index.js
    ```
    ```bash
    cd ../frontend
    npm run dev
    ```

## Usage

### User Side:
- **Register or Log In:** Users can sign up or log in to start taking quizzes.
- **Select Quiz:** Choose from available quizzes and start answering questions.
- **View Results:** Get instant feedback on quiz performance upon completion.

### Admin Side:
- **Access Admin Panel:** Navigate to `/admin` to access the admin dashboard.
- **Manage Quizzes:** Create, update, or delete quizzes.
- **Monitor User Activity:** View quiz results and track user performance.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or support, please contact [rohitnainindian@gmail.com](mailto:youremail@example.com).