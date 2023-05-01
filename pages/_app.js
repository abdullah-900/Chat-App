import 'bootstrap/dist/css/bootstrap.css';
import '../styles/style.scss'
import { useEffect,useState} from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext'
import { userContext } from '../context/user';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../firebase';
import Head from 'next/head';
export default function MyApp({ Component, pageProps }) {
   const [currentUser, setCurrentUser] = useState({});
   const [selectedUser,setSelectedUser]=useState();
   const [combinedId,setCombinedId]=useState();
   const [messages,setMessages]=useState([])
  useEffect(() => {
    const unsub=onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
        currentUser?.uid && check()
         async function check() {
          if (user) {
           await setDoc(doc(db, 'users', currentUser?.uid), { state: true }, { merge: true });
          }else {
           await setDoc(doc(db, 'users', currentUser?.uid), { state: false }, { merge: true });
          }
         }
         
    });
    
    return () => {
      unsub();
    };
    
  },[currentUser?.uid]);

  return (
    <>
    <Head>
    <title>Placid</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"></meta>
  </Head>
  <userContext.Provider value={{setSelectedUser,selectedUser,combinedId,setCombinedId,messages,setMessages}}>
    <AuthContext.Provider value={{currentUser}}>
      <Component {...pageProps} />
      </AuthContext.Provider>
      </userContext.Provider>
      </>
  )
}
  
