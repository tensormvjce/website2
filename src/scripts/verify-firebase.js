const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  getDocs,
  connectFirestoreEmulator
} = require('firebase/firestore');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

console.log('Starting Firebase configuration verification...');

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

// Verify Firebase configuration
async function verifyFirebaseConfig() {
  try {
    console.log('Initializing Firebase app...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Optional: Connect to local emulator for testing
    // connectFirestoreEmulator(db, 'localhost', 8080);

    console.log('Attempting to read collections...');
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);

    console.log('Successfully connected to Firestore!');
    console.log('Number of user documents:', querySnapshot.size);

    querySnapshot.forEach((doc) => {
      console.log('User document ID:', doc.id);
      console.log('User document data:', doc.data());
    });

    process.exit(0);
  } catch (error) {
    console.error('Firebase verification failed:', error);
    
    // Detailed error logging
    if (error.code) {
      console.error('Error Code:', error.code);
    }
    if (error.message) {
      console.error('Error Message:', error.message);
    }
    
    process.exit(1);
  }
}

verifyFirebaseConfig();
