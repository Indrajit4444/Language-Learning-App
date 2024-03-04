import { useEffect, useState } from "react";
import Question from "./Question";
import baseURL from "../baseUrl";
function Game(prop){ //section for home page of the game
    console.log("In Game");
    const[qs,setQs]=useState();
    const[next,setNext]=useState();
    useEffect(() => {
      fetch(baseURL+"/api/game",{credentials:'include',mode:'cors'})
        .then((response) => response.json())
        .then((data) =>{
          if (data==="notlogged")
            prop.logged({logged:false});
          else
            setQs(data);
        });
      }, [next,prop]);
    
  return <div> {qs==null? <p>Loading...</p>:
    qs.hasOwnProperty("completed")? <h1 style={{
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
    }}>Completed !!</h1>: <Question qs={qs} setNext={setNext} />}</div>
}
export default Game;