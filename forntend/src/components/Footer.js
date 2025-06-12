import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 border-t border-gray-200 pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
        <div className="col-span-2 sm:col-span-1">
          <Link to="/">
            <img src={logo} alt="Codelance" className="h-10 mb-4" />
          </Link>
          <p className="text-gray-500 text-xs">
            Connecting skilled freelancers with clients across the world.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gray-800">About</h4>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="#">Careers</Link></li>
            <li><Link to="#">Press & News</Link></li>
            <li><Link to="#">Partnerships</Link></li>
            <li><Link to="#">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gray-800">Categories</h4>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="#">Web Development</Link></li>
            <li><Link to="#">Design & Creative</Link></li>
            <li><Link to="#">Writing & Translation</Link></li>
            <li><Link to="#">Marketing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gray-800">Support</h4>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="#">Help & Support</Link></li>
            <li><Link to="#">Trust & Safety</Link></li>
            <li><Link to="#">Buying Guide</Link></li>
            <li><Link to="#">Selling Guide</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gray-800">Community</h4>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="#">Events</Link></li>
            <li><Link to="#">Blog</Link></li>
            <li><Link to="#">Forum</Link></li>
            <li><Link to="#">Affiliates</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-300 my-8" />
      <div className="text-center text-xs text-gray-500">
        © 2025 FreelancerPoint. All rights reserved. Made with ❤️ by <span className="font-medium">Hardik Vandar</span>.
      </div>
    </footer>
  );
}

export default Footer;
