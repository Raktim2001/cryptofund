import React from 'react'
import { loader } from '../assets'

const Loader = () => {
  return (
    <div className=' fixed inset-0 z-10 flex flex-col  items-center justify-center bg-[rgba(0,0,0,0.7)] h-full w-full overflow-hidden'>
      <img src={loader} alt="" className=' h-[100px] w-[100px] object-contain' />
       <p className='text-[#1dc071]'>Contacting the Blockchain</p>
    </div>
  )
}

export default Loader