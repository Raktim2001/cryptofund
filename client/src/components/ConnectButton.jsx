import React from 'react'

const ConnectButton = ({btype,styles,title,handleClick}) => {
  return (
    <button 
    type={btype}
    className={` font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
    onClick={handleClick}>
        {title}

    </button>
  )
}

export default ConnectButton