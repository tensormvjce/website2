import { 
  doc, 
  updateDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  DocumentData
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

interface UserData {
  id?: string;
  email: string;
  role: string;
  updatedAt: string;
  createdAt?: Date;
  isAdmin?: boolean;
  adminGrantedAt?: Date;
}

export const listUsers = async (): Promise<UserData[]> => {
  try {
    const db = getFirestore();
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    
    return querySnapshot.docs.map((doc: DocumentData) => ({
      ...doc.data(),
      id: doc.id
    })) as UserData[];
  } catch (error) {
    console.error('Error listing users:', error);
    throw error;
  }
};

export const setAdminRole = async (uid: string): Promise<void> => {
  try {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      role: 'admin',
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error setting admin role:', error);
    throw error;
  }
};

export const findUserByEmail = async (email: string): Promise<UserData | null> => {
  try {
    const db = getFirestore();
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const userDoc = querySnapshot.docs[0];
    return {
      ...userDoc.data(),
      id: userDoc.id
    } as UserData;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
};

export const grantAdminAccess = async (userId: string) => {
  try {
    const db = getFirestore();
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
    const db = getFirestore();
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
