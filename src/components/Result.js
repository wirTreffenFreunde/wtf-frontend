import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useMapContext } from "../context/map-context";
import InputContainer from "./InputContainer";
import Container from "@material-ui/core/Container";


mapboxgl.accessToken = process.env.REACT_APP_API_KEY;

function Result() {
    const { middlePoint, lat, lng } = useMapContext();

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) {
            map.current.setCenter([lng, lat]);
        } else {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [lng, lat], // have to switch them.. why? nobody knows
                zoom: zoom,
            });
        }
        var marker = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map.current);
        map.current.addControl(new mapboxgl.NavigationControl());
    }, [lat, lng]);

    return (
        <div>
            <InputContainer />
            <Container>
                <div ref={mapContainer} className="map-container" />
            </Container>
            {/* <p>{middlePoint}</p> */}
        </div>
    );
}

export default Result;
