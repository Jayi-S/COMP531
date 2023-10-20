import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from '../../uilts/interface'
import { RootState, AppThunk } from '../store';


export const userSlice = createSlice({
  name: "userInfo",
  initialState: {
    // All users
    usersArr: [
      { username: '', password: '', phone: '', email: '', zip: '', avatar: '../common/images/chart.svg', state: "leave" }],
       //adminUser: {},

    adminUser:{ username: '', password: '', phone: '', email: '', zip: '', avatar: '', state: "" },

    attentionUsers:[
      { username: 'admin1', password: '111111', phone: '123456', email: 'admin@126.com', zip: '123456', avatar: '../common/images/chart.svg', state: "leave" },
      { username: 'admin2', password: '111111', phone: '123456', email: 'admin@126.com', zip: '123456', avatar: '../common/images/chart.svg', state: "leave" },
      { username: 'admin3', password: '111111', phone: '123456', email: 'admin@126.com', zip: '123456', avatar: '../common/images/chart.svg', state: "leave" },
    ],//follow
    needAttentionUsers:[
      { username: 'zhangsan', password: '111111', phone: '123456', email: 'admin@126.com', zip: '123456', avatar: '../common/images/chart.svg', state: "leave" },
      { username: 'admin4', password: '111111', phone: '123456', email: 'admin@126.com', zip: '123456', avatar: '../common/images/chart.svg', state: "leave" },
      { username: 'admin5', password: '111111', phone: '123456', email: 'admin@126.com', zip: '123456', avatar: '../common/images/chart.svg', state: "leave" },
      { username: 'admin6', password: '111111', phone: '123456', email: 'admin@126.com', zip: '123456', avatar: '../common/images/chart.svg', state: "leave" },
      { username: 'admin7', password: '111111', phone: '123456', email: 'admin@126.com', zip: '123456', avatar: '../common/images/chart.svg', state: "leave" },
      { username: 'admin8', password: '111111', phone: '123456', email: 'admin@126.com', zip: '123456', avatar: '../common/images/chart.svg', state: "leave" },
      { username: 'admin9', password: '111111', phone: '123456', email: 'admin@126.com', zip: '123456', avatar: '../common/images/chart.svg', state: "leave" }],

  },
  reducers: {
    initUserArr:(state, action) => {
      state.usersArr = action.payload

    },
    remeberAdminUser: (state, action) => {
      // action.payload.state='online'
      // sessionStorage.setItem('adminUser',JSON.stringify(action.payload))
      state.adminUser = action.payload

    },
    addUser: (state, action) => {
      state.usersArr.push(action.payload)
    },

    editAdminUserState: (state, action) => {
      state.adminUser = action.payload;

    },
    addAttention: (state, action) => {

      state.attentionUsers.push(action.payload);
      state.needAttentionUsers= state.usersArr.filter(item => {
        let flag=false;
        state.attentionUsers.forEach(item1=>{
          if(item.username===item1.username||item.username===state.adminUser.username){
            flag=true
          }
        })
        if(!flag){
          return item;
        }

      });


    },
    // 取消关注
    unfollow:(state, action) => {
      state.attentionUsers=state.attentionUsers.filter(item=>item.username!==action.payload.username)
      state.needAttentionUsers.push(action.payload)

    }
  },
});

// const
export const usersArr = (state: RootState) => state.userInfo.usersArr;
export const adminUser = (state: RootState) => state.userInfo.adminUser;
export const attentionUsers = (state: RootState) => state.userInfo.attentionUsers;
export const needAttentionUsers = (state: RootState) => state.userInfo.needAttentionUsers;


// reducer
export const {
  // increment, decrement, increamentByAmount ,
  initUserArr,
  remeberAdminUser,
  addUser,
  editAdminUserState,
  addAttention,
  unfollow,
} =
    userSlice.actions;

//
// export const increamentAsync = (value) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(increamentByAmount(value));
//   }, 3000);
// };

export default userSlice.reducer;

