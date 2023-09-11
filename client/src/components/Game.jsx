import { useEffect, useState } from "react";
import Question from "./Question";
import Navbar from "./Navbar";
function Game(){ //section for home page of the game
    const[qs,setQs]=useState();
    useEffect(() => {
        fetch("/api/game")
          .then((response) => response.json())
          .then((data) => setQs(data));
      }, []);
    // console.log(qs);
  return <div> <Navbar/> <Question qs={qs}/></div>
}
export default Game;