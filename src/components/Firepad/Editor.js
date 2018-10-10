import React from 'react';
import ace from 'ace-builds';
import Firepad from 'firepad';

import 'ace-builds/webpack-resolver';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.editor = null;
  }
  componentDidMount() {
    // Create ACE
    this.editor = ace.edit('aceEditor');
    // set Ace editor config
    this.editor.getSession().setMode(this.props.mode);
    this.editor.setTheme(this.props.selectedTheme);
    this.editor.setShowPrintMargin(false);
    // init firepad with Ace editor
    Firepad.Headless(this.props.firebaseRef);
    Firepad.fromACE(this.props.firebaseRef, this.editor, {
      defaultText:
        '// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}'
    });
  }
  componentWillReceiveProps(nextProps) {
    this.editor.getSession().setMode(nextProps.mode);
  }

  updateEditorMode = mode => {};

  render() {
    return <div id="aceEditor" />;
  }
}

export default Editor;
