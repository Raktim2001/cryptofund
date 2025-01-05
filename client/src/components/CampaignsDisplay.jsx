import React from 'react'
import { useNavigate } from 'react-router-dom';
import { loader } from '../assets'
import { useStateContext } from '../context';
import FundCard from './FundCard';

const CampaignsDisplay = ({title,campaigns,loading}) => {
  const navigate=useNavigate();
  const handleNavigate=(campaign)=>{
     navigate(`/campaign-details/${campaign.title}`,{state:campaign});
  }
  const {night}=useStateContext();
  return (
    <div>
      <h1 className={` font-epilogue font-semibold text-[18px] ${night?'text-white': 'text-black'} text-left`}>{title}({campaigns.length})</h1>
      <div className=' flex flex-wrap mt-[20px] gap-[26px]'>
        {loading?(
          <img src={loader} className=' w-[100px] h-[100px] object-contain ' />
        ):''}

        {!loading&&campaigns.length===0?(
          <p className=' font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]'>
            No Campaigns created yet
          </p>
        ):''}
        {!loading && campaigns.length!=0 && campaigns.map((i)=>
        <FundCard
        key={i.id}
        {...i}
        handleClick={()=>handleNavigate(i)}
        />)}
      </div>
    </div>
  )
}

export default CampaignsDisplay