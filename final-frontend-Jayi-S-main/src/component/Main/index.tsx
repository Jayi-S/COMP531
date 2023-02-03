import {
  Card,
  message,
  Avatar,
  Button,
  Input,
  Select,
  Tag,
  Carousel,
  Upload,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import {
  UploadOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  remeberAdminUser,
  adminUser,
  usersArr,
  attentionUsers,
  editAdminUserState,
  addAttention,
  needAttentionUsers,
  unfollow,
  initUserArr,
  freshPage,
} from "../../app/users/usersSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { UserInfo, ArticleInterface } from "../../uilts/interface";
import { UserOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { UploadProps } from "antd";
import Search from "antd/lib/transfer/search";
import { idText } from "typescript";
import { history } from "../App/App";


import {
  getAllPost,
  getAllUser,
  getArticlesApi,
  putArticlesApi,
  postArticlesApi,
  logoutApi,
  getHeadlineApi,
  putHeadlineApi,
  getAllArticlesApi,
  putfollowingApi,
  deletefollowingApi,
  getfollowingApi,
  getavatarApiByName,
  getavatarApi
} from "../../api";

import Car from "./Car";
import Item from "antd/lib/list/Item";

import postImg1 from "../../common/images/postImg1.jpg";
import postImg2 from "../../common/images/postImg2.jpg";
import Comment from "../Main/Comment";

function getUrlParam(name:string) {
  let qs = arguments[1] || window.location.search.length > 0 ? window.location.search.substring(1) : '',
    args = {};
  let searchParams = new URLSearchParams(qs);
  return searchParams.get(name) ? searchParams.get(name) : '';
};


const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const carousalWidth: number = 320;

const Main: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState();
  // const storeAdmin: any = useAppSelector(adminUser);
  // const attentionUsers: Array<UserInfo> = useAppSelector(attentionUsers);
  // const needAttentionUsers: Array<UserInfo> =
  //   useAppSelector(needAttentionUsers);
  const [articleValue, setArticleValue] = useState("");
  const [searchPostValue, setSearchPostValue] = useState("");
  const [attentionUsers, setAttentionUsers] = useState<any>([]);

  const [ariclesArr, setAriclesArr] = useState<Array<ArticleInterface>>([]);

  const [showAriclesArr, setShowAriclesArr] = useState<Array<ArticleInterface>>(
    []
  );
  const [avatar,setAvater]=useState("")



  const [pos, setPos] = useState(0);
  const carousalRef = useRef<any>();
  const timerRef = useRef(-1);
  let nowCarousalPos = useRef(0);
  let nowSamllCarousalPos = useRef(0);
  let [articleFlag, setArtleFlag] = useState(true);
  let [isImgs, setIsImgs] = useState(false);
  let [noUse, setNoUse] = useState(false);
  const { TextArea } = Input;
  const [headline, setHeadline] = useState("online");
  const [users,setUsers]=useState<Array<UserInfo>>([])
  const [needAttentionUsers,setNeedAttentionUsers]=useState<Array<UserInfo>>([])
  const [postImg,setPostImg]=useState<string[]>([])

  useEffect(() => {

    const id = getUrlParam('id')
    const username = getUrlParam('name')
    const token = getUrlParam('token')

    if (id && username && token) {
      const userInfo = {
        username,
        id,
        token,
      };
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    }

    console.log('param data is ', id, username, token)

    const userInfo = sessionStorage.getItem("userInfo");
    if (userInfo) {
      const userInfoObj=JSON.parse(userInfo)
      setUsername(userInfoObj.username)
      initInfApi();
    } else {
      navigate("/");
    }
    //   let adminInfo = localStorage.getItem("adminUser");
    //   const page = localStorage.getItem("page");
    //   // if (!adminInfo || adminInfo === "undefined") {
    //   //   return navigate("/");
    //   // }
    //   // dispatch(remeberAdminUser(JSON.parse(adminInfo)));
    //   dispatch(freshPage());
    //   setTimeout(async () => {
    //     const usersArr = JSON.parse(localStorage.getItem("usersArr")!);
    //     const { data } = await getAllPost();
    //     let mypost = data.map((item: any) => {
    //       item.content = item.body;
    //       item.isShowComment = true;
    //       item.isImgs = true;
    //       usersArr.forEach((element: any) => {
    //         if (item.userId === element.id) {
    //           item.userName = element.username;
    //         }
    //       });
    //       return item;
    //     });
    //     setAriclesArr(mypost);
    //   }, 0);
  }, []);

  // useEffect(() => {
  //   fiterShowArticles();
  // }, [ariclesArr, attentionUsers]);
  const getHeadline=async ()=>{
    const headlineData = await getHeadlineApi();
    if (headlineData && headlineData.code === 0) {
      setHeadline(headlineData.data.headline)
    }
  }
  const getAllArticles=async (type:string)=>{
    const articlesData = await getAllArticlesApi();
    if(articlesData&&articlesData.code===0){
      if(type==="post"&&articlesData.articles.length>1){
        // const len=articlesData.articles.length-1
        // const aritclesArr=articlesData.articles.slice(0,len)
        // setAriclesArr([...articlesData.articles[len],...aritclesArr])
        setAriclesArr([...articlesData.articles])
        setShowAriclesArr([...articlesData.articles])
      }else{
        setAriclesArr([...articlesData.articles])
        setShowAriclesArr([...articlesData.articles])
      }
      
    }

  }
  
  const initInfApi = async () => {
    getHeadline()
    getAllArticles("")
    const userData:any=await getAllUser()
    if(userData&&userData.code===0){
      setUsers(userData.users)
      getfollowing(userData.users)
    }
    const getAvatar=await getavatarApi()
    if(getAvatar&&getAvatar.code===0){
     setAvater(getAvatar!.data!.avatar)
     }

  };
  
  const getfollowing=async(allUsers:any)=>{
   const usersData= await getfollowingApi()
   if(usersData&&usersData.code===0){

      let userAttent = []
      for (let i = 0; i < usersData.following.length; i++) {
        const data = await getavatarApiByName(usersData.following[i])
        const avator = data?.data?.avatar
        console.log(data)

        userAttent.push(
          {
            id: i,
            name: usersData.following[i],
            avator
          }
        )
      }

      setAttentionUsers(userAttent)
      console.log(userAttent)

    
      fiterNeedAttentionUser(allUsers,usersData.following)
      getAllArticles("")

     setTimeout(() => {
        console.log(attentionUsers, 'attention user')
      })
   }
  }
  const fiterNeedAttentionUser=(allUsers:any,user:any)=>{
    const userInfo:any = sessionStorage.getItem("userInfo");
    const userInfoObj=JSON.parse(userInfo)
   const needAttentionUsersArr =allUsers.filter((item: any) => {
     let flag=user.some((item1: any) => {
        return (item.name === item1.name)
        
      });
      if(item.name === userInfoObj.username){
        return 
      }
      if (!flag) {
        return item;
      }
    });
    setNeedAttentionUsers([...needAttentionUsersArr])
  

  }


  // const fiterShowArticles = () => {
    // const attentionUsers: Array<UserInfo> = JSON.parse(
    //   localStorage.getItem("attentionUsers")!
    // );
    // const adminUser: UserInfo = JSON.parse(localStorage.getItem("adminUser")!);

    // if (attentionUsers.length > 0) {
    //   const filterShowAriclesArr = ariclesArr.filter((item1) => {
    //     let flag = attentionUsers.some((item2: UserInfo) => {
    //       return item1.userId === item2.id || item1.userId === adminUser.id;
    //     });
    //     if (flag) return item1;
    //   });
      // setShowAriclesArr([...filterShowAriclesArr]);
    // } else {
    //   const filterShowAriclesArr = ariclesArr.filter(
    //     (item1) => item1.userId === adminUser.id
    //   );
    //   setShowAriclesArr([...filterShowAriclesArr]);
    // }
  // };
  const doInterval = (myvalue: number) => {
    if (articleFlag) {
      setArtleFlag(false);
      let nextPos: number = nowCarousalPos.current + myvalue;
      const styleObj = carousalRef.current.style;
      if (nextPos > showAriclesArr.length - 3) {
        nextPos = nowCarousalPos.current;
        nowCarousalPos.current = nextPos;
        message.error("this is least post ");
      }
      if (nextPos < 0) {
        nextPos = 0;
        nowCarousalPos.current = nextPos;
        message.error("this is first post ");
      }

      nowCarousalPos.current = nextPos;
      setTimeout(() => {
        styleObj.transition = "transform 0.5s";
        styleObj.transform = `translateX(-${nextPos * carousalWidth}px)`;
        setTimeout(() => {
          setArtleFlag(true);
        }, 500);
      }, 100);
    }
  };
  const dispatch = useAppDispatch();
  const [size, setSize] = useState<SizeType>("small");
  const [addUser, setAddUser] = useState<String>();

  const props: UploadProps = {
    name: "image",
    /*## 需要更改为后端绝对地址 否则服务图片上传*/
    action: "https://yourbookserver2022.herokuapp.com/upload",
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        console.log(info)
        let imgList:string[]=[]
        info.fileList.forEach((item)=>{
          imgList.push(item.response.data.url)
        })
        setPostImg(imgList)
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const editAdminState = async () => {
    // let adminCopy: any = {};
    // for (let k in storeAdmin) {
    //   adminCopy[k] = storeAdmin[k];
    // }
    // // adminCopy.state = state;

    // dispatch(editAdminUserState(adminCopy));
     const data = await putHeadlineApi(headline);
     if(data.code===0) getHeadline()
     
  };
  const changeInputValue =  (e: any) => {
      setHeadline(e.target.value);
  };

  const { Option } = Select;
  const logout = async () => {
    const data = await logoutApi();
    if (data && data.code === 0) {
      sessionStorage.removeItem("userInfo");
      navigate("/");
    }
  };
  const onChange = (value: string) => {
    setAddUser(value);
  };
  const clickUpload = () => {
    setIsImgs(true);
  };

  const onSearch = (value: string) => {};
  const changeInputSearchValue = (e: any) => {
    setSearchPostValue(e.target.value);
  };
  const SearchPosts = () => {
    let myarticle: Array<ArticleInterface> = [];
    // const filterShowAriclesArr = ariclesArr.filter((item1) => {
    //   let flag = attentionUsers.some((item2) => {
    //     return item1.userId === item2.id || item1.name === storeAdmin.id;
    //   });
    //   if (flag) return item1;
    // });
    myarticle = ariclesArr.filter(
      (item:any) =>
        item.Content.indexOf(searchPostValue) !== -1 ||
        item.userName.indexOf(searchPostValue) !== -1
    );
    setShowAriclesArr([...myarticle]);
  };
  const postArticle = async () => {
    // const addArticleItem = {
    //   id: ariclesArr.length + 1,
    //   author: storeAdmin.username,
    //   content: articleValue,
    //   isImgs: isImgs,
    //   userId: storeAdmin.id,
    //   isShowComment: true,
    // };

    // setAriclesArr([addArticleItem, ...ariclesArr]);
    // setIsImgs(false);

    // putArticlesApi()
    const data = await postArticlesApi(articleValue,postImg);
    getAllArticles("post")

    nowCarousalPos.current = 0;
    carousalRef.current.style.transition = "none";
    carousalRef.current.style.transform = `translateX(0px)`;
  };

  const adminUserInfo = () => {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <div style={{ height: "32px", display: "inline-block" }}>
            <img style={{ height: "100%" }} src={avatar} alt="" />
          </div>

          <span className={styles.headerBox}>username:{username}</span>
          <span className={styles.headerBox}>headline:{headline}</span>
          <Input
            className={styles.stateInput}
            onChange={(e) => {
              changeInputValue(e);
            }}
            type="text"
            placeholder="edit user headline"
          />
          <Button
            type="primary"
            size={size}
            className={styles.stateBtn}
            onClick={() => editAdminState()}
          >
            submit
          </Button>
          <Button
            type="primary"
            size={size}
            className={styles.stateBtn}
            onClick={logout}
            data-testid="mainLogoutId"
          >
            logout
          </Button>

          <Button
            type="primary"
            size={size}
            className={styles.stateBtn}
            onClick={() => navigate("/profile")}
          >
            profile
          </Button>
        </div>
      </div>
    );
  };
  

  return (
    <div className={styles.cardBox} data-testid={"appMainComponent"}>
      <Card title={adminUserInfo()} style={{ width: "100%", height: "100%" }}>
        <div
          className="site-card-border-less-wrapper"
          style={{ display: "flex", width: "100%", textAlign: "left" }}
        >
          <Card title="attention users" bordered={false} style={{ flex: 1 }}>
            <div style={{ display: "flex", paddingBottom: "10px" }}>
              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                style={{ minWidth: "250px" }}
                filterOption={(input, option) => {
                  return (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase());
                }}
              >
                {needAttentionUsers.map((item:any) => {
                  return (
                    <Option value={item.name} key={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>

              <Button
                type="primary"
                size={size}
                className={styles.btn}
                onClick={async() => {
               const data=await putfollowingApi(addUser);
               const {code}=data
               if(code===0){
                getfollowing(users);
               }
                }}
              >
                add
              </Button>
            </div>
            {attentionUsers.map((item:any) => (
              <div style={{ display: "flex" }} key={item.id}>
                <div>
                  <div style={{ width: "100px" }}>
                    <img style={{ width: "100%" }} src={item!.avator} alt="" />
                  </div>
                  <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {item.name}
                  </div>

                  {/* <div>{item.state}</div> */}
                </div>
                <Button
                  danger
                  size={size}
                  className={styles.btn}
                  onClick={async () => {
                const data=await deletefollowingApi(item.name)
                const {code}=data
                if(code===0){
                  getfollowing(users)
                }
                  }}
                >
                  unfollow
                </Button>
              </div>
            ))}
          </Card>

          <Card title="article" bordered={false} style={{ flex: 5 }}>
            <div style={{ display: "flex" }}>
              <div style={{ paddingRight: "20px" }}>
                <Upload {...props} multiple>
                  <Button onClick={clickUpload} icon={<UploadOutlined />}>
                    Click to Upload
                  </Button>
                </Upload>
              </div>
              <div style={{ flex: 1 }}>
                <TextArea
                  value={articleValue}
                  onChange={(e) => setArticleValue(e.target.value)}
                  placeholder="edit aricle"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </div>
            </div>
            <div className={styles.articlebtn}>
              <Button
                type="primary"
                size={size}
                className={styles.btn}
                onClick={() => setArticleValue("")}
              >
                cancel
              </Button>
              <Button
                type="primary"
                size={size}
                className={styles.btn}
                onClick={postArticle}
              >
                post
              </Button>
            </div>
            <hr />
            <div>
              <Input
                className={styles.postsInput}
                onChange={(e) => {
                  changeInputSearchValue(e);
                }}
                type="text"
                placeholder="search your posts"
              />
              <Button
                type="primary"
                size={size}
                className={styles.stateBtn}
                onClick={() => SearchPosts()}
              >
                search
              </Button>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <LeftCircleOutlined
                className={styles.circleLineBtn}
                onClick={() => doInterval(-1)}
              />
              <div
                style={{
                  width: "960px",
                  overflow: "hidden",
                  padding: "20px 0 0 0 ",
                }}
              >
                <ul className={styles.carousal} ref={carousalRef}>
                  {showAriclesArr.map((item) => (
                    <li
                      style={{ float: "left", padding: "0 10px" }}
                      key={item.id}
                    >
                      <div>
                        <Car imgList={item.images} />
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          height: "30px",
                          lineHeight: "30px",
                        }}
                      >
                        <h3 style={{ display: "inline-block" }}>author:</h3>{" "}
                        {item.userName}
                      </div>
                      <div className={styles.carousalContent}>
                        {item.Content}
                      </div>
                      <div
                        style={{ width: "300px" }}
                        className={
                          item.isShowComment
                            ? styles.showComment
                            : styles.hideComment
                        }
                      >
                        <Comment></Comment>
                      </div>
                      <div className={styles.articlebtn}>
                        <Button size={size} className={styles.stateBtn}>
                          Edit
                        </Button>
                        <Button
                          size={size}
                          className={styles.stateBtn}
                          onClick={() => {
                            setNoUse(!noUse);
                            if (item.isShowComment) {
                              item.isShowComment = false;
                            } else {
                              item.isShowComment = true;
                            }
                          }}
                        >
                          {item.isShowComment ? "hideComment" : "showComment"}
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <RightCircleOutlined
                className={styles.circleLineBtn}
                onClick={() => doInterval(1)}
              />
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

// export function filterArticleFunc(
//   articles: ArticleInterface[],
//   searchPostValue: string
// ): ArticleInterface[] {
//   return articles.filter(
//     (item:any) =>
//       item.Content.indexOf(searchPostValue) !== -1 ||
//       item.userName.indexOf(searchPostValue) !== -1
//   );
// }

// export function filterArticleById(
//   articles: ArticleInterface[],
//   ids: string[]
// ): ArticleInterface[] {
//   return articles.filter((item) => ids.includes(String(item._id)));
// }

export default Main;
