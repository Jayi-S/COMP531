import Login from './index';
import Main from '../Main';
import App from '../App/App';
import { MemoryRouter, BrowserRouter, Routes, Route} from 'react-router-dom'
// import userEvent from '@testing-library/user-event'

// mock redux
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
// import 

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'



// const mockedUsedNavigate = jest.fn();


// jest.mock('react-router-dom', async () => ({
//    ...jest.requireActual('react-router-dom') as any,
//   useNavigate: () => mockedUsedNavigate,
// }));




describe('login success', () => {
  test('should log in a previously registered user', async () => {

  const initialState = {
      userInfo: {
          usersArr: [
              {
                  username: 'admin',
                  password: 'test',
                  phone: '123456',
                  email: 'admin@126.com',
                  zip: '123456',
                  avatar: '../common/images/chart.svg',
                  state: "leave"
              }, 
          ]
      }
  }

  const mockStore = configureStore()
  let store = mockStore(initialState)
  const user = userEvent.setup()
  
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<div data-testid="mainViewId">Main</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  // console.log(nameDom, passwordDom, submitBtn)
  await user.type(screen.getByTestId('nameForm'), 'admin')
  await user.type(screen.getByTestId('passwordForm'), 'test')
  await user.click(screen.getByTestId('clickBtn'))

  await waitFor(() => {
    expect(screen.getByTestId('mainViewId')).toBeInTheDocument()
  });
});
})


describe('login faild', () => {
  test('should not log in an invalid user', async () => {

    const initialState = {
        userInfo: {
            usersArr: [
                {
                    username: 'admin',
                    password: 'test',
                    phone: '123456',
                    email: 'admin@126.com',
                    zip: '123456',
                    avatar: '../common/images/chart.svg',
                    state: "leave"
                }, 
            ]
        }
    }

    const mockStore = configureStore()
    let store = mockStore(initialState)
    const user = userEvent.setup()


    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<div>Main</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
        
    );

    await user.type(screen.getByTestId('nameForm'), 'admin')
    await user.type(screen.getByTestId('passwordForm'), 'wrong')
    await user.click(screen.getByTestId('clickBtn'))

    await waitFor(() => {
      expect(screen.getByTestId('clickBtn')).toBeInTheDocument()
    });

  });
})

describe('loginout test', () => {
  test('should log out a user', async () => {

    const initialState = {
        userInfo: {
            usersArr: [
                {
                    username: 'Bret',
                    password: 'Kulas Light',
                    phone: '123456',
                    email: 'admin@126.com',
                    zip: '123456',
                    avatar: '../common/images/chart.svg',
                    state: "leave"
                }, 
            ],
            adminUser:{ username: '', password: '', phone: '', email: '', zip: '', avatar: '', state: "" }, 
            attentionUsers: [],
            needAttentionUsers:[
            ],
        }
    }

    const mockStore = configureStore()
    let store = mockStore(initialState)
    const user = userEvent.setup()

    localStorage.setItem('adminUser', '{"id":1,"username":"Bret","password":"Kulas Light","phone":"1-770-736-8031 x56442","email":"Sincere@april.biz","zip":"92998-3874","avatar":"../common/images/chart.svg","state":"online"}')
    localStorage.setItem('attentionUsers', '[{"id":2,"username":"Antonette","password":"Victor Plains","phone":"010-692-6593 x09125","email":"Shanna@melissa.tv","zip":"90566-7771","avatar":"../common/images/chart.svg","state":"online"},{"id":3,"username":"Samantha","password":"Douglas Extension","phone":"1-463-123-4447","email":"Nathan@yesenia.net","zip":"59590-4157","avatar":"../common/images/chart.svg","state":"online"},{"id":4,"username":"Karianne","password":"Hoeger Mall","phone":"493-170-9623 x156","email":"Julianne.OConner@kory.org","zip":"53919-4257","avatar":"../common/images/chart.svg","state":"online"}]')
    localStorage.setItem('needAttentionUsers', '[{"id":5,"username":"Kamren","password":"Skiles Walks","phone":"(254)954-1289","email":"Lucio_Hettinger@annie.ca","zip":"33263","avatar":"../common/images/chart.svg","state":"online"},{"id":6,"username":"Leopoldo_Corkery","password":"Norberto Crossing","phone":"1-477-935-8478 x6430","email":"Karley_Dach@jasper.info","zip":"23505-1337","avatar":"../common/images/chart.svg","state":"online"},{"id":7,"username":"Elwyn.Skiles","password":"Rex Trail","phone":"210.067.6132","email":"Telly.Hoeger@billy.biz","zip":"58804-1099","avatar":"../common/images/chart.svg","state":"online"},{"id":8,"username":"Maxime_Nienow","password":"Ellsworth Summit","phone":"586.493.6943 x140","email":"Sherwood@rosamond.me","zip":"45169","avatar":"../common/images/chart.svg","state":"online"},{"id":9,"username":"Delphine","password":"Dayna Park","phone":"(775)976-6794 x41206","email":"Chaim_McDermott@dana.io","zip":"76495-3109","avatar":"../common/images/chart.svg","state":"online"},{"id":10,"username":"Moriah.Stanton","password":"Kattie Turnpike","phone":"024-648-3804","email":"Rey.Padberg@karina.biz","zip":"31428-2261","avatar":"../common/images/chart.svg","state":"online"}]')
    localStorage.setItem('page', 'login')
    localStorage.setItem('usersArr', '[{"id":1,"username":"Bret","password":"Kulas Light","phone":"1-770-736-8031 x56442","email":"Sincere@april.biz","zip":"92998-3874","avatar":"../common/images/chart.svg","state":"online"},{"id":2,"username":"Antonette","password":"Victor Plains","phone":"010-692-6593 x09125","email":"Shanna@melissa.tv","zip":"90566-7771","avatar":"../common/images/chart.svg","state":"online"},{"id":3,"username":"Samantha","password":"Douglas Extension","phone":"1-463-123-4447","email":"Nathan@yesenia.net","zip":"59590-4157","avatar":"../common/images/chart.svg","state":"online"},{"id":4,"username":"Karianne","password":"Hoeger Mall","phone":"493-170-9623 x156","email":"Julianne.OConner@kory.org","zip":"53919-4257","avatar":"../common/images/chart.svg","state":"online"},{"id":5,"username":"Kamren","password":"Skiles Walks","phone":"(254)954-1289","email":"Lucio_Hettinger@annie.ca","zip":"33263","avatar":"../common/images/chart.svg","state":"online"},{"id":6,"username":"Leopoldo_Corkery","password":"Norberto Crossing","phone":"1-477-935-8478 x6430","email":"Karley_Dach@jasper.info","zip":"23505-1337","avatar":"../common/images/chart.svg","state":"online"},{"id":7,"username":"Elwyn.Skiles","password":"Rex Trail","phone":"210.067.6132","email":"Telly.Hoeger@billy.biz","zip":"58804-1099","avatar":"../common/images/chart.svg","state":"online"},{"id":8,"username":"Maxime_Nienow","password":"Ellsworth Summit","phone":"586.493.6943 x140","email":"Sherwood@rosamond.me","zip":"45169","avatar":"../common/images/chart.svg","state":"online"},{"id":9,"username":"Delphine","password":"Dayna Park","phone":"(775)976-6794 x41206","email":"Chaim_McDermott@dana.io","zip":"76495-3109","avatar":"../common/images/chart.svg","state":"online"},{"id":10,"username":"Moriah.Stanton","password":"Kattie Turnpike","phone":"024-648-3804","email":"Rey.Padberg@karina.biz","zip":"31428-2261","avatar":"../common/images/chart.svg","state":"online"}]')

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<Main/>} />
          </Routes>
        </MemoryRouter>
      </Provider>
        
    );

    expect(localStorage.getItem('adminUser')).not.toBeNull();

    await user.type(screen.getByTestId('nameForm'), 'Bret')
    await user.type(screen.getByTestId('passwordForm'), 'Kulas Light')
    await user.click(screen.getByTestId('clickBtn'))

  });
})

