import React, { useReducer, useState } from "react";
import { gigReducer, INITIAL_STATE } from "../reducers/gigReducer";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [featureText, setFeatureText] = useState("");

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    if (!featureText.trim()) return;

    dispatch({
      type: "ADD_FEATURE",
      payload: featureText.trim(),
    });
    setFeatureText("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", state.userId);
    formData.append("title", state.title);
    formData.append("cat", state.cat);
    formData.append("desc", state.desc);
    formData.append("shortTitle", state.shortTitle);
    formData.append("shortDesc", state.shortDesc);
    formData.append("deliveryTime", state.deliveryTime);
    formData.append("revisionNumber", state.revisionNumber);
    formData.append("price", state.price);

    state.features.forEach((feature) => {
      formData.append("features", feature);
    });

    if (singleFile) {
      formData.append("cover", singleFile);
    }

    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    try {
      setUploading(true);
      await newRequest.post("/gigs/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/mygigs");
    } catch (err) {
      console.error("Error creating gig:", err.response?.data || err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-10 flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl p-10 bg-white shadow-md rounded-xl">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Add New Gig</h1>
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Section */}
          <div className="flex-1 flex flex-col gap-5">
            <label className="text-gray-700 font-medium">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will build a professional website"
              onChange={handleChange}
              className="p-4 border border-gray-300 rounded-lg"
            />

            <label className="text-gray-700 font-medium">Category</label>
            <select
              name="cat"
              onChange={handleChange}
              className="p-4 border border-gray-300 rounded-lg"
            >
              <option value="">Select category</option>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>

            <div className="mt-3 flex flex-col gap-3">
              <label className="text-gray-700 font-medium">Cover Image</label>
              <input
                type="file"
                onChange={(e) => setSingleFile(e.target.files[0])}
                className="p-4 border border-gray-300 rounded-lg"
              />

              <label className="text-gray-700 font-medium">Upload More Images</label>
              <input
                type="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="p-4 border border-gray-300 rounded-lg"
              />
            </div>

            <label className="text-gray-700 font-medium mt-4">Description</label>
            <textarea
              name="desc"
              rows="8"
              placeholder="Brief description about your gig..."
              onChange={handleChange}
              className="p-4 border border-gray-300 rounded-lg"
            ></textarea>
          </div>

          {/* Right Section */}
          <div className="flex-1 flex flex-col gap-5">
            <label className="text-gray-700 font-medium">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. Single page design"
              onChange={handleChange}
              className="p-4 border border-gray-300 rounded-lg"
            />

            <label className="text-gray-700 font-medium">Short Description</label>
            <textarea
              name="shortDesc"
              rows="5"
              placeholder="Short summary of the service"
              onChange={handleChange}
              className="p-4 border border-gray-300 rounded-lg"
            ></textarea>

            <label className="text-gray-700 font-medium">Delivery Time (days)</label>
            <input
              type="number"
              name="deliveryTime"
              onChange={handleChange}
              className="p-4 border border-gray-300 rounded-lg"
            />

            <label className="text-gray-700 font-medium">Revisions</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
              className="p-4 border border-gray-300 rounded-lg"
            />

            <label className="text-gray-700 font-medium">Add Features</label>
            <form className="flex gap-3" onSubmit={handleFeature}>
              <input
                type="text"
                value={featureText}
                onChange={(e) => setFeatureText(e.target.value)}
                placeholder="e.g. Responsive layout"
                className="flex-1 p-4 border border-gray-300 rounded-lg"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                Add
              </button>
            </form>

            <div className="flex flex-wrap gap-3">
              {state?.features?.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full"
                >
                  <span className="text-sm text-gray-700">{f}</span>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <label className="text-gray-700 font-medium mt-4">Price (USD)</label>
            <input
              type="number"
              name="price"
              onChange={handleChange}
              className="p-4 border border-gray-300 rounded-lg"
            />

            <button
              onClick={handleSubmit}
              disabled={uploading}
              className="mt-5 py-4 bg-gray-900 text-white font-semibold text-lg rounded-lg hover:bg-gray-800"
            >
              {uploading ? "Uploading..." : "Create Gig"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
