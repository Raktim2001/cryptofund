import React, { useEffect } from 'react'
import { Route,Routes } from 'react-router-dom'
import { Home,CampaignDetails,CreateCampaign,Profile } from './pages'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { useStateContext } from './context'

const App = () => {
  const {night}=useStateContext();
  
  //#E1E6E1
  //bg-[#13131a]
  //bg-[#D4E9F0]
  
  return (
    <div className={`flex flex-row relative p-4 translate-x-0 ${night?'bg-gradient-to-l from-gray-700 via-gray-900 to-black':'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-500'}  min-h-screen transition-all duration-700`} >
      <div className={`sm:flex hidden mr-10 relative`}>
        <Sidebar/>

      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/create-campaign' element={<CreateCampaign/>}/>
          <Route path='/campaign-details/:id' element={<CampaignDetails/>}/>
        </Routes>

      </div>
      
    </div>
  )
}

export default App