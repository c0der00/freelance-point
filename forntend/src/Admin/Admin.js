import React from 'react';
import './admin.css'
import { Link } from 'react-router-dom';

function Admin() {
  return (
    <>
      <div>
        <div className='admin-login-image_part1'>
          <div className='admin-login-image_part1-text'>
            <div className='d-flex justify-content-center align-items-center admin-login-text'><h1>Admin Login</h1></div>
            <div>
              <label htmlFor="Email">Email</label><br></br>
              <input className='admin-login-email-input' type="email" placeholder='Email' />
            </div>

            <div>
              <label htmlFor="Passwod">Password</label><br></br>
              <input className='admin-login-password-input' type="password" placeholder='Password' />
            </div>

            <div><button className='w-100'><Link className='btn btn-warning admin-login-button' to='/Admin/Admin_dashboard'>Login</Link></button></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin;
