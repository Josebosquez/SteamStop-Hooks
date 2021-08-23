const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../../users/model/User') // bring in model

const keys = process.env.JWT_USER_SECRET_KEY // bring in private keys

const jwtOpts = {}; // 

jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //we attached our jwtToken from our headers
jwtOpts.secretOrKey = keys; // acts like our slice(req.headers(7))

const userJWTLoginStrategy = new JwtStrategy(jwtOpts, async (payload, done) => {
    const userEmail = payload.email;
    console.log(payload);
    try {
        if (userEmail) { // if there is an email
            const user = await User.findOne({ email: userEmail }).select('-password')// find it in our database,

            if (!user) { // it doesnt exists, say no 
                return done(null, false)
            } else {
                return done(null, user)// if it does exist, send back the users info.
            }
        } else {
            return done(null, false)
        }
    } catch (e) {
        return done(e, false)
    }
})

module.exports = userJWTLoginStrategy