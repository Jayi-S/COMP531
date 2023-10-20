import axios from 'axios'

const ajax = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
});



export const getAllUser = () => {
    return ajax.get('/users')
}


export const getAllPost = () => {
    return ajax.get('/posts')
}