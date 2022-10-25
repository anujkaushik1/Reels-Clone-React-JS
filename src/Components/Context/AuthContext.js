import React, {useState, useEffect} from "react";
export const AuthContext = React.createContext();
import {auth} from '../Firebase';

export function AuthProvider(){
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout(){
        return auth.signOut();
    }

    useEffect(()=>{
        const unsub = auth.onAuthStateChanged((user)=>{   // user dega jabh bhi state change hogi
            setUser(user);
            setLoading(false);
        });

        return ()=>{    // componentWillUnmount ke time chlagea
            unsub();     // jo event listener attach componentDidMount pr woh hatt jaega
        }

    },[])
}