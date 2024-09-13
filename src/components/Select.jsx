import { useState } from "react";
import questionData from "../data/question.json";
import TakeQuiz from "./TakeQuiz.jsx";
import "./Select.css"

const Select = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [flag, setflag] =useState(true)
  const quizzes = Object.keys(questionData).map((key) => ({
    key: key,
    title: questionData[key].title,
  }));

  const handleSelection = (e) => {
    const selectedKey = e.target.value;
    const selectedQuizData = questionData[selectedKey];
    setSelectedQuiz(selectedQuizData);
    setflag(false)
  };

  return (
    <>
    {
    flag ? ( 
        <>
        <h1 className="sel-cont">Select quiz:</h1>
        <div className="opt">
        <select onChange={handleSelection } className="options">
          <option value="">Select a quiz</option>
          {quizzes.map((quiz) => (
            <option key={quiz.key} value={quiz.key}>
              {quiz.title}
            </option>
          ))}
        </select>
        </div>
        </>
        ):(<TakeQuiz data={selectedQuiz} />)
    }
    
    </>
  );
};

export default Select;
