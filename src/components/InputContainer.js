import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import InputField from "./InputField";
import { useState } from "react";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {},
}));

function InputContainer() {
    const classes = useStyles();

    const [inputsArray, setInputsArray] = useState(Array(1, 2)); // initial value [1, 2]

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
                                    <InputField person={element} />

                                    {inputsArray.length < 5 &&                  // only for 5 person max!
                                        index === inputsArray.length - 1 && (   // checking the last element to add btn
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
                            <Button variant="contained" color="primary">
                                Find middle point
                            </Button>
                        </Grid>
                        {/* loop for others */}
                    </Grid>
                </form>
            </Container>
        </div>
    );
}

export default InputContainer;
