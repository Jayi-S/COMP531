// insert.js file
import mongoose from 'mongoose'

import connection from './index.js'

// create schema
let UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    following: [String],
})

// 通过connection和schema创建model
let UserModel = connection.model('user', UserSchema, 'user');

export default UserModel