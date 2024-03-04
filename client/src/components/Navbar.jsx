import { Link } from "react-router-dom";
import "./Navbar.css"
import { useState } from "react";
import baseURL from "../baseUrl";
export default function Navbar(prop){
    const[game,setGame]=useState("nav-item active");
    const[progress,setProgress]=useState("nav-item");
    const[add,setAdd]=useState("nav-item");
    return <nav className="navbar navbar-expand-lg navbar-light ">
    <div className="navbar-brand">Language Learning App</div>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse d-lg-flex justify-content-lg-center" id="navbarTogglerDemo02">
      <div className=" m-lg-auto" >
        <ul className="navbar-nav mt-2 mt-lg-0">
          <li className={game} >
            <Link className="nav-link" to="/" onClick={()=>{setGame("nav-item active");setProgress("nav-item");setAdd("nav-item");}}>Game</Link>
          </li>
          <li className={progress}>
            <Link className="nav-link" to="progress" onClick={()=>{setGame("nav-item");setProgress("nav-item active");setAdd("nav-item");}}>Progress</Link>
          </li>
          <li className={add}>
            <Link className="nav-link" to="addQuestion" onClick={()=>{setGame("nav-item");setProgress("nav-item");setAdd("nav-item active");}}>Add Question</Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="#">Link</Link>
          </li> */}
        </ul>
      </div>
      <form className="form-inline my-2 my-lg-0 logout"onSubmit={async (event)=>{
            event.preventDefault();
            await fetch(baseURL+'/api/logout', {//fetch answer from backend
            method: 'post',
            headers: {'content-type': 'application/json' },
            credentials:'include',
            mode:'cors'
            })
            .then(response => response.json())
            .then((data) =>{
                console.log(data);
                prop.logged(data);   
            });
        }}>
        <button className="btn btn-outline-danger my-2 my-sm-0"  type="submit">Log Out</button>
      </form>
    </div>
  </nav>
}