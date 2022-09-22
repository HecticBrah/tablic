import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAHaKwfWpa1WkGngrtm-8vagyDGr4AIHGM',
    authDomain: 'tablic-brojac.firebaseapp.com',
    projectId: 'tablic-brojac',
    storageBucket: 'tablic-brojac.appspot.com',
    messagingSenderId: '872685446379',
    appId: '1:872685446379:web:c24a4d4cf51adc64098aae',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
