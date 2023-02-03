import { createSlice } from "@reduxjs/toolkit";
import Item from "antd/lib/list/Item";
import { UserInfo } from "../../uilts/interface";
import { RootState, AppThunk } from "../store";

export const userSlice = createSlice({
  name: "userInfo",
  initialState: {

    usersArr: [
      {
        username: "",
        password: "",
        phone: "",
        email: "",
        zip: "",
        avatar: "../common/images/chart.svg",
        state: "leave",
        id: 0,
      },
    ],
    adminUser: {
      username: "",
      password: "",
      phone: "",
      email: "",
      zip: "",
      avatar: "",
      state: "",
      id: 0,
    },

    attentionUsers: [],
    needAttentionUsers: [],
  },
  reducers: {

    initUserArr: (state: any, action) => {
      state.usersArr = action.payload;
      localStorage.setItem("usersArr", JSON.stringify(state.usersArr));
      const adminUser = localStorage.getItem("adminUser")!;
      const page = localStorage.getItem("page");
      if (adminUser) {
        const adminUserObj = JSON.parse(adminUser);
        let canSlectUsers = state.usersArr.filter((item: any) => {
          return item.id !== adminUserObj.id;
        });
        if (page === "login") {
          state.attentionUsers = canSlectUsers.slice(0, 3);
          state.needAttentionUsers = canSlectUsers.slice(3);
        } else {
          state.attentionUsers = [];
          state.needAttentionUsers = state.usersArr;
        }
        localStorage.setItem(
          "attentionUsers",
          JSON.stringify(state.attentionUsers)
        );
        localStorage.setItem(
          "needAttentionUsers",
          JSON.stringify(state.needAttentionUsers)
        );
      }
    },

    remeberAdminUser: (state, action) => {
      localStorage.setItem("adminUser", JSON.stringify(action.payload));
      state.adminUser = action.payload;
      state.usersArr.map((item: any) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
      // localStorage.setItem("usersArr", JSON.stringify(state.usersArr));
    },
    addUser: (state, action) => {
      state.usersArr.push(action.payload);
      localStorage.setItem("usersArr", JSON.stringify(state.usersArr));
    },

    editAdminUserState: (state, action) => {
      state.adminUser = action.payload;
      localStorage.setItem("adminUser", JSON.stringify(state.adminUser));
    },

    attentionUsersSet: (state: any) => {
      const adminUserString: string = localStorage.getItem("adminUser")!;
      const adminUser: UserInfo = JSON.parse(adminUserString);
      const page = localStorage.getItem("page");
      if (page === "register") {
        state.attentionUsers = [];
        state.needAttentionUsers = state.usersArr.filter((item: any) => {
          return item.username !== adminUser.username;
        });
        localStorage.setItem(
          "attentionUsers",
          JSON.stringify(state.attentionUsers)
        );
        localStorage.setItem(
          "needAttentionUsers",
          JSON.stringify(state.needAttentionUsers)
        );
      }
    },

    addAttention: (state: any, action) => {
      const adminUserString: string = localStorage.getItem("adminUser")!;
      const adminUser: UserInfo = JSON.parse(adminUserString);
      state.attentionUsers.push(action.payload);
      state.needAttentionUsers = state.usersArr.filter((item: any) => {
        let flag = false;
        state.attentionUsers.forEach((item1: any) => {
          if (
            item.username === item1.username ||
            item.username === adminUser.username
          ) {
            flag = true;
          }
        });
        if (!flag) {
          return item;
        }
      });
      localStorage.setItem(
        "attentionUsers",
        JSON.stringify(state.attentionUsers)
      );
      localStorage.setItem(
        "needAttentionUsers",
        JSON.stringify(state.needAttentionUsers)
      );
    },

    unfollow: (state: any, action) => {
      state.attentionUsers = state.attentionUsers.filter(
        (item: any) => item.username !== action.payload.username
      );
      state.needAttentionUsers.push(action.payload);
      localStorage.setItem(
        "attentionUsers",
        JSON.stringify(state.attentionUsers)
      );
      localStorage.setItem(
        "needAttentionUsers",
        JSON.stringify(state.needAttentionUsers)
      );
    },
    freshPage: (state) => {
      state.needAttentionUsers = JSON.parse(
        localStorage.getItem("needAttentionUsers")!
      );
      state.attentionUsers = JSON.parse(
        localStorage.getItem("attentionUsers")!
      );
    },
  },
});


export const usersArr = (state: RootState) => state.userInfo.usersArr;
export const adminUser = (state: RootState) => state.userInfo.adminUser;
export const attentionUsers = (state: RootState) =>
  state.userInfo.attentionUsers;
export const needAttentionUsers = (state: RootState) =>
  state.userInfo.needAttentionUsers;

// reducer
export const {
  // increment, decrement, increamentByAmount ,
  initUserArr,
  remeberAdminUser,
  addUser,
  editAdminUserState,
  addAttention,
  attentionUsersSet,
  unfollow,
  freshPage,
} = userSlice.actions;


// export const increamentAsync = (value) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(increamentByAmount(value));
//   }, 3000);
// };

export default userSlice.reducer;
