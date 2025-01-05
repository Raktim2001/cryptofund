import React, { useEffect, useState } from 'react'
import CampaignsDisplay from '../components/CampaignsDisplay';
import { useStateContext } from '../context'


const Profile = () => {
  const {userCampaigns,contract,address}=useStateContext();
  const [campaigns,setCampaigns]=useState([]);
  const [loading, setloading] = useState(false);
  const newGetCampaigns= async ()=>{
    setloading(true);
    setCampaigns(await userCampaigns());
    setloading(false);
  }
  useEffect(() => {
    if(contract)
    newGetCampaigns();

  
}, [address,contract])

  return (
    <div>
      <CampaignsDisplay
      title="Your Campaigns"
      loading={loading}
      campaigns={campaigns}
      />
    </div>
  )
}

export default Profile