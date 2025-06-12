// Messenger.js
import Conversation from "../components/Conversation";
import ChatOnline from "../components/ChatOnline";
import { useEffect, useRef, useState } from "react";
import newRequest from "../utils/newRequest";
import io from "socket.io-client";
import Message from "../components/Message";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [file, setFile] = useState(null); // ✅ NEW: file state
  const socket = useRef();
  const scrollRef = useRef();

  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await newRequest.get(`/conversations/${user._id}`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    socket.current = io("ws://localhost:8900");
    getConversations();
  }, [user._id]);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        userId: data.userId,
        desc: data.desc,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    if (arrivalMessage && currentChat?.member.includes(arrivalMessage.userId)) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (currentChat) {
      const getMessages = async () => {
        try {
          const res = await newRequest.get(`/messages/${currentChat._id}`);
          setMessages(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getMessages();
    }
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("desc", newMessage);
    formData.append("conversationId", currentChat._id);
    if (file) formData.append("file", file);

    try {
      const res = await newRequest.post("/messages", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessages([...messages, res.data]);
      setNewMessage("");
      setFile(null);

      socket.current.emit("sendMessage", {
        userId: user._id,
        receiverId: currentChat.member.find((m) => m !== user._id),
        desc: newMessage,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col sm:flex-row h-[calc(100vh-70px)] overflow-hidden bg-gray-50">
      {/* Chat Menu */}
      <div className="sm:w-1/4 lg:w-1/5 border-r bg-white p-4 overflow-y-auto shadow-md">
        <input
          placeholder="Search for friends"
          className="w-full py-2 px-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <div className="space-y-2">
          {conversations.map((c) => (
            <div
              key={c._id}
              onClick={() => setCurrentChat(c)}
              className="cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition duration-150"
            >
              <Conversation conversation={c} currentUser={user} />
            </div>
          ))}
        </div>
      </div>

      {/* Chat Box */}
      <div className="flex-1 bg-white p-4 flex flex-col shadow-inner overflow-hidden">
        {currentChat ? (
          <>
            <div className="flex-1 overflow-y-auto space-y-2 pr-2 mb-4">
              {messages.length > 0 ? (
                messages.map((m) => (
                  <div ref={scrollRef} key={m._id}>
                    <Message message={m} own={m.userId === user._id} />
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400">No messages yet.</div>
              )}
            </div>

            <div className="flex items-center gap-4 border-t pt-4">
              <textarea
                className="flex-1 h-16 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Write something..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              />

              {/* ✅ File input */}
              <label className="cursor-pointer">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                />
                <span className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-2 rounded-lg transition">
                  📎 Choose File
                </span>
              </label>

              <button
                className="h-12 px-6 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-200"
                onClick={handleSubmit}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-xl">
            Open a conversation to start chatting
          </div>
        )}
      </div>

      {/* Online Users */}
      <div className="hidden sm:block sm:w-1/4 lg:w-1/5 bg-white p-4 overflow-y-auto shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Online</h3>
        <ChatOnline
          onlineUsers={onlineUsers}
          currentId={user._id}
          setCurrentChat={setCurrentChat}
        />
      </div>
    </div>
  );
}
