import { useState } from "react";
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

    const [completed,setCompleted]= useState(false);

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
                if (data.hasOwnProperty("completed")){
                    setCompleted (true);
                }
                else{
                    setans(data.ans);
                    console.log(data.ans);
                    setOption1(prop.qs.op1);
                    setOption2(prop.qs.op2);
                    setOption3(prop.qs.op3);
                    setOption4(prop.qs.op4);
                }
            })
    }
    setTimeout(() => {//to slowdown rerendering
        if (completed===true) return<h1>completed!!</h1>
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
    }, 100);
    return <div>
    <div class="qscontainer">
        <div class="quiz-container" id="quiz">
        <div class="quiz-header">
        <h2 id="question" value>{prop.qs == null ? <p>Loading...</p> : prop.qs.qs}</h2>
                <ul>
                    <li style={colorOption1} className="forli">
                        <input type="radio" id="a" name="answer" onClick={handleClick} value={prop.qs == null ? <p>Loading...</p> : prop.qs.op1} class="answer" />
                        <label id="a_text" for="a" onClick={handleClick}>{prop.qs == null ? <p>Loading...</p> : prop.qs.op1}</label>
                    </li>
                    <li style={colorOption2} className="forli">
                        <input type="radio" id="b" name="answer" onClick={handleClick} value={prop.qs == null ? <p>Loading...</p> : prop.qs.op2} class="answer" />
                        <label id="b_text" for="b">{prop.qs == null ? <p>Loading...</p> : prop.qs.op2}</label>
                    </li>
                    <li style={colorOption3} className="forli">
                        <input type="radio" id="c" name="answer" onClick={handleClick} value={prop.qs == null ? <p>Loading...</p> : prop.qs.op3} class="answer" />
                        <label id="c_text" for="c">{prop.qs == null ? <p>Loading...</p> : prop.qs.op3}</label>
                    </li>
                    <li style={colorOption4} className="forli">
                        <input type="radio" id="d" name="answer" onClick={handleClick} value={prop.qs == null ? <p>Loading...</p> : prop.qs.op4} class="answer" />
                        <label id="d_text" for="d">{prop.qs == null ? <p>Loading...</p> : prop.qs.op4}</label>
                    </li>
                </ul>
        </div>
          <a href="/" style={{textDecoration:"none"}}><button id="submit" type="submit">Next</button> </a>
        </div>
    </div>
    </div>
}
export default Question;