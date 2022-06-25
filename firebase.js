import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBByCj_vUVrJkHTk-cj7uAaw-Bz6dbWLVs',
  authDomain: 'grocery-app-52106.firebaseapp.com',
  projectId: 'grocery-app-52106',
  storageBucket: 'grocery-app-52106.appspot.com',
  messagingSenderId: '598258330536',
  appId: '1:598258330536:web:eeff301a26cc650cd30b9d',
};

// init firebase app
const app = initializeApp(firebaseConfig);

// init services
export const auth = getAuth(app);
export const db = getFirestore();

export default app;
