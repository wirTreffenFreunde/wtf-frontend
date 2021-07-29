import React from "react";
import mapboxgl from "mapbox-gl";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import { useStyles } from "../Layout/useStyles";
// import { mockData } from "../mockData";
import axios from "axios";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import { useMapContext } from "../context/map-context";
import { HomeIcon, BalloonIcon } from "./Icons";
import { useHistory } from "react-router-dom";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const mapboxAccessToken = process.env.REACT_APP_API_KEY;

export default function MyAccount() {
  let history = useHistory();
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedTrip, setSelectedTrip] = React.useState(undefined);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [imgPopupOpen, setImgPopupOpen] = React.useState(false);
  const [myMemoryPopupOpen, setMyMemoryPopupOpen] = React.useState(false);
  const [userAccount, setUserAccount] = React.useState({
    trips: [{ title: "", cities: [] }],
    memories: [],
  });
  const [currentImage, setCurrentImage] = React.useState(undefined);
  const [currentMemoryTitle, setCurrentMemoryTitle] = React.useState("");
  const [selectedMemoryIndex, setSelectedMemoryIndex] =
    React.useState(undefined);
  const { middlePoint } = useMapContext();
  const navControlStyle = {
    right: 10,
    top: 10,
  };

  const [viewport, setViewport] = React.useState({
    latitude: middlePoint.latitude,
    longitude: middlePoint.longitude,
    zoom: 5,
  });

  React.useEffect(() => {
    getUserData();
  });

  const getUserData = async () => {
    let token;
    do {
      token = localStorage.getItem("token") || sessionStorage.getItem("token");
    } while (token === undefined);
    if (token === null) history.push("/login");
    axios.defaults.headers.common = {
      Authorization: "Bearer " + token,
    };
    const res = await axios.get(`http://localhost:8080/users`);
    if (!res.data) alert("You have to log in!");
    setUserAccount(res.data);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    getCoordinates(index);
  };

  const handleClose = () => {
    setSelectedTrip(undefined);
    setPopupOpen(false);
  };

  const handleImgClose = () => {
    setImgPopupOpen(false);
  };
  const handleCloseMemoryPopup = () => {
    setMyMemoryPopupOpen(false);
  };

  const showUploadPopup = () => {
    setCurrentImage(undefined);
    setCurrentMemoryTitle("");
    setMyMemoryPopupOpen(true);
  };

  const uploadMemory = async () => {
    if (currentImage === undefined || currentMemoryTitle === "") {
      alert("You have to add a title and an image");
      return;
    }
    const formData = new FormData();
    formData.append("file", currentImage.image);
    formData.append("upload_preset", "wirtreffenfreunde");
    formData.append("cloud_name", "dfgwwhpq3");
    axios.defaults.headers.common = {
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
    };
    const clres = await axios.post(
      `https://api.cloudinary.com/v1_1/dfgwwhpq3/image/upload`,
      formData
    );

    const memory = {
      title: currentMemoryTitle,
      url: clres.data.url,
    };
    userAccount.memories.push(memory);

    updateUser();
    handleCloseMemoryPopup();
  };

  const fileChanged = (e) => {
    setCurrentImage({ image: e.target.files[0] });
  };

  const memoryTitleChanged = (e) => {
    setCurrentMemoryTitle(e.target.value);
  };

  const deleteMemory = async (index) => {
    const fileNameArray = userAccount.memories[index].url.split("/");
    const public_id = fileNameArray[fileNameArray.length - 1].split(".")[0];

    try {
      let token;
      do {
        token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
      } while (token === undefined);
      const res = await axios.delete(`http://localhost:8080/users/memory`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          public_id: public_id,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    userAccount.memories.splice(index, 1);
    updateUser();
  };

  const updateUser = async () => {
    let token;
    do {
      token = localStorage.getItem("token") || sessionStorage.getItem("token");
    } while (token === undefined);
    axios.defaults.headers.common = {
      Authorization: "Bearer " + token,
    };
    const res = await axios.put(`http://localhost:8080/users`, userAccount);
    setUserAccount(res.data);
  };

  const showImage = (index) => {
    setSelectedMemoryIndex(index);
    setImgPopupOpen(true);
  };

  const getCoordinates = async (index) => {
    const result = await axios.post(
      `http://localhost:8080/api`,
      userAccount.trips[index].cities
    );
    console.log(result.data);
    setViewport({
      latitude: result.data.middlePoint.latitude,
      longitude: result.data.middlePoint.longitude,
      zoom: 5,
    });
    setSelectedTrip(result.data);
    setPopupOpen(true);
  };

  return (
    <Container component="main">
      <Dialog
        open={imgPopupOpen}
        onClose={handleImgClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {selectedMemoryIndex !== undefined &&
          userAccount.memories[selectedMemoryIndex] !== undefined
            ? userAccount.memories[selectedMemoryIndex].title
            : "none"}
        </DialogTitle>
        <CardMedia
          className={classes.memoriesMediaXXL}
          image={
            selectedMemoryIndex !== undefined &&
            userAccount.memories[selectedMemoryIndex] !== undefined
              ? userAccount.memories[selectedMemoryIndex].url
              : ""
          }
          title={
            selectedMemoryIndex !== undefined &&
            userAccount.memories[selectedMemoryIndex] !== undefined
              ? userAccount.memories[selectedMemoryIndex].title
              : "none"
          }
        />
        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImgClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={popupOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {userAccount.trips !== undefined && userAccount.trips.length > 0
            ? userAccount.trips[selectedIndex].title
            : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Cities:{" "}
              {userAccount.trips !== undefined && userAccount.trips.length > 0
                ? userAccount.trips[selectedIndex].cities.join(", ")
                : ""}
            </Typography>
            <Typography>
              Where you met:{" "}
              {selectedTrip !== undefined
                ? selectedTrip.middlePoint.address.address
                : ""}
              {selectedTrip !== undefined &&
              selectedTrip.middlePoint.address.error !== undefined
                ? selectedTrip.middlePoint.address.error
                : ""}
            </Typography>
          </DialogContentText>
          <Card className={classes.cardMapAccount}>
            {selectedTrip !== undefined && (
              <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={mapboxAccessToken}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                width="100%"
                height="100%"
                onViewportChange={(viewport) => setViewport(viewport)}
              >
                <NavigationControl style={navControlStyle} />
                {selectedTrip.peopleAddresses.map((addr) => {
                  return (
                    <Marker
                      latitude={addr.latitude}
                      longitude={addr.longitude}
                      key={addr.address}
                      offsetTop={-56}
                      offsetLeft={-30}
                    >
                      <HomeIcon />
                    </Marker>
                  );
                })}

                {selectedTrip.middlePoint.address.error !== undefined ? (
                  <Marker
                    latitude={selectedTrip.middlePoint.latitude}
                    longitude={selectedTrip.middlePoint.longitude}
                    key={selectedTrip.middlePoint.address.error}
                    offsetTop={-50}
                    offsetLeft={-25}
                  >
                    <BalloonIcon />
                  </Marker>
                ) : (
                  <Marker
                    latitude={selectedTrip.middlePoint.address.latitude}
                    longitude={selectedTrip.middlePoint.address.longitude}
                    key={selectedTrip.middlePoint.address.address}
                    offsetTop={-50}
                    offsetLeft={-25}
                  >
                    <BalloonIcon />
                  </Marker>
                )}
              </ReactMapGL>
            )}
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={myMemoryPopupOpen}
        onClose={handleCloseMemoryPopup}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Upload Memory</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              id="memory-title"
              label="Memory title"
              onChange={memoryTitleChanged}
            ></TextField>
            <br></br>
            <Input type="file" onChange={fileChanged}></Input>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={classes.memoryActionButton} onClick={uploadMemory}>
            Upload
          </Button>
          <Button onClick={handleCloseMemoryPopup}>Close</Button>
        </DialogActions>
      </Dialog>
      <Box>
        <Typography className={classes.greeting}>
          Howdy, {userAccount.firstName}!
        </Typography>
      </Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Have a glimpse at where have you been
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="nav" className={classes.accordionList}>
            {userAccount.trips.map((trip, index) => {
              return (
                <ListItem
                  button
                  selected={selectedIndex === index}
                  onClick={(event) => handleListItemClick(event, index)}
                  key={trip.title}
                >
                  <ListItemText primary={trip.title} />
                </ListItem>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            Would you like to see some of your memories?
          </Typography>
        </AccordionSummary>
        <Button
          variant="contained"
          color="primary"
          onClick={showUploadPopup}
          className={classes.memoriesAddButton}
        >
          Add Memory
        </Button>
        <AccordionDetails>
          {userAccount.memories.map((memory, index) => {
            return (
              <Card className={classes.memoriesRoot} key={memory.url}>
                <CardHeader
                  action={
                    <IconButton
                      aria-label="share"
                      onClick={(e) => deleteMemory(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  title={memory.title}
                  subheader={memory.date}
                />
                <CardMedia
                  className={classes.memoriesMedia}
                  image={memory.url}
                  title={memory.title}
                  onClick={(e) => showImage(index)}
                />
              </Card>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
