import React from 'react'
import { tagType, thirdweb } from '../assets'
import { useStateContext } from '../context';
import { daysLeft } from '../utils'

const FundCard = ({owner,title,description,image,pid,raised,target,deadline,handleClick}) => {
  let deadline1=daysLeft(deadline);
  if(deadline1<0)
  deadline1='No';
  const {night}=useStateContext();
  return (
    <div className={`sm:w-[288px] w-full rounded-[15px] ${night?'bg-[#1c1c24]':'bg-[#ffff]'} cursor-pointer hover:-translate-y-1 transition-transform duration-700`} onClick={handleClick}>
      <img src={image} alt=""  className=' w-full h-[158px] object-cover items-center rounded-[15px]'/>
     <div className=' flex flex-col p-4'>
      <div className=' flex flex-row items-center mb-[18px]'>
        <img src={tagType} className='w-[17px] h-[17px] object-contain' alt="" />
        <p className=' mt-[2px] ml-[17px] font-epilogue font-medium text-[12px] text-[#808191]'>Personal</p>
      </div>
      <div className='flex flex-col'>
        <h3 className={` font-epilogue font-semibold text-[16px] ${night?'text-white': 'text-black'} text-left leading-[26px] truncate`}>{title}</h3>
        <p className='font-epilogue font-normal text-[12px] text-[#808191] text-left leading-[18px] mt-[5px] truncate'>{description}</p>
      </div>
      <div className='flex justify-between gap-2 mt-[15px]'>
        <div className=' flex flex-col'>
          <h4 className=' font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]'>{raised} eth</h4>
          <p className=' sm:max-w-[120px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] truncate'>Raised of {target}eth</p>
        </div>
        <div className=' flex flex-col'>
          <h4 className='font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]'>{deadline1}</h4>
          <p className=' sm:max-w-[120px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] truncate'>Days left</p>
        </div>
      </div>
      <div className='flex  items-center mt-[20px] gap-[12px]'>
        <div className='w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]'>
          <img src={thirdweb} alt="" className=' w-1/2 h-1/2 object-contain' />
          </div>
          <p className=' flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate'>Owner: <span>{owner}</span></p>
        
      </div>
     </div>

    </div>
  )
}

export default FundCard