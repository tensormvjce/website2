import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || '',
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.VITE_FIREBASE_APP_ID || ''
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// User ID to set as admin
const ADMIN_USER_ID = 'i0Ww3GIDG0OuNSDR4a0cXda6AHD2';

async function setAdminRole() {
  try {
    const userDocRef = doc(db, 'users', ADMIN_USER_ID);
    
    await updateDoc(userDocRef, {
      roles: ['admin'],
      updatedAt: new Date()
    });
    
    console.log(`User ${ADMIN_USER_ID} has been set as an admin`);
  } catch (error) {
    console.error('Error setting admin role:', error);
  }
}

// Run the function immediately
setAdminRole();
