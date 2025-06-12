import { useEffect, useState } from "react";
import newRequest from "../utils/newRequest";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(currentId);
  

  useEffect(() => {
    const getFriends = async () => {
      const res = await newRequest.get(`/users/${currentId}`);
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);

//   useEffect(() => {
//     setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
//   }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await newRequest.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline bg-gray-900">
      {onlineFriends.map((o) => (
        <div
          key={o._id}
          className="flex items-center font-medium cursor-pointer mt-2"
          onClick={() => handleClick(o)}
        >
          <div className="relative mr-2">
            <img
              className="w-10 h-10 rounded-full object-cover border border-white"
              src={
                o?.img
              }
              alt=""
            />
            <div className="w-2.5 h-2.5 rounded-full bg-lime-500 absolute top-0.5 right-0.5"></div>
          </div>
          <span className="hidden sm:block">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}
