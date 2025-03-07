
  // Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';



  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseApp = initializeApp({
    apiKey: "AIzaSyA1Oo1JiUuhPvj9imcZ0zDEUVs99vW4rs0",
    authDomain: "fir-a70d4.firebaseapp.com",
    projectId: "fir-a70d4",
    storageBucket: "fir-a70d4.firebasestorage.app",
    messagingSenderId: "593970296821",
    appId: "1:593970296821:web:0376a1b9a127dde66dd2bc"
  });

  const auth = getAuth(firebaseApp);
 

//Detect auth state



  onAuthStateChanged(auth, user => {
    if(user !== null) {
      console.log('logged in!');
    } else {
      console.log('No user');
    }
  });


