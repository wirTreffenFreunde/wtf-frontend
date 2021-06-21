import React, { useState, useEffect } from "react";
import axios from "axios";
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
  // input fields for everyone
  const [peopleAddresses, setPeopleAddresses] = useState([]);
  // middle point
  const [middlePoint, setMiddlePoint] = useState("");

  // saving all the input fields
  const handleChangeMiddle = (e) => {
    setPeopleAddresses({
      ...peopleAddresses,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitMiddle = async (e) => {
    e.preventDefault();
    console.log(peopleAddresses);
    const result = await axios.post(
      `http://localhost:8080/api`,
      peopleAddresses
    );
    console.log(result.data);
    setMiddlePoint(result.data);
  };

  const classes = useStyles();
  return (
    <div className="InputContainer">
      <Container maxWidth="sm">
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmitMiddle}
        >
          <InputField person="A" onChange={handleChangeMiddle} />
          <InputField person="B" onChange={handleChangeMiddle} />
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitMiddle}
          >
            Find middle point
          </Button>
          {/* loop for others */}
        </form>
        {middlePoint && <p>{middlePoint}</p>}
      </Container>
    </div>
  );
}

export default InputContainer;
