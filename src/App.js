import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup';
import { auth } from './Components/Firebase';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import context from './Context';
import { useState, useEffect } from 'react';
import Feed from './Components/Feed';
import PrivateRoute from './Components/PrivateRoute';

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
    console.log("use effect");
    const unsub = auth.onAuthStateChanged((user) => {   // user dega jabh bhi state change hogi (firebase mei jabh bhi login, logout ya singup hoga tbh chl jaega => yeh  neche vali state change hongi usse koe relation nai hai )

      // console.log("use efffect valaaaaaaa");

      setUser(user);     // agar setUser and setLoading ko comment krdenge tbh bhi kuch signin ya kuch hoega toh yeh chal jaega because yeh hamarae app ki state pe dependent nai hai balki firebase vale pe depend krta hai
      // user ki uid + orr details store krwa rhe hai state mei=> jabh login
      // jaise hi logout hoga vaise hi empty string store krwa rhe hai (automatic hojaega because of onAuthStateChange)

      setLoading(false);

    });

    return () => {    // componentWillUnmount ke time chlagea
      unsub();     // jo event listener attach componentDidMount pr woh hatt jaega
    }

  })

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
          {
            !loading && <Routes>
              <Route element={<PrivateRoute />}>       {/* protect krdia route ko */}
                <Route path='/' element={<Feed />}></Route>
              </Route>

              <Route path='/login' element={<Login />} />  {/* yeh saare components AuthProvider ke pass jaegenge as props.children */}
              <Route path='/signup' element={<Signup />} />
            </Routes>
          }

        </context.Provider>
      </BrowserRouter>

    </>



  );
}

export default App;
