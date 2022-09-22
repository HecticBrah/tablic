import React from 'react';
import db from './firebase.config';
import { collection, addDoc } from 'firebase/firestore';

export const saveData = async (data) => {
    await addDoc(collection(db, 'game'), data);
};
