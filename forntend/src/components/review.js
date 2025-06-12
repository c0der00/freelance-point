import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import newRequest from "../utils/newRequest";
import star from '../assets/star.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

// Review component that handles multiple reviews
const Reviews = ({ reviews }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleReviews = showAll ? reviews : reviews.slice(0, 2); // Show 2 reviews by default

  return (
    <div className="reviews-list">
      {visibleReviews.map((review, index) => (
        <SingleReview key={index} review={review} />
      ))}

      {reviews.length > 2 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-blue-600 mt-2 hover:text-blue-800 transition duration-200"
        >
          {showAll ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
};

const SingleReview = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ['reviews', review.userId],
    queryFn: () => newRequest.get(`/users/${review.userId}`).then(res => res.data),
    enabled: !!review.userId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>No user data available</div>;

  return (
    <div className="review border p-4 rounded-md shadow-lg mb-4">
      <div className="user flex items-center space-x-4 mb-4">
        <img
          className="pp w-16 h-16 rounded-full"
          src={data.img || '/img/noavatar.jpg'}
          alt="User Avatar"
        />
        <div className="info">
          <span className="font-semibold text-lg">{data.username}</span>
          <div className="country text-sm text-gray-500">
            <span>{data.country}</span>
          </div>
        </div>
      </div>

      <div className="stars flex items-center mb-2">
        {Array(review.star)
          .fill()
          .map((_, i) => (
            <img key={i} src={star} alt="star" className="w-5 h-5" />
          ))}
        <span className="ml-2 text-gray-600">{review.star}</span>
      </div>

      <p className={`text-gray-700 ${!expanded ? 'line-clamp-3' : ''}`}>
        {review.desc}
      </p>

      {review.desc.length > 150 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-500 text-sm mt-1 hover:underline"
        >
          {expanded ? "See Less" : "See More"}
        </button>
      )}

      <div className="helpful flex items-center space-x-2 mt-4">
        <span className="text-sm text-gray-500">Helpful?</span>
        <FontAwesomeIcon icon={faThumbsUp} className="w-5 h-5 cursor-pointer text-blue-500" />
        <span className="text-sm text-gray-500">Yes</span>
        <FontAwesomeIcon icon={faThumbsDown} className="w-5 h-5 cursor-pointer text-blue-500" />
        <span className="text-sm text-gray-500">No</span>
      </div>
    </div>
  );
};



export default Reviews;
