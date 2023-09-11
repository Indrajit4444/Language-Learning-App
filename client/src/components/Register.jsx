function Register(prop){
    let date=new Date();
    return <main class="form-signin w-25 m-auto top-50 mt-5" >
        <form method="POST" action="/">
            <h1 class="h3 mb-3 fw-normal">Please Register</h1>
            <div class="form-floating">
            <input type="text" class="form-control" name="name" id="floatingInput" placeholder="Indrajit Das" style={{borderBottomLeftRadius:0,borderBottomRightRadius:0}}/>
            <label for="floatingInput">Name</label>
            </div>
            <div class="form-floating">
            <input type="email" class="form-control" name="username" id="floatingInput" placeholder="name@example.com" style={{borderRadius:0}}/>
            <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
            <input type="password" class="form-control" name= "password" id="floatingPassword" placeholder="Password" style={{borderTopLeftRadius:0,borderTopRightRadius:0}}/>
            <label for="floatingPassword">Password</label>
            </div>
            <button class="btn btn-primary w-100 py-2 mt-4 " type="submit" name="logorreg" value={1}>Register</button>
            <p onClick={()=>prop.setlogin(true)}>LogIn</p>
            <p class="mt-5 mb-3 text-body-secondary" style={{marginLeft:"42%"}}>© {date.getFullYear()}</p>
        </form>
    </main>
};
export default Register;