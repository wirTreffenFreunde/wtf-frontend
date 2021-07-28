import React, { useState } from "react";
import axios from "axios";

const MapContext = React.createContext();
const backendURL = process.env.REACT_APP_BACKEND_URL

function useMapContext() {
	const context = React.useContext(MapContext);
	if (context === undefined) {
		throw new Error("useMapContext must be used within a MapProvider");
	}
	return context;
}

function MapProvider({ children }) {
	// input fields for everyone
	const [peopleAddresses, setPeopleAddresses] = useState(["", ""]);

	// middle point
	const [middlePoint, setMiddlePoint] = useState({
		latitude: 53.55854669314449,
		longitude: 9.988636859658898,
    address: "Planten un Blomen, Hamburg"
	});

	// coordinates from input fields
	const [peopleCoordinates, setPeopleCoordinates] = useState([]);

	// bounds of all addresses
	const [boundsCoordinates, setBoundsCoordinates] = useState(null);
	const [filteredBounds, setFilteredBounds] = useState(null);
	const [closestCity, setClosestCity] = useState({error: "Let's search something"});
	const [hotels, setHotels] = useState([]);
	const [restaurants, setRestaurants] = useState([]);
  const [filter, setFilter] = useState({
    closestCity: false,
    hotels: false,
    restaurants: false,
  });
	// saving all the input fields
	const handleChangeMiddle = (e) => {
		const currentIndex = e.target.name - 1;
		const currentValue = e.target.value;
		const copyPeopleAddresses = [...peopleAddresses];
		copyPeopleAddresses[currentIndex] = currentValue;
		setPeopleAddresses(copyPeopleAddresses);
	};

	const handleSubmitMiddle = async (e) => {
		e.preventDefault();
    setFilter({
      closestCity: false,
      hotels: false,
      restaurants: false,
    })
		try {
			const encodedAddresses = peopleAddresses.filter((e) => e);
			const result = await axios.post(`${backendURL}/api`, encodedAddresses);
			setMiddlePoint({
				latitude: Number(result.data.middlePoint.latitude),
				longitude: Number(result.data.middlePoint.longitude),
			});
			setPeopleCoordinates(result.data.peopleAddresses);
			setBoundsCoordinates(result.data.boundsAddresses);
      setHotels(result.data.hotelsAddresses);
      setRestaurants(result.data.restaurantsAddresses);
			setFilteredBounds(result.data.boundsFiltered);
			setClosestCity(result.data.closestCity);
		} catch (err) {
			console.error(err);
		}
	};

	const value = {
		peopleAddresses,
		setPeopleAddresses,
		middlePoint,
		peopleCoordinates,
		boundsCoordinates,
		setMiddlePoint,
		handleChangeMiddle,
		handleSubmitMiddle,
		closestCity,
		hotels,
		restaurants,
		filteredBounds,
    filter, 
    setFilter
	};

	return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}

export { MapProvider, useMapContext };
