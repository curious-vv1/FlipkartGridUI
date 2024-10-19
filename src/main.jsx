import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeApp } from "firebase/app"
import { getDatabase, ref, query, limitToLast, get } from "firebase/database"
import { getAuth, signInAnonymously } from "firebase/auth"
import App from './App.jsx'
import './index.css'

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(app);

// Initialize Authentication
const auth = getAuth(app);

// Function to get the last object from the database
async function getLastObject() {
  try {
    console.log("Attempting to authenticate...");
    await signInAnonymously(auth);
    console.log("Authentication successful");

    console.log("Attempting to fetch last object...");
    const productDataRef = ref(db); // Root reference to access numbered entries in Firebase
    console.log("Database reference created:", productDataRef.toString());

    const lastProductQuery = query(productDataRef, limitToLast(1));
    console.log("Query created");

    const snapshot = await get(lastProductQuery);
    console.log("Query executed. Snapshot exists:", snapshot.exists());

    if (snapshot.exists()) {
      const lastProduct = Object.values(snapshot.val())[0];
      console.log("Last object:", lastProduct);
    } else {
      console.log("No data available in the specified path");
      console.log("Snapshot key:", snapshot.key);
      console.log("Snapshot ref:", snapshot.ref.toString());
    }
  } catch (error) {
    console.error("Error:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    if (error.stack) {
      console.error("Error stack:", error.stack);
    }
  }
}

// Call the function when the app is loaded/refreshed
getLastObject();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
