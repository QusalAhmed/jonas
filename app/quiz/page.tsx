'use client'
import React from 'react';

// Local
import PathDrawing from "./Drawing"
import Variants from "./Propogation"

// Shad CN
import { Progress } from "@/components/ui/progress"

// Framer Motion
import { motion, AnimatePresence } from "motion/react"

const quiz = [
    {
        id: 1,
        question: 'Who was the first President of the United States?',
        options: ['George Washington', 'Thomas Jefferson', 'Abraham Lincoln', 'John Adams'],
        answer: 'George Washington'
    },
    {
        id: 2,
        question: 'What is the smallest planet in our solar system?',
        options: ['Mercury', 'Mars', 'Venus', 'Pluto'],
        answer: 'Mercury'
    },
    {
        id: 3,
        question: 'Which element has the atomic number 1?',
        options: ['Oxygen', 'Hydrogen', 'Helium', 'Carbon'],
        answer: 'Hydrogen'
    },
    {
        id: 4,
        question: 'In which year did World War II end?',
        options: ['1945', '1939', '1942', '1950'],
        answer: '1945'
    },
    {
        id: 5,
        question: 'What is the currency of the United Kingdom?',
        options: ['Euro', 'Dollar', 'Pound Sterling', 'Franc'],
        answer: 'Pound Sterling'
    },
    {
        id: 6,
        question: 'Which artist painted the Mona Lisa?',
        options: ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Michelangelo'],
        answer: 'Leonardo da Vinci'
    },
    {
        id: 7,
        question: 'What is the tallest mountain in the world?',
        options: ['K2', 'Mount Kilimanjaro', 'Mount Everest', 'Denali'],
        answer: 'Mount Everest'
    },
    {
        id: 8,
        question: 'Which organ in the human body is responsible for pumping blood?',
        options: ['Lungs', 'Brain', 'Heart', 'Liver'],
        answer: 'Heart'
    },
    {
        id: 9,
        question: 'What is the main ingredient in guacamole?',
        options: ['Tomato', 'Avocado', 'Onion', 'Cucumber'],
        answer: 'Avocado'
    },
    {
        id: 10,
        question: 'Which movie features the character "Forrest Gump"?',
        options: ['Cast Away', 'Forrest Gump', 'Saving Private Ryan', 'The Green Mile'],
        answer: 'Forrest Gump'
    }
];

const Quiz = () => {
    const [userAnswer, setUserAnswer] = React.useState({} as { [key: number]: string });
    const [progress, setProgress] = React.useState(0)
    const currentQuestionIndex = Object.keys(userAnswer).length;

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(timer);
                    if (currentQuestionIndex < quiz.length)
                        handleAnswer(quiz[currentQuestionIndex].id, '');
                    return 100;
                } else {
                    return prevProgress + 1;
                }
            });
        }, 100);

        return () => {
            clearInterval(timer);
            setProgress(0);
        }
    }, [currentQuestionIndex]);

    function handleAnswer(questionId: number, selectedOption: string) {
        setTimeout(() => {
            setUserAnswer((prevAnswer) => ({
                ...prevAnswer,
                [questionId]: selectedOption
            }));
        }, 1000)
    }

    return (
        <>
            <PathDrawing/>
            {currentQuestionIndex < quiz.length ? (
                <div className={'flex flex-col items-center justify-center h-screen'}>
                    <Progress value={100 - progress}
                              className='w-2/3 [&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-red-500'/>
                    <AnimatePresence mode="popLayout">
                        <motion.h2 className={'text-3xl p-2 font-semibold'}
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