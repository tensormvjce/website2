import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Extensive logging function
const logEnvVars = () => {
  console.log('FIREBASE_API_KEY:', process.env.VITE_FIREBASE_API_KEY);
  console.log('FIREBASE_AUTH_DOMAIN:', process.env.VITE_FIREBASE_AUTH_DOMAIN);
  console.log('FIREBASE_PROJECT_ID:', process.env.VITE_FIREBASE_PROJECT_ID);
  console.log('FIREBASE_STORAGE_BUCKET:', process.env.VITE_FIREBASE_STORAGE_BUCKET);
  console.log('FIREBASE_MESSAGING_SENDER_ID:', process.env.VITE_FIREBASE_MESSAGING_SENDER_ID);
  console.log('FIREBASE_APP_ID:', process.env.VITE_FIREBASE_APP_ID);
};

// Fallback mechanism for Firebase configuration
const getEnvVar = (viteName: string) => {
  const value = import.meta.env[viteName] || '';
  console.log(`Getting env var - ${viteName}: ${value}`);
  return value;
};

// Log environment variables before configuration
logEnvVars();

// Initialize Firebase
const firebaseConfig = {
  apiKey: getEnvVar('VITE_FIREBASE_API_KEY'),
  authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnvVar('VITE_FIREBASE_APP_ID'),
};

console.log('Detailed Firebase Config:', JSON.stringify(firebaseConfig, null, 2));

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Create Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
