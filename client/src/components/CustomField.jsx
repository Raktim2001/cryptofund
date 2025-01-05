import React from 'react'
import { useStateContext } from '../context'

const CustomField = ({label,placeholder,value,inputType,isArea,handleChange}) => {
    const {night}=useStateContext();
  return (
     <label  className=' flex flex-1 flex-col w-full'>
        {label?
        (<span className=' font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]'>
            {label}

        </span>)
        :''}
        {isArea?(<textarea
        required
        rows={10}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`sm:min-w-[300px] sm:px-[25px] px-[15px] py-[15px] font-epilogue ${night?'text-white': 'text-black'} text-[14px] outline-none border-[1px] border-[#3a3a43] bg-transparent placeholder:text-[#4b5264] rounded-[10px]`} 
        />):
        (
            <input
            required
            value={value}
            onChange={handleChange}
            type={inputType}
            placeholder={placeholder}
            className={` sm:min-w-[300px] sm:px-[25px] px-[15px] py-[15px] font-epilogue ${night?'text-white': 'text-black'} text-[14px] outline-none border-[1px] border-[#3a3a43] bg-transparent placeholder:text-[#4b5264] rounded-[10px] `} 
             />
        )}

     </label>
  )
}

export default CustomField