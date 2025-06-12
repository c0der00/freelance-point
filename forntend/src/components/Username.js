import { useEffect, useState } from "react";
import newRequest from "../utils/newRequest";

export function Username(id){
    const [userData,setUserData] = useState({})    
    useEffect(() => {
      const userFatch = async() => {
        const res = await newRequest.get(`/users/${id.id}`);
        setUserData(res.data)
      }
      userFatch()
    },[id])
  
    return(
      <div>{userData.username}</div>
    )
   }