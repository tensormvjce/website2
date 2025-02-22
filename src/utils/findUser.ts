import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { firebaseConfig } from '../config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to find user by email
export const findUserByEmail = async (email: string) => {
  try {
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
if (require.main === module) {
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
