import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

console.log(document.body);
ReactDOM.hydrate(<App />,document.getElementById('root'));