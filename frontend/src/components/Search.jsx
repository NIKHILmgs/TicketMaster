import { useState, useRef } from "react";
import Tables from "./Tables";
import axios from "axios";

const categories = [
  "Default",
  "Music",
  "Sports",
  "Arts & Theatre",
  "Film",
  "Miscellaneous",
];

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [distance, setDistance] = useState(10);
  const [category, setCategory] = useState("Music");
  const [source, setSource] = useState("");
  const [autoDetect, setAutoDetect] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [events, setEvents] = useState([]);

  const searchInput = useRef(null);

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSource(e.target.value);
  };
 //when a function is marked async, it returns a promise with function return value.Promises are of 3 types:Pending,fulfillrd,rejected.
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const res = await axios.get(
      `http://127.0.0.1:8000/ticket/?keyword=${keyword}&source=${source}&classification_name=${category}&radius=${distance}&auto_detect=${autoDetect}`
    );

    setEvents(res.data._embedded?.events);
    console.log("HERE");
    setIsSubmit(true);
  };

  return (
    <div class=" mx-auto w-full p-5 min-h-screen">
      <div className="flex flex-col m-auto">
        <form
          onSubmit={handleSubmit}
          className="rounded-md bg-white backdrop-blur-xl text-black bg-opacity-20 p-10 mb-10 space-y-4 min-w-[30rem] w-[30%] m-auto"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-white">
            Event Search
          </h2>
          <div className="border-b-2 mb-4"></div>
          <div className="">
            <label
              htmlFor="keyword"
              className="block mb-2 font-bold text-blue-400"
            >
              Keyword<span className="text-red-500">*</span>
            </label>
            <input
              id="keyword"
              type="text"
              className="w-full px-3 py-2 border border-gray-400 rounded"
              value={keyword}
              onChange={handleKeywordChange}
              required
            />
          </div>

          <div className="flex mb-10">
            <div className="w-1/2">
              <label
                htmlFor="distance"//it associates the label element with the form control element
                className="block mb-2 font-bold text-blue-400"
              >
                Distance(in miles)
              </label>
              <input
                id="distance"
                type="number"
                className="w-full px-3 py-2 border border-gray-400 rounded"
                defaultValue={distance}
                onChange={handleDistanceChange}
              />
            </div>
            <div className="ml-4 w-1/2">
              <label
                htmlFor="category"
                className="block mb-2 font-bold text-blue-400"
              >
                Category<span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                className="w-full px-3 py-2 border border-gray-400 rounded"
                value={category}
                onChange={handleCategoryChange}
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="location"
              className="block mb-2 font-bold text-blue-400"
            >
              Location<span className="text-red-500">*</span>
            </label>
            <input
              id="location"
              type="text"
              className="w-full px-3 py-2 border border-gray-400 rounded"
              value={source}
              onChange={handleLocationChange}
              required
              ref={searchInput}
              disabled={autoDetect}
            />
            <div className="my-4">
              <input
                id="auto-detect"
                type="checkbox"
                className="mr-2"
                checked={autoDetect}
                onClick={() => setAutoDetect(!autoDetect)}
              />
              <label htmlFor="auto-detect" className="text-blue-400">
                Auto-detect your location
              </label>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setKeyword("");
                setDistance(10);
                setCategory("music");
                setSource("");
                setAutoDetect(false);
                setIsSubmit(false);
              }}
            >
              Clear
            </button>
          </div>
        </form>
        {isSubmit && <Tables events={events} />}
      </div>
    </div>
  );
}
