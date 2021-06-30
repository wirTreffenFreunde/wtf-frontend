import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import RoomIcon from "@material-ui/icons/Room";
import { Badge, Typography } from "@material-ui/core";

import { useMapContext } from "../context/map-context";
import InputContainer from "./InputContainer";

import useStyles from "../Layout/useStyles";
import "mapbox-gl/dist/mapbox-gl.css";

const mapboxAccessToken = process.env.REACT_APP_API_KEY;

function Result() {
    const classes = useStyles();

    const { middlePoint, lat, lng } = useMapContext();
    // const [selectedMarker, setSelectedMarker] = useState([]);
    const [showPopup, togglePopup] = useState(false);
    const [copySuccess, setCopySuccess] = useState(0);

    const navControlStyle = {
        right: 10,
        top: 10,
    };
    const [viewport, setViewport] = useState({
        latitude: lat,
        longitude: lng,
        zoom: 8,
    });

    useEffect(() => {
        setViewport({ ...viewport, latitude: lat, longitude: lng });
    }, [lat, lng]);

    const handleClick = (e) => {
        e.preventDefault();
        // setSelectedMarker({ lat: viewport.latitude, lng: viewport.longitude });
        togglePopup(!showPopup);
    };

    function copyToClipboard() {
        const el = document.createElement("input");
        el.value = `${lat}, ${lng}`;
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
                        mapStyle='mapbox://styles/mapbox/streets-v11'
                        width="100%"
                        height="100%"
                        onViewportChange={(viewport) => setViewport(viewport)}
                    >
                        <Marker
                            latitude={lat}
                            longitude={lng}
                            offsetTop={-36}
                            offsetLeft={-18}
                        >
                            <RoomIcon onClick={handleClick} color="primary" fontSize="large"/>
                        </Marker>

                        {showPopup && (
                            <Popup
                                latitude={lat}
                                longitude={lng}
                                closeButton={true}
                                closeOnClick={false}
                                onClose={() => togglePopup(false)}
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
                                            {lat}, {lng}
                                        </Typography>
                                    </div>
                                </Badge>
                            </Popup>
                        )}

                        <NavigationControl style={navControlStyle} />
                    </ReactMapGL>
                </Card>
            </Container>
        </div>
    );
}

export default Result;
