import { useEffect, useState } from "react";
import Question from "./Question";
function Game(){ //section for home page of the game
    console.log("In Game");
    const[qs,setQs]=useState();
    const[next,setNext]=useState();
    useEffect(() => {
      fetch("/api/game")
        .then((response) => response.json())
        .then((data) => setQs(data));
      }, [next]);
    
  return <div> {qs==null? <p>Loading...</p>:
    qs.hasOwnProperty("completed")? <h1 style={{
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
    }}>Completed !!</h1>: <Question qs={qs} setNext={setNext} />}</div>
}
export default Game;