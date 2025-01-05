import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logo, sun } from '../assets';
import { navlinks } from '../constants';
import { useStateContext } from '../context';
const Sidebar = () => {
  const {night,setNight}=useStateContext();
  
  const navigate=useNavigate();
  const [isActive,setisActive]=useState(false);
  const Icon=({name,imgUrl,disabled,isActive,handleClick,styles})=>(
    <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive&&isActive===name&&'bg-[#2c2f32]'} ${isActive&&isActive===name&&night==false&&'bg-[#E1E6E1]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles} hover:translate-y-1 transition-all duration-700`} onClick={handleClick}>
        {!isActive?(
            <img src={imgUrl} className='w-1/2 h-1/2' />
        )
        :(
            <img src={imgUrl} className={` w-1/2 h-1/2 ${(isActive!==name||disabled===true)?'grayscale':' '}`} />
            
        )}
    </div>

  )
  return (
    <div className='flex justify-between items-center flex-col sticky top-5 h-[93vh]"'>
        <Link to='/'>
            <Icon styles={`w-[52px] h-[52px] ${night?'bg-[#2c2f32]': 'bg-[#ffff]'}`} imgUrl={logo} />
        </Link>
        <div className={`flex flex-1  flex-col justify-between items-center ${night?'bg-[#1c1c24]': 'bg-[#ffff]'} rounded-[20px] w-[76px] py-4 mt-12`}>
          <div className='flex flex-col justify-center items-center gap-3 '>
           {navlinks.map((i)=>(
            <Icon
            key={i.name}
            {...i}
            isActive={isActive}
            handleClick={()=>{
              if(!i.disabled)
              {
                setisActive(i.name);
                navigate(i.link);
              }
              
            }}
            />
           ))}
        </div>
        <div onClick={()=>{
          console.log(night);
          setNight(!night);
          
          }}>
          <Icon imgUrl={sun} styles={` ${night?'bg-[#1c1c24]': 'bg-[#ffff]'}`}/>
          </div>
        </div>
    </div>
  )
}

export default Sidebar