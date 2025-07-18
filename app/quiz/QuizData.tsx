import React from 'react';
import axios from "axios";

export async function getQuiz() {
    const url = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy'
    const res = await axios.get(url);
    return res.data.results;
}

const QuizData = () => {
    const quiz = getQuiz();

    return (
        <div>
            {quiz}
        </div>
    );
};

export default QuizData;