import axios from "axios";
import {BASED_URL} from "@/constants/constants.tsx";

async function getText(sentences:string) {
    const response=await axios.get<string>(BASED_URL,{
        params:{
            type:'all-meat',
            sentences,
            format:'text'
        }
    });

    return response
}



export default getText;