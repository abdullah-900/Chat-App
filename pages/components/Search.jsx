import React from 'react'

const Search = () => {
  return (
    <div className="search">
      <input placeholder="Find a user" type="text"></input>
    <div className='userinfo'>
    <img src='/man.png'></img>
  <span>display name</span>
    </div>
    
    </div>
  )
}

export default Search