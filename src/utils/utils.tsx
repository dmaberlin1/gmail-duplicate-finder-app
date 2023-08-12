import {twMerge} from "tailwind-merge";
import {clsx,ClassValue} from "clsx";
import { encode, decode } from 'js-base64';
import {Base64} from 'js-base64';
export const cn = (...inputs:ClassValue[]) => {
  return twMerge(clsx(inputs))
}




export const  decodingBody=(data:string)=>{
  return Base64.atob(data)
}
