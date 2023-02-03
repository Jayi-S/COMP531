// connection.js file
import mongoose from 'mongoose'
import config from '../config/index.js'

const conn = mongoose.createConnection(
    config.mongoUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
conn.on('open', () => {
    console.log('打开 mongodb 连接');
})
conn.on('err', (err) => {
    console.log('err:' + err);
})

export default conn;


/*
    code 

    0 success
    1001 user exist

*/