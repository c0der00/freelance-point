import React from 'react';
import Sidebar from './Sidebar';
import Admin_header from './Admin_header';
import { Link } from 'react-router-dom';

function Admin_contact_details() {
  return (
   <>
   <Sidebar>
    <Admin_header/>
    <div className='Admin_contact_details'>
    <div>
        <p className='fs-4 px-4 py-1'>Contact List</p>
      </div>

      <div className='text-end'><input type="text" placeholder='Search Phone Number' id='admin-contact-phonenumber-input'/></div>
    
      <div className='contact-table my-3'>
        <table className='table'>
          <thead>
            <tr className='text-center'>
              <td>UserId</td>
              <td>Phone numnber</td>
              <td>Email</td>
              <td>Action</td>
            </tr>
          </thead>

          <tbody>
            <tr className='text-center'>
              <td>1</td>
              <td>8976536766</td>
              <td>Devprajapati@gmail.com</td>
              <td><div className='admin-contact-profile-details-button'><button className='btn btn-success px-2'><Link to='/Admin/Details'>Details</Link></button></div></td>
            </tr>

            <tr className='text-center'>
              <td>2</td>
              <td>8976536766</td>
              <td>Devprajapati@gmail.com</td>
              <td><div className='admin-contact-profile-details-button'><button className='btn btn-success px-2'><Link to='/Admin/Details'>Details</Link></button></div></td>
            </tr>

            <tr className='text-center'>
              <td>3</td>
              <td>8976536766</td>
              <td>Devprajapati@gmail.com</td>
              <td><div className='admin-contact-profile-details-button'><button className='btn btn-success px-2'><Link to='/Admin/Details'>Details</Link></button></div></td>
            </tr>

            <tr className='text-center'>
              <td>4</td>
              <td>8976536766</td>
              <td>Devprajapati@gmail.com</td>
              <td><div className='admin-contact-profile-details-button'><button className='btn btn-success px-2'><Link to='/Admin/Details'>Details</Link></button></div></td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
    </Sidebar>
   </>
  )
}

export default Admin_contact_details
