import { useEffect, useState } from "react";
import "./Question.css"

function Question (prop){//section for check question and provide ans
    // console.log("in qs");
    const [ans,setans]=useState();//set ans from server response
    const [option1,setOption1]=useState();//setup questions and options from server
    const [option2,setOption2]=useState();
    const [option3,setOption3]=useState();
    const [option4,setOption4]=useState();

    const [colorOption1,setcolorOption1]=useState({backgroundColor:"rgb(216, 216, 216)"}); //setup to change indivisual color
    const [colorOption2,setcolorOption2]=useState({backgroundColor:"rgb(216, 216, 216)"});
    const [colorOption3,setcolorOption3]=useState({backgroundColor:"rgb(216, 216, 216)"});
    const [colorOption4,setcolorOption4]=useState({backgroundColor:"rgb(216, 216, 216)"});


    // console.log(option1);
    async function handleClick(event){//whenever clicked any option 
        const value=event.target.value;//getting value of the option
        // console.log(value);
        await fetch('/api/answer', {//fetch answer from backend
            method: 'post',
            headers: {'content-type': 'application/json' },
            body: JSON.stringify({answer:value})})
            .then(response => response.json())
            .then((data) =>{
                setans(data.ans);
                console.log(data.ans);
                setOption1(prop.qs.op1);
                setOption2(prop.qs.op2);
                setOption3(prop.qs.op3);
                setOption4(prop.qs.op4);    
            });
    }
    useEffect(() => {
        if  (ans!=null){//setting up color
            if (ans===option1) setcolorOption1({backgroundColor:"#85d358"});//green for right
            else setcolorOption1({backgroundColor:"#f35d5d"});//red for wrong
            if (ans===option2) setcolorOption2({backgroundColor:"#85d358"});
            else setcolorOption2({backgroundColor:"#f35d5d"});
            if (ans===option3) setcolorOption3({backgroundColor:"#85d358"});
            else setcolorOption3({backgroundColor:"#f35d5d"});
            if (ans===option4) setcolorOption4({backgroundColor:"#85d358"});
            else setcolorOption4({backgroundColor:"#f35d5d"});
        }
    },[option1,option2,option3,option4,ans])

    return  <div>
        <div className="qscontainer">
            <div className="quiz-container" id="quiz">
            <div className="quiz-header">
            <h2 id="question" value>{prop.qs.qs}</h2>
                    <ul>
                        <li style={colorOption1} className="forli">
                            <input type="radio" id="a" name="answer" onClick={handleClick} value={prop.qs.op1} className="answer" />
                            <label id="a_text" for="a" onClick={handleClick}>{prop.qs.op1}</label>
                        </li>
                        <li style={colorOption2} className="forli">
                            <input type="radio" id="b" name="answer" onClick={handleClick} value={prop.qs.op2} className="answer" />
                            <label id="b_text" for="b">{prop.qs.op2}</label>
                        </li>
                        <li style={colorOption3} className="forli">
                            <input type="radio" id="c" name="answer" onClick={handleClick} value={prop.qs.op3} className="answer" />
                            <label id="c_text" for="c">{prop.qs.op3}</label>
                        </li>
                        <li style={colorOption4} className="forli">
                            <input type="radio" id="d" name="answer" onClick={handleClick} value={prop.qs.op4} className="answer" />
                            <label id="d_text" for="d">{prop.qs.op4}</label>
                        </li>
                    </ul>
            </div>
            <button className="qsButton" id="submit" onClick={()=>{
                setcolorOption1({backgroundColor:"rgb(216, 216, 216)"});
                setcolorOption2({backgroundColor:"rgb(216, 216, 216)"});
                setcolorOption3({backgroundColor:"rgb(216, 216, 216)"});
                setcolorOption4({backgroundColor:"rgb(216, 216, 216)"});
                setans(null);
                prop.setNext((prev)=>{return prev ? false: true});
            }}>Next</button>
            </div>
        </div>
    </div>
}
export default Question;