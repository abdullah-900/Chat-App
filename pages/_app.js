import '../styles/style.scss'
import { useEffect,useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from './components/context/AuthContext'
import { userContext } from './components/context/user';
import Head from 'next/head';
export default function MyApp({ Component, pageProps }) {
   const [currentUser, setCurrentUser] = useState({});
   const [selectedUser,setSelectedUser]=useState();
   const [combinedId,setCombinedId]=useState();
  
  useEffect(() => {
    const unsub=onAuthStateChanged(auth, (user) => {
     
        setCurrentUser(user);
   
    });
    return () => {
      unsub();
    };
    
  }, []);

  return (
    <>
    <Head>
    <title>Placid</title>
    <meta name="viewport" content="width=device-width"></meta>
  </Head>
  <userContext.Provider value={{setSelectedUser,selectedUser,combinedId,setCombinedId}}>
    <AuthContext.Provider value={{currentUser}}>
      <Component {...pageProps} />
      </AuthContext.Provider>
      </userContext.Provider>
      </>
  )
}
  
