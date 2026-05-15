import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAgF4ou7oQVct2RNU934p5Xxd0Sh42q6HI",
  authDomain: "grao-nomade.firebaseapp.com",
  projectId: "grao-nomade",
  storageBucket: "grao-nomade.firebasestorage.app",
  messagingSenderId: "894460248838",
  appId: "1:894460248838:web:83e06f022b229c659f5487"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

export default app