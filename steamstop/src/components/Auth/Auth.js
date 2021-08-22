import React, { useContext } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Button, TextField, CircularProgress, Snackbar } from "@material-ui/core"
import MuiAlert from "@material-ui/lab/Alert"
import useChangeInputConfig from "../hooks/useInput"
import useFetchAPI from '../hooks/useFetchAPI'
import CheckAuthCookie from '../hooks/checkAuthCookie'
import { ThemeContext } from "../../context/ThemeContext"

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {// anything and anything after (* means everything)
            margin: theme.spacing(1),
            width: '25ch',
        },
    }
}))

function Auth(props) {
    const classes = useStyles();
    const { isMode } = useContext(ThemeContext)

    let isLoginRoute = props.match.path === "/login"
    // we are saying that isLoginRoute = our page path which is login.
    let buttonTitle = isLoginRoute ? "Login" : "Sign up"
    // button title is  saying if isLoginRoute = true, then we go to login page. else go to signup.
    let apiURL = isLoginRoute ? '/users/login' : "/users/create-user";
    // we are saying here if true, we use the path for login, else we use the page for sign up.

    const [
        { isLoading,
            response,
            error,
            setResponse },
        handleAPICallButtonSubmit,
        handleMessageClose,
        isMessageOpen,
        successMessageValue
    ] = useFetchAPI(apiURL) // we are passing in apiURL

    const { checkIfCookieExists } = CheckAuthCookie(); // bringing in our checkCookieExists function.

    //where we use useChangeInputConfig ---
    const [email,
        handleEmailChange,
        isEmailError,
        emailErrorMessage,
        isEmailDisabled,
        clearEmailInput] = useChangeInputConfig("email")

    const [username,
        handleUsernameChange,
        isUsernameError,
        usernameErrorMessage,
        isUsernameDisabled,
        clearUsernameInput] = useChangeInputConfig("username")

    const [password,
        handlePasswordChange,
        isPasswordError,
        passwordErrorMessage,
        isPasswordDisabled,
        clearPasswordInput] = useChangeInputConfig("password")
    // -------------------

    function handleOnSubmit(e) {
        e.preventDefault();

        const user = isLoginRoute
            ? { email, password }
            : { email, username, password };

        handleAPICallButtonSubmit({
            method: "post",
            data: {
                ...user,
            }
        })
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant='filled' {...props} />;
    };

    function errorMessage() { // working on our error message being displayed.
        return (
            <Snackbar open={isMessageOpen} autoHideDuration={6000} onClose={handleMessageClose}
                style={{ transform: 'translateY(-500px)' }}>
                <Alert severity='error'>{error}</Alert>
            </Snackbar>
        )
    };

    function successMessage() { // if we are successful with creating a user, show successM
        return (
            <Snackbar open={isMessageOpen} autoHideDuration={6000} onClose={handleMessageClose}
                style={{ transform: 'translateY(-500px)' }}>
                <Alert severity='success'>{successMessageValue}</Alert>
            </Snackbar>
        )
    };

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center' }}>
                <CircularProgress />
            </div>
        );
    };

    if (response === 'user created') {
        clearEmailInput();
        clearUsernameInput();
        clearPasswordInput();
        setResponse(null);
    }

    if (checkIfCookieExists()) {
        props.history.push("/");
    }

    return <div style={{ background: isMode ? "lightslategray" : 'black', color: isMode ? "black" : "white", height: "1000px" }}>

        <Grid container spacing={0}
            justifyContent="center" >
            {successMessageValue && successMessage()}
            {/* bring in response and successMessage func */}
            {error && errorMessage()}
            <form className={classes.root} onSubmit={handleOnSubmit}> {/* calling useStyles variable name */}
                <Grid item m={6}>
                    <TextField fullWidth label="Email" name="email" value={email} onChange={handleEmailChange} error={isEmailError}
                        helperText={emailErrorMessage} />
                </Grid>

                {!isLoginRoute && (
                    <Grid item m={6}>
                        <TextField fullWidth label="Username" name="username" value={username} onChange={handleUsernameChange} error={isUsernameError} helperText={usernameErrorMessage} />
                    </Grid>
                )}

                <Grid item m={6}>
                    <TextField fullWidth label="Password" name="password" value={password} onChange={handlePasswordChange} error={isPasswordError}
                        helperText={passwordErrorMessage} />
                </Grid>

                <Grid style={{ textAlign: "center" }}>
                    <Button type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 10 }}
                        disabled={
                            isLoginRoute ? isEmailDisabled || isPasswordDisabled
                                : isEmailDisabled || isPasswordDisabled || isUsernameDisabled}
                    >
                        {/* if i am in login route, then only use email/password and it wont let you submit, else use if in signup, isUsername, password, email for login in. button will be unavailable to sign in/up. */}
                        {buttonTitle}
                    </Button>
                </Grid>
            </form>

        </Grid>
    </div >
}

export default Auth
