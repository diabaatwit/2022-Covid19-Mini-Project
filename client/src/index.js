import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Table from './components/TableExams'
import Header from './components/WebsiteHeader';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Table />
  </React.StrictMode>,
  document.getElementById('root')
);


//Ruben Ruiz :)
//Diana Ruiz :P


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
