/**
 * services
 */


import md5 from 'md5'


// db
import ProfileModel from '../db/profile.js'
import mongoose from 'mongoose'
import UserModel from '../db/user.js'


// get headline
export const getHeadline = async (req, res) => {

    const userId = req.mysession.userInfo.userId

    const profile = await ProfileModel.findOne({ userId: mongoose.Types.ObjectId(userId) })

    const status = profile.status
    res.send({
        "code": 0,
        "msg": 'success',
        data: {
            headline: status
        }
    })

}

/*
    {
        "headline": "hello"
    }
*/

// put headline
export const putHeadline = async (req, res) => {

    const { headline } = req.body
    const userId = req.mysession.userInfo.userId

    await ProfileModel.updateOne({ userId: mongoose.Types.ObjectId(userId) }, {
        "$set": {
            "status": headline
        }
    })

    res.send({
        "code": 0,
        "msg": 'success',
    })
}



// get email
export const getEmail = async (req, res) => {

    const userId = req.mysession.userInfo.userId

    const profile = await ProfileModel.findOne({ userId: mongoose.Types.ObjectId(userId) })

    const email = profile.email
    res.send({
        "code": 0,
        "msg": 'success',
        data: {
            email
        }
    })

}

/*
    {
        "email": "hello"
    }
*/
// put email
export const putEmail = async (req, res) => {

    const { email } = req.body
    const userId = req.mysession.userInfo.userId

    await ProfileModel.updateOne({ userId: mongoose.Types.ObjectId(userId) }, {
        "$set": {
            "email": email
        }
    })

    res.send({
        "code": 0,
        "msg": 'success',
    })
}

/*
    {
        "zipcode": "hello"
    }
*/
// put zipcode
export const putZipcode = async (req, res) => {

    const { zipcode } = req.body
    const userId = req.mysession.userInfo.userId

    await ProfileModel.updateOne({ userId: mongoose.Types.ObjectId(userId) }, {
        "$set": {
            "zip": zipcode
        }
    })

    res.send({
        "code": 0,
        "msg": 'success',
    })
}


// get zipcode
export const getZipcode = async (req, res) => {

    const userId = req.mysession.userInfo.userId

    const profile = await ProfileModel.findOne({ userId: mongoose.Types.ObjectId(userId) })

    const zipcode = profile.zip
    res.send({
        "code": 0,
        "msg": 'success',
        data: {
            zipcode
        }
    })
}

/*
    {
        "avatar": "hello"
    }
*/
// put avatar
export const putAvatar = async (req, res) => {

    const { avatar } = req.body
    const userId = req.mysession.userInfo.userId

    const s = await ProfileModel.updateOne({ userId: mongoose.Types.ObjectId(userId) }, {
        "$set": {
            avatar
        }
    })

    res.send({
        "code": 0,
        "msg": 'success',
    })
}


// get avatar
export const getAvatar = async (req, res) => {

    const userId = req.mysession.userInfo.userId

    let { id } = req.params

    if (id) {
        try {
            const user = await UserModel.findOne({ username: id })
            const profile = await ProfileModel.findOne({ userId: user._id })
            const avatar = profile.avatar
            res.send({
                "code": 0,
                "msg": 'success',
                data: {
                    avatar
                }
            })
            return
        } catch {
            conosole.log('get by id error')
        }
    }

    const profile = await ProfileModel.findOne({ userId: mongoose.Types.ObjectId(userId) })

    const avatar = profile.avatar
    res.send({
        "code": 0,
        "msg": 'success',
        data: {
            avatar
        }
    })
}

// get dob
export const getDob = async (req, res) => {

    const userId = req.mysession.userInfo.userId

    const profile = await ProfileModel.findOne({ userId: mongoose.Types.ObjectId(userId) })

    const dob = profile.dob
    res.send({
        "code": 0,
        "msg": 'success',
        data: {
            dob: dob
        }
    })
}



export const putDob = async (req, res) => {

    const { dob } = req.body
    const userId = req.mysession.userInfo.userId

    const s = await ProfileModel.updateOne({ userId: mongoose.Types.ObjectId(userId) }, {
        "$set": {
            dob
        }
    })

    res.send({
        "code": 0,
        "msg": 'success',
    })
}