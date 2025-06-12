import React from "react";
import { Link } from "react-router-dom";

const Message = () => {
  return (
    <div className="flex justify-center overflow-x-hidden">
      <div className="w-[1400px] mx-12 my-12">
        <span className="text-sm text-gray-500">
          <Link to="/messages">Messages</Link> ➤ Akshat Jalan ➤
        </span>
        <div className="my-8 p-12 flex flex-col gap-5 h-[500px] overflow-scroll">
          <div className="flex gap-5 max-w-[600px] text-lg">
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <p className="max-w-[500px] p-5 bg-gray-200 rounded-br-[20px] text-gray-500 font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure mollitia perspiciatis officiis voluptate? Sequi quae officia possimus, iusto labore alias mollitia eveniet nemo placeat laboriosam nisi animi! Error, tenetur!
            </p>
          </div>
          <div className="flex gap-5 max-w-[600px] text-lg flex-row-reverse self-end">
            <img
              src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <p className="max-w-[500px] p-5 bg-black text-white rounded-tl-[20px] font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure mollitia perspiciatis officiis voluptate? Sequi quae officia possimus, iusto labore alias mollitia eveniet nemo placeat laboriosam nisi animi! Error, tenetur!
            </p>
          </div>
          <div className="flex gap-5 max-w-[600px] text-lg">
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <p className="max-w-[500px] p-5 bg-gray-200 rounded-br-[20px] text-gray-500 font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure mollitia perspiciatis officiis voluptate? Sequi quae officia possimus, iusto labore alias mollitia eveniet nemo placeat laboriosam nisi animi! Error, tenetur!
            </p>
          </div>
          <div className="flex gap-5 max-w-[600px] text-lg flex-row-reverse self-end">
            <img
              src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <p className="max-w-[500px] p-5 bg-black text-white rounded-tl-[20px] font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure mollitia perspiciatis officiis voluptate? Sequi quae officia possimus, iusto labore alias mollitia eveniet nemo placeat laboriosam nisi animi! Error, tenetur!
            </p>
          </div>
          <div className="flex gap-5 max-w-[600px] text-lg flex-row-reverse self-end">
            <img
              src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <p className="max-w-[500px] p-5 bg-black text-white rounded-tl-[20px] font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure mollitia perspiciatis officiis voluptate? Sequi quae officia possimus, iusto labore alias mollitia eveniet nemo placeat laboriosam nisi animi! Error, tenetur!
            </p>
          </div>
          <div className="flex gap-5 max-w-[600px] text-lg">
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <p className="max-w-[500px] p-5 bg-gray-200 rounded-br-[20px] text-gray-500 font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure mollitia perspiciatis officiis voluptate? Sequi quae officia possimus, iusto labore alias mollitia eveniet nemo placeat laboriosam nisi animi! Error, tenetur!
            </p>
          </div>
        </div>
        <hr />
        <div className="flex items-center justify-between mt-5">
          <textarea
            type="text"
            placeholder="Write a message"
            className="w-4/5 h-24 p-3 border border-lightgray rounded-xl"
          />
          <button className="ml-5 p-2 bg-blue-500 text-white rounded-lg">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
