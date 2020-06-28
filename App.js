import React, { useState, useEffect } from 'react';
import Navigator from './routes/homeStack';
import Navigator2 from './routes/todostack';
import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCZCAOol0b29XvRSKFlns6SFSVeHAEonm4",
  authDomain: "todo-d4372.firebaseapp.com",
  databaseURL: "https://todo-d4372.firebaseio.com",
  projectId: "todo-d4372",
  storageBucket: "todo-d4372.appspot.com",
  messagingSenderId: "902648881580",
  appId: "1:902648881580:web:b9d462b6a7d0e835725a09",
  measurementId: "G-3LNV1V5E5E"
};
firebase.initializeApp(firebaseConfig); 

export default function App() {
  const[isAuthenticated,setIsAuthenticated]=useState(false)

  useEffect(  ()=>{
    firebase.auth().onAuthStateChanged(function(user){setIsAuthenticated(!!user)})
            },[] )   
   
    if(isAuthenticated){
      return (  <Navigator2 />   );
    }
    else{
      return( <Navigator />);
    }
  
}