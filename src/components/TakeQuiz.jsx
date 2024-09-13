import React, { useState, useEffect } from 'react';
import Result from "./Result";
import data from "../data/question.json";
import "./TakeQuiz.css";

function TakeQuiz({data}) {
  const [quiz, setQuiz] = useState(null); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([[]]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [Answers, setAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false); // Track if the quiz is completed
  const [score, setScore] = useState(0); // Store the score after the quiz

  useEffect(() => {
    setQuiz(data);

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle going to the previous question
  const prevHandle = (index) => {
    if (index > 0) {
      setUserAnswers((prev) => {
        const updatedAnswers = [...prev];
        updatedAnswers[currentQuestionIndex] = Answers;
        return updatedAnswers;
      });
      setCurrentQuestionIndex(index - 1);
      setAnswers(userAnswers[index - 1] || []);
    }
  };

  // Handle answer selection
  const handleAnswerClick = (index) => {
    let temp=userAnswers;
    temp[index]=Answers;
    setUserAnswers(temp);


    setAnswers([]); // Reset answers for the next question

    // If it's the last question, calculate the score
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore(); // End quiz and calculate score
    }
  };

  // Handle option selection/deselection
  const handleOptions = (option) => {
    if (!Answers.includes(option)) {
      setAnswers([...Answers, option]);
    } else {
      setAnswers(Answers.filter((ans) => ans !== option));
    }
  };

  // Calculate score and mark the quiz as completed
  const calculateScore = () => {
    let finalScore = 0;
    userAnswers.forEach((answer, index) => {
        let temp1=answer;
        let temp2=quiz.questions[index].correctOption;
        temp1.sort();
        temp2.sort();
      if (JSON.stringify(temp1) === JSON.stringify(temp2)) {
        finalScore += 1;
      }
    });
    
    setScore(finalScore);
    setQuizCompleted(true); // Set quiz as completed to show the Result component
  };

  // Render Result component after quiz completion
  if (quizCompleted) {
    return <Result score={score} data={userAnswers} quiz={quiz} />;
  }

  // Return loading state if quiz data isn't available
  if (!quiz) return <div>Loading...</div>;

  // AutoSubmit if time runs out
  if (timeLeft <= 0) {
    calculateScore();
  }

  return (
    <div className="quiz">
      <div className="container">
        <h1>{quiz.title}</h1>
        <h2>Question {currentQuestionIndex + 1}/{quiz.questions.length}</h2>
        <h2>Time Left: {timeLeft} seconds</h2>
        <p>{quiz.questions[currentQuestionIndex].questionText}</p>

        {quiz.questions[currentQuestionIndex].options.map((option, index) => (
          <div key={index} className={Answers.includes(option) ? "select" : "option"}>
            <button onClick={() => handleOptions(option)}>
              {option}
            </button>
          </div>
        ))}
    <div className='clear-response'><button onClick={()=>setAnswers([])}>Clear Response</button></div>
        <div className={currentQuestionIndex==0 ? "pre-div" : "nex-div"}>
            <button className={currentQuestionIndex==0 ? "prev-none":"prev"} onClick={() => prevHandle(currentQuestionIndex)}>Prev</button>
          <button className="next" onClick={() => handleAnswerClick(currentQuestionIndex)}>Next</button>
          </div>
      </div>
    </div>
  );
}

export default TakeQuiz;
