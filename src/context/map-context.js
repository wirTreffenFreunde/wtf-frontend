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
        latitude: 53.57835738834605,
        longitude: 9.97645520197268,
    });
    // coordinates from input fields
    const [peopleCoordinates, setPeopleCoordinates] = useState([]);
    // bounds of all addresses
    const [boundsCoordinates, setBoundsCoordinates] = useState(null)

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
            console.log(result)
            setMiddlePoint({
                latitude: Number(result.data.middlePoint.latitude),
                longitude: Number(result.data.middlePoint.longitude),
            });
            setPeopleCoordinates(result.data.peopleAddresses)
            setBoundsCoordinates(result.data.boundsAddresses)
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
    };

    return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}

export { MapProvider, useMapContext };
