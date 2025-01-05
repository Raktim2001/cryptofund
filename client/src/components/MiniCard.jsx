import React from 'react'
import { useStateContext } from '../context'

const MiniCard = ({title,value}) => {
  const {night}=useStateContext();
  return (
    <div className=' flex flex-col items-center w-[150px] '>
      <h4 className={` font-epilogue font-bold text-[15px] ${night?'text-white bg-[#1c1c24]':' text-black bg-white'}  p-3  rounded-t-[10px] w-full text-center truncate`}>
       {title}
      </h4>
      <p className={` font-epilogue font-normal text-[13px] text-[#808191] ${night?'bg-[#28282e]':'bg-white'} px-3 py-2 w-full rounded-b-[10px] text-center`}>
       {value}
      </p>
    </div>
  )
}

export default MiniCard