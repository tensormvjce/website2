import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  query, 
  where, 
  setDoc 
} from 'firebase/firestore';
import { db } from '../services/firebase';
import { getAuth } from 'firebase/auth';

interface UserData {
  email?: string;
  roles?: string[];
  createdAt?: Date;
  isAdmin?: boolean;
  adminGrantedAt?: Date;
}

const ADMIN_UIDS = [
  'QZPUMmMNTCNlzAYgNzpDqcqGQQh1', // Existing admin
  '1lSm47YoxYMuEacsmWmZVWasOSZ2' // New admin user added
];

export const listUsers = async () => {
  try {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    
    const users: Array<{id: string, data: UserData}> = [];
    
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        data: doc.data() as UserData
      });
    });
    
    console.table(users.map(user => ({
      ID: user.id,
      Email: user.data.email,
      Roles: user.data.roles?.join(', ') || 'No roles',
      CreatedAt: user.data.createdAt?.toLocaleString(),
      Admin: user.data.isAdmin ? 'Yes' : 'No',
      AdminGrantedAt: user.data.adminGrantedAt?.toLocaleString()
    })));
    
    return users;
  } catch (error) {
    console.error('Error listing users:', error);
    return [];
  }
};

export const setAdminRole = async (uid: string) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    
    await updateDoc(userDocRef, {
      roles: ['admin'],
      updatedAt: new Date()
    });
    
    console.log(`User ${uid} has been set as an admin`);
    return true;
  } catch (error) {
    console.error('Error setting admin role:', error);
    return false;
  }
};

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
        data: userDoc.data() as UserData
      };
    }
    
    console.log('No user found with this email');
    return null;
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
};

export const grantAdminAccess = async (userId: string) => {
  try {
    // Reference to the user document
    const userRef = doc(db, 'users', userId);

    // Check if user exists
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      console.error('User does not exist');
      return false;
    }

    // Update user document to set admin status
    await updateDoc(userRef, {
      isAdmin: true,
      adminGrantedAt: new Date()
    });

    console.log(`Admin access granted to user: ${userId}`);
    return true;
  } catch (error) {
    console.error('Error granting admin access:', error);
    return false;
  }
};

export const checkAdminStatus = async (userId?: string) => {
  // If no userId is provided, use current user
  const auth = getAuth();
  const currentUser = userId || auth.currentUser?.uid;

  if (!currentUser) {
    console.log('No user logged in');
    return false;
  }

  try {
    const userRef = doc(db, 'users', currentUser);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return !!userData?.isAdmin;
    }

    return false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};
