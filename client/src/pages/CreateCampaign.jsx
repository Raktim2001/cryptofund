import { ethers } from 'ethers';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { money } from '../assets';
import ConnectButton from '../components/ConnectButton';
import CustomField from '../components/CustomField';
import Loader from '../components/Loader';
import { useStateContext } from '../context';
import { checkIfImage } from '../utils';

const CreateCampaign = () => {
  const navigate=useNavigate();
  const [load, setload] = useState(false);
  const [form, setform] = useState({
    name:'',
    title:'',
    description:'',
    target:'',
    deadline:'',
    image:'',
  })
  const {createCampaign,night}=useStateContext();
  const handleInput=(field,e)=>{
    setform({...form,[field]:e.target.value});
                                  
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    checkIfImage(form.image,async (exists)=>{
      if(exists==true)
      {
        setload(true);
      await createCampaign({...form,target:ethers.utils.parseUnits(form.target,10)}) // done to convert ether into BigNumber
      setload(false);
      navigate('/');
      }
      else
      {
        alert('Image url is not correct');
        setform({...form,image:''});

      }
      

    })

    console.log(form);
  }
  return (
    <div className={`flex flex-col items-center justify-center  ${night?'bg-[#1c1c24]': 'bg-[#ffff]'}  sm:p-10 p-4`}>
      {load?<Loader/>:''}
      <div className={` flex flex-col items-center justify-center p-[16px] sm:min-w-[380px] ${night?'bg-[#3a3a43]': 'bg-[#E1E6E1]'} rounded-[10px]`}>
        <h1 className={` font-epilogue  ${night?'text-white': 'text-black'} sm:text-[25px] text-[18px] leading-[30px]`}>
          Give life to your idea
        </h1>
      </div>
      <form onSubmit={handleSubmit} action="" className=' w-full flex flex-col mt-[65px] gap-[30px]' >
        <div className=' flex flex-wrap gap-[40px]'>
          <CustomField
          label="Idea Creator"
          placeholder="Ed Warren"
          inputtype="text"
          value={form.name}
          handleChange={(e)=>{
            handleInput('name',e);

          }}/>
          <CustomField
          label="Title"
          placeholder="CryptoFund"
          inputType="text"
          value={form.title}
          handleChange={(e)=>{
            handleInput('title',e);

          }}/>
        </div>
        <CustomField
          label="Description"
          placeholder="How you plan to implement your idea"
          isArea={true}
          value={form.description}
          handleChange={(e)=>{
            handleInput('description',e);

          }}/>
        <div className='flex items-center justify-start p-4 bg-orange-700 rounded-[10px] h-[120px] w-full object-contain'>
          <img src={money} className='w-[40px] h-[40px] object-contain' />
          <h4 className=' object-contain text-white sm:text-[25px] ml-[20px] font-bold font-epilogue'>No commission is provided to centralized applications</h4>
        </div>
         <div className=' flex flex-wrap gap-[40px]'>
          <CustomField
          label="Goal"
          placeholder="300.0 eth"
          inputtype="text"
          value={form.target}
          handleChange={(e)=>{
            handleInput('target',e);

          }}/>
          <CustomField
          label="Deadline"
          placeholder="2/2/2222"
          inputType="date"
          value={form.deadline}
          handleChange={(e)=>{
            handleInput('deadline',e);

          }}/>
          
        </div>
        <CustomField
          label="Image"
          placeholder="img.url"
          inputType="url"
          value={form.image}
          handleChange={(e)=>{
            handleInput('image',e);

          }}/>
        <div className='flex items-center justify-center'>
          <ConnectButton
          btype='submit'
          title='Create'
          styles=' bg-[#1dc071] mt-[35px]'
          />
          </div>
        
      </form>
    </div>
  )
}

export default CreateCampaign