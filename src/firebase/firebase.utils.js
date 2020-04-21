import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAx3b_WduV_bwkDErPRzWadYkmUS3sBzM4",
    authDomain: "crwn-db-b4096.firebaseapp.com",
    databaseURL: "https://crwn-db-b4096.firebaseio.com",
    projectId: "crwn-db-b4096",
    storageBucket: "crwn-db-b4096.appspot.com",
    messagingSenderId: "166129841129",
    appId: "1:166129841129:web:6c28e2c6a3c1ac4735d178",
    measurementId: "G-DRGZYETTXK"
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;