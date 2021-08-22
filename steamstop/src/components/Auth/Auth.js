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
        messageToggle,
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

    return <Grid container spacing={0} 
        justifyContent="center">
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
}

export default Auth

// in UseFetchAPI.js, we have a function called useFetchAPI that accepts a url (the page we are on. It is used based on the page we are on using the apiURL variable.) Our function accepts a url that can be found on Auth.js when we bring it in. the url is dynamic. If we are logged in, login in route, else sign-up route.

// now we have a baseURL which we assign our localhost:3000/api. 

//  now we have handleAPICallButton which takes in options params. 
// we set our setOptions(that takes in options). In our auth.js, we have a handleOnSubmit which takes in a handleAPICallButtonSubmit(a more advanced api call). This function accepts an object. if we dont pass anything in, by default, it will be a empty object. but we set options to method: 'post', data: {...user}. the entire object in auth goes to setOptions(options {here})
// how does it go in specifically?

//now we setIsLoading to true to create a spinner.

// now we have a function called handleAPIFetchCall
// we create a requestOptionsObj that spreads options object that comes from the state. We also spread the headers, and it spreads to one level.
// then we try our axios request. it takes in our baseURL and our url that we are using based on our apiURL. Then we pass in the requestOptionsObj. we setIsLoadingTo false so our spinner doesn't activate. https://www.npmjs.com/package/axios

// How it works to know when to call the function. In the handleAPICallSubmitButton we put the setISLoading to true. in useEffect, we are saying if isLoading is not true, do nothing, else if true, run handleAPIFetchCall.

// whats happening so far.

// when you successfully log in, you will trigger a function (handleAPICallButtonSubmit), when its called, it goes to handleAPIFetchCall(grabs the options we are passing in, if there are no options, goes to empty array.) we put set is loading to true, and when use effect gets call it become true. setIsLoading becomes true, and runs handleAPIFetchCall. Goes to server with base url. if user is created, runs the functions below it. if not then we check why its not running. There are two options, logged in or created user. we turn off spinner, call dispatch. 

//dispatch comes from Authcontext. we use context to share the state and dispatch. at dispatch in useFfetchAPI, when it runs we are going to dispatch, there is login. Action is an object. we also have user. action.user.email = the email value. action.user.username = username and you get isAuth to be true.

// in ur nav bar, we got isUserLogged in. we pull from context {user}. if user is true, we are logged in. Else it is false. if true, we go to profile, else show login. if user is logged in, show email, else show login.
// import React from 'react'

// function Login() {
//     return (
//         <div className="container">
//             <div className="form-text">Sign up</div>

//             <div className="form-div">
//                 <form className="form" onSubmit={this.handleOnSubmit}>
//                     <div className="form-group-block">
//                         <div className="block-container">
//                             <label htmlFor="firstName">First Name</label>
//                             <input
//                                 type="text"
//                                 id="firstName"
//                                 value={firstName}
//                                 placeholder="First Name"
//                                 name="firstName"
//                                 onChange={this.handleOnChange}
//                                 autoFocus
//                                 // onBlur={this.handleOnBlur} // if we click here, and dont type, throws err in the firstNameError below.
//                                 onFocus={this.handleInputOnFocus}
//                             />
//                             <div className="errorMessage">
//                                 {firstNameError && firstNameError}
//                             </div>
//                         </div>
//                     </div>

//                     <div className="form-group-block">
//                         <div className="block-container">
//                             <label htmlFor="firstName">Last Name</label>
//                             <input
//                                 type="text"
//                                 id="lastName"
//                                 value={lastName}
//                                 placeholder="Last Name"
//                                 name="lastName"
//                                 onChange={this.handleOnChange}
//                                 // onBlur={this.handleOnBlur}
//                                 onFocus={this.handleInputOnFocus}
//                             />
//                             <div className="errorMessage">
//                                 {lastNameError && lastNameError}
//                             </div>
//                         </div>
//                     </div>

//                     <div className="form-group-block">
//                         <div className="block-container">
//                             <label htmlFor="email">Email</label>
//                             <input
//                                 type="text"
//                                 id="email"
//                                 value={email}
//                                 placeholder="Email"
//                                 onChange={this.handleOnChange}
//                                 name="email"
//                                 // onBlur={this.handleOnBlur}
//                                 onFocus={this.handleInputOnFocus}
//                             />
//                             <div className="errorMessage">
//                                 {emailError && emailError}
//                             </div>
//                         </div>
//                     </div>

//                     <div className="form-group-block">
//                         <div className="block-container">
//                             <label htmlFor="password">Password</label>
//                             <input
//                                 type="text"
//                                 id="password"
//                                 value={password}
//                                 placeholder="Password"
//                                 onChange={this.handleOnChange}
//                                 name="password"
//                                 // onBlur={this.handleOnBlur}
//                                 onFocus={this.handleInputOnFocus}
//                             />
//                             <div className="errorMessage">
//                                 {passwordError && passwordError}
//                             </div>
//                         </div>
//                     </div>

//                     <div className="button-container">
//                         <button type="submit" disabled={this.state.isButtonDisabled}>
//                             Continue
//                         </button>
//                     </div>

//                     <div className='copyright'>
//                         <p>
//                             By clicking "Continue", I agree to the <a href='https://funny-wifi.com/static/wifi-images/rick-rolled.jpg' target="_blank" className='termsofservice'>Terms of Service</a>  and <a href='https://www.exterro.com/images/uploads/blogPosts/Baby-Yoda-LinkedIn.png' target="_blank" className='privacypolicy'>Privacy Policy</a>.
//                         </p>
//                         <div className='question'>
//                             <p>
//                                 Already have an account?
//                             </p>
//                             <Link to={{ pathname: "/login" }} className='signIn'>Sign In</Link>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Login
