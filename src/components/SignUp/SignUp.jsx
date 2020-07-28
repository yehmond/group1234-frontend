import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Add from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { IconButton, InputAdornment, Tab, Tabs } from "@material-ui/core";
import "./signup.scss";
import _ from "lodash";
import { validateEmail } from "../../utils/utils";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import PasswordStrengthBar from "react-password-strength-bar/dist";
import { MIN_PASSWORD_LENGTH } from "../../utils/constants";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { signUp } from "../../api/auth";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


// template from https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-up
export default function SignUp() {
    const classes = useStyles();
    const [state, setState] = useState({
        email: "",
        lName: "",
        password: "",
        userType: "CUSTOMER",
        fName: " ",
        passwordError: false,
        passwordHelper: "",
        emailError: false,
        emailHelper: "",
        showPassword: false,
    });
    const [submit, setSubmit] = useState(false);
    const [signUpError, setSignUpError] = useState(false);

    function handleChange(event) {
        const {
            target: { name, value },
        } = event;
        setState({ ...state, [name]: value });
    }

    function handleTabChange(event, value) {
        setState({ ...state, userType: value });
    }

    function handleClickShowPassword() {
        const isPasswordShown = state.showPassword;
        setState({ ...state, showPassword: !isPasswordShown });
    }

    function areFieldsFilled() {
        return _.some(
            _.omit(
                state,
                "passwordHelper",
                "passwordError",
                "emailError",
                "emailHelper",
                "showPassword"
            ),
            _.isEmpty
        );
    }

    function areFieldsValid() {
        // validate email
        if (!validateEmail(state.email)) {
            setState({
                ...state,
                emailError: true,
                emailHelper: "Pleas enter a valid email",
            });
        }

        // if any fields are invalid return
        return validateEmail(state.email) && isValidPassword();
    }

    function isValidPassword() {
        const currPassword = state.password;
        if (
            currPassword.length < MIN_PASSWORD_LENGTH ||
            currPassword.search(/[a-z]/i) < 0 ||
            currPassword.search(/[0-9]/) < 0
        ) {
            setState({
                ...state,
                passwordHelper:
                    "Your password must be at least " +
                    MIN_PASSWORD_LENGTH +
                    " characters with at least one letter and one digit",
                passwordError: true,
            });
            return false;
        }
        return true;
    }

    function showPasswordIcon() {
        return (
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                >
                    {state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </InputAdornment>
        );
    }

    function submitSignUp() {
        if (areFieldsValid()) {
            setSubmit(true);
        }
    }

    useEffect(() => {
        if (submit) {
            signUp(
                state.password,
                state.userType,
                state.fName,
                state.lName,
                state.email,
                state.phoneNumber
            )
                .then(() => {
                    window.location = "/signup/success";
                })
                .catch(() => {
                    setSignUpError(true);
                    setSubmit(false);
                });
        }
    }, [submit]); //eslint-disable-line

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {signUpError && (
                    <Alert severity="error">
                        Email already taken. Please try again.
                    </Alert>
                )}
                <Avatar className={classes.avatar}>
                    <Add />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={handleChange}
                                autoComplete="fname"
                                name="fName"
                                variant="outlined"
                                required
                                fullWidth
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                label="Last Name"
                                name="lName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                label="Phone Number"
                                name="phoneNumber"
                                autoComplete="phone number"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                helperText={state.emailHelper}
                                error={state.emailError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={state.showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                helperText={state.passwordHelper}
                                error={state.passwordError}
                                InputProps={{
                                    endAdornment: showPasswordIcon(),
                                }}
                            />
                            <PasswordStrengthBar
                                password={state.password}
                                minLength={MIN_PASSWORD_LENGTH}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Tabs
                                value={state.userType}
                                onChange={handleTabChange}
                                centered
                            >
                                <Tab label="Customer" value={"CUSTOMER"} />
                                <Tab label="Owner" value={"OWNER"} />
                            </Tabs>
                        </Grid>
                    </Grid>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={areFieldsFilled()}
                        onClick={submitSignUp}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link
                                component={RouterLink}
                                to="/signin"
                                variant="body2"
                            >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
