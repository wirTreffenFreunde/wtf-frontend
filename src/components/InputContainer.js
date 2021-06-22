import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

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
      Object.values(peopleAddresses)
    );
    console.log(result.data);
    setMiddlePoint(result.data);
  };

  const useStyles = makeStyles((theme) => ({
    root: {},
  }));
  const classes = useStyles();

  const [inputsArray, setInputsArray] = useState([1, 2]); // initial value [1, 2]

  function handleClickAddNew() {
    setInputsArray([...inputsArray, inputsArray.length + 1]);
  }

  return (
    <div className="InputContainer">
      <Container>
        <Typography variant="h4">Put you addresses here</Typography>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container direction="column" justify="space-around" spacing={1}>
            {inputsArray.map((element, index) => {
              return (
                <Grid item key={index}>
                  <TextField
                    id="outlined-basic"
                    label={element}
                    variant="outlined"
                    onChange={handleChangeMiddle}
                    name={`${element}-name`}
                  />

                  {inputsArray.length < 5 && // only for 5 person max!
                    index === inputsArray.length - 1 && ( // checking the last element to add btn
                      <Fab
                        color="primary"
                        aria-label="add"
                        onClick={() => {
                          handleClickAddNew();
                        }}
                      >
                        <AddIcon />
                      </Fab>
                    )}
                </Grid>
              );
            })}
            <Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitMiddle}
              >
                Find middle point
              </Button>
            </Grid>
            {/* loop for others */}
          </Grid>
        </form>
        {middlePoint && <p>{middlePoint}</p>}
      </Container>
    </div>
  );
}

export default InputContainer;
