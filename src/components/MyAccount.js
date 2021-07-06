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
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Popover from "@material-ui/core/Popover";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import useStyles from "../Layout/useStyles";
import { TripOriginSharp } from "@material-ui/icons";
import { mockData } from "../mockData";
import axios from "axios";

export default function MyAccount() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [user, setUser] = React.useState({
    trips: [{ title: "", cities: [] }],
  });

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

  //   const getMiddlePoint = async (cities) => {
  //     try {
  //       const encodedAddresses = cities.map((city) => encodeURIComponent(city));
  //       const result = await axios.post(
  //         `http://localhost:8080/api`,
  //         encodedAddresses
  //       );
  //       return result.data;
  //     } catch (err) {
  //       return "Could not calculate...";
  //     }
  //   };

  return (
    <Container component="main">
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
            {/* <Typography>
              Where you should have met:{" "}
              {() => {
                return getMiddlePoint(mockData.trips[selectedIndex].cities);
              }}
            </Typography> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Box>
        <Typography className={classes.greeting}>Howdy, my friend!</Typography>
      </Box>
      <div className={classes.root}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              Have a glympse at where have you been
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.accordionList}>
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
            </div>
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
          <AccordionDetails>
            <Card className={classes.memoriesRoot}>
              <CardHeader
                action={
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                }
                title="My first trip"
                subheader="September 14, 2016"
              />
              <CardMedia
                className={classes.memoriesMedia}
                image="http://localhost:3000/images/paella.png"
                title="Paella dish"
              />
            </Card>
          </AccordionDetails>
        </Accordion>
      </div>
    </Container>
  );
}
