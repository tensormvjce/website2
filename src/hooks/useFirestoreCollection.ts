import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  Firestore 
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

export const useFirestoreCollection = (db: Firestore, collectionName: string) => {
  const [items, setItems] = useState<FirestoreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(`Fetching collection: ${collectionName}`);
    console.log('Firestore database:', db);

    // Create a query to order items by date in descending order
    const q = query(
      collection(db, collectionName), 
      orderBy('date', 'desc')
    );

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      q, 
      (snapshot) => {
        console.log(`Snapshot received for ${collectionName}:`, snapshot.docs.length, 'documents');
        
        const fetchedItems: FirestoreItem[] = snapshot.docs.map(doc => {
          const data = doc.data();
          console.log('Individual document data:', {
            id: doc.id,
            ...data
          });
          
          return {
            id: doc.id,
            ...data,
            // Ensure default values for optional fields
            link: data.link || '',
            bannerImg: data.bannerImg || data.image || '',
            longDescription: data.longDescription || data.description || '',
            agenda: data.agenda || [],
            whyAttend: data.whyAttend || [],
            venue: data.venue || '',
            duration: data.duration || '',
            registrationStatus: data.registrationStatus || 'Open',
            speakers: data.speakers || []
          } as FirestoreItem;
        });

        console.log(`Processed items for ${collectionName}:`, fetchedItems);

        setItems(fetchedItems);
        setLoading(false);
      },
      (err) => {
        console.error(`Error fetching ${collectionName}:`, err);
        setError(err.message);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [db, collectionName]);

  return { items, loading, error };
};
