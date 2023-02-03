import express from 'express'

import { PostArticle, GetArticle, PutArticle } from '../service/article.js'

const router = express.Router()

router.get('/articles', GetArticle)
router.post('/article', PostArticle)
router.get('/articles/:id', GetArticle)
router.put('/articles/:id', PutArticle)

export default router