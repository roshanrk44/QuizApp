import { useState } from "react";
import "./Analyse.css"
const Analyse=(data)=>{
    const [currentQuestionIndex, setcurrentQuestionIndex]=useState(0);
    const handleAnswerClick=(index)=>{
        if(index<data.quiz.questions.length-1)
        setcurrentQuestionIndex(index+1);
    else{
        {alert('You are on the last question')}
    }
    }
    const prevHandle=(index)=>{
        setcurrentQuestionIndex(index-1);
      }
    const check=(index)=>{
        let temp1=data.quiz.questions[index].correctOption;
        let temp2=data.ans[index]
        temp1.sort();
        temp2.sort()
        if(JSON.stringify(temp1)===JSON.stringify(temp2))
        {
            return true;
        }
return false;
    }
    return(
        <div className="quiz">
      <div className="container">
        <h2>{data.quiz.title}</h2>
        <h3>Question {currentQuestionIndex + 1}/{data.quiz.questions.length}</h3>
        <p>{data.quiz.questions[currentQuestionIndex].questionText}</p>
        {data.quiz.questions[currentQuestionIndex].options.map((option, index) => (
          <div key={index} className={data.quiz.questions[currentQuestionIndex].correctOption.includes(option)==true ? "green":data.ans[currentQuestionIndex].includes(option) ? "sel":"opt"} >
            <button >
              {option}
            </button>
          </div>
        ))}
        <div className="score">Score: {check(currentQuestionIndex)?1:0}/1</div>
        <div className={currentQuestionIndex==0 ? "pre-div" : "nex-div"}>
        
            <button className={currentQuestionIndex==0 ? "prev-none":"prev"} onClick={() => prevHandle(currentQuestionIndex)}>Prev</button>
          <button className="next" onClick={() => handleAnswerClick(currentQuestionIndex)}>Next</button>
        </div>
      </div>
    </div>
    )
}
export default Analyse;