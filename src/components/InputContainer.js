import React from "react";
import { useHistory } from "react-router-dom";
import {
	Button,
	Grid,
	Fab,
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";

import { useStyles } from "../Layout/useStyles";
import { useMapContext } from "../context/map-context";

function InputContainer() {
	const {
		peopleAddresses,
		setPeopleAddresses,
		handleChangeMiddle,
		handleSubmitMiddle,
	} = useMapContext();

	let history = useHistory();
	const classes = useStyles();

	function handleClickAddNew() {
		setPeopleAddresses([...peopleAddresses, ""]);
	}

	function handleDelete(e, index) {
		const newArray = [...peopleAddresses];
		newArray.splice(index, 1);
		setPeopleAddresses(newArray);
	}

	return (
		<form noValidate autoComplete="off">
			<Grid>
				{peopleAddresses.map((element, index) => {
					return (
						<Grid key={`${index}city`}>
							<Grid>
								<FormControl variant="outlined">
									<InputLabel htmlFor={index + 1}>{`${
										index + 1
									} address`}</InputLabel>
									<OutlinedInput
										id={index + 1}
										label={`${index + 1} address`}
										value={element}
										defaultValue={element}
										onChange={handleChangeMiddle}
										name={index + 1}
										placeholder={
											index === 0
												? "For example, Hamburg"
												: index === 1
												? "For example, Berlin"
												: "Put your address here"
										}
										endAdornment={
											<InputAdornment
												position="end"
												className={classes.inputDeleteBtn}
											>
												<IconButton
													size="small"
													color="secondary"
													disableFocusRipple="true"
													area-label="Delete this input field"
													edge="end"
													onClick={(e) => handleDelete(e, index)}
												>
													{peopleAddresses.length > 2 && <CancelIcon />}
												</IconButton>
											</InputAdornment>
										}
									/>
								</FormControl>
							</Grid>
							<Grid>
								{peopleAddresses.length < 5 && // only for 5 person max!
									index === peopleAddresses.length - 1 && ( // checking the last element to add btn
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
						</Grid>
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
	);
}

export default InputContainer;
