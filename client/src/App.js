import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Card from "./components/Card";
import {CreateGame} from './components/CreateGame';
import {Detail} from './components/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
        <Route exact path="/" component={LandingPage}/>
          <Route path="/Home" component={Home}/>
          <Route path="/videogame" component={CreateGame}/>
          <Route path="/details/:id" component={Detail}/>
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;