
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyB3D0G-48NWf2DYBzQpJXd8VoTOaZTaIos",
  authDomain: "pruebas-31ac2.firebaseapp.com",
  projectId: "pruebas-31ac2",
  storageBucket: "pruebas-31ac2.appspot.com",
  messagingSenderId: "519184630784",
  appId: "1:519184630784:web:21a5e34055fac67e0404e5"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)