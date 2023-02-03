import axios from "axios";
import { LoginInter, UserInfo, UserInfoInter } from "../uilts/interface";
import { useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";

import { history } from "../component/App/App";

/*## 注意修改为后端地址  注意也需要带/  保持一致*/
//const url="http://arm.ld.lcwspr.top:443/"
const url="https://yourbookserver2022.herokuapp.com"
const ajax = axios.create({
  baseURL:url,
});

// 添加请求拦截器
ajax.interceptors.request.use(
  (config: any) => {
    const userInfo = sessionStorage.getItem("userInfo");
    if (userInfo) {
      config.headers.Authorization = JSON.parse(userInfo).token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
ajax.interceptors.response.use(
  function (response) {
    // console.log(response)
    // console.log(response.data.code);
    if (response.data.code === 1002) {
      message.error(
        "The login message has expired or the user does not exist or tuser name or password is incorrect!"
      );
      history.push("/");
    } else return response.data;
  },
  function (error) {
    if (!error.response) {
      message.error("The network is busy, please try again later");
      return Promise.reject("The network is busy, please try again later");
    }
    if (error.response.status === 401) {
      // 1. 删除token
      localStorage.removeItem("userInfo");
      // 2. 给提示消息
      message.warn(
        "The login info has expired or the user does not exist or tuser name or password is incorrect!"
      );
      // 3. 跳转到登录页
      history.push("/");
    }
    return Promise.reject(error);
  }
);

export const getAllUser = () => {
  return ajax.get("/user");
};

export const getAllPost = () => {
  return ajax.get("/posts");
};

export const loginApi: any = (data: LoginInter) => {
  return ajax({
    method: "post",
    url: "login",
    data,
  });
};

export const logoutApi: any = () => {
  return ajax({
    method: "put",
    url: "/logout",
  });
};

export const registerApi: any = (data: UserInfo) => {
  return ajax({
    method: "post",
    url: "/register",
    data,
  });
};

export const getArticlesApi: any = () => {
  const userInfoStr = sessionStorage.getItem("userInfo");
  let userInfo: UserInfoInter;
  if (userInfoStr) {
    userInfo = JSON.parse(userInfoStr);
  } else {
    throw new Error("can't get user info")
  }
  return ajax.get("/articles?id=" + userInfo.username);
};
// 获取所有文章
export const getAllArticlesApi: any = () => {
  return ajax.get("/articles");
};

export const postArticlesApi: any = (content: string,images:string[]) => {
  const userInfoStr = sessionStorage.getItem("userInfo");
  let userInfo: UserInfoInter;
  if (userInfoStr) {
    userInfo = JSON.parse(userInfoStr);
  } else {
    throw new Error("can't get user info")
  }
  return ajax({
    method: "post",
    url: "/article",
    data: {
      userName: userInfo.username,
      Content: content,
      images,
    },
  });
};
// 修改文章
export const putArticlesApi: any = (data: any) => {
  return ajax({
    method: "put",
    url: "/articles",
    data,
  });
};



export const putfollowingApi: any = (user:string) => {
  return ajax({
    method: "put",
    url: "/following/"+user,
  });
};
export const deletefollowingApi: any = (user:string) => {
  return ajax({
    method: "delete",
    url: "/following/"+user,
  });
};
export const getfollowingApi: any = () => {
  return ajax({
    method: "get",
    url: "/following",
  });
};

export const getHeadlineApi: any = () => {
  const userInfoStr = sessionStorage.getItem("userInfo");
  let userInfo: UserInfoInter;
  if (userInfoStr) {
    userInfo = JSON.parse(userInfoStr);
  } else {
    throw new Error("can't get user info")
  }
  return ajax.get("/headline?id=" + userInfo.username);
};

export const putHeadlineApi: any = (headline: string) => {
  return ajax({
    method: "put",
    url: "/headline",
    data: {
      headline,
    },
  });
};
export const getemailApi: any = () => {
  return ajax.get("/email");
};

export const putpasswordApi: any = (password:string) => {
  return ajax({
    method: "put",
    url: "/password",
    data: {
      password
    },
  });
};

export const putemailApi: any = (email: string) => {
  return ajax({
    method: "put",
    url: "/email",
    data: {
      email,
    },
  });
};

export const getzipcodeApi: any = () => {
  return ajax.get("/zipcode");
};

export const putzipcodeApi: any = (zipcode: string) => {
  return ajax({
    method: "put",
    url: "/zipcode",
    data: {
      zipcode,
    },
  });
};

export const getdobApi: any = () => {
  return ajax.get("/dob");
};

export const putdobApi: any = (dob: string) => {
  return ajax({
    method: "put",
    url: "/dob",
    data: {
      dob,
    },
  });
};

export const getavatarApi: any = () => {
  return ajax.get("/avatar");
};

export const getavatarApiByName: any = (name: string) => {
  return ajax.get("/avatar/" + name);
};

export const putavatarApi: any = (avatar: string) => {
  return ajax({
    method: "put",
    url: "/avatar",
    data: {
      avatar,
    },
  });
};
export const getgoogleApi: any = () => {
  return url+"/auth/google";
};





