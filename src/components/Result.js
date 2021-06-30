import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import RoomIcon from "@material-ui/icons/Room";
import HomeIcon from '@material-ui/icons/Home';
import { Badge, Typography } from "@material-ui/core";

import { useMapContext } from "../context/map-context";
import InputContainer from "./InputContainer";

import useStyles from "../Layout/useStyles";
import "mapbox-gl/dist/mapbox-gl.css";

const mapboxAccessToken = process.env.REACT_APP_API_KEY;

function Result() {
    const classes = useStyles();

    const { middlePoint, peopleCoordinates } = useMapContext();
    // console.log(peopleCoordinates);
    // const [showPopup, togglePopup] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [copySuccess, setCopySuccess] = useState(0);

    const navControlStyle = {
        right: 10,
        top: 10,
    };
    const [viewport, setViewport] = useState({
        latitude: middlePoint.latitude,
        longitude: middlePoint.longitude,
        zoom: 8,
    });

    useEffect(() => {
        setViewport({
            ...viewport,
            latitude: middlePoint.latitude,
            longitude: middlePoint.longitude,
        });
    }, [middlePoint.latitude, middlePoint.longitude]);

    function copyToClipboard() {
        const el = document.createElement("input");
        el.value = `${selectedMarker.latitude}, ${selectedMarker.longitude}`;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        setCopySuccess("Copied!");
        document.body.removeChild(el);
        setTimeout(() => {
            setCopySuccess(0);
        }, 3000);
    }
    return (
        <div>
            <InputContainer />
            <Container>
                <Card className={classes.cardMap}>
                    <ReactMapGL
                        {...viewport}
                        mapboxApiAccessToken={mapboxAccessToken}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        width="100%"
                        height="100%"
                        onViewportChange={(viewport) => setViewport(viewport)}
                    >
                        <NavigationControl style={navControlStyle} />

                        <Marker
                            latitude={middlePoint.latitude}
                            longitude={middlePoint.longitude}
                            offsetTop={-36}
                            offsetLeft={-18}
                        >
                            <RoomIcon
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedMarker(middlePoint);
                                }}
                                color="primary"
                                fontSize="large"
                            />
                        </Marker>

                        {peopleCoordinates.map((el, index) => {
                            return (
                                <Marker
                                    key={index}
                                    latitude={Number(el.latitude)}
                                    longitude={Number(el.longitude)}
                                    offsetTop={-36}
                                    offsetLeft={-18}
                                >
                                    <HomeIcon
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedMarker(el);
                                        }}
                                        color="secondary"
                                        fontSize="large"
                                    />
                                </Marker>
                            );
                        })}

                        {selectedMarker && (
                            <Popup
                                latitude={selectedMarker.latitude}
                                longitude={selectedMarker.longitude}
                                closeButton={true}
                                closeOnClick={false}
                                onClose={() => setSelectedMarker(null)}
                                anchor="left"
                                tipSize={20}
                            >
                                <Badge
                                    badgeContent={copySuccess}
                                    color="primary"
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                    }}
                                >
                                    <div onClick={copyToClipboard}>
                                        <Typography>Press to copy</Typography>
                                        <Typography>
                                            {selectedMarker.latitude},{" "}
                                            {selectedMarker.longitude}
                                        </Typography>
                                    </div>
                                </Badge>
                            </Popup>
                        )}
                    </ReactMapGL>
                </Card>
            </Container>
        </div>
    );
}

export default Result;
