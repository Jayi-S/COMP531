

import ArticleModel from '../db/article.js'
import UserModel from '../db/user.js'
import mongoose from 'mongoose'

export const PostArticle = async (req, res) => {
    let {
        userName,
        Content,
        images
    } = req.body

    const ariId = new mongoose.Types.ObjectId()
    let articleDoc = new ArticleModel({
        _id: ariId,
        userName,
        Content,
        images
    })
    await articleDoc.save()

    res.send({
        "code": 0,
        "msg": 'success',
        articles: [
            {
                _id: ariId,
                userName,
                Content: Content,
                images
            }
        ]
    })

}


export const GetArticle = async (req, res) => {
    const userId = req.mysession.userInfo.userId
    const username = req.mysession.userInfo.username

    console.log(username, 'this is username')

    let { id } = req.params

    console.log(id)

    if (typeof (id) != "undefined") {
        // is username ?
        const isUserCount = await UserModel.countDocuments({
            "username": id
        })
        if (isUserCount != 0) {
            const article = await ArticleModel.find({ userName: id })
            res.send({
                articles: article
            })
            return
        }

        try {
            // is id
            const article = await ArticleModel.find({ _id: id })
            res.send({
                "code": 0,
                "msg": 'success',
                articles: article
            })
        } catch {
            res.send({
                "code": 0,
                "msg": 'success',
                articles: []
            })
        }
        return

    }

    // get user all post and follow user post
    const userInfo = await UserModel.findOne({ _id: mongoose.Types.ObjectId(userId) })

    console.log('db user info', userInfo)

    userInfo.following.push(userInfo.username)

    console.log(userInfo.following, 'follow user is')

    const art = await ArticleModel.find({ userName: { $in: userInfo.following } }).limit(10)

    res.send({
        "code": 0,
        "msg": 'success',
        "articles": art
    })

}

/*

{
    id
    content
}

*/
export const PutArticle = async (req, res) => {
    let {
        Content
    } = req.body

    const { id } = req.params

    const data = await ArticleModel.updateOne({ _id: mongoose.Types.ObjectId(id) }, {
        "$set": {
            "Content": Content
        }
    })

    res.send({
        "code": 0,
        "msg": 'success',
        articles: [
            {
                _id: id,
                Content: Content,
            }
        ]
    })

}