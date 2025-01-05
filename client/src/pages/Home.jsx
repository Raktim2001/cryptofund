import React, { useEffect, useState } from 'react'
import CampaignsDisplay from '../components/CampaignsDisplay';
import { useStateContext } from '../context'


const Home = () => {
  const {getCampaigns,contract,address}=useStateContext();
  const [campaigns,setCampaigns]=useState([]);
  const [loading, setloading] = useState(false);
  const newGetCampaigns= async ()=>{
    setloading(true);
    setCampaigns(await getCampaigns());
    setloading(false);
  }
  useEffect(() => {
    if(contract)
    newGetCampaigns();

  
}, [address,contract])

  return (
    <div>
      <CampaignsDisplay
      title="All Campaigns"
      loading={loading}
      campaigns={campaigns}
      />
    </div>
  )
}

export default Home