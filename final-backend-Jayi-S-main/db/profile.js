// insert.js file
import mongoose from 'mongoose'

import connection from './index.js'

let ProfileSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    email: String,
    dob: String,
    zip: String,
    status: String,
    avatar: String
})

// 通过connection和schema创建model
let ProfileModel = connection.model('profile', ProfileSchema, 'profile');

export default ProfileModel