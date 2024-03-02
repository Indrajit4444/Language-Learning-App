import { useState } from "react";
import Register from "./Register";
// import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'
function Login(){
    let date=new Date();
    const[login,setlogin]=useState(true);//to toggle login and register
    if (!login) return <Register setlogin={setlogin}/>
    return <div>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"></link>
    <main className="form-signin w-25 m-auto top-50 mt-5" >
        <form method="POST" action="/api/login">
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
            <input type="email" className="form-control" name="username" id="floatingName" placeholder="name@example.com" style={{borderBottomLeftRadius:0,borderBottomRightRadius:0}}/>
            <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
            <input type="password" className="form-control" name= "password" id="floatingPassword" placeholder="Password" style={{borderTopLeftRadius:0,borderTopRightRadius:0}}/>
            <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="btn btn-primary w-100 py-2 mt-4 " type="submit" name="logorreg" value={0}>Sign in</button>
            <p style={{cursor: "pointer"}} onClick={()=>{//goto register
                setlogin(false);
                }}>Register</p>
            <p className="mt-5 mb-3 text-body-secondary" style={{marginLeft:"42%"}}>© {date.getFullYear()}</p>
        </form>
    </main>
    </div>
};
export default Login;