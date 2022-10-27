import React, { useEffect, useContext, useState } from 'react'
import context from '../Context'
import { database } from './Firebase';
import Posts from './Posts';
import UploadFile from './UploadFile'


function Feed() {
  const {user} = useContext(context);
  const [userData, setUserData] = useState('');

  useEffect(()=>{
      const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
          setUserData(snapshot.data());
      });

      return ()=>{
        unsub();
      }

  },[user])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <div className='comp' style={{ width: '50%' }}>
        <h1>Welcome to feed</h1>
      </div>
      <UploadFile user = {userData}/>
      <Posts userData = {userData}/>
    </div>

  )
}

export default Feed