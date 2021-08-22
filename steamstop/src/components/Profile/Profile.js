import React, {useContext} from "react";

import { Grid} from "@material-ui/core"
import { AuthContext } from '../../context/AuthContext'

function Profile() {
    const { user } = useContext(AuthContext)

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center'}}>
            <p style={{fontSize: "50px", marginTop: '50px'}}>Profile</p>
            <Grid container spacing={0} style={{border: "1px solid black", height: '500px', width: "50%", marginTop: "25px"}}>
                <Grid style={{border: '1px solid black'}}>
                    Hello {user}!
                </Grid>
            </Grid>
        </div>
    );
}

export default Profile;