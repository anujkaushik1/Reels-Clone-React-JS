import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/Login';


function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Signup /> */}
        <Login/>
      </BrowserRouter>

    </>
  );
}

export default App;
