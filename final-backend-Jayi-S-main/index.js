import express from 'express'


const app = express()

// parse json
app.use(express.json())

import cors from 'cors'

// app.use(cors())

app.all("*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, x-requested-with' )
    if (req.method == 'OPTIONS') {
        res.sendStatus(200)
    }
    else {
        next()
    }
})


// cookies parse
import cookieParser from 'cookie-parser'
app.use(cookieParser('wioj63()eE_ejAFjeijo3223$@fi33iffewjFFF#$%@!'))

app.use(express.urlencoded({ extended: false }))

import { mysession } from './middleware/session.js'

import session from 'express-session'

app.use(session({
    secret: 'doNotGuessTheSecret',
    resave: true,
    saveUninitialized: true
}));


import passport from 'passport'


app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.use(mysession)

app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// login middleware
import { IsLogin } from './middleware/auth.js'
app.use(IsLogin)         // login middleware

// import service route
import userRoute from './router/user.js'
import profileRoute from './router/profile.js'
import articleRoute from './router/article.js'

// bind route
app.use('/', userRoute)
app.use('/', profileRoute)
app.use('/', articleRoute)

export default app

/*## 线上传入post, 本地环境使用8088 */
const port = process.env.PORT

// start server
app.listen(port, function () {
    console.log('api server running at http://127.0.0.1:8088')
})
