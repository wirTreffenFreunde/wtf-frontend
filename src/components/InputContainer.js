import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import InputField from "./InputField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function InputContainer() {
  const classes = useStyles();
  return (
    <div className="InputContainer">
      <Container maxWidth="sm">
        <form className={classes.root} noValidate autoComplete="off">
          <InputField person="A" />
          <InputField person="B" />
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
          <Button variant="contained" color="primary">
            Find middle point
          </Button>
          {/* loop for others */}
        </form>
      </Container>
    </div>
  );
}

export default InputContainer;
