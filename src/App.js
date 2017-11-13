import React, { Component } from 'react';
import './App.css';

// components
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Blog from './components/blog/Blog';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';

// react router
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';




class App extends Component {
  render() {
    return (
      <div className="App">
       <Router>
         <div className="router-div">
         <Navbar />
         <br />
         <div className="container">
          <Route exact path="/" component={Home}/>
          <Route path="/blog" component={Blog} />
          <Route path="/contact" component={Contact} />
         </div>
         <Footer />
         </div>
       </Router>
      </div>
    );
  }
}

export default App;
