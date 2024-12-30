import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Result = () => {
    const { resultId } = useParams();
    const { quizID } = useParams();
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const[token]=useState(localStorage.getItem('token'));
    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await axios.get(`https://quiz-webapp-with-admin-panel-2.onrender.com/api/quizzes/${quizID}results/${resultId}`, {
                    headers: { 'x-auth-token': token },
                });
                setResult(res.data);
            } catch (err) {
                setError(err.msg || "Could not fetch result");
                console.error(err);
            }
        };
        fetchResult();
    }, [resultId, token,quizID]);

    if(error){
        return <div>Error: {error}</div>
    }

    if (!result) return <div>Loading...</div>;

    return (
        <div className="result">
            <h2>Quiz Result</h2>
            <p>Score: {result.score}</p>
        </div>
    );
};

export default Result;
