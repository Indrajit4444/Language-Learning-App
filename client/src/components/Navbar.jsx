import { Link } from "react-router-dom";

function Navbar(){
    return <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Thirteenth navbar example">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
        <p class="navbar-brand col-lg-3 me-0" >Language Learning App</p>
        <ul class="navbar-nav col-lg-6 justify-content-lg-center">
            <li class="nav-item" >
              <Link class="nav-link active" aria-current="page" to="/">Game</Link>
            </li>
            <li class="nav-item" >
              <Link class="nav-link active" aria-current="page" to="/progress">Progress</Link>
            </li>
            {/* <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li> */}
        </ul>
        <div class="d-lg-flex col-lg-3 justify-content-lg-end">
          <form method="POST" action="/logout">
            <button class="btn btn-danger" type="submit" style={{width:"100px"}}>Log out</button>
          </form>
        </div>
      </div>
    </div>
  </nav>
}
export default Navbar;