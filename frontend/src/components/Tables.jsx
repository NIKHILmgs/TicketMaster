import { useState, useEffect } from "react";

import EventCard from "./EventCard";
import axios from "axios";

export default function Tables({ isFav, favs = [], events = [] }) {
  const [venueDetails, setVenueDetails] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState();
  const [disp, setDisp] = useState("table");
  const [favorites, setFavorites] = useState(favs);

  const getEventDetails = async (venueId) => {
    const res = await axios.get(
      `http://127.0.0.1:8000/ticket/event/?venue_id=${venueId}`
    );

    console.log(res.data);
    setVenueDetails(res.data);
  };

  return (
    <div className="m-auto w-full">
      {!isFav && (!events || events.length === 0) ? (
        <div className="w-[60%] m-auto text-center bg-yellow-500 p-2 rounded-md border-red-300 border-2 text-rose-700">
          <p>No Events Found</p>
        </div>
      ) : (
        <table
          className="w-[60%] m-auto"
          style={{ display: disp === "table" ? "" : "none" }}//("")will set the display to default value. e.g = for div:block,span:inline
          flex
        >
          <thead>
            <tr className=" w-full h-12 bg-slate-900 text-center">
              <th className="">Date/Time</th>
              <th className="">Icon</th>
              <th className="">Event</th>
              <th className="">Genre</th>
              <th className="">Venue</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center ">
            {[...events, ...favorites].map((event, index) => {//here we are concatenating events and fav using spread operators to pass the concatenated 
              //result to map to dispaly the values
              return (
                <>
                  <tr
                    key={event.id}
                    className={`${!isFav && "cursor-pointer"} ${//setting alternate colors for the tables.
                      (index + 1) % 2 ? "bg-slate-800" : "bg-slate-900"
                    }`}
                    onClick={() => {
                      if (!isFav) {
                        console.log(event._embedded.venues[0].id);
                        getEventDetails(event._embedded.venues[0].id);
                        setSelectedEvent(event);
                        setDisp("event");
                      }
                    }}
                  >
                    <td className="p-2">{event.dates.start.dateTime}</td>
                    <td className="p-2">
                      <img
                        src={event.images[0].url}
                        alt={event.classifications[0].genre.name}
                        className="h-14 object-contain"
                      />
                    </td>
                    <td className="p-2">{event.name}</td>
                    <td className="p-2">
                      {event.classifications[0].genre.name}
                    </td>
                    <td className="p-2">{event._embedded.venues[0].name}</td>
                    {isFav && (
                      <td
                        className="mr-5 cursor-pointer"
                        onClick={() => {
                          let newFavs = favs.filter((f) => f.id !== event.id);
                          setFavorites(newFavs);
                          console.log(newFavs);
                          localStorage.setItem("fav", JSON.stringify(newFavs));
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>//it is 
                      </td>
                    )}
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      )}
      {venueDetails && (
        <div
          className="w-[60%] m-auto"
          style={{ display: disp === "event" ? "" : "none" }}
        >
          <EventCard
            venueDetails={venueDetails}
            onClose={() => setVenueDetails(null)}
            setDisp={setDisp}
            eventData={selectedEvent}
          />
        </div>
      )}
    </div>
  );
}
