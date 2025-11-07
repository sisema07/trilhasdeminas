
import React, { useState } from 'react';
import type { QuizQuestion } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);
    if (answer === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(i => i + 1);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };
  
  const restartQuiz = () => {
      setCurrentQuestionIndex(0);
      setScore(0);
      setIsFinished(false);
  }

  if (isFinished) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800 my-6">Quiz Finalizado!</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-2xl text-gray-700">Sua pontuação final é:</p>
            <p className="text-6xl font-bold text-emerald-500 my-4">{score} / {questions.length}</p>
            <button 
                onClick={restartQuiz} 
                className="mt-6 bg-emerald-500 text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-600 transition-colors"
            >
                Jogar Novamente
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 my-6">Quiz das Trilhas</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-sm text-gray-500 mb-2">Pergunta {currentQuestionIndex + 1} de {questions.length}</p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">{currentQuestion.question}</h2>
        <div className="space-y-4">
          {currentQuestion.options.map(option => {
            let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-colors ';
            if (showFeedback) {
              if (option === currentQuestion.correctAnswer) {
                buttonClass += 'bg-green-100 border-green-500 text-green-800';
              } else if (option === selectedAnswer) {
                buttonClass += 'bg-red-100 border-red-500 text-red-800';
              } else {
                buttonClass += 'bg-gray-100 border-gray-300';
              }
            } else {
              buttonClass += 'bg-gray-100 border-gray-300 hover:bg-emerald-100 hover:border-emerald-400';
            }

            return (
              <button key={option} onClick={() => handleAnswer(option)} className={buttonClass} disabled={showFeedback}>
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
