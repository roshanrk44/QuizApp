import React, { useState } from 'react';
import "./Result.css"
import Analyse from "./Analyse.jsx";

function Result(props) {
  const [flag, setFlag] = useState(false);

  return (
    <div >
      {!flag ? (
        < div className='res-cont'>
          <h1>Quiz Result</h1>
          <h2>Your Score: {props.score} out of {props.quiz.questions.length}</h2>
          <button onClick={() => setFlag(true)}>Check Answers</button>
        </div>
      ) : (
        <Analyse quiz={props.quiz} ans={props.data} />
      )}
    </div>
  );
}

export default Result;
