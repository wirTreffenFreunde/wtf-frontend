import React, { useRef, useEffect, useState, useContext } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { AppData } from "../app-data-context";

mapboxgl.accessToken = process.env.REACT_APP_API_KEY;

function Result() {
  const { middlePoint, lat, lng } = useContext(AppData);
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    console.log(lng, lat);
    if (map.current) {
      map.current.setCenter([lng, lat]);
    } else {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: zoom,
      });
    }
    var marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
    // Add zoom and rotation controls to the map.
    map.current.addControl(new mapboxgl.NavigationControl());
  }, [lat, lng]);

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
      <p>{middlePoint}</p>
    </div>
  );
}

export default Result;
