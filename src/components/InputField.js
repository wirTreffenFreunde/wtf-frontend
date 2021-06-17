import React from "react";
import TextField from "@material-ui/core/TextField";

function InputField(props) {
    return (
        <>
            <TextField
                id="outlined-basic"
                label={props.person}
                variant="outlined"
            />
        </>
    );
}

export default InputField;
