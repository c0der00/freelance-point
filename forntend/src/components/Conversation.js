import axios from "axios";
import { useEffect, useState } from "react";
import newRequest from "../utils/newRequest";

export default function Conversation({ conversation, currentUser }) {
     
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.member.find((m) => m !== currentUser._id);
    console.log(friendId);
    const getUser = async () => {
      try {
        const res = await newRequest.get(`/users/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="flex  w-auto items-center p-1 cursor-pointer  hover:bg-gray-400">
      <img
        className=" h-10 rounded-full object-cover mr-5"
        src={
          user?.img
        }
        alt=""
      />
      <span className="font-medium ">{user?.username}</span>
    </div>
  );
}
