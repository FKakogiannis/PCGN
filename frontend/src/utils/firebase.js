import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics'; 
import * as firebaseui from 'firebaseui'; 

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const uiConfig = {
  signInSuccessUrl: '/', 
  signInFlow: 'redirect',  
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,  
    'password', 
  ],
  tosUrl: '/terms-of-service', 
  privacyPolicyUrl: '/privacy-policy',  
};



const initFirebaseUI = () => {
  let ui = firebaseui.auth.AuthUI.getInstance();
  if (!ui) {
    ui = new firebaseui.auth.AuthUI(auth);
  }
  return ui;
};


const signOutUser = async () => {
  try {
    await auth.signOut();
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export { app, auth, initFirebaseUI, uiConfig, signOutUser };
