import React, { useEffect, useState } from "react";
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  WebMercatorViewport,
} from "react-map-gl";
import {
  Badge,
  Typography,
  Container,
  Card,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@material-ui/core";

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
    // locality,
    // findLocation,
    hotels,
    // findHotels,
    restaurants,
    // findRestaurants,
  } = useMapContext();

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [copySuccess, setCopySuccess] = useState(0);
  const [viewport, setViewport] = useState({
    latitude: middlePoint.latitude,
    longitude: middlePoint.longitude,
    zoom: 10,
  });
  const [filter, setFilter] = useState({
    // location: false,
    hotels: false,
    restaurants: false,
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
          padding: { top: 100, bottom: 50, left: 50, right: 50 },
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
    // el.value = `${selectedMarker.latitude}, ${selectedMarker.longitude}, ${selectedMarker.address}`;
    el.value = `${selectedMarker.address}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    setCopySuccess("Copied!");
    document.body.removeChild(el);
    setTimeout(() => {
      setCopySuccess(0);
    }, 3000);
  }

  function handleChangeFilter(e) {
    setFilter({ ...filter, [e.target.name]: !filter[e.target.name] });
  }

  function handleClickFilter() {
    if (filter.hotels || filter.restaurants) {
      setViewport({
        ...viewport,
        latitude: middlePoint.latitude,
        longitude: middlePoint.longitude,
        zoom: 12,
      });
    }
  }
  /* <Button
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
    </Button> */

  return (
    <Container maxWidth="lg">
      <Card className={classes.cardMap}>
        <Card className={classes.cardFilter}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Filter:</FormLabel>
            <FormGroup>
              {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.location}
                    onChange={handleChangeFilter}
                    name="location"
                  />
                }
                label="Closest location"
              /> */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.hotels}
                    onChange={handleChangeFilter}
                    name="hotels"
                  />
                }
                label={`Hotels (${hotels.length ? hotels.length : "0"})`}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.restaurants}
                    onChange={handleChangeFilter}
                    name="restaurants"
                  />
                }
                label={`Restaurants (${hotels.length ? hotels.length : "0"})`}
              />
            </FormGroup>
            <Button
              onClick={handleClickFilter}
              variant="contained"
              color="primary"
            >
              Take me there
            </Button>
          </FormControl>
        </Card>
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
            className={classes.marker}
            latitude={middlePoint.latitude}
            longitude={middlePoint.longitude}
            offsetTop={-36}
            offsetLeft={-18}
          >
            <RoomIcon
              className={classes.middlePointIcon}
              onClick={(e) => {
                e.preventDefault();
                setSelectedMarker(middlePoint);
              }}
              color="primary"
              fontSize="large"
            />
          </Marker>
          {filter.hotels &&
            hotels.map((hotel, index) => (
              <Marker
                className={classes.markerFilter}
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

          {filter.restaurants &&
            restaurants.map((restaurant, index) => (
              <Marker
                className={classes.markerFilter}
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
                className={classes.marker}
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
  );
}

export default Result;
