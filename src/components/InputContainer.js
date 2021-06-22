import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import useStyles from "../Layout/useStyles";
import { AppData } from "../app-data-context";

function InputContainer() {
    let history = useHistory();
    const classes = useStyles();
    const { handleChangeMiddle, handleSubmitMiddle } = useContext(AppData);

    const [inputsArray, setInputsArray] = useState([1, 2]); // initial value [1, 2]

    function handleClickAddNew() {
        setInputsArray([...inputsArray, inputsArray.length + 1]);
    }

    return (
        <div className="InputContainer">
            <Container>
                <Typography variant="h4">Put you addresses here</Typography>
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid
                        container
                        direction="column"
                        justify="space-around"
                        spacing={1}
                    >
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
                                onClick={(e) => {
                                    handleSubmitMiddle(e);
                                    history.push("/result");
                                }} // need to find how to pass the data
                            >
                                Find middle point
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    );
}

export default InputContainer;