import logo from './logo.svg';
import './App.css';
import Listar from "./components/Listar";
import Crear from "./components/Crear";
import Editar from "./components/Editar";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light"> 
          <ul className="nav navbar-nav"> 
            <li className="nav-item active"> 
              <Link className="nav-link" to={"/"}>Sistema<span className="visually-hidden">(current)</span></Link> 
            </li> 
            <li className="nav-item"> 
              <Link className="nav-link" to={"/crear"}>Crear</Link> 
            </li> 
            <li className="nav-item"> 
              <Link className="nav-link" to={"/editar"}>Editar</Link> 
            </li>
          </ul>
      </nav> 
      <br/>
      
      
      <div className="container">
        
        
        <Route exact path="/" component={Listar}></Route>
        <Route path="/crear" component={Crear}></Route>
        <Route path="/editar" component={Editar}></Route>
        
        
      </div>



    </Router>
  );
}

export default App;
