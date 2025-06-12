import React, { useEffect, useState } from 'react';
import './admin.css';
import Admin_header from './Admin_header';
import Sidebar from './Sidebar';
import { useParams } from 'react-router-dom';
import newRequest from '../utils/newRequest';

function User_Details() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const [userData, setUserData] = useState({})
  const { id } = useParams()
  console.log(id);




  useEffect(() => {
    console.log(id, "ldkvns")
    const fatchUserById = async () => {
      const response = await newRequest.get(`/users/${id}`)
      setUserData(response.data)
    }
    fatchUserById()
  }, [id])

  return (
    <>
      <Sidebar>
        <Admin_header currentUser={currentUser} />
        <div className='d-flex justify-content-center user_details'>
          <div className='user_details-Personal-info-part mx-2'>
            <div className='user_details-Personal-info-header my-3'><h5 className='px-2'>Personal Details</h5></div>
            <div className='user_details-Personal-info'>
              <div className='user_details-Personal-info-image-part' >
                <div className='user_details-Personal-info-image'>
                  <img src={userData.img} alt="." />
                </div>
              </div>
              <div className='text-center pb-2'><h3>{userData.username}</h3></div>
              <div className='d-flex flex-col user_details-Personal-information my-3'>
                <label htmlFor="User_details-Email">Email</label>
                <span>{userData.email}</span>
              </div>
              <div className='d-flex flex-col user_details-Personal-information my-3'><label htmlFor="Mobile-no">Mobile No.</label><span>{userData.phone}</span></div>
              <div className='d-flex flex-col user_details-Personal-information my-3'><label htmlFor="Address">Address</label><span>null</span></div>
            </div>
          </div>
          <div className='user_details-contact-details-part'>
            <div className='d-flex user_details-contact-details-header my-3'><h5 className='px-2'>Contact Details</h5></div>
            <div className='user_details-contact-details'>
              <div className='d-flex justify-content-between user_details-contact-detail'>
                <div>Account Role</div>
                <div>User</div>
              </div>

              <div className='d-flex justify-content-between user_details-contact-detail'>
                <div>Profile id</div>
                <div>{userData._id}</div>
              </div>

              <div className='d-flex justify-content-between user_details-contact-detail'>
                <div>Created At</div>
                <div>{userData.createdAt}</div>
              </div>

              <div className='d-flex justify-content-between user_details-contact-detail'>
                <div>Account Email</div>
                <div>{userData.email}</div>
              </div>

              <div className='d-flex justify-content-between user_details-contact-detail'>
                <div>Phone Number</div>
                <div>{userData.phone}</div>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  )
}

export default User_Details;
