import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import fs from 'fs'

import session from 'express-session'
import _ from 'lodash'
import errorHandler from 'errorhandler'
import passport from 'passport'
import path from 'path'
import cookieParser from 'cookie-parser'
import { init } from './backend/lib/auth'
import { postsRouter } from './backend/routes/postsRoutes'
import { usersRouter } from './backend/routes/userRoutes'

const app = express()
const publicDir = __dirname + '/public'

app.use(bodyParser({limit: '4MB'}))
app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080)
app.use('/public', express.static('public'))
app.use(cookieParser())
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))
app.use(postsRouter)
app.use(usersRouter)

init(app)

app.get(['/', '/login'], (req, res) => {
    res.sendFile(path.join(publicDir, '/index.html'))
})

app.post('/api/login', (req, res, next) => {
    // See: https://github.com/jaredhanson/passport-local
    passport.authenticate('local', (err, user, info) => {
        if (err || !user) {
            req.user = user
            console.log('error with login:', err, user)
            return res.status(422).json(err)
        }
        req.login(user, () => {
            return res.json(user)
        })
    })(req, res, next)

})

app.listen(app.get('port'), function () {
    console.log('[*] Joseph Art Site running on port', app.get('port'))
})