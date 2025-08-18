'use client'
import React, { useState } from 'react';
import axios from 'axios';

// Local
import PathDrawing from "./Drawing"
import Variants from "./Propogation"
import useOnlineStatus from './useOnlineStatus';
import { TimedProgressBar } from './Progress'

// Framer Motion
import { motion, AnimatePresence } from "motion/react"

interface QuizData {
    response_code: boolean,
    results: {
        type: string,
        difficulty: string,
        category: string,
        question: string,
        correct_answer: string,
        incorrect_answers: string[],
    }[]
}

interface Quiz {
    id: number,
    question: string,
    options: string[],
    answer: string
}

function decodeHtml(html: string): string {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

const Quiz = () => {
    const [userAnswer, setUserAnswer] = React.useState({} as { [key: number]: string });
    const [quiz, setQuiz] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(false);
    const currentQuestionIndex = Object.keys(userAnswer).length;
    const isOnline = useOnlineStatus();

    React.useEffect(() => {
        axios.get('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy')
            .then((r) => {
                const data: QuizData = r.data;
                const d = data.results.map((item, index) => {
                    item.incorrect_answers.push(item.correct_answer);
                    return {
                        id: index,
                        question: decodeHtml(item.question),
                        options: item.incorrect_answers.map(opt => decodeHtml(opt)).toSorted(),
                        answer: decodeHtml(item.correct_answer)
                    }
                });
                setQuiz(d);
            });
    }, [])

    React.useEffect(() => {
        const timer = setInterval(() => {
            if (currentQuestionIndex < quiz.length) {
                handleAnswer(quiz[currentQuestionIndex].id, '');
            } else {
                clearInterval(timer);
                location.reload();
            }
        }, 10000)

        return () => clearInterval(timer);
    }, [currentQuestionIndex, quiz])

    React.useEffect(()=>{
        console.log("Starting Testing useEffect");
        console.log(userAnswer);
        console.log("User Answer: Should be like this");
    }, [userAnswer])

    function handleAnswer(questionId: number, selectedOption: string) {
        setLoading(true);
        setTimeout(() => {
            setUserAnswer((prevAnswer) => ({
                ...prevAnswer,
                [questionId]: selectedOption
            }));
            setLoading(false);
        }, 100)
    }

    return (
        <>
            <PathDrawing/>
            <button disabled={!isOnline}>
                {isOnline ? 'Online' : 'Reconnecting...'}
            </button>
            {currentQuestionIndex < quiz.length ? (
                <div className='flex flex-col items-center justify-center h-screen'>
                    <TimedProgressBar duration={10} height={8} resetFor={[currentQuestionIndex, quiz]}/>
                    <AnimatePresence mode="popLayout">
                        <motion.h2 className={'text-3xl p-2 font-semibold w-4/5'}
                                   key={quiz[currentQuestionIndex].id}
                                   initial={{y: -10, opacity: 0}}
                                   animate={{y: 0, opacity: 1}}
                                   exit={{y: 10, opacity: 0}}
                                   transition={{ease: "easeOut", duration: 0.5}}
                        >
                            {currentQuestionIndex + 1}. {quiz[currentQuestionIndex].question}
                        </motion.h2>
                    </AnimatePresence>
                    {quiz[currentQuestionIndex].options.map((option, index) => (
                        <motion.button
                            key={`${currentQuestionIndex}-${index}`}
                            className='bg-blue-500 hover:bg-cyan-400 text-white p-2 m-2 rounded-2xl w-1/2 cursor-pointer'
                            onClick={(e) => {
                                e.currentTarget.classList.add('bg-yellow-500', 'hover:bg-yellow-500');
                                e.currentTarget.disabled = true;
                                handleAnswer(quiz[currentQuestionIndex].id, option)
                            }}
                            disabled={loading}
                            whileHover={{scale: 1.05}}
                            transition={{type: 'spring', stiffness: 500, damping: 10}}
                        >
                            <motion.span
                                initial={{color: "rgb(0,0,0)"}}
                                animate={{color: "rgb(255,255,255)"}}
                                transition={{duration: 2}}
                            >
                                {option}
                            </motion.span>
                        </motion.button>
                    ))}
                </div>
            ) : (
                <div className="w-full max-w-4xl mx-auto p-4">
                    <h2 className={'text-3xl p-2 font-semibold mb-4 text-center'}>Quiz Completed!</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Question</th>
                                <th className="border p-2">Your Answer</th>
                                <th className="border p-2">Correct Answer</th>
                                <th className="border p-2">Result</th>
                            </tr>
                            </thead>
                            <tbody>
                            {quiz.map((q) => (
                                <tr key={q.id}>
                                    <td className="border p-2">{q.question}</td>
                                    <td className="border p-2">{userAnswer[q.id]}</td>
                                    <td className="border p-2">{q.answer}</td>
                                    <td className="border p-2">
                                        {userAnswer[q.id] === q.answer ? (
                                            <span className="text-green-600">Correct</span>
                                        ) : (
                                            <span className="text-red-600">Incorrect</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <Variants/>
        </>
    );
};

export default Quiz;