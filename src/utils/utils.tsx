import {twMerge} from "tailwind-merge";
import {clsx,ClassValue} from "clsx";
import { encode, decode } from 'js-base64';
import {Base64} from 'js-base64';
import axios from "axios";
import {ACCESS_TOKEN, BASED_URL} from "@/constants/constants.tsx";
import Mailer from "@/components/Mailer.tsx";
export const cn = (...inputs:ClassValue[]) => {
  return twMerge(clsx(inputs))
}



export const  decodingBody=(data:string)=>{
  return Base64.atob(data)
}

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

export const allMails: string[] | Promise<undefined> |number= await getMails()

export const getMailById=async (mailID:string)=>{
    try {
        const res= await axios.get(
            `${BASED_URL}/gmail/v1/users/me/messages/${mailID}`,
            {
                headers:{
                    Authorization:`Bearer ${ACCESS_TOKEN}`
                }
            }
        )
        const fullMail=res.data
        return fullMail
    }catch (err) {
        console.log(err);
    }
}

export function calculateSimilarityPercentage(str1, str2) {
    const distance = calculateLevenshteinDistance(str1, str2);
    const maxLength = Math.max(str1.length, str2.length);
    const similarityPercentage = ((maxLength - distance) / maxLength) * 100;

    return similarityPercentage.toFixed(2);
}

export function calculateLevenshteinDistance(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

    for (let i = 0; i <= len1; i++) {
        for (let j = 0; j <= len2; j++) {
            if (i === 0) {
                dp[i][j] = j;
            } else if (j === 0) {
                dp[i][j] = i;
            } else if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
    }

    return dp[len1][len2];
}

