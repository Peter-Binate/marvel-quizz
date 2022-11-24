import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'; //Pour accéder au index.js dans le dossier App
import reportWebVitals from './reportWebVitals';
import Firebase, { FirebaseContext } from './components/Firebase';

ReactDOM.render(
  //On instancie la class Firebase: value={new Firebase()}
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
