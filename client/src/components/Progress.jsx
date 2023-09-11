import Navbar from "./Navbar";
import "./Progress.css"
function Progress() {
  return (
    <div>
      <Navbar />
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
                        89%
                      </h5>
                      <div className="progress">
                        <div
                          className="progress-bar bg-c-green"
                          style={{width:"89%"}}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="col-xl-3 col-md-6">
                      <h6>Wrong Answer</h6>
                      <h5 className="m-b-30 f-w-700">
                        10%
                      </h5>
                      <div className="progress">
                        <div
                          className="progress-bar bg-c-red"
                          style={{width:"10%"}}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Progress;
