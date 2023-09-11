import { useEffect, useState } from "react";
import Login from "./components/Login";
import Game from "./components/Game";
import {Routes, Route} from "react-router-dom";
import Progress from "./components/Progress";
function App() {
  const [logged, setlogged] = useState();//user logged ?
  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setlogged(data));
  }, []);
  return <div>
      <Routes>
        <Route path="/" element={(logged == null && <p>Loading...</p>)
        ||(logged != null && !logged.logged && <Login/>)//if not logged in then go to log in
        || (logged != null && logged.logged && <Game/>)//else go to game
        } />
        <Route path="/progress" element={<Progress/>} exact/>
      </Routes>
    </div>
  ;
}
export default App;
