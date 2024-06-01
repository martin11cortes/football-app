import {
  GoogleMap,
  InfoWindow,
  Libraries,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import { IMatch } from "./Matches";
import { format, parseISO } from "date-fns";

const libraries: Libraries = ["places"];

function Map(props) {
  const { matches, selectedMatch, setSelectedMatch } = props;
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 });
  const [, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDU7KiHIb3cGFNJdT3KXE4CruKDcBR2-Ps",
    libraries,
  });

  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  useEffect(() => {
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting the user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <GoogleMap
        mapContainerStyle={{ height: "100vh", width: "100vw" }}
        center={selectedMatch ? selectedMatch.geolocation : location}
        zoom={13}
        onLoad={onMapLoad}
      >
        {matches.map((match: IMatch, index: number) => (
          <Marker
            key={index}
            position={match.geolocation}
            onClick={() => setSelectedMatch(match)}
          />
        ))}
        {selectedMatch && (
          <InfoWindow
            position={selectedMatch.geolocation}
            onCloseClick={() => setSelectedMatch(null)}
          >
            <div>
              <h2>{selectedMatch.name}</h2>
              <p>{format(parseISO(selectedMatch.when), "MM/dd/yyyy HH:mm")}</p>
              <p>{selectedMatch.where}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
}

export default Map;
