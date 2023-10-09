import { useState } from "react";
import "./AddQuestion.css";
export default function AddQuestion() {
  const[qs,setQs]=useState("");
  const[op1,setOp1]=useState("");
  const[op2,setOp2]=useState("");
  const[op3,setOp3]=useState("");
  const[op4,setOp4]=useState("");
  const[ans,setAns]=useState("Select an Answer");
  const[tq,setTq]=useState("Type of Question");
  const [status,setStatus]=useState();
  async function handleSubmit(){
    if (qs===""){
      setStatus(<p style={{color:"red"}} >Please Add a Question</p>);
      return;
    }
    if (op1===""){
      setStatus(<p style={{color:"red"}} >Please Add Option 1</p>);
      return;
    }
    if (op2===""){
      setStatus(<p style={{color:"red"}} >Please Add Option 2</p>);
      return;
    }
    if (op3===""){
      setStatus(<p style={{color:"red"}} >Please Add Option 3</p>);
      return;
    }
    if (op4===""){
      setStatus(<p style={{color:"red"}} >Please Add Option 4</p>);
      return;
    }
    if (ans==="Select an Answer"){
      setStatus(<p style={{color:"red"}} >Please Select an Answer</p>);
      return;
    }
    if (tq==="Type of Question"){
      setStatus(<p style={{color:"red"}} >Please Mention Question Type</p>);
      return;
    }
    await fetch('/api/addQuestion', {//fetch answer from backend
      method: 'post',
      headers: {'content-type': 'application/json' },
      body: JSON.stringify({
        question:qs,
        op1:op1,
        op2:op2,
        op3:op3,
        op4:op4,
        ans:ans,
        type:tq
      })})
      .then(response => response.json())
      .then((data) =>{
        if(data==="updated") 
          setStatus(<p style={{color:"green"}}>Submitted Successfully !!</p>);
        else if(data==="duplicate")
          setStatus(<p style={{color:"red"}} >Opps!! Question already exist</p>);
        else setStatus(<p style={{color:"red"}} >Opps!! Something went Wrong</p>);
      });
  }
  return (
      <div id="my-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div
          className="modal-dialog  modal-dialog-centered justify-content-center " role="document">
          <div className="modal-content  border-0 mx-3">
            <div className="modal-body  p-0">
              <div className="row justify-content-center">
                <div className="col">
                  <div className="card card-aq">   
                    <div className="card-body card-body-aq pt-0">
                      <div className="row justify-content-center pb-sm-5 pb-3">
                        <div className="col-sm-8 col px-sm-0 px-4">
                          <h4 className="card-title mt-sm-5 mt-3 mb-sm-5 mb-3 text-center">
                            <b>Add A Question</b>
                            {status}
                          </h4>
                          <div className="row">
                            <div className="col">
                              <input
                                className="input-aq"
                                type="text"
                                name="question"
                                placeholder="Your Question"
                                required={true}
                                onChange={(event)=>{
                                  setQs(event.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <input
                                className="input-aq"
                                type="text"
                                name="op1"
                                placeholder="Option 1"
                                required={true}
                                onChange={(event)=>{
                                  setOp1(event.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <input
                                className="input-aq"
                                type="text"
                                name="op2"
                                placeholder="Option 2"
                                required={true}
                                onChange={(event)=>{
                                  setOp2(event.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <input
                                className="input-aq"
                                type="text"
                                name="op3"
                                placeholder="Option 3"
                                required={true}
                                onChange={(event)=>{
                                  setOp3(event.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <input
                                className="input-aq"
                                type="text"
                                name="op4"
                                placeholder="Option 4"
                                required={true}
                                onChange={(event)=>{
                                  setOp4(event.target.value);
                                }}
                              />
                            </div>
                          </div> 
                          {op1!=="" && op2!=="" && op3!=="" && op4!=="" && <div className="row">
                            <div className="col">
                              <select className="input-aq form-control select-aq" name="ans" defaultValue="Select an Answer" required={true} 
                                onChange={(event)=>{
                                    setAns(event.target.value);}}>
                                <option disabled hidden>Select an Answer</option>
                                <option value={op1}>{op1}</option>
                                <option value={op2}>{op2}</option>
                                <option value={op3}>{op3}</option>
                                <option value={op4}>{op4}</option>
                              </select>
                            </div>
                          </div>}
                          <div className="row">
                            <div className="col">
                              <select className="input-aq form-control select-aq" name="type" defaultValue="Type of Question" required={true} 
                                onChange={(event)=>{
                                    setTq(event.target.value);
                                  }}
                              >
                                <option disabled hidden>Type of Question</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                              </select>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <button
                                className="btn btn-primary  btn-block mt-4 button-aq button-aq"
                                onClick={handleSubmit}
                              >
                                <b>Add Question</b>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
