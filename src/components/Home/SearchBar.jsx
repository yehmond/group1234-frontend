import React, { useState } from "react";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { TextField, Button, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { SERVICES_OFFERED } from "../../utils/constants";

const DEFAULT_SEARCH_TEXT = "Vancouver";
const DEFAULT_SERVICE = "Haircut";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        borderRadius: "7px",
        width: "fit-content",
        maxWidth: "1080px",
        margin: "0 auto",
        backgroundColor: "rgba(0,0,0,0.75)",
    },
    innerContainer: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
    },
    dateTimePicker: {
        width: "12rem",
    },
    pickerContainer: {
        backgroundColor: "#fff",
        borderRadius: "7px",
        padding: "0.5rem 0.25rem",
        margin: "0.75rem 0.25rem",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            margin: "0 0.25rem 1rem",
        },
    },
    input: {
        margin: "0.25rem",
        height: "3.25rem",
        [theme.breakpoints.down("sm")]: {
            width: "calc(100% - 0.5rem)",
        },
    },
    services: {
        minWidth: "12rem",
    },
    location: {
        minWidth: "15rem",
    },
    search: {
        // marginTop: "1rem",
    },
}));

export default function SearchBar() {
    const [selectedDate, setDateChange] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [selectedLocation, setSelectedLocation] = useState(DEFAULT_SEARCH_TEXT);
    const [selectedService, setSelectedServie] = useState(DEFAULT_SERVICE);
    const classes = useStyles();
    const history = useHistory();

    function handleClick() {
        const [date, time, service, location] = getEncodedDateTimeLocation();
        history.push(
            `/browse?date=${date}&time=${time}&services=${service}&location=${location}`
        );
    }

    function getEncodedDateTimeLocation() {
        const parsedData = {
            date: moment(selectedDate).format("YYYY-MM-DD"),
            time: moment(selectedTime).format("HH:mm"),
            service: selectedService,
            location: selectedLocation,
        };
        return Object.keys(parsedData).map((key) =>
            encodeURIComponent(parsedData[key])
        );
    }

    return (
        <div className={classes.container}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <div
                    className={clsx(
                        classes.pickerContainer,
                        classes.dateTimePicker
                    )}
                >
                    <KeyboardDatePicker
                        className={`${classes.input}`}
                        disableToolbar
                        disablePast
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="Date"
                        format="DD/MM/YYYY"
                        value={selectedDate}
                        onChange={(date) => setDateChange(date)}
                    />
                </div>
                <div
                    className={clsx(
                        classes.pickerContainer,
                        classes.dateTimePicker
                    )}
                >
                    <KeyboardTimePicker
                        className={classes.input}
                        disableToolbar
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="Time"
                        mask="__:__ _M"
                        value={selectedDate}
                        onChange={setSelectedTime}
                    />
                </div>

                <div className={classes.pickerContainer}>
                    <Autocomplete
                        className={clsx(classes.input, classes.services)}
                        autoHighlight
                        freeSolo
                        value={selectedService}
                        defaultValue={DEFAULT_SERVICE}
                        options={SERVICES_OFFERED}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Services"
                                variant="outlined"
                            ></TextField>
                        )}
                        onChange={(event, value) => {
                            setSelectedServie(value);
                        }}
                    />
                </div>

                <div className={classes.pickerContainer}>
                    <Autocomplete
                        className={clsx(classes.input, classes.location)}
                        autoHighlight
                        freeSolo
                        value={selectedLocation}
                        defaultValue={DEFAULT_SEARCH_TEXT}
                        options={[
                            "🍕 Pizza",
                            "🍪 Cookie",
                            "🍩 Doughnut",
                            "🍫 Chocolate",
                        ]}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Location or Shop Name"
                                variant="outlined"
                            ></TextField>
                        )}
                        onChange={(event, value) => {
                            setSelectedLocation(value);
                        }}
                    />
                </div>
            </MuiPickersUtilsProvider>
            <Button
                variant="contained"
                color="primary"
                className={clsx(classes.input, classes.search)}
                onClick={handleClick}
            >
                Search
            </Button>
        </div>
    );
}
