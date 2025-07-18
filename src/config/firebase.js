import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "SUA_API_KEY",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "SEU_PROJETO.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "SEU_PROJETO_ID",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "SEU_PROJETO.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "SEU_SENDER_ID",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "SEU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Inicializar Firestore
export const db = getFirestore(app);

export default app;
