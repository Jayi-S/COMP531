import Profile from './'
import { MemoryRouter, BrowserRouter, Routes, Route } from 'react-router-dom'

// mock redux
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'


import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'


describe('fetch the logged in user profile username', () => {
  test('should fetch the logged in user\'s profile username', async () => {

    const initialState = {
      userInfo: {
        usersArr: [
          {
            id: 1,
            username: 'Bret',
            password: 'Kulas Light',
            phone: '123456',
            email: 'admin@126.com',
            zip: '123456',
            avatar: '../common/images/chart.svg',
            state: "leave"
          },
        ],
        adminUser: { id: 1, username: 'Bret', password: 'Kulas Light', phone: '123456', email: 'admin@126.com', zip: '123456', avatar: '../common/images/chart.svg', state: "leave" },
        attentionUsers: [],
        needAttentionUsers: [],
      }
      }
      
    localStorage.setItem('adminUser', JSON.stringify({ id: 1, username: 'Bret', password: 'Kulas Light', phone: '123456', email: 'admin@126.com', zip: '123456', avatar: '../common/images/chart.svg', state: "leave" }))

    const mockStore = configureStore()
    let store = mockStore(initialState)
    const user = userEvent.setup()

      
      render(
        <Provider store={store}>
            <BrowserRouter>
                <Profile/>
            </BrowserRouter>
        </Provider>
      );
      
    const username = screen.getByTestId('loginUsername')

    expect(username).not.toBeNull()

  });
})