import { createContext, useContext, useState } from "react";
import {useAddress, useConnect, useContract, useContractWrite, useMetamask} from '@thirdweb-dev/react'
import { BigNumber, ethers, utils } from "ethers";
const StateContext=createContext();

export const StateContextProvider=({children})=>{
    const [night, setNight] = useState(true);
    const {contract}=useContract('0xB35E28cD32f118F625b15Ff116914B0c71B70301');
    const {mutateAsync: createCampaign}=useContractWrite(contract,'createCampaign');//for write functions on the smart contract
    const {mutateAsync: donateblock}=useContractWrite(contract,'donate');//for write functions on the smart contract
    const address=useAddress();
    const connect=useMetamask();
    const publishCampaign=async (form)=>{
        try {
            const data=await createCampaign([
            address,
            form.title,
            form.description,
            form.image,
            new Date(form.deadline).getTime(),
            form.target,
        ])
            console.log('succesfully published', data);
        } catch (error) {
            console.log('error publishing', error);
            
        }
        

    } 
    const getCampaigns=async ()=>{
        const campaigns=await contract.call('getCampaigns');
        const newCampaigns=campaigns.map((campaign,i)=>({
            owner:campaign.owner,
            title:campaign.title,
            description:campaign.description,
            image:campaign.image,
            pid:i,
            target:(campaign.target.toString())/10000000000,
            raised:ethers.utils.formatEther(campaign.raised.toString()),
            deadline:campaign.deadline.toNumber(),


        }))
        return newCampaigns;
    }

    const userCampaigns= async ()=>{
        const campaigns=await getCampaigns();
        const filterCampaigns=campaigns.filter((i)=>(
         i.owner==address
        ))
        return filterCampaigns
    }
    const donate=async(pid,amt)=>{
        const data= await donateblock([
            pid,
            {value: ethers.utils.parseEther(amt)},

        ]);
        return data;
    }
    const getDonations=async(pid)=>{
        const data= await contract.call('getDonations',pid);
        const len=data[0].length;
        const newData=[];
        for(let i=0;i<len;i++)
        {
            newData.push({
                donator: data[0][i],
                donations:ethers.utils.formatEther(data[1][i].toString()),
            })

        }
        return newData;
    }
    return (
        <StateContext.Provider
        value={{
            address,
            contract,
            connect,
            createCampaign:publishCampaign,
            getCampaigns,
            userCampaigns,
            donate,
            getDonations,
            night,
            setNight,

        }}>
            {children}
        </StateContext.Provider>
    )                                        
}
export const useStateContext=()=> useContext(StateContext);
