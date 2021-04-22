import passport from 'passport'
import { Strategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import User from '../components/User/user.model'
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.MY_SECRET
}

passport.use(
  new Strategy(opts, function (jwtPayload, done) {
    User.findOne({ username: jwtPayload.username }, function (err, user) {
      if (err) {
        return done(err, false)
      }
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  })
)
