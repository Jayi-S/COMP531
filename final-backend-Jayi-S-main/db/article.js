// insert.js file
import mongoose from 'mongoose'

import connection from './index.js'

// 创建schema
let ProfileSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: String,
    Content: String,
    images: [String]
})

// 通过connection和schema创建model
let ProfileModel = connection.model('article', ProfileSchema, 'article');

export default ProfileModel