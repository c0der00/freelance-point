import React from "react";

function About() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About FreelancerPoint</h1>
        <p className="text-lg text-gray-600">
          FreelancerPoint is a platform that connects talented freelancers with clients who need expert services. 
          Whether you're a developer, designer, or writer, our platform offers opportunities to showcase your skills and 
          collaborate on meaningful projects.
        </p>
      </section>
      <section className="bg-gray-50 py-12 mb-12">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">What is FreelancerPoint?</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center">
          FreelancerPoint is designed to empower freelancers by providing them with a platform where they can easily 
          connect with clients across the globe. Our platform provides a simple, secure, and efficient way for freelancers 
          to showcase their skills, collaborate with clients, and manage their projects effectively. 
        </p>
      </section>
      <section className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Create a Profile</h3>
            <p className="text-gray-600">
              Set up your profile, highlight your skills, and start browsing opportunities.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Find Projects</h3>
            <p className="text-gray-600">
              Browse through a variety of projects posted by clients and choose the one that fits your expertise.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Hired</h3>
            <p className="text-gray-600">
              Submit proposals, communicate with clients, and get hired for your next gig.
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Why Choose FreelancerPoint?</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="flex items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Transactions</h3>
              <p className="text-gray-600">
                We ensure that all transactions are safe and secure. Your payments are protected through escrow services.
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Top Talent</h3>
              <p className="text-gray-600">
                Join a community of skilled professionals who are committed to delivering top-notch results.
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Global Reach</h3>
              <p className="text-gray-600">
                Connect with clients and freelancers from all over the world, broadening your opportunities.
              </p>
            </div>
          </div>

          <div className="flex items-center">
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Time Efficiency</h3>
              <p className="text-gray-600">
                Our platform streamlines communication and project management to help you get work done faster.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
