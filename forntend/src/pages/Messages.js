import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import newRequest from "../utils/newRequest";
import LstMsg from "../components/LstMsg";
import { format } from "timeago.js";

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [userFriend, setUserFriend] = useState({});

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await newRequest.get(`/conversations/${currentUser._id}`);
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    fetchConversations();
  }, [currentUser._id]);

  useEffect(() => {
    if (conversations.length > 0) {
      conversations.forEach(async (conversation) => {
        const friendId = conversation.member.find((m) => m !== currentUser._id);
        const getUser = async () => {
          try {
            const res = await newRequest.get(`/users/${friendId}`);
            setUserFriend((prevUserFriends) => ({
              ...prevUserFriends,
              [conversation._id]: res.data,
            }));
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        };
        getUser();
      });
    }
  }, [conversations, currentUser._id]);

  return (
    <div className="flex justify-center text-gray-600">
      <div className="w-full max-w-screen-xl py-12 px-0">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">Messages</h1>
        </div>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="text-left px-4 py-2">{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th className="text-left px-4 py-2">Last Message</th>
              <th className="text-left px-4 py-2">Date</th>
              <th className="text-left px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {conversations.map((conversation) => {
              const friend = userFriend[conversation._id];
              return (
                <tr className="bg-gray-100" key={conversation._id}>
                  <td className="px-4 py-2">{friend ? friend.username : "Loading..."}</td>
                  <td className="px-4 py-2">
                    <Link to={'/msg'} className="text-blue-600 hover:text-blue-800">
                      <LstMsg conversation={conversation} currentUser={currentUser} />
                    </Link>
                  </td>
                  <td className="px-4 py-2">{format(conversation.createdAt)}</td>
                  <td className="px-4 py-2">
                    <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800">Mark as Read</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;
