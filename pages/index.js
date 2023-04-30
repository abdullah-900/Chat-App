import { useContext,useEffect } from "react";
import { AuthContext } from "./components/context/AuthContext";
import Router from "next/router";
const Chatapp = () => {
  const {currentUser}=useContext(AuthContext)
useEffect(()=>{
  if(currentUser===null) {
    Router.push('/Login')
  } else if (currentUser) {
     Router.push('/Home')
  }
},[currentUser])

}
export default Chatapp