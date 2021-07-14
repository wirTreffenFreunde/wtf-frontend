import React, { useEffect, useState } from "react";
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  WebMercatorViewport,
} from "react-map-gl";
import { Badge, Typography, Container, Card, Button } from "@material-ui/core";

import RoomIcon from "@material-ui/icons/Room";
import HomeIcon from "@material-ui/icons/Home";
import HotelIcon from "@material-ui/icons/Hotel";
import LocalDiningIcon from "@material-ui/icons/LocalDining";

import { useMapContext } from "../context/map-context";

import { useStyles } from "../Layout/useStyles";
import "mapbox-gl/dist/mapbox-gl.css";

const mapboxAccessToken = process.env.REACT_APP_API_KEY;

function Result() {
  const classes = useStyles();

  const {
    middlePoint,
    peopleCoordinates,
    boundsCoordinates,
    locality,
    findLocation,
    hotels,
    findHotels,
    restaurants,
    findRestaurants,
  } = useMapContext();

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [copySuccess, setCopySuccess] = useState(0);
  const [viewport, setViewport] = useState({
    latitude: middlePoint.latitude,
    longitude: middlePoint.longitude,
    zoom: 10,
  });

  const navControlStyle = {
    right: 10,
    top: 10,
  };

  useEffect(() => {
    // changing view port on the map to have all the markers visible
    if (boundsCoordinates) {
      const { longitude, latitude, zoom } = new WebMercatorViewport(
        viewport
      ).fitBounds(
        [
          [boundsCoordinates.minLng, boundsCoordinates.minLat],
          [boundsCoordinates.maxLng, boundsCoordinates.maxLat],
        ],
        {
          padding: { top: 50, bottom: 20, left: 20, right: 20 },
        }
      );
      setViewport({
        ...viewport,
        longitude,
        latitude,
        zoom,
      });
    } else {
      setViewport({
        ...viewport,
        latitude: middlePoint.latitude,
        longitude: middlePoint.longitude,
      });
    }
  }, [middlePoint, boundsCoordinates]);

  function copyToClipboard() {
    const el = document.createElement("input");
    el.value = `${selectedMarker.latitude}, ${selectedMarker.longitude}, ${selectedMarker.address}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    setCopySuccess("Copied!");
    document.body.removeChild(el);
    setTimeout(() => {
      setCopySuccess(0);
    }, 3000);
  }
  console.log(middlePoint);
  return (
    <div>
      <Button
        variant="contained"
        type="submit"
        color="primary"
        size="large"
        //className={classes.submitBtn}
        onClick={() => findLocation(middlePoint)}
      >
        Location name
      </Button>
      <Button
        variant="contained"
        type="submit"
        color="primary"
        size="large"
        //className={classes.submitBtn}
        onClick={() => findHotels(middlePoint)}
      >
        local hotels
      </Button>
      <Button
        variant="contained"
        type="submit"
        color="primary"
        size="large"
        //className={classes.submitBtn}
        onClick={() => findRestaurants(middlePoint)}
      >
        Restaurants nearby
      </Button>
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
            {hotels &&
              hotels.map((hotel, index) => (
                <Marker
                  latitude={hotel.latitude}
                  longitude={hotel.longitude}
                  offsetTop={-36}
                  offsetLeft={-18}
                  key={`${index}hotel`}
                >
                  <HotelIcon
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedMarker(hotel);
                    }}
                    color="secondary"
                    fontSize="large"
                  />
                </Marker>
              ))}

            {restaurants &&
              restaurants.map((restaurant, index) => (
                <Marker
                  latitude={restaurant.latitude}
                  longitude={restaurant.longitude}
                  offsetTop={-36}
                  offsetLeft={-18}
                  key={`${index}hotel`}
                >
                  <LocalDiningIcon
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedMarker(restaurant);
                    }}
                    color="secondary"
                    fontSize="large"
                  />
                </Marker>
              ))}

            {peopleCoordinates.map((el, index) => {
              return (
                <Marker
                  key={index}
                  latitude={el.latitude}
                  longitude={el.longitude}
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
                      {selectedMarker.address}
                      {/* ,{selectedMarker.latitude},
                      {selectedMarker.longitude} */}
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
