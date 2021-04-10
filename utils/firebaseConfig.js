import firebase from "firebase/app";
import "firebase/auth";

const config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
};

const firebaseApp = firebase.apps?.length > 0 ? firebase.apps[0] : firebase.initializeApp(config);

export const auth = firebaseApp.auth();
export const firebaseUpdateEmail = (newEmail) => auth.currentUser.updateEmail(newEmail);
export const firebaseRemoveCurrentUser = () => auth.currentUser.delete();

export default firebaseApp;
