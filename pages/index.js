import Login from "./Login";
import Register from "./Register"; 
import React from 'react'
import Home from "./Home";
import Head from 'next/head'

const chatapp = () => {
  return (
    <>
      <Head>
        <title>Chatium</title>
        <meta name="viewport" content="width=device-width"></meta>
      </Head>
    <Home/>
    </>
  )
}

export default chatapp