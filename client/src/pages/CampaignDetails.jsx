import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { orangge } from '../assets';
import ConnectButton from '../components/ConnectButton';
import Loader from '../components/Loader';
import MiniCard from '../components/MiniCard';
import { useStateContext } from '../context';
import { calculateBarPercentage, daysLeft } from '../utils';

const CampaignDetails = () => {
  const navigate=useNavigate();
  const {state}=useLocation();
  const complete=state.target-state.raised;
  console.log(complete);
  const {donate,getDonations,contract,address,night}=useStateContext();
  const [load, setload] = useState(false);
  const [donators, setdonators] = useState([]);
  const [amt, setamt] = useState();
  const getDonationInfo=async()=>{
    const data=await getDonations(state.pid);
    setdonators(data);
  }
  let flag=0;
  useEffect(() => {
    if(contract)
    getDonationInfo();
    }
  , [contract,address])
  
  const handleDonate=async()=>{
    flag=0;
    if(amt>complete)
    {
      alert('Please enter an amount smaller than '+complete);
      flag=1;
    

    }
    
    if(amt>0&&flag==0)
    {
    setload(true);
    await donate(state.pid,amt);
    navigate('/');
    setload(false);
    }
  }
  //console.log(donators);
  let remDays=daysLeft(state.deadline);
  if(remDays<0)
  remDays='None'
  //console.log(state);
  return (
   <div>
    {load?<Loader/>:''}
    <div className=' w-full flex md:flex-row flex-col mt-[10px] gap-[30px]'>
      <div className=' flex-1 flex-col'>
        <img src={state.image} alt="" className='w-full h-[410px] object-cover rounded-xl' />
        <div className={`relative w-full  ${night?'bg-[#3a3a43]':'bg-white'} h-[5px] mt-2`}>
          <div className=' absolute bg-[#4acd8d] h-full' style={{width:`${calculateBarPercentage(state.target,state.raised)}%`, maxWidth: '100%'}}></div>
        </div>
      </div>
      <div className=' flex flex-wrap md:w-[150px] w-full justify-between gap-[30px]'>
        <MiniCard title='Days Remaining' value={remDays}/>
        <MiniCard title={`Raised of ${state.target}`} value={state.raised}/>
        <MiniCard title='Total donations' value={donators.length}/>
      </div>
    </div>
    <div className=' flex lg:flex-row flex-col gap-5 mt-[60px] justify-between'>
      <div className=' flex flex-col gap-[40px] lg:max-w-[60%]'>
         <div>
          <h4 className={` font-epilogue font-semibold text-[18px] ${night?'text-white':'text-black'}`}>Creator</h4>
          <div className='mt-[20px] flex flex-row items-center flex-wrap gap-[14px]'>
            <div className={`w-[52px] h-[52px] flex items-center justify-center rounded-full  ${night?'bg-[#2c2f32]':'bg-[#FFF]'} cursor-pointer`}>
              <img src={orangge} alt=""  className='w-[60%] h-[60%] object-contain'/>
            </div>
            <div>
              <h4 className={`font-epilogue font-semibold text-[14px] ${night?'text-white':'text-black'}`}>{state.owner}</h4>
            </div>
          </div>
         </div>
        <div>
          <h4 className={`font-epilogue font-semibold text-[18px] ${night?'text-white':'text-black'} uppercase`}>
            Description
          </h4>
          <div className=' mt-[20px]'>
            <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify'>{state.description}</p>
          </div>
        </div>
        <div>
          <h4 className={`font-epilogue font-semibold text-[18px] ${night?'text-white':'text-black'} uppercase`}>Investors</h4>
          <div className='mt-[20px] flex flex-col gap-4'>
            {donators.length>0? donators.map((donator,i)=>(
              <div key={i} className=' flex flex-wrap justify-between items-center gap-4 max-h-[100px] overflow-scroll scrollbar-hide'>
                <p className='font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll'>
                  {i+1}. {donator.donator}

                </p>
                <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll'>
                  {donator.donations}

                </p>
              </div>
            )):(
            <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify'>
              No Investors yet, break the cycle!
              </p>)}
          </div>
        </div>
      </div>
      <div className=' flex flex-col'>
        <h4 className={`font-epilogue font-semibold text-[18px] ${night?'text-white':'text-black'} uppercase`}>Invest</h4>
        <div className={` flex flex-col p-4 ${night?'bg-[#1c1c24]':' bg-white'}  rounded-[10px]`}>
          {complete>0?<>
          <p className='font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]'>
            Fund this Project
          </p>
          <div className='mt-[30px]'>
            <input type="number"
            max={complete}
            placeholder='2.5 eth'
            step='0.01'
            className={` outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue ${night?'text-white':'text-black'} sm:px-[20px] px-[15px] py-[10px] w-full text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]`} 
            value={amt}
            onChange={(e)=>{setamt(e.target.value)}}/>
            <div className={`my-[20px] p-4 ${night?'bg-[#13131a]':'bg-[#E1E6E1]'} rounded-[10px]`}>
              <h4 className={`font-epilogue font-semibold text-[14px] leading-[22px] ${night?'text-white':'text-black'}`}>'I invest in companies not stocks' - Warren Buffett</h4>
              <p className='mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]'>Support the project that you believe in.</p>
            </div>
            <ConnectButton
            btype='button'
            title='Invest'
            styles='w-full bg-[#8c6dfd]'
            handleClick={handleDonate}/>
          </div>
          </>:
          <p className='font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]'>
            This Project has raised its Goal!
            <p>Check out other campaigns by Clicking <Link to='/' className=' text-[#4acd8d]'>Here</Link></p>
          </p>
          }
        </div>
        
      </div>
    </div>
   </div> 
  )
}

export default CampaignDetails