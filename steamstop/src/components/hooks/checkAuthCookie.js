import { useContext } from "react"
import Cookie from "js-cookie"
import { AuthContext } from "../../context/AuthContext";
import jwtDecode from 'jwt-decode'

function CheckAuthCookie() {
    const { dispatch } = useContext(AuthContext)

    function checkIfCookieExists() {
        const cookie = Cookie.get('jwt-cookie')
        if (cookie) {
            return true;
        } else {
            return null;
        }
    }

    function logUserIn() {
        let checkCookieExist = checkIfCookieExists();

        if (checkCookieExist) {
            const cookie = Cookie.get('jwt-cookie')
            const jwtDecodeToken = jwtDecode(cookie)

            dispatch({
                type: 'LOGIN',
                user: {
                    email: jwtDecodeToken.email,
                    username: jwtDecodeToken.username,
                }
            })
        }
    }

    return { checkIfCookieExists, logUserIn }
}

export default CheckAuthCookie