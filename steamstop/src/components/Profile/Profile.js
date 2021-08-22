import React, {useContext} from "react";

import { Grid} from "@material-ui/core"
import { AuthContext } from '../../context/AuthContext'

function Profile() {

    const { state: { user }, dispatch } = useContext(AuthContext)

    const userEmail = user ? `${user.email}` : 'user'

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center'}}>
            <p style={{fontSize: "50px", marginTop: '50px'}}>Profile</p>
            <Grid container spacing={0} style={{border: "1px solid black", height: '500px', width: "50%", marginTop: "25px", justifyContent:'space-around'}}>
                <Grid style={{ border: '1px solid black', height: '250px', width: "40%", marginTop: "25px"}}>
                    Hello {userEmail}!
                </Grid>
                <Grid style={{ border: '1px solid black', height: '250px', width: "40%", marginTop: "25px" }}>
                    Favorite Games
                </Grid>
            </Grid>
        </div>
    );
}

export default Profile;