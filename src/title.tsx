import React from 'react'
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const Title = () => {
  return (
    <div>
        <a href="" target="_blank">
          <img 
          style={{
            backgroundColor:'white',
            borderRadius: '30px',
          }}
          src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="" target="_blank" >
          <img src={reactLogo}
          style={
          {
            backgroundColor:'white',
            borderRadius: '10px',
            marginLeft: '50px',
          }
        }
          className="logo react" alt="React logo" />
        </a>
      </div>
  )
}

export default Title