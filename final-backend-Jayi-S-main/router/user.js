import express from 'express'

import {
    login, register, logout, changePasswd,
    followUser,
    unfollowUser,
    getFollowUser,
    getUser
} from '../service/user.js'

import UserModel from "../db/user.js";
import ProfileModel from "../db/profile.js";

import { sessions } from '../middleware/session.js'
import mongoose from 'mongoose'


import {
    uploadImage,
    postImage
} from '../service/uploadImg.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.get('/user', getUser)
router.put('/password', changePasswd)
router.put('/logout', logout)

router.put('/following/:user', followUser)
router.delete('/following/:user', unfollowUser)
router.get('/following', getFollowUser)

router.post('/upload', uploadImage('file'), postImage)



import passport from 'passport'
import { OAuth2Strategy } from 'passport-google-oauth'


passport.use(new OAuth2Strategy({
    clientID: '56775697297-fiu3a9khujv2vfct0edtdjlikhh64vag.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'https://yourbookserver2022.herokuapp.com/auth/google/callback',
},
    async function (accessToken, refreshToken, profile, done) {

        const name = profile.name.givenName + '.' + profile.name.familyName

        const userId = new mongoose.Types.ObjectId()
        let userEntity = await UserModel.findOneAndUpdate({ username: name }, {
            $set: {
                username: name
            },
            $setOnInsert: {
                _id: userId
            }
        },
            { upsert: true }
        )
        if (userEntity == null) {
            userEntity = {
                _id: userId
            }
        }

        ProfileModel.updateOne({
            userId: userEntity._id
        }, { userId: userEntity._id, avatar: profile.photos[0].value, email: profile.emails[0].value, status: 'normal' }, { upsert: true }, function (err, result) {

            // set session
            sessions[accessToken] = {
                userInfo: {
                    userId: userEntity._id,
                    username: name,
                }
            }

            let user = {
                'email': profile.emails[0].value,
                'name': profile.name.givenName + ' ' + profile.name.familyName,
                /* 'id': profile.id, */
                id: userEntity._id,
                name,
                'token': accessToken
            };

            return done(err, user)
        })
        // })

    })
);


router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email', 'openid'] })); // could have a passport auth second arg {scope: 'email'}


router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: 'https://book2022f.surge.sh/login'
    }), function (req, res) {

        res.redirect(`https://book2022f.surge.sh/main?token=${req.user.token}&id=${req.user.id}&name=${req.user.name}`);
    }
);

export default router
