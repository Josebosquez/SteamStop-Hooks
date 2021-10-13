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
        "& > *": {
            margin: theme.spacing(1),
            width: '25ch',
        },
    }
}))

function Auth(props) {
    const classes = useStyles();
    const { isMode } = useContext(ThemeContext)

    let isLoginRoute = props.match.path === "/login"
    let buttonTitle = isLoginRoute ? "Login" : "Sign up"
    let apiURL = isLoginRoute ? '/users/login' : "/users/create-user";


    const [
        { isLoading,
            response,
            error,
            setResponse },
        handleAPICallButtonSubmit,
        handleMessageClose,
        isMessageOpen,
        successMessageValue
    ] = useFetchAPI(apiURL)

    const { checkIfCookieExists } = CheckAuthCookie();


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

    function errorMessage() {
        return (
            <Snackbar open={isMessageOpen} autoHideDuration={6000} onClose={handleMessageClose}
                style={{ transform: 'translateY(-500px)' }}>
                <Alert severity='error'>{error}</Alert>
            </Snackbar>
        )
    };

    function successMessage() {
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
        props.history.push("/home");
    }

    return <div style={{ background: isMode ? "lightslategray" : 'black', height: "1000px" }}>

        <Grid container spacing={0}
            justifyContent="center" >
            {successMessageValue && successMessage()}

            {error && errorMessage()}
            <form className={classes.root} onSubmit={handleOnSubmit} style={{ color: isMode ? "black" : "white" }}>
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
                        {buttonTitle}
                    </Button>
                </Grid>
            </form>

        </Grid>
    </div >
}

export default Auth
