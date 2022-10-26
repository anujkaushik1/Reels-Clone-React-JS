import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup';
import { auth } from './Components/Firebase';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import context from './Context';
import { useState, useEffect } from 'react';


function App() {

  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {   // user dega jabh bhi state change hogi
      setUser(user);
      setLoading(false);
    });

    return () => {    // componentWillUnmount ke time chlagea
      unsub();     // jo event listener attach componentDidMount pr woh hatt jaega
    }

  }, [])

  const store = {
    user,
    signup,
    login,
    logout
  }


  return (
    <>
      <BrowserRouter>
        <context.Provider value={store}>
          <Routes>
              <Route path='/login' element={<Login />} />  {/* yeh saare components AuthProvider ke pass jaegenge as props.children */}
              <Route path='/signup' element={<Signup />} />
            </Routes>

        </context.Provider>

      </BrowserRouter>

    </>



  );
}

export default App;
