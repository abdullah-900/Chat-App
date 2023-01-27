import Sidebar from "./components/Sidebar";
import { useContext,useEffect } from "react";
import { AuthContext } from "./components/context/AuthContext";
import Router from "next/router";
import Chat from "./components/Chat";
const Home = () => {
  const {currentUser}=useContext(AuthContext)
 
useEffect(()=>{
  
  if(currentUser===null || currentUser===undefined) {
    Router.push('/Login')
  
  } else{
    Router.push('/Home')
    
  }

},[currentUser])
  return (
    <div className="appContainer">
      <div className="appWrapper">
      <Sidebar/>
      <Chat/>
      </div>
    </div>
  );
};
export default Home;
