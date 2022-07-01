import React,{useState} from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from './components/HomePage';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
export const CredentialsContext = React.createContext();
function App() {
  const credentialsState = useState(null);
  return (
    <div className="App">
        <Route path="/home" component={HomePage} />
        <Route path="/" component={Welcome} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
    </div>
  );
}

export default App;
