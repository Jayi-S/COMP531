
export const IsLogin = (req, res, next) => {

    console.log('enter login middleware')

    const path = req.originalUrl.replace(/\?.*$/, '');

    // console.log('info is', req.mysession.userInfo)
    if (path == '/login' || path == '/register' || path == '/upload' || path == '/auth/google' || path == '/auth/google/callback') {
        next()
    } else if (req.mysession.userInfo) {
        next()
    } else {
        res.send({
            "code": 1002,
            "msg": "auth error"
        })
        return
    }
}