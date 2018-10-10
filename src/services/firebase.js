import firebase from 'firebase';
import firebaseConfig from '../config/firebase.config';

export const firebaseSessionPath = 'live-sessions';

export const initFirebase = () => {
  firebase.initializeApp(firebaseConfig);
};

export const getFirebaseRef = () => {
  const hash = window.location.hash.replace(/#/g, '');
  let ref = firebase.database().ref(firebaseSessionPath);
  if (hash) {
    ref = ref.child(hash);
  } else {
    ref = ref.push(); // generate unique location.
    window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
  }
  return ref;
};

export const updateEditorMode = (refKey, mode) => {
  firebase
    .database()
    .ref(`${firebaseSessionPath}/${refKey}/mode`)
    .set(mode);
};
