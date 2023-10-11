import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App=()=>{
 const pageSize=15;
 const apiKey=process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0)
    return (
      
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
        
      />
      
      <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="" pageSize={pageSize} country="in" category=""/>}></Route>
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business"/>}></Route>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology"/>}></Route>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}></Route>
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports"/>}></Route>
        </Routes>
      </Router>
      </div>
    )
  }
export default App;



