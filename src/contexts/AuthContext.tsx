import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUserRole: (uid: string, role: 'admin' | 'user') => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAdmin: false,
  loading: true,
  login: async () => {},
  logout: async () => {},
  setUserRole: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const setUserRole = async (uid: string, role: 'admin' | 'user' = 'user') => {
    try {
      const userDocRef = doc(db, 'users', uid);
      
      // Check if user document exists
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        // Update existing document
        await updateDoc(userDocRef, {
          roles: [role],
          updatedAt: new Date()
        });
      } else {
        // Create new document if it doesn't exist
        await setDoc(userDocRef, {
          roles: [role],
          createdAt: new Date()
        });
      }
      
      // Update local state if setting role for current user
      if (currentUser?.uid === uid) {
        setIsAdmin(role === 'admin');
      }
      
      console.log(`User ${uid} role set to: ${role}`);
    } catch (error) {
      console.error('Error setting user role', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login with email:', email);
      
      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // First, authenticate the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User authenticated:', user.uid);

      // Verify user document exists
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      // If user document doesn't exist, create it
      if (!userDoc.exists()) {
        console.warn('No user document found. Creating default user document.');
        await setDoc(userDocRef, {
          email: user.email,
          roles: ['user'],
          createdAt: new Date()
        });
      }

      const userData = userDoc.data();
      console.log('User document data:', userData);

      // Explicitly log roles for debugging
      console.log('User roles:', userData?.roles);

      // Check if user has admin role
      const isUserAdmin = userData?.roles?.includes('admin');
      console.log('Is user admin:', isUserAdmin);

      // Set current user and admin status
      setCurrentUser(user);
      setIsAdmin(isUserAdmin || false);

      // Throw error if not an admin
      if (!isUserAdmin) {
        console.warn('User does not have admin privileges');
        // Sign out the user if not an admin
        await signOut(auth);
        setCurrentUser(null);
        setIsAdmin(false);
        throw new Error('Admin access required');
      }
    } catch (error: any) {
      console.error('Detailed Login Error:', {
        name: error.name,
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      
      // Rethrow the error to be caught by the Login component
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('Attempting to log out...');
      console.log('Current user before logout:', currentUser);
      
      // Attempt to sign out
      await signOut(auth);
      
      // Reset user state
      setCurrentUser(null);
      setIsAdmin(false);
      
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout Error', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.data();
          
          setCurrentUser(user);
          setIsAdmin(userData?.roles?.includes('admin') || false);
        } catch (error) {
          console.error('Error checking user state', error);
        }
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAdmin,
    loading,
    login,
    logout,
    setUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
