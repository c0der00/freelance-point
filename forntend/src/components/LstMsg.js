import { useEffect, useState } from "react";
import newRequest from "../utils/newRequest";

export default function LstMsg({ conversation, currentUser }) {
     
    const [newMessage, setNewMessage] = useState({});
    


   useEffect(() => {
     const friendId = conversation.member.find((m) => m !== currentUser._id)
    console.log(conversation);
    
     const getMessage = async() => {
        const res = await newRequest.get(`/messages/${conversation._id}/${friendId}`)
        setNewMessage(res.data)        
     }
     getMessage()
   },[conversation,currentUser])

   console.log(newMessage);

  return (
    <div className="flex  w-auto items-start p-1 cursor-pointer">
      {newMessage.desc}
    </div>
  );
}
