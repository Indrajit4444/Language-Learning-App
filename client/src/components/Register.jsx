function Register(prop){
    let date=new Date();
    return <div>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"></link>
    <main className="form-signin w-25 m-auto top-50 mt-5" >
        <form method="POST" action="/">
            <h1 className="h3 mb-3 fw-normal">Please Register</h1>
            <div className="form-floating">
            <input type="text" className="form-control" name="name" placeholder="Indrajit Das" style={{borderBottomLeftRadius:0,borderBottomRightRadius:0}}/>
            <label htmlFor="floatingInput">Name</label>
            </div>
            <div className="form-floating">
            <input type="email" className="form-control" name="username" placeholder="name@example.com" style={{borderRadius:0}}/>
            <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
            <input type="password" className="form-control" name= "password" id="floatingPassword" placeholder="Password" style={{borderTopLeftRadius:0,borderTopRightRadius:0}}/>
            <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="btn btn-primary w-100 py-2 mt-4 " type="submit" name="logorreg" value={1}>Register</button>
            <p onClick={()=>prop.setlogin(true)} style={{cursor: "pointer"}}>LogIn</p>
            <p className="mt-5 mb-3 text-body-secondary" style={{marginLeft:"42%"}}>© {date.getFullYear()}</p>
        </form>
    </main>
    </div>
};
export default Register;