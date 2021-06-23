import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useMapContext } from "../context/map-context";
import InputContainer from "./InputContainer";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import useStyles from "../Layout/useStyles";

mapboxgl.accessToken = process.env.REACT_APP_API_KEY;
let marker;

function Result() {
    const classes = useStyles();

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
        if (marker) {
            marker.setLngLat([lng, lat])
        } else {
            marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
        }

        // map.current.addControl(new mapboxgl.NavigationControl());
    }, [lat, lng]);

    return (
        <div>
            <InputContainer />
            <Container>
                <Card className={classes.map}>
                    <div ref={mapContainer} className="map-container" />
                </Card>
            </Container>
            {/* <p>{middlePoint}</p> */}
        </div>
    );
}

export default Result;
