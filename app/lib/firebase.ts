import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
 apiKey: "AIzaSyDttIfy17QXJgkNOV4-7htrGcbS0mGu83g",
  authDomain: "video-call-ab765.firebaseapp.com",
  databaseURL: "https://video-call-ab765-default-rtdb.firebaseio.com",
  projectId: "video-call-ab765",
  storageBucket: "video-call-ab765.appspot.com",
  messagingSenderId: "943068126385",
  appId: "1:943068126385:web:932f4b9dc6ce408ff65690"
}

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }

