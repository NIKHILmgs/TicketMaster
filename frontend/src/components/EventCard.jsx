import { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/outline";
import twt from "../assets/twt.png";
import fb from "../assets/fb.png";
import MapModal from "./MapModal";

export default function EventCard({ venueDetails, setDisp, eventData }) {
  const [activeButton, setActiveButton] = useState("event");
  const [isFav, setIsFav] = useState(false);
  const [favs, setFavs] = useState([]);
  const [isMapShown, setIsMapShown] = useState(false);

  // const [eventData, setEventData] = useState([]);

  const toggleButtons = () => {
    setActiveButton(activeButton === "event" ? "venue" : "event");
  };

  const [showMoreGen, setShowMoreGen] = useState(false);
  const [showMoreOh, setShowMoreOh] = useState(false);
  const [showMoreCr, setShowMoreCr] = useState(false);

  // console.log(eventData);

  useEffect(() => {
    let favs = JSON.parse(localStorage.getItem("fav"));

    console.log(favs);

    if (favs) {
      setFavs(favs);
      const isFav = favs.find((f) => f.id === eventData.id);
      setIsFav(isFav ? true : false);
    } else {
      setFavs([]);
    }
  }, [eventData]);

  const toggleShowMore = () => {
    setShowMoreGen(!showMoreGen);
  };

  return (
    <>
      <div className="rounded-md bg-white backdrop-blur-xl bg-opacity-20 p-6 flex flex-col self-center ">
        <div
          onClick={() => {
            setDisp("table");
          }}
          className="cursor-pointer underline w-fit"
        >
          Back
        </div>
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-2xl font-bold mr-10">{eventData.name}</h1>
          {!isFav ? (
            <HeartIcon
              className="h-6 w-6 text-red-500  cursor-pointer"
              onClick={() => {
                setIsFav(true);
                localStorage.setItem(
                  "fav",
                  JSON.stringify([...favs, eventData])
                );
                alert("Event added to your favorites.");
              }}
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="red"
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                let newFavs = favs.filter((f) => f.id !== eventData.id);
                console.log(newFavs);
                localStorage.setItem("fav", JSON.stringify(newFavs));
                setIsFav(false);
              }}
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          )}
        </div>
        <div className="flex mb-6 bg-teal-600 rounded-lg  justify-center">
          <button
            className={`mr-2 px-4 py-2 font-medium ${
              activeButton === "event" && "border-b-2 border-blue-500"
            }`}
            onClick={toggleButtons}
          >
            Events
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium ${
              activeButton === "venue" && "border-b-2 border-blue-500"
            }`}
            onClick={toggleButtons}
          >
            Venue
          </button>
        </div>
        {activeButton === "event" && (
          <>
            <div className="flex text-center justify-evenly ">
              <div className="flex flex-col mb-4 space-y-4">
                <div className="mr-6">
                  <p className=" font-medium text-lg">Date</p>
                  <p className="">{eventData.dates.start.dateTime}</p>
                </div>
                <div className="mr-6">
                  <p className="text-lg font-medium">Artist/Team</p>
                  <p className="">{eventData.artist_team}</p>
                </div>
                <div className="mr-6">
                  <p className="text-lg font-medium">Venue</p>
                  <p className="">{venueDetails.name}</p>
                </div>
                <div className="mr-6">
                  <p className="text-lg font-medium">Genres</p>
                  <p className="">{eventData.classifications[0].name}</p>
                </div>
                <div className="mr-6">
                  <p className="text-lg font-medium">Price Range</p>
                  <p className="">
                    {eventData.priceRanges[0].min} -{" "}
                    {eventData.priceRanges[0].max}{" "}
                    {eventData.priceRanges[0].currency}
                  </p>
                </div>
                <div className="mr-6 flex flex-col">
                  <p className="text-lg font-medium">Ticket Status</p>
                  <div className="bg-green-600 rounded-md w-20 self-center text-center">
                    {eventData.dates.status.code === "onsale" && "On Sale"}
                  </div>
                </div>
                <div className="mr-6">
                  <p className="text-lg font-medium">Buy Ticket at</p>
                  <a
                    className=" hover:text-gray-700 text-blue-500 underline"
                    href={eventData.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ticketmaster
                  </a>
                </div>
              </div>
              <div className="mb-4">
                <img
                  src={eventData.seatmap.staticUrl}
                  alt="Seat Map"
                  className="w-96 object-contain"
                />
              </div>
            </div>
            <div className="self-center flex items-center justify-center space-x-2">
              <p>Share on:</p>
              <a
                href={
                  eventData._embedded.attractions[0].externalLinks.twitter[0]
                    .url
                }
                target="_blank"
                rel="noreferrer"
              >
                <img src={twt} className="h-7" />
              </a>
              <a
                href={
                  eventData._embedded.attractions[0].externalLinks.facebook[0]
                    .url
                }
                target="_blank"
                rel="noreferrer"
              >
                <img src={fb} className="h-8" />
              </a>
            </div>
          </>
        )}
        {activeButton === "venue" && (
          <>
            <div className="flex justify-around text-center ">
              <div className="space-y-3 w-[30%]">
                <div>
                  <p className="font-bold text-lg mb-2">Name</p>
                  <p className="mb-2">{venueDetails.name}</p>
                </div>
                <div>
                  <p className="font-bold text-lg mb-2">Address</p>
                  <p className="mb-2">{venueDetails.address.line1}</p>
                </div>
                <div>
                  <p className="font-bold text-lg mb-2">Phone Number</p>
                  <p className="mb-2">
                    {venueDetails.boxOfficeInfo?.phoneNumberDetail}
                  </p>
                </div>
              </div>
              <div className="w-[60%] space-y-3">
                {venueDetails.boxOfficeInfo?.openHoursDetail && (
                  <div className="">
                    <div
                      className={`text-wrapper ${showMoreOh ? "expanded" : ""}`}
                    >
                      <p className={`font-bold text-lg mb-2 `}>Open Hours</p>
                      <p className={`mb-2 text`}>
                        {venueDetails.boxOfficeInfo?.openHoursDetail}
                      </p>
                    </div>
                    <button
                      className="p-2 bg-transparent border-0 text-blue-600 cursor-pointer underline"
                      onClick={() => setShowMoreOh(!showMoreOh)}
                    >
                      {showMoreGen ? "Show Less" : "Show More"}
                    </button>
                  </div>
                )}
                {venueDetails.generalInfo?.generalRule && (
                  <div className="">
                    <div
                      className={`text-wrapper ${
                        showMoreGen ? "expanded" : ""
                      }`}
                    >
                      <p className={`font-bold text-lg mb-2 `}>General Rule</p>
                      <p className={`mb-2 text`}>
                        {venueDetails.generalInfo?.generalRule}
                      </p>
                    </div>
                    <button
                      className="p-2 bg-transparent border-0 text-blue-600 cursor-pointer underline"
                      onClick={toggleShowMore}
                    >
                      {showMoreGen ? "Show Less" : "Show More"}
                    </button>
                  </div>
                )}
                {venueDetails.generalInfo?.childRule && (
                  <div className="">
                    <div
                      className={`text-wrapper ${showMoreCr ? "expanded" : ""}`}
                    >
                      <p className={`font-bold text-lg mb-2 `}>Child Rule</p>
                      <p className={`mb-2 text`}>
                        {venueDetails.generalInfo?.childRule}
                      </p>
                    </div>
                    <button
                      className="p-2 bg-transparent border-0 text-blue-600 cursor-pointer underline"
                      onClick={() => setShowMoreCr(!showMoreCr)}
                    >
                      {showMoreGen ? "Show Less" : "Show More"}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <button
              className="bg-red-500 p-2 self-center mt-10 w-64 rounded-md"
              onClick={() => setIsMapShown(true)}
            >
              Show Venue on Google Maps
            </button>
          </>
        )}
      </div>
      <MapModal
        latitude={venueDetails.location.latitude}
        longitude={venueDetails.location.longitude}
        isVisible={isMapShown}
        setIsVisible={setIsMapShown}
      />
    </>
  );
}
