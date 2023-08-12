import {twMerge} from "tailwind-merge";
import {clsx,ClassValue} from "clsx";
import { encode, decode } from 'js-base64';
import {Base64} from 'js-base64';
import axios from "axios";
import {ACCESS_TOKEN, BASED_URL} from "@/constants/constants.tsx";
export const cn = (...inputs:ClassValue[]) => {
  return twMerge(clsx(inputs))
}



export const  decodingBody=(data:string)=>{
  return Base64.atob(data)
}
export const mails=''
export const getMails=async()=>{
  try{
    const res=await axios.get(
        `${BASED_URL}/gmail/v1/users/me/messages/`,
        {
          headers:{
            Authorization:`Bearer ${ACCESS_TOKEN}`
          }
        }
    )
      const mails=res.data.messages
      return mails
  }catch (err){
    console.log(err)
  }

}