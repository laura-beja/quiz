import { db, auth } from "./firebase-config.js";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

export async function saveQuizResult(score) {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  try {
    await updateDoc(userRef, {
      attempts: arrayUnion({
        score: score,
        timestamp: new Date().toISOString()
      })
    });
    console.log("Score saved successfully!");
  } catch (error) {
    if (error.code === 'not-found') {
    // Document not found, create one
    await setDoc(userRef, {
      email: user.email,
      attempts: [{ score, timestamp: new Date().toISOString() }]
    });
  } else {
    console.error("Error saving score:", error);
  }
}
}

export async function getQuizHistory() {
  const user = auth.currentUser;
  if (!user) return [];

  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  return docSnap.exists() ? docSnap.data().attempts : [];
}