import Sidebar from "./components/Sidebar";
import { useContext,useEffect,useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Router from "next/router";
import Chat from "./components/Chat";
const Home = () => {

  const {currentUser}=useContext(AuthContext)
 const [showSide,setShowSide]=useState(true)
 
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
     {showSide && <Sidebar/> }
      <Chat set={setShowSide} val={showSide}/>
      </div>
    </div>
  );
};
export default Home;
