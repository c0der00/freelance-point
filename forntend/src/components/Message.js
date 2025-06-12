import { useEffect, useState } from "react";
import { format } from "timeago.js";
import newRequest from "../utils/newRequest";

export default function Message({ message, own }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await newRequest.get(`/users/${message.userId}`);
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [message]);
  const isImageFile = (fileUrl) => {
    console.log(fileUrl);
    
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "bmp"];
    const ext = fileUrl?.split(".").pop().toLowerCase();
    return imageExtensions.includes(ext);
  };

  return (
    <div className={`flex flex-col mt-5 ${own ? "items-end" : ""}`}>
      <div className="flex">
        <img
          className="w-8 h-8 rounded-full object-cover mr-2"
          src={userData.img}
          alt="User"
        />

        <div
          className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
            own ? "bg-gray-100 text-black" : "bg-blue-600 text-white"
          }`}
        >
        {message.file && isImageFile(message.file) ? (
          <img
            src={message.file}
            alt="attachment"
            className="rounded mt-1 max-w-full"
          />
        ) : message.file ? (
          <a
            href={message.file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline mt-1 block"
          >
            📎 Download file
          </a>
        ) : null}
          {message.desc && <p className="mb-1">{message.desc}</p>}
        </div>

       
      </div>

      <div className="text-xs mt-2">{format(message.createdAt)}</div>
    </div>
  );
}
