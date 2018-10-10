import React from 'react';
import Header from './Header';
import Editor from './Editor';

import firebase from 'firebase';
// import Footer from './Footer';

import { firebaseSessionPath, getFirebaseRef, updateEditorMode } from '../../services/firebase';

import './index.css';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    // Get Firebase Database reference.
    const firebaseRef = getFirebaseRef();
    this.state = {
      selectedMode: 'ace/mode/javascript',
      selectedTheme: 'ace/theme/dracula',
      firebaseRef,
      firebaseSessionKey: firebaseRef.key
    };
  }
  componentDidMount() {
    this.changeMode(this.state.selectedMode);
    this.watchEditorModeChangesIntoFirebase();
  }
  changeMode = mode => {
    this.setState({ selectedMode: mode });
    updateEditorMode(this.state.firebaseSessionKey, mode);
  };

  watchEditorModeChangesIntoFirebase = () => {
    firebase
      .database()
      .ref(`${firebaseSessionPath}/${this.state.firebaseSessionKey}/mode`)
      .on('value', snapshot => {
        const updateMode = snapshot.val();
        updateMode && this.setState({ selectedMode: updateMode });
      });
  };

  componentWillUnmount() {
    firebase
      .database()
      .ref(`${firebaseSessionPath}/${this.state.firebaseSessionKey}/mode`)
      .off();
  }
  render() {
    const { selectedMode, selectedTheme, firebaseRef } = this.state;
    return (
      <div className="d-flex flex-column justify-content-center firepad-container">
        <div className="">
          <Header selectedMode={selectedMode} changeMode={this.changeMode} />
        </div>
        <div className="d-flex flex-grow-1">
          <Editor mode={selectedMode} selectedTheme={selectedTheme} firebaseRef={firebaseRef} />
        </div>
        {/*
        <div className="">
          <Footer />
        </div> 
        */}
      </div>
    );
  }
}
