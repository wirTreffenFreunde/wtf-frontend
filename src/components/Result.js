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
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lat, lng],
      zoom: zoom,
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
      <p>{middlePoint}</p>
    </div>
  );
}

export default Result;
