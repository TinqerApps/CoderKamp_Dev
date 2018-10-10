import React, { Component } from 'react';
import Editor from './components/Firepad';
import { initFirebase } from './services/firebase';

import './App.css'

class App extends Component {
  constructor(){
    super();
    // init firebase services
    initFirebase();
  }
  render() {
    return (
        <Editor />
    );
  }
}

export default App;
