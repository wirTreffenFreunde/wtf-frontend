import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Badge, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import { useStyles } from "../Layout/useStyles";
import { useMapContext } from "../context/map-context";

function InputContainer() {
  const { handleChangeMiddle, handleSubmitMiddle } =
    useMapContext();

  let history = useHistory();
  const classes = useStyles();
  // have to rewrite it using maybe people addresses?!?!?!?
  const [inputsArray, setInputsArray] = useState([1, 2]); // initial value [1, 2]
  function handleClickAddNew() {
    setInputsArray([...inputsArray, inputsArray.length + 1]);
  }

  return (
    <>
      <Container>
        <Card className={classes.card}>
          <Typography variant="h5">Put you addresses here:</Typography>
          <form noValidate autoComplete="off">
            <Grid>
              {inputsArray.map((element, index) => {
                return (
                  <Box key={index}>
                    <Badge
                      color="secondary"
                      id={index}
                      badgeContent={index >= 2 ? "x" : 0}
                      onClick={(e) => {
                        if (
                          e.target.localName === "span" &&
                          e.target.textContent === "x"
                        ) {
                          const newArray = [...inputsArray];
                          newArray.splice(index, 1);
                          setInputsArray(newArray);
                          // console.log(peopleAddresses)
                        }
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label={index + 1}
                        variant="outlined"
                        onChange={handleChangeMiddle}
                        name={`${index + 1}-name`}
                        className={classes.inputField}
                      />
                    </Badge>
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
                  </Box>
                );
              })}
            </Grid>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
              className={classes.submitBtn}
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
