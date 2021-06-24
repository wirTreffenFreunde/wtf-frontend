import React, { useState } from "react";
import axios from "axios";

const MapContext = React.createContext();

function useMapContext() {
  const context = React.useContext(MapContext);
  if (context === undefined) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
}

function MapProvider({ children }) {
  // input fields for everyone
  const [peopleAddresses, setPeopleAddresses] = useState([]);

  // middle point
  const [middlePoint, setMiddlePoint] = useState("");
  const [lat, setLat] = useState("53.57835738834605");
  const [lng, setLng] = useState("9.97645520197268");

  // saving all the input fields
  const handleChangeMiddle = (e) => {
    setPeopleAddresses({
      ...peopleAddresses,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitMiddle = async (e) => {
    e.preventDefault();
    try {
      const encodedAddresses = Object.values(peopleAddresses).map((e) =>
        encodeURIComponent(e)
      );
      const result = await axios.post(
        `http://localhost:8080/api`,
        encodedAddresses
      );
      console.log(result.data);
      setLat(result.data.latitude);
      setLng(result.data.longitude);
      console.log(lat, lng);
    } catch (err) {
      console.error(err);
    }
  };
  const value = {
    peopleAddresses,
    setPeopleAddresses,
    middlePoint,
    setMiddlePoint,
    lat,
    lng,
    setLat,
    setLng,
    handleChangeMiddle,
    handleSubmitMiddle,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}

export { MapProvider, useMapContext };
