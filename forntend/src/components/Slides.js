import React from "react";
import Slider from "infinite-react-carousel";

const Slides = ({ children }) => {
  return (
    <div className="p-12">
      <div className="relative w-[950px]">
        <Slider slidesToShow={3} arrowsScroll={1}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slides;
 