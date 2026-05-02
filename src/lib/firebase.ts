import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBknWO5rR3fGyAG2CWZCgll4ciXOiHPNgU",
  authDomain: "bharatvote-1cdd8.firebaseapp.com",
  projectId: "bharatvote-1cdd8",
  storageBucket: "bharatvote-1cdd8.firebasestorage.app",
  messagingSenderId: "219500232409",
  appId: "1:219500232409:web:afdd604d3fee2ab46c08c8",
  measurementId: "G-E5D5WK9QKR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const saveQuizResult = async (result: { score: number; total: number; lang: string }) => {
  try {
    const docRef = await addDoc(collection(db, 'quizResults'), {
      ...result,
      timestamp: serverTimestamp(),
    });
    console.log('[Firestore] Quiz result saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('[Firestore] Error adding document:', error);
    throw error;
  }
};
