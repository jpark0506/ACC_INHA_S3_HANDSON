import React from 'react'

const Submit = (props) => {
  const {onClick, isLoading} = props;
  return (
    <button onClick={onClick}>
      {
        isLoading ?
          <div>로그인 중</div>:<div>로그인하기</div>
      }
          
    </button>
  )
}

export default Submit