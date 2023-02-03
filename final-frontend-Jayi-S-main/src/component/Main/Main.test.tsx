// import Login from '../Login';
// import Main from './index';
// import App from '../App/App';
// import { getAllPost, getAllUser } from '../../api'
// import { MemoryRouter, BrowserRouter, Routes, Route } from 'react-router-dom'
// // import userEvent from '@testing-library/user-event'

// // mock redux
// import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'
// // import

// import { filterArticleFunc, filterArticleById } from './'

// import { Provider } from 'react-redux'
// import configureStore from 'redux-mock-store'

// jest.setTimeout(100000)
// // jest.mock('../../api')

// // jest.mock('../../api', () => {
// //   const originalModule = jest.requireActual('../../api');

// //   //Mock the default export and named export 'foo'
// //   return {
// //     __esModule: true,
// //     ...originalModule,
// //     // default: jest.fn(() => 'mocked baz'),
// //     getAllUser: jest.fn(() => {
// //       const users = {
// //         "data": [
// //           {
// //             "id": 1,
// //             "name": "Leanne Graham",
// //             "username": "Bret",
// //             "email": "Sincere@april.biz",
// //             "address": {
// //               "street": "Kulas Light",
// //               "suite": "Apt. 556",
// //               "city": "Gwenborough",
// //               "zipcode": "92998-3874",
// //               "geo": {
// //                 "lat": "-37.3159",
// //                 "lng": "81.1496"
// //               }
// //             },
// //             "phone": "1-770-736-8031 x56442",
// //             "website": "hildegard.org",
// //             "company": {
// //               "name": "Romaguera-Crona",
// //               "catchPhrase": "Multi-layered client-server neural-net",
// //               "bs": "harness real-time e-markets"
// //             }
// //           },
// //           {
// //             "id": 2,
// //             "name": "Ervin Howell",
// //             "username": "Antonette",
// //             "email": "Shanna@melissa.tv",
// //             "address": {
// //               "street": "Victor Plains",
// //               "suite": "Suite 879",
// //               "city": "Wisokyburgh",
// //               "zipcode": "90566-7771",
// //               "geo": {
// //                 "lat": "-43.9509",
// //                 "lng": "-34.4618"
// //               }
// //             },
// //             "phone": "010-692-6593 x09125",
// //             "website": "anastasia.net",
// //             "company": {
// //               "name": "Deckow-Crist",
// //               "catchPhrase": "Proactive didactic contingency",
// //               "bs": "synergize scalable supply-chains"
// //             }
// //           }
// //         ],
// //       }
// //       return users
// //     }),
// //     getAllPost: jest.fn(() => {
// //       const posts = {
// //         "data": [
// //           { userId: 1, id: 1, title: "My post", body: "hello world" },
// //           { userId: 1, id: 1, title: "My post", body: "hello world" }
// //         ]
// //       }
// //       return posts;
// //     })
// //   };
// // });

// describe('fetch all articles for current', () => {
//   test('fetch all articles for current logged in user', async () => {

//     const articles1 = [
//       {
//         id: 1,
//         author: '111',
//         content: 'articles1',
//         isImgs: false,
//         userId: 1,
//         isShowComment: false,
//       },
//       {
//         id: 2,
//         author: '111',
//         content: 'articles test',
//         isImgs: false,
//         userId: 1,
//         isShowComment: false,
//       },
//       {
//         id: 2,
//         author: '222',
//         content: 'hello world',
//         isImgs: false,
//         userId: 1,
//         isShowComment: false,
//       }
//     ]

//     expect(
//         filterArticleFunc(articles1, '111').length
//     ).toBe(2)

//   });
// })


// describe('fetch subset of articles for current logged', () => {
//   test('o	should fetch subset of articles for current logged in user given search keyword', async () => {

//     const articles1 = [
//       {
//         id: 1,
//         author: '111',
//         content: 'articles1',
//         isImgs: false,
//         userId: 1,
//         isShowComment: false,
//       },
//       {
//         id: 2,
//         author: '222',
//         content: 'hello world',
//         isImgs: false,
//         userId: 1,
//         isShowComment: false,
//       }
//     ]


//     expect(
//         filterArticleFunc(articles1, '111').length
//     ).toBe(1)

//     expect(
//         filterArticleFunc(articles1, 'wrong').length
//     ).toBe(0)

//     expect(
//         filterArticleFunc(articles1, 'hello').length
//     ).toBe(1)

//   });
// })

// describe('add articles when adding a follower ', () => {
//   test('should add articles when adding a follower ', async () => {

//     const articles1 = [
//       {
//         id: 1,
//         author: '111',
//         content: 'articles1',
//         isImgs: false,
//         userId: 1,
//         isShowComment: false,
//       },
//       {
//         id: 2,
//         author: '222',
//         content: 'hello world',
//         isImgs: false,
//         userId: 2,
//         isShowComment: false,
//       }
//     ]


//     expect(
//         filterArticleById(articles1, [1, 2]).length
//     ).toBe(2)

//     expect(
//         filterArticleById(articles1, [1]).length
//     ).toBe(1)


//   });
// })


// describe('remove articles when removing a follower', () => {
//   test('should remove articles when removing a follower', async () => {

//     const articles1 = [
//       {
//         id: 1,
//         author: '111',
//         content: 'articles1',
//         isImgs: false,
//         userId: 1,
//         isShowComment: false,
//       },
//       {
//         id: 2,
//         author: '222',
//         content: 'hello world',
//         isImgs: false,
//         userId: 2,
//         isShowComment: false,
//       }
//     ]
//     const articles2 = [
//       {
//         id: 1,
//         author: '111',
//         content: 'articles1',
//         isImgs: false,
//         userId: 1,
//         isShowComment: false,
//       },
//       {
//         id: 2,
//         author: '222',
//         content: 'hello world',
//         isImgs: false,
//         userId: 2,
//         isShowComment: false,
//       }
//     ]


//     expect(
//         filterArticleById(articles1, [4]).length
//     ).toBe(0)


//   expect(
//       filterArticleById(articles2, [4]).length
//   ).toBe(0)

// });
// })
export {}