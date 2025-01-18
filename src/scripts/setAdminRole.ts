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

// Function to set admin role
export const setAdminRole = async (userId: string) => {
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const userDocRef = doc(db, 'users', userId);
    
    await updateDoc(userDocRef, {
      roles: ['admin'],
      updatedAt: new Date()
    });
    
    console.log(`User ${userId} has been set as an admin`);
    return true;
  } catch (error) {
    console.error('Error setting admin role:', error);
    return false;
  }
};

// If this script is run directly
if (import.meta.url === `file://${import.meta.filename}`) {
  const userId = process.argv[2];

  if (!userId) {
    console.error('Please provide a user ID');
    process.exit(1);
  }

  setAdminRole(userId)
    .then((success) => {
      if (success) {
        console.log('Admin role set successfully');
        process.exit(0);
      } else {
        console.error('Failed to set admin role');
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      process.exit(1);
    });
}
