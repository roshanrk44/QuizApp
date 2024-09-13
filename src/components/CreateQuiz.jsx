import React, { useState } from 'react';
import "./CreateQuiz.css"
function CreateQuiz() {
  const [quiz, setQuiz] = useState({
    title: '',
    questions: []
  });
  const [option, setoption]=useState("")
  const [index, setindex] =useState(0);
  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { questionText: '', options: [''], correctOption: [''] }
      ]
    });
    setindex(0)
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index].questionText = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleOptionChange = (questionIndex) => {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].options[index] = option;
    newQuestions[questionIndex].options[index+1] = "";
    setindex(index+1)
    setoption("");
    setQuiz({ ...quiz, questions: newQuestions });

  };

  const handleCorrectOptionChange = (questionIndex, value) => {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].correctOption = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleSubmit = () => {
    // Backend part
  };

  return (
    <div className='input'>
      <h2>Create a New Quiz</h2>
      <input
        type="text"
        placeholder="Quiz Title"
        value={quiz.title}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
      />

      {quiz.questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <textarea
          className='question'
            type="text"
            rows="4" 
            cols="50"
            placeholder="Enter Question"
            value={question.questionText}
            onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
           
          />
          <br/>
             {question.options.map((option, optionIndex) => (
             <>
              <input
                key={optionIndex}
                type="text"
                placeholder={`Option ${optionIndex + 1}`}
                onChange={(e) => setoption(e.target.value)}
              />
              <br/>
              </> 
            ))}
            <br/>
            <button className="button" onClick={()=>handleOptionChange(questionIndex)}>Add Options</button>
          <div>
          </div>
          <input
            type="text"
            placeholder="Correct Answer"
            value={question.correctOption}
            onChange={(e) => handleCorrectOptionChange(questionIndex, e.target.value)}
          />
        </div>
      ))}
      <br/>
      <button className="button" onClick={addQuestion}>Add Question</button>
      <button className="button" onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
}

export default CreateQuiz;
