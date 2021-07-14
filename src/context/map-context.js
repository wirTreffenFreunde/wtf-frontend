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
	const [peopleAddresses, setPeopleAddresses] = useState(["", ""]);

	// middle point
	const [middlePoint, setMiddlePoint] = useState({
		latitude: 53.57835738834605,
		longitude: 9.97645520197268,
		address: "Hamburg",
	});

	// coordinates from input fields
	const [peopleCoordinates, setPeopleCoordinates] = useState([]);

	// bounds of all addresses
	const [boundsCoordinates, setBoundsCoordinates] = useState(null);
	const [locality, setLocality] = useState("");
	const [hotels, setHotels] = useState("");
	const [restaurants, setRestaurants] = useState("");

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
		try {
			const encodedAddresses = peopleAddresses.filter((e) => e);
			const result = await axios.post(`/api`, encodedAddresses);
			setMiddlePoint({
				latitude: Number(result.data.middlePoint.latitude),
				longitude: Number(result.data.middlePoint.longitude),
				address: result.data.middlePoint.address,
			});
			setPeopleCoordinates(result.data.peopleAddresses);
			setBoundsCoordinates(result.data.boundsAddresses);
      setHotels(result.data.hotelsAddresses)
      setRestaurants(result.data.restaurantsAddresses)
		} catch (err) {
			console.error(err);
		}
	};

	// const findLocation = async (geoLocation) => {
	// 	console.log("geoLocation", geoLocation);
	// 	try {
	// 		const result = await axios.post(
	// 			`/api/city`,
	// 			geoLocation
	// 		);
	// 		console.log("closest city", result.data);
	// 		setLocality(result.data);
	// 		//console.log("location", locality);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	// const findHotels = async (geoLocation) => {
	// 	console.log("geoLocation", geoLocation);
	// 	try {
	// 		const result = await axios.post(
	// 			`/api/hotels`,
	// 			geoLocation
	// 		);
	// 		console.log("Hotels", result.data);
	// 		setHotels(result.data);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	// const findRestaurants = async (geoLocation) => {
	// 	console.log("geoLocation", geoLocation);
	// 	try {
	// 		const result = await axios.post(
	// 			`/api/restaurants`,
	// 			geoLocation
	// 		);
	// 		console.log("restaurants", result.data);
	// 		setRestaurants(result.data);
	// 		//console.log("location", locality);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	const value = {
		peopleAddresses,
		setPeopleAddresses,
		middlePoint,
		peopleCoordinates,
		boundsCoordinates,
		setMiddlePoint,
		handleChangeMiddle,
		handleSubmitMiddle,
		// locality,
		// findLocation,
		hotels,
		// findHotels,
		restaurants,
		// findRestaurants,
	};

	return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}

export { MapProvider, useMapContext };
