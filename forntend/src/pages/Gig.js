import React, { useState } from "react";
import { Slider } from "infinite-react-carousel";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import Reviews from "../components/review";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSyncAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import star from '../assets/star.png';

function Gig() {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  const [reviewStar, setReviewStar] = useState(null);
  const [reviewText, setReviewText] = useState("");

  const gigId = id;

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: async () => {
      const res = await newRequest.get(`/gigs/single/${id}`);
      return res.data;
    },
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await newRequest.get(`/users/${userId}`);
      return res.data;
    },
    enabled: !!userId,
  });

  const {
    isLoading: isLoadingReview,
    error: errorReview,
    data: dataReview,
  } = useQuery({
    queryKey: ["reviews", gigId],
    queryFn: async () => {
      const res = await newRequest.get(`/reviews/${gigId}`);
      return res.data;
    },
    enabled: !!gigId,
  });

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleReviewSubmit = async () => {
    if (!reviewStar || isNaN(reviewStar) || reviewStar < 1 || reviewStar > 5) {
      alert("Please provide a star rating between 1 and 5.");
      return;
    }

    if (reviewText.trim()) {
      try {
        const reviewData = {
          gigId: id,
          userId: currentUser._id,
          star: Number(reviewStar),
          desc: reviewText,
        };

        await newRequest.post("/reviews/creategig", reviewData);
        setReviewText("");
        setReviewStar(null);
        alert("Review submitted!");
      } catch (error) {
        alert("You have already submitted a review.");
      }
    } else {
      alert("Please write a review before submitting.");
    }
  };

  const handleCresteConversation = async () => {
    await newRequest.post("/conversations", {
      senderId: currentUser._id,
      receiverId: dataUser._id,
      id: Date.now(),
    });
  };

  return (
    <div className="gig max-w-7xl mx-auto px-10 py-10">
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">Something went wrong!</div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <span className="text-sm text-gray-500 block mb-3">
              freelancer &gt; Graphics & Design &gt;
            </span>

            <h1 className="text-3xl font-bold text-gray-900 mb-6">{data.title}</h1>

            {isLoadingUser || errorUser ? null : (
              <div className="flex items-center space-x-4 mb-6">
                <img
                  className="w-16 h-16 rounded-full object-cover"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt="Seller"
                />
                <div>
                  <h3 className="text-lg font-semibold">{dataUser.username}</h3>
                  {!isNaN(data.totalStars / data.starNumber) && (
                    <div className="flex items-center space-x-1">
                      {Array(Math.round(data.totalStars / data.starNumber))
                        .fill()
                        .map((_, i) => (
                          <img key={i} src={star} alt="star" className="w-4 h-4" />
                        ))}
                      <span className="text-sm text-gray-600">
                        {Math.round(data.totalStars / data.starNumber)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mb-6">
              <Slider slidesToShow={1} arrowsScroll={1}>
                {data.images.length > 0 ? (
                  data.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`gig-${i}`}
                      className="rounded-lg w-full h-[300px] object-cover"
                    />
                  ))
                ) : (
                  <div>No images available</div>
                )}
              </Slider>
            </div>

            <h2 className="text-2xl font-semibold mb-2">About This Gig</h2>
            <p className="text-gray-700 mb-6">{data.desc}</p>
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-2">Add Your Review:</h3>
              <div className="mb-4">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (1–5):
                </label>
                <input
                  type="number"
                  id="rating"
                  min="1"
                  max="5"
                  value={reviewStar ?? ""}
                  onChange={(e) => setReviewStar(e.target.value)}
                  placeholder="Rate 1–5"
                  className="w-24 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <textarea
                value={reviewText}
                onChange={handleReviewChange}
                className="w-full p-4 border border-gray-300 rounded-md"
                rows="4"
                placeholder="Write your review here..."
              />

              <button
                onClick={handleReviewSubmit}
                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
              >
                Submit Review
              </button>
            </div>

            {isLoadingReview ? (
              "Loading reviews..."
            ) : errorReview ? (
              <p className="text-red-500">Failed to load reviews.</p>
            ) : !dataReview || dataReview.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              <Reviews gigId={id} reviews={dataReview} />
            )}

            {isLoadingUser || errorUser ? null : (
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">About The Seller</h2>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        className="w-14 h-14 rounded-full object-cover"
                        src={dataUser.img || "/img/noavatar.jpg"}
                        alt="user"
                      />
                      <div>
                        <h4 className="text-lg font-semibold">{dataUser.username}</h4>
                        <p className="text-sm text-gray-600">{dataUser.country}</p>
                      </div>
                    </div>
                    <Link to="/msg">
                      <button
                        onClick={handleCresteConversation}
                        className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-md transition"
                      >
                        Contact Me
                      </button>
                    </Link>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-y-3 text-sm text-gray-700">
                    <div><strong>Member since:</strong> Aug 2022</div>
                    <div><strong>Avg. response time:</strong> 4 hours</div>
                    <div><strong>Last delivery:</strong> 1 day</div>
                    <div><strong>Languages:</strong> English</div>
                  </div>
                  <hr className="my-4" />
                  <p className="text-gray-700">{dataUser.desc}</p>
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{data.shortTitle}</h3>
              <h2 className="text-3xl font-bold text-blue-600 mb-4">${data.price}</h2>
              <p className="text-gray-600 mb-6">{data.shortDesc}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faClock} className="text-gray-500" />
                  <span>{data.deliveryDate} Days Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faSyncAlt} className="text-gray-500" />
                  <span>{data.revisionNumber} Revisions</span>
                </div>
              </div>

              <div className="mb-6">
                {data.features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-2 mb-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Link to={`/pay/${gigId}`}>
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition">
                  Continue
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
