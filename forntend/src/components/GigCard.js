import React from "react";
import { Link } from "react-router-dom";
import starImg from "../assets/star.png";

const GigCard = ({ item }) => {
  return (
    <Link to={`/gig/${item._id}`} className="group">
      <div className="bg-white p-1 w-[350px] h-[430px] text-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col  ">
        <div className="w-full h-48 overflow-hidden">
          <img
            className="w-full h-full object-cover rounded-t-lg"
            src={item.cover}
            alt="Gig Cover"
          />
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <img className="w-8 h-8 rounded-full object-cover" src={item.images} alt="User" />
              <h5 className="font-semibold text-lg">{item.title}</h5>
            </div>
            <p className="text-sm mt-2 text-gray-400 line-clamp-3">{item.desc}</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-1">
              <img className="w-4 h-4" src={starImg} alt="Star" />
              <span className="text-sm">{item.starNumber}</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500">STARTING AT</span>
              <h2 className="font-semibold text-xl text-black">INR {item.price}</h2>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
