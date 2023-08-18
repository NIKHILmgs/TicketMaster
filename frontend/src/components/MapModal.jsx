import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

function MapModal(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAcOmobarzmrrkhz_Za0L4CPVwKhbIwKpw",
  });

  const handleCloseModal = () => {
    props.setIsVisible(false);
  };

  const center = {
    lat: parseFloat(props.latitude),
    lng: parseFloat(props.longitude),
  };

  return (
    <div>
      {props.isVisible && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            ></span>
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden items-center content-center shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Event Venue
                </h3>
                <div className="mt-2 self-center">
                  {isLoaded && (
                    <GoogleMap
                      mapContainerStyle={{
                        width: "80vh",
                        height: "80vh",
                      }}
                      center={center}
                      zoom={10}
                    >
                      <Marker position={center} />
                    </GoogleMap>
                  )}
                </div>
              </div>

              <div className="mt-5 sm:mt-6">
                <button
                  className="inline-block rounded-md border border-gray-300 shadow-sm py-2 px-4 bg-white text-base leading-6 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapModal;
