import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBzsVN_Iv73LZQzCr1RCqqyeKdjlMcDD8s",
  authDomain: "chat-app-ee9fd.firebaseapp.com",
  projectId: "chat-app-ee9fd",
  storageBucket: "chat-app-ee9fd.firebasestorage.app",
  messagingSenderId: "33751610161",
  appId: "1:33751610161:web:6de484b759f783ebf73610",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
