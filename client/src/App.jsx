import { useEffect, useState } from "react";
import Login from "./components/Login";
import Game from "./components/Game";
import {Routes, Route, Navigate} from "react-router-dom";
import Progress from "./components/Progress";
import Navbar from "./components/Navbar";
import AddQuestion from "./components/AddQuestion";
import baseURL from "./baseUrl";
function App() {
  const [logged, setlogged] = useState();//user logged ?
  useEffect(() => {
    fetch(baseURL+"/api/login",{
      method:'GET',
      credentials:'include',
      mode:'cors'
    })
      .then((response) => response.json())
      .then((data) => setlogged(data));
  }, []);
  return logged==null? <div>Loading...</div>  : 
    <div>
      {logged.logged && <Navbar logged={setlogged}/>}
      <Routes>
        <Route path="/" element={(logged.logged ? <Game logged={setlogged}/>  : <Login logged={setlogged}/>)} />
        <Route path="/progress" element={logged.logged ? <Progress logged={setlogged}/> :<Navigate to="/" /> } exact/>
        <Route path="/addQuestion" element={ logged.logged? <AddQuestion/> : <Navigate to="/" />} exact/>
      </Routes>
    </div>
}
export default App;
