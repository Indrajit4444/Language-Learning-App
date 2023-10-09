import { useEffect, useState } from "react";
import "./Progress.css"
function Progress() {
  const [rightAns,setRightAns]=useState("0.00%");
  const [wrongAns,setWrongAns]=useState("0.00%");
  const [sure,setsure]=useState(false);
  useEffect(()=>{
    console.log("here");
    fetch("/api/progress")
    .then((response)=>response.json())
    .then((data)=>{
      console.log(data);
      setRightAns(((data.right/data.total)*100).toFixed(2)+"%");
      setWrongAns(((data.wrong/data.total)*100).toFixed(2)+"%");
    });
  },[sure])
  function handleClick(){
    setsure(true);
  }
  async function handleSureYes(){
    await fetch("/api/reset");
    setsure(false);
    
  }
  function handleSureNo(){
    setsure(false);
  }
  return (
    <div>
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-xl-12">
              <div className="card proj-progress-card">
                <div className="card-block">
                  <div className="row">
                    {/* <div className="col-xl-3 col-md-6">
                      <h6>Incomplete Work</h6>
                      <h5 className="m-b-30 f-w-700">
                        4,569<span className="text-c-red m-l-10">-0.5%</span>
                      </h5>
                      <div className="progress">
                        <div
                          className="progress-bar bg-c-blue"
                          style={{width:"65%"}}
                        ></div>
                      </div>
                    </div> */}
                    <div className="col-xl-3 col-md-6">
                      <h6>Right Answer</h6>
                      <h5 className="m-b-30 f-w-700">
                        {rightAns}
                      </h5>
                      <div className="progress">
                        <div
                          className="progress-bar bg-c-green"
                          style={{width:rightAns}}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="col-xl-3 col-md-6">
                      <h6>Wrong Answer</h6>
                      <h5 className="m-b-30 f-w-700">
                        {wrongAns}
                      </h5>
                      <div className="progress">
                        <div
                          className="progress-bar bg-c-red"
                          style={{width:wrongAns}}
                        ></div>
                      </div>
                    </div>
                    {/* <div className="col-xl-3 col-md-6">
                      <h6>Ongoing Digs</h6>
                      <h5 className="m-b-30 f-w-700">
                        365<span className="text-c-green m-l-10">+0.35%</span>
                      </h5>
                      <div className="progress">
                        <div
                          className="progress-bar bg-c-yellow"
                          style={{width:"45%"}}
                        ></div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <button class="btn btn-danger" onClick={handleClick} style={{width:"150px",marginTop:"20px"}}>Reset Progress</button>
              {sure && <div className="sure">
              <span className="suretxt">Are you sure?</span>
              <button className="btn btn-danger surebtn" onClick={handleSureYes}>Yes</button>
              <button className="btn btn-success surebtn" onClick={handleSureNo}>No</button>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Progress;
