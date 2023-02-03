export var sessions = {};
var session_key = 'session-id';
var EXPIRES = 20 * 60 * 1000;

var generate = function () {
    var session = {};
    session.id = (new Date()).getTime() + Math.random();
    session.cookie = {
        expires: (new Date()).getTime() + EXPIRES
    };
    sessions[session.id] = session;
    return session;
};

export const mysession = function (req, res, next) {
    console.log(req.cookies)
    // var id = req.cookies[session_key];

    console.log(sessions)
    const path = req.originalUrl.replace(/\?.*$/, '');

    if (path == '/login' || path == '/register' || path == '/upload' || path == '/auth/google' || path == '/auth/google/callback') {
        next()
    } else {
        const id = req.headers.authorization
        if (!id) {
            // req.mysession = generate();
            res.send({
                code: 1002,
                msg: "auth error",
            });
            return;
        }
        // const session = 
        else {
            var session = sessions[id];
            console.log('session        ' + session)
            if (session) {
                req.mysession = session
            }
            else {
                res.send({
                    code: 1002,
                    msg: "auth error",
                });
                return;
            }
        }
        // var session = serialize(session_key, req.mysession.id, { path: '/' });
        // res.setHeader('Set-Cookie', session);
        next();
    }
};

function serialize(name, val, opt) {
    var pairs = [name + '=' + val];
    opt = opt || {};
    if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
    if (opt.domain) pairs.push('Domain=' + opt.domain);
    if (opt.path) pairs.push('Path=' + opt.path);
    if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
    if (opt.httpOnly) pairs.push('HttpOnly');
    if (opt.secure) pairs.push('Secure');

    return pairs.join(';');
}