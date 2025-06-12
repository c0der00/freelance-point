import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Gigs from "./pages/Gigs";
import MyGigs from "./pages/MyGigs";
import Orders from "./pages/Orders";
import Messages from "./pages/Messages";
import Add from "./pages/Add";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Message from "./pages/Message";
import Gig from "./pages/Gig";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContantUs";
import About from "./pages/About";
import Messenger from "./pages/Messager";
import Pay from "./pages/Pay";
import Success from "./pages/Success";
import Admin_dashboard from "./Admin/Admin_dashboard";
import Admin_cotact_details from "./Admin/Admin_contact_details"
import Admin_profile from './Admin/Admin_Profile'
import Admin_User from "./Admin/Admin_User";
import Admin_vendor from "./Admin/Admin_Gigs";
import User_Details from "./Admin/User_Details";
import Vendor_Details from "./Admin/Gigs_Details";
import AuthLayout from './components/AuthLayout'
import JobList from "./pages/jobList";
import JobDetails from "./pages/jobDetails";
import MyBids from "./pages/Mybid";
import MyJobs from "./pages/MyJobs";
import AddJob from "./components/addJob";
import JobBids from "./pages/jobBid";
import BecomeSellerForm from "./components/BecomeSeller";
import Admin_Jobs from "./Admin/Admin_Jobs";
import Job_detail from "./Admin/Job_Detail";

function App() {
  const Layout = () => {
    return (
      <div className="w-full mx-auto">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <AuthLayout authentication={false}>
              <Home />
            </AuthLayout>
          ),
        },
        {
          path: "/gigs",
          element: (
            <AuthLayout authentication>
              <Gigs />
            </AuthLayout>
          ),
        },
        {
          path: "/myGigs",
          element: (
            <AuthLayout authentication>
              <MyGigs />
            </AuthLayout>
          ),
        },
        {
          path: "/contact",
          element:  (
            <AuthLayout authentication>
              <ContactUs/>
            </AuthLayout>
          )
        },
        {
          path: "/orders/:id/:isSeller",
          element: (
            <AuthLayout authentication>
              <Orders />
            </AuthLayout>
          ),
        },
        {
          path: "/messages",
          element: (
            <AuthLayout authentication>
              <Messages />
            </AuthLayout>
          ),
        },
        {
          path: "/message/:id",
          element: (
            <AuthLayout authentication>
              <Message />
            </AuthLayout>
          ),
        },
        {
          path: "/add",
          element: (
            <AuthLayout authentication>
              <Add />
            </AuthLayout>
          ),
        },
        {
          path: "/gig/:id",
          element:<AuthLayout authentication>
             <Gig />
          </AuthLayout>,
        },
        {
          path:'/about',
          element: (
            <AuthLayout authentication>
              <About />
            </AuthLayout>
          ) 
        },
        {
          path:"/msg",
          element:(
            <AuthLayout authentication>
              <Messenger/>
            </AuthLayout>
          )
        },
        {
          path: "/pay/:id",
          element: (
            <AuthLayout authentication>
              <Pay />
            </AuthLayout>
          )
        },
        {
          path: "/success",
          element: <AuthLayout authentication>
            <Success />
          </AuthLayout>
        },
        {
          path: "/joblist",
          element:(
            <AuthLayout authentication>
              <JobList />
            </AuthLayout>
          )
        },
        {
          path:"/job/:id",
          element:(
            <AuthLayout authentication>
              <JobDetails />
            </AuthLayout>
          )
        },
        {
          path:"/myjobs",
          element:(
            <AuthLayout authentication>
              <MyJobs />
            </AuthLayout>
          )
        },
        {
          path:"/job/:id/bids",
          element:(
            <AuthLayout authentication>
              <JobBids />
            </AuthLayout>
          )
        },
        {
          path:"/my-bids",
          element:(
            <AuthLayout authentication>
              <MyBids />
            </AuthLayout>
          )
        },
        {
          path:"/add-job",
          element:<AddJob />
        },
        {
          path:"/become-dev",
          element:<BecomeSellerForm />
        }
      ],
    },
    {
      path : "/admin",
      children : [
        {
          path: "/admin",
          element: (
            <AuthLayout>
              <Admin_dashboard />
            </AuthLayout>
          ),
        },
        {
          path: "/admin/admin_user",
          element: (
            <AuthLayout>
              <Admin_User />
            </AuthLayout>
          ),
        },
        {
          path: "/admin/admin_vendor",
          element: (
            <AuthLayout>
              <Admin_vendor />
            </AuthLayout>
          ),
        },
        {
          path:"/admin/admin_contact_details",
          element:(
            <AuthLayout>
              <Admin_cotact_details />
            </AuthLayout>
          )
        },
        {
          path: '/admin/admin_profile',
          element: (
            <AuthLayout>
              <Admin_profile />
            </AuthLayout>
          ),
        },
        {
          path : '/admin/user_details/:id',
          element : (
            <AuthLayout>
              <User_Details />
            </AuthLayout>
          )
        },
        {
          path : "/admin/vendor_details/:id",
          element: (
            <AuthLayout>
               <Vendor_Details />
            </AuthLayout>
          )
        },
        {
          path:"/admin/admin_job",
          element:(
            <AuthLayout authentication>
              <Admin_Jobs />
            </AuthLayout>
          )
        },
        {
          path:"/admin/job_details/:id",
          element:(
            <AuthLayout authentication>
              <Job_detail />
            </AuthLayout>
          )
        }
      ]
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },

  ]);

  return <RouterProvider router={router} />;
}

export default App;
