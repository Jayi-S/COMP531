import express from 'express'

import {
    getHeadline,
    putHeadline,
    getEmail,
    putEmail,
    getZipcode,
    putZipcode,
    getAvatar,
    putAvatar,
    getDob,
    putDob
} from '../service/profile.js'

const router = express.Router()

router.get('/headline', getHeadline)
router.get('/headline/:id', getHeadline)
router.put('/headline', putHeadline)

router.get('/email', getEmail)
router.get('/email/:id', getEmail)
router.put('/email', putEmail)

router.get('/zipcode', getZipcode)
router.get('/zipcode/:id', getZipcode)
router.put('/zipcode', putZipcode)

router.get('/avatar', getAvatar)
router.get('/avatar/:id', getAvatar)
router.put('/avatar', putAvatar)

router.get('/dob', getDob)
router.get('/dob/:id', getDob)
router.put('/dob', putDob)

export default router