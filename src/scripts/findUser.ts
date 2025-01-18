import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
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

// Function to find user by email
export const findUserByEmail = async (email: string) => {
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      console.log('User found:', {
        id: userDoc.id,
        data: userDoc.data()
      });
      
      return {
        id: userDoc.id,
        data: userDoc.data()
      };
    }
    
    console.log('No user found with this email');
    return null;
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
};

// If this script is run directly
if (import.meta.url === `file://${import.meta.filename}`) {
  const email = process.argv[2];

  if (!email) {
    console.error('Please provide an email address');
    process.exit(1);
  }

  findUserByEmail(email)
    .then((user) => {
      if (user) {
        console.log('User ID:', user.id);
        process.exit(0);
      } else {
        console.error('User not found');
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      process.exit(1);
    });
}
