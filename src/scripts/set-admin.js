const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} = require('firebase/firestore');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

console.log('Starting admin role setup script...');

// Manually load environment variables
const envPath = path.resolve(__dirname, '../../.env');
console.log('Loading .env file from:', envPath);

try {
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  for (const k in envConfig) {
    // Remove quotes from the values
    process.env[k] = envConfig[k].replace(/^"|"$/g, '');
    console.log(`Loaded env var: ${k}`);
  }
} catch (error) {
  console.error('Error reading .env file:', error);
  process.exit(1);
}

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

console.log('Firebase Configuration:', JSON.stringify(firebaseConfig, null, 2));

// Validate configuration
if (!firebaseConfig.apiKey) {
  console.error('Firebase configuration is missing. Please check your .env file.');
  console.error('Current environment variables:', process.env);
  process.exit(1);
}

// Initialize Firebase
console.log('Initializing Firebase app...');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to set admin user
async function setAdminUser(uid) {
  console.log(`Setting admin role for user: ${uid}`);

  try {
    const userDocRef = doc(db, 'users', uid);
    
    console.log('Checking if user document exists...');
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      console.log(`Creating new user document for ${uid}`);
      await setDoc(userDocRef, {
        roles: ['admin'],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } else {
      console.log(`Updating existing user document for ${uid}`);
      await setDoc(userDocRef, {
        ...userDoc.data(),
        roles: ['admin'],
        updatedAt: new Date()
      }, { merge: true });
    }

    console.log(` User ${uid} has been successfully set as an admin.`);
    process.exit(0);
  } catch (error) {
    console.error(' Error setting admin user:', error);
    
    // Log additional error details
    if (error.code) {
      console.error('Error Code:', error.code);
    }
    if (error.message) {
      console.error('Error Message:', error.message);
    }
    
    process.exit(1);
  }
}

// Replace with your actual UID
const userUid = 'i0Ww3GIDG0OuNSDR4a0cXda6AHD2';
setAdminUser(userUid);
