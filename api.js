import { initializeApp } from "firebase/app"
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where,
} from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyCcrLfL164EGfRBwXFsVcSyq_2tIT3WURA",
  authDomain: "camrent-88656.firebaseapp.com",
  projectId: "camrent-88656",
  storageBucket: "camrent-88656.appspot.com",
  messagingSenderId: "61560908967",
  appId: "1:61560908967:web:6b8982752ee97e92913f82"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const camerasCollectionRef = collection(db, "cameras")

export async function getCameras() {
    const snapshot = await getDocs(camerasCollectionRef)
    const cameras = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return cameras
}

export async function getCamera(id) {
    const docRef = doc(db, "cameras", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getUserCameras() {
    const q = query(camerasCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const cameras = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return cameras
}
