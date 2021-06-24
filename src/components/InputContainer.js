import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import useStyles from "../Layout/useStyles";
import { useMapContext } from "../context/map-context";

function InputContainer() {
  const { handleChangeMiddle, handleSubmitMiddle } = useMapContext();

  let history = useHistory();
  const classes = useStyles();

  const [inputsArray, setInputsArray] = useState([1, 2]); // initial value [1, 2]
  function handleClickAddNew() {
    setInputsArray([...inputsArray, inputsArray.length + 1]);
  }

  return (
    <>
      <Container>
        <Card className={classes.card}>
          <Typography variant="h5">Put you addresses here:</Typography>
          <form
            noValidate
            autoComplete="off"
            // className={classes.mainForm}
          >
            <Grid>
              {inputsArray.map((element, index) => {
                return (
                  <div key={index}>
                    <TextField
                      id="outlined-basic"
                      label={element}
                      variant="outlined"
                      onChange={handleChangeMiddle}
                      name={`${element}-name`}
                      className={classes.inputField}
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
                  </div>
                );
              })}
            </Grid>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
              className={classes.submitForm}
              onClick={(e) => {
                handleSubmitMiddle(e);
                history.push("/result");
              }}
            >
              Find middle point
            </Button>
          </form>
        </Card>
      </Container>
    </>
  );
}

export default InputContainer;
