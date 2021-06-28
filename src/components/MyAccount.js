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
import useStyles from "../Layout/useStyles";

export default function MyAccount() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Container component="main">
      <Typography>Howdy, my friend!</Typography>
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
                <ListItem
                  button
                  selected={selectedIndex === 0}
                  onClick={(event) => handleListItemClick(event, 0)}
                >
                  <ListItemText primary="MyFirstTrip" />
                </ListItem>
                <ListItem
                  button
                  selected={selectedIndex === 1}
                  onClick={(event) => handleListItemClick(event, 1)}
                >
                  <ListItemText primary="MySecondTrip" />
                </ListItem>
                <ListItem
                  button
                  selected={selectedIndex === 2}
                  onClick={(event) => handleListItemClick(event, 2)}
                >
                  <ListItemText primary="MyThirdTrip" />
                </ListItem>
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
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </Container>
  );
}
