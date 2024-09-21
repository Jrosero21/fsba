import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDarqQAmAedfbDJhp9_BEsMeM4uYxztXy8",
  authDomain: "badbank-a4de5.firebaseapp.com",
  projectId: "badbank-a4de5",
  storageBucket: "badbank-a4de5.appspot.com",
  messagingSenderId: "646776324008",
  appId: "1:646776324008:web:b51649a232f2a7d65c679d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };


  
