import React from "react";
import Slides from "../components/Slides.js";
import CatCard from "../components/CatCard.js";
import { cards } from "../data.js";
import freelancerPic from "../assets/undraw_Designer.png";
import WhyChoosePic from "../assets/undraw_My_answer.png";
import heroImg from "../assets/undraw_team_page.svg";
import check from "../assets/check.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[80dvh] bg-white text-center px-6">
        <h1 className="font-bold text-[60px] md:text-[40px] leading-[84px] tracking-[-3.5px] py-5 max-w-[1000px]">
          Hire perfect <span className="text-[#e9304b]">Developers</span> for your projects<span>.</span>
        </h1>
        <p className="text-[28px] md:text-[18px] text-center max-w-[900px] py-8">
          freelancerPoint provides a dedicated platform for clients to easily find and hire skilled developers for their gigs.
          With seamless communication and collaboration features, you can ensure successful project outcomes.
        </p>
        <img className="absolute left-[-60px] bottom-[160px] w-[400px] md:w-[300px] transition-all ease-in-out duration-500 hover:w-[408px]" src={heroImg} alt="heroImg" />
        <img className="absolute right-[-60px] top-[60px] w-[400px] md:w-[300px] transition-all ease-in-out duration-500 hover:w-[408px]" src={heroImg} alt="heroImg" />
        <button className="bg-[#1c1e20] text-white py-[20px] px-[34px] text-[24px] border-2 border-[#1c1e20] rounded-[8px] relative overflow-hidden cursor-pointer transition-all duration-300">
          <Link to="/gigs">
            Find your next Hire
          </Link>
        </button>
      </div>
      <div className="flex flex-col items-center justify-center min-h-[84dvh] w-auto bg-[#1c1e20]">
        <div className="text-white text-center pb-7 text-[60px] md:text-[40px] font-bold">
          Our Freelance Services <span className="text-[#e9304b]">.</span>
        </div>
        <Slides slidesToShow={5} arrowsScroll={2}>
          {cards.map((card) => (
            <Link
              key={card.id}
              to={`/gigs?cat=${encodeURIComponent(card.title.toLowerCase())}`}
            >
              <CatCard card={card} />
            </Link>
          ))}
        </Slides>
      </div>
      <div className="flex flex-col items-center justify-center min-h-[80dvh] w-full py-10 bg-white">
        <div className="flex flex-col items-center justify-between w-full max-w-[1400px]">
          <img className="h-[300px] mb-8" src={WhyChoosePic} alt="Why Choose freelancerPoint" />
          <div className="text-center">
            <h2 className="font-bold text-[50px] mb-6">Why Choose freelancerPoint?</h2>
            <ul className="space-y-4 text-[15px] text-left mx-auto max-w-[600px]">
              <li className="flex items-center gap-[15px]">
                <img className="w-[20px]" src={check} alt="check" />
                Find developers with the exact skills your project needs, ensuring high-quality results.
              </li>
              <li className="flex items-center gap-[15px]">
                <img className="w-[20px]" src={check} alt="check" />
                Get one free revision with every project, ensuring satisfaction.
              </li>
              <li className="flex items-center gap-[15px]">
                <img className="w-[20px]" src={check} alt="check" />
                Your Payment is secure with Stripe
              </li>
              <li className="flex items-center gap-[15px]">
                <img className="w-[20px]" src={check} alt="check" />
                Real-time code collaboration and direct communication for seamless execution.
              </li>
              <li className="flex items-center gap-[15px]">
                <img className="w-[20px]" src={check} alt="check" />
                Trustworthy payment gateway for worry-free transactions.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-10 p items-center justify-center min-h-[450px] w-full py-10">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1400px]">
          <div className="text-center md:text-left max-w-[500px]">
            <h2 className="text-[40px] font-bold mb-6">Discover Exciting Opportunities and Showcase Your Skills</h2>
            <p className="text-[15px] mb-4">
              freelancerPoint is the ultimate freelance platform for coders and developers to find gigs and showcase their skills.
              Join the freelancerPoint community and unlock a world of exciting opportunities.
            </p>
            <button className="bg-[#1c1e20] text-white py-[15px] px-[30px] text-[20px] border-[1px] border-[#1c1e20] rounded-[8px] cursor-pointer hover:bg-white hover:text-black transition-all duration-300">
              <Link to="/register">
                Join as Developer
              </Link>
            </button>
          </div>
           <img className="h-[450px] mt-8 md:mt-0" src={freelancerPic} alt="freelancerPic" />
        </div>
      </div>
    </>
  );
}

export default Home;
