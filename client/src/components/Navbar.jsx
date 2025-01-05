import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { menu, menu2, orangge, search, sun } from '../assets';
import { navlinks } from '../constants';
import { useStateContext } from '../context';
import ConnectButton from './ConnectButton';
const Navbar = () => {
  const navigate=useNavigate();
  const [active,setActive]=useState(false);
  const [trigger,setTrigger]=useState(false);
  const {address,connect,night,setNight}=useStateContext();
  return (
    <div className=' flex md:flex-row flex-col-reverse gap-6 mb-[35px] justify-between '>
      <div className='lg:flex-1 flex-row max-w-[458px] h-[52px]  py-2 pl-4 pr-2 flex rounded-[100px] '>
        <input type="text" placeholder="Search for campaigns" className={`flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] ${night?'text-white bg-transparent':'text-black bg-white'} outline-none rounded-xl px-2`}/>
        <div className=' w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer'>
          <img src={search} alt="" className='w-[15px] h-[15px] object-contain' />
        </div>
      </div>
      <div className='sm:flex flex-row hidden justify-end gap-4'>
      <ConnectButton
      btype="button"
      title={address?"Create new campaign":"Connect"}
      styles={address?"bg-[#1dc071]":"bg-[#8c6dfd]"}
      handleClick={()=>{
        if(address)
        navigate('create-campaign');
        else
        connect();
      }}/>
      

      <Link to="/profile">
          <div className={`w-[52px] h-[52px] rounded-full  ${night?'bg-[#2c2f32]': 'bg-[#ffff]'} flex justify-center items-center cursor-pointer`}>
            <img src={orangge} alt="user" className="w-[60%] h-[60%] object-contain" />
          </div>
        </Link>
      </div>
      {/*mobile view hamburger icon + logo after this point*/}
      <div className='sm:hidden flex justify-between relative items-center'>
        <div className={`w-[40px] h-[40px] rounded-[10px] ${night?'bg-[#2c2f32]': 'bg-[#ffff]'} flex justify-center items-center cursor-pointer`} onClick={()=>{navigate('/')}}>
            <img src={orangge} alt="user" className="w-[60%] h-[60%] object-contain" />
          </div>
          <div className={`${night?'text-white':'text-black'}`}>
            CryptoFund
          </div>
          <img src={night?menu:menu2}
           className=' h-[34px] w-[34px] object-contain cursor-pointer'
           onClick={()=>{setTrigger(!trigger)}}
           alt="" />
         <div className={`absolute top-[60px] right-0 left-0 ${night?'bg-[#1c1c24]': 'bg-[#ffff]'} z-10 shadow-secondary py-4 ${!trigger?'-translate-y-[100vh]':'-translate-y-[0]'} tarnsition-all duration-700`}>
          <ul className=' mb-4'>
          {navlinks.map((i)=>(
          <li key={i.name}
          className= {`flex p-4  cursor-pointer ${active==i.name&&night==true?'bg-[#3a3a43]':''} ${active==i.name&&night==false?'bg-[#E1E6E1]':''}`}
          onClick={()=>{
            if(!i.disabled)
            {
              setActive(i.name);
              setTrigger(false);
              navigate(i.link);

            }
            
          }}>
            <img src={i.imgUrl}
            className={` w-[24px] h-[24px] cursor-pointer object-contain ${active==i.name?'grayscale-0':'grayscale'}`}>
            </img>
            <p className={` ml-[20px] cursor-pointer font-epilogue font-semibold text-[14px] ${active==i.name?'text-[#1dc071]':'text-[#808191]'}`}>
              {i.name}
            </p>
          </li>
          
           
          ))}
          <li className={`flex p-4  cursor-pointer ${night?'bg-[#1c1c24]': 'bg-[#ffff]'}`} onClick={()=>{
            setNight(!night);
            }}>
            <img src={sun} className={` ${night?'bg-[#1c1c24]': 'bg-[#ffff]'}`}/>
          </li>
          </ul>
          <div className=' p-4'>
            <ConnectButton
            btype='button'
            title={address?"Create new campaign":"Connect"}
            styles={address?"bg-[#1dc071]":"bg-[#8c6dfd]"}
            handleClick={()=>{
            setTrigger(false);
            if(address)
             navigate('create-campaign');
             else
             connect();
            }}
            />
          </div>
          </div>  
          
      </div>

    </div>
  )
}

export default Navbar