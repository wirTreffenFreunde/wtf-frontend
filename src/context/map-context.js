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
    const [middlePoint, setMiddlePoint] = useState({
        lat: 53.57835738834605,
        lng: 9.97645520197268,
    });
    const [peopleCoordinates, setPeopleCoordinates] = useState([]);

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
            setMiddlePoint({
                lat: Number(result.data[0].middlePoint.latitude),
                lng: Number(result.data[0].middlePoint.longitude),
            });
            setPeopleCoordinates(result.data[0].peopleAddresses)
        } catch (err) {
            console.error(err);
        }
    };
    const value = {
        peopleAddresses,
        setPeopleAddresses,
        middlePoint,
        peopleCoordinates,
        setMiddlePoint,
        handleChangeMiddle,
        handleSubmitMiddle,
    };

    return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}

export { MapProvider, useMapContext };
