import React from "react";
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
import { mockData } from "../mockData";
import axios from "axios";

export default function MyAccount() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [imgPopupOpen, setImgPopupOpen] = React.useState(false);
  const [myMemoryPopupOpen, setMyMemoryPopupOpen] = React.useState(false);
  const [user, setUser] = React.useState({
    trips: [{ title: "", cities: [] }],
    memories: [],
  });
  const [currentImage, setCurrentImage] = React.useState(undefined);
  const [currentMemoryTitle, setCurrentMemoryTitle] = React.useState("");
  const [selectedMemoryIndex, setSelectedMemoryIndex] =
    React.useState(undefined);

  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    console.log("getting user ....");
    axios.defaults.headers.common = {
      Authorization: "Bearer " + mockData.userTocken,
    };
    const res = await axios.get(`http://localhost:8080/users`);
    if (!res.data) alert("You have to log in!");
    console.log("got user: ", res.data);
    setUser(res.data);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setPopupOpen(true);
  };

  const handleClose = () => {
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
    user.memories.push(memory);

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
    const fileNameArray = user.memories[index].url.split("/");
    const public_id = fileNameArray[fileNameArray.length - 1].split(".")[0];

    try {
      const res = await axios.delete(`http://localhost:8080/users/memory`, {
        headers: {
          Authorization: "Bearer " + mockData.userTocken,
        },
        data: {
          public_id: public_id,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    user.memories.splice(index, 1);
    updateUser();
  };

  const updateUser = async () => {
    axios.defaults.headers.common = {
      Authorization: "Bearer " + mockData.userTocken,
    };
    const res = await axios.put(`http://localhost:8080/users`, user);
    setUser(res.data);
  };

  const showImage = (index) => {
    setSelectedMemoryIndex(index);
    setImgPopupOpen(true);
  };

  return (
    <Container component="main">
      <Dialog
        open={imgPopupOpen}
        onClose={handleImgClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {selectedMemoryIndex != undefined &&
          user.memories[selectedMemoryIndex] != undefined
            ? user.memories[selectedMemoryIndex].title
            : "none"}
        </DialogTitle>
        <CardMedia
          className={classes.memoriesMediaXXL}
          image={
            selectedMemoryIndex != undefined &&
            user.memories[selectedMemoryIndex] != undefined
              ? user.memories[selectedMemoryIndex].url
              : ""
          }
          title={
            selectedMemoryIndex != undefined &&
            user.memories[selectedMemoryIndex] != undefined
              ? user.memories[selectedMemoryIndex].title
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
          {user.trips[selectedIndex].title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Cities: {user.trips[selectedIndex].cities.join(", ")}
            </Typography>
            <Typography>
              Where you met: {user.trips[selectedIndex].middlePoint}
            </Typography>
          </DialogContentText>
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
        <Typography className={classes.greeting}>Howdy, my friend!</Typography>
      </Box>
      {/* <div className={classes.root}> */}
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
          {/* <div className={classes.accordionList}> */}
          <List component="nav">
            {user.trips.map((trip, index) => {
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
          {/* </div> */}
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
          {user.memories.map((memory, index) => {
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
      {/* </div> */}
    </Container>
  );
}
