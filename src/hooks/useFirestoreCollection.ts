import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  Firestore,
  DocumentData,
} from 'firebase/firestore';

export interface Speaker {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  linkedin: string;
}

export interface FirestoreItem {
  id?: string;
  title: string;
  description: string;
  date?: string;
  image?: string;
  tags?: string[];
  link?: string;
  slug?: string;
  bannerImg?: string;
  websiteUrl?: string;
  longDescription?: string;
  agenda?: {
    day: string;
    title: string;
    details: string[];
  }[];
  whyAttend?: string[];
  venue?: string;
  duration?: string;
  registrationStatus?: "Open" | "Closed" | "Ended";
  speakers?: Speaker[];
  [key: string]: any;
}

export interface FirestoreCollectionResult<T> {
  items: T[];
  loading: boolean;
  error: string | null;
}

export const useFirestoreCollection = <T extends DocumentData>(
  db: Firestore, 
  collectionName: string
): FirestoreCollectionResult<T> => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const q = query(
        collection(db, collectionName), 
        orderBy('date', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedItems = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id
          } as T & { id: string };
        });
        
        setItems(fetchedItems);
        setLoading(false);
      }, (err) => {
        console.error(`Error fetching ${collectionName}:`, err);
        setError(err.message);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error(`Error setting up ${collectionName} listener:`, err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setLoading(false);
    }
  }, [db, collectionName]);

  return { items, loading, error };
};
