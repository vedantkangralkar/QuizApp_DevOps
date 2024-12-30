import { useState, useEffect } from 'react';

const Timer = ({ quiz, onSubmit, isDarkMode }) => {
    const [timeRemaining, setTimeRemaining] = useState(quiz.timer * 60);

    useEffect(() => {
        // The interval decreases 'timeRemaining' each second and submits when it hits 0
        const timer = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    onSubmit(0);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [onSubmit, quiz.timer]);

    // 'minutes' and 'seconds' handle display formatting for the user
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return (
        <div className={`text-xl font-semibold ${isDarkMode ? 'text-gray-900' : 'text-gray-900'}`}>
            Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
};

export default Timer;

