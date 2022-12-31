import '../styles/style.scss'
import { useEffect,useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from './components/context/AuthContext'
import Head from 'next/head';
export default function MyApp({ Component, pageProps }) {
   const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub=onAuthStateChanged(auth, (user) => {
     
        setCurrentUser(user);
   
    });
    return () => {
      unsub();
    };
    
  }, []);
console.log (currentUser)

  return (
    <>
    <Head>
    <title>Placid</title>

    <meta name="viewport" content="width=device-width"></meta>
  </Head>
    <AuthContext.Provider value={{currentUser}}>
      <Component {...pageProps} />
      </AuthContext.Provider>
      </>
  )
}
  
