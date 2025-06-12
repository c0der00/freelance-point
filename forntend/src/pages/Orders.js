import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { Link, useNavigate } from "react-router-dom";
import { Username } from "../components/Username";

const Orders = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: () => newRequest.get(`/orders/${currentUser._id}/${currentUser.isSeller}`).then((res) => {
      return res.data;
    }),
  });

  if (isLoading) return <div className="justify-content">Loading...</div>;
  if (isError) return <div className="justify-content">Error</div>;

  return (
    <div className="flex p-10 justify-center">
      <div className="container w-full p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Orders</h1>
        </div>
        <table className="w-full border-solid">
          <thead>
            <tr >
              <th className="text-left">Image</th>
              <th className="text-left">Title</th>
              <th className="text-left">Price</th>
              <th className="text-left">{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th className="text-left">Contact</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((order) => (
                <tr key={order._id} className="h-[50px] even:bg-[#1dbf730f]">
                  <td>
                    <img className="w-[50px] h-[25px] object-cover" src={order.img} alt="" />
                  </td>
                  <td>{order.title}</td>
                  <td>
                    {order.price}
                    <sup></sup>
                  </td>
                  <td>{console.log(currentUser.isSeller,"dddddddddddddd")}
                    {!currentUser.isSeller
                      ? <Username id={order.sellerId}/>
                      : <Username id={order.buyerId}/>}
                  </td>
                  <td>
                    <div className="text-color-bule">
                      <Link to='/msg'>
                      contact
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
