import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Validate configuration
if (!firebaseConfig.apiKey) {
  console.error('Firebase configuration is missing. Please check your .env file.');
  process.exit(1);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Function to set admin user
async function setAdminUser(uid: string) {
  try {
    // Validate UID
    if (!uid || uid.trim() === '') {
      throw new Error('Invalid UID provided');
    }

    const userDocRef = doc(db, 'users', uid);
    
    // Check if user document exists
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      console.log(`Creating user document for ${uid}`);
      await setDoc(userDocRef, {
        roles: ['admin'],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } else {
      // Update existing user document
      await setDoc(userDocRef, {
        ...userDoc.data(),
        roles: ['admin'],
        updatedAt: new Date()
      }, { merge: true });
    }

    console.log(`✅ User ${uid} has been set as an admin.`);
  } catch (error) {
    console.error('❌ Error setting admin user:', error);
    process.exit(1);
  } finally {
    // Ensure process exits
    process.exit(0);
  }
}

// Replace with your actual UID
const userUid = 'i0Ww3GIDG0OuNSDR4a0cXda6AHD2';
setAdminUser(userUid);
