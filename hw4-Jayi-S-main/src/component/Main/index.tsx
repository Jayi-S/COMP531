import { Card, message, Avatar, Button, Input, Select, Carousel, Upload, } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { UploadOutlined,LeftCircleOutlined,RightCircleOutlined } from '@ant-design/icons';


import { useAppSelector, useAppDispatch } from '../../app/hooks';
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
} from '../../app/users/usersSlice';
import { useNavigate } from "react-router-dom";
import { UserInfo, ArticleInterface } from '../../uilts/interface'
import { UserOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { UploadProps } from 'antd';
import Search from 'antd/lib/transfer/search';
import { idText } from 'typescript';
import {getAllPost, getAllUser} from '../../api'


import Car from './Car'
import Item from 'antd/lib/list/Item';


const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const carousalWidth: number = 320;



const Main: React.FC = () => {
  const navigate = useNavigate()
  let adminInfo = sessionStorage.getItem('adminUser')
  let [state, setState] = useState<any>()
  const stroeUsersArr: Array<UserInfo> = useAppSelector(usersArr);
  const storeAdmin: any = useAppSelector(adminUser);
  const storeAttentionUsers: Array<UserInfo> = useAppSelector(attentionUsers);
  const storeNeedAttentionUsers: Array<UserInfo> = useAppSelector(needAttentionUsers);
  const [articleValue, setArticleValue] = useState('');
  const [searchPostValue, setSearchPostValue] = useState('');


  const [ariclesArr, setAriclesArr] = useState<Array<ArticleInterface>>([])

  const [showAriclesArr, setShowAriclesArr] = useState<Array<ArticleInterface>>([])

  const [copyArticlesArr, setCopyArticleArr] = useState<Array<ArticleInterface>>([])
  const [pos, setPos] = useState(0);
  const carousalRef = useRef<any>();
  const timerRef = useRef(-1)
  let nowCarousalPos = useRef(0);
  let nowSamllCarousalPos = useRef(0);
  let [articleFlag,setArtleFlag]=useState(true)

  const { TextArea } = Input;

  useEffect(() => {



    setTimeout(async()=>{

      const {data: userData}=await  getAllUser()
      const myData = userData.map((item: any)=>{return { id: item.id, username: item.username, password: item.address.street, phone: item.phone, email: item.email, zip: item.address.zipcode, avatar: '../common/images/chart.svg', state: "online" }})
      dispatch(initUserArr(myData))

      const {data} =await getAllPost()
      const mypost=data.map((item:any)=>{
        item.content = item.body
        stroeUsersArr.forEach((element:any) => {
          if(item.userId===element.id){
            item.author=element.username
          }
        });
        return item
      })
      console.log(mypost)
      setAriclesArr(mypost)

    },0)

    if (storeAdmin) {
    } else {
      message.info('please to login');
      navigate('/')
    }

  }, [])

  useEffect(()=>{
    const imgBox=document.getElementsByClassName('imgbox')
    if(imgBox.length>0){
      // const
      // console.log(nowCarousalPos.current)
      // console.log(imgBox[nowCarousalPos.current])
      setInterval(()=>{
        console.log("111")
      },1000)

    }

  },[showAriclesArr,pos])
  useEffect(() => {
    setCopyArticleArr([...ariclesArr])
    // setShowAriclesArr([...ariclesArr, ...ariclesArr])
    setShowAriclesArr([...ariclesArr])
  }, [ariclesArr])

  useEffect(() => {
    // setShowAriclesArr([...copyArticlesArr,...copyArticlesArr])
    setShowAriclesArr([...copyArticlesArr])
    nowCarousalPos.current=0
    carousalRef.current.style.transition='none'
    carousalRef.current.style.transform = `translateX(0px)`

    console.log("changed")


  }, [copyArticlesArr])


  const doBreathe=()=>{

  }
  const doInterval = (myvalue:number) => {
    // const timer = window.setInterval(() => {
    //   let nextPos: number = nowCarousalPos.current + myvalue
    //   const styleObj = carousalRef.current.style
    //   if (nowCarousalPos.current > copyArticlesArr.length - 1) {
    //     styleObj.transition = "none"
    //     nextPos = 1;
    //     styleObj.transform = `translateX(-${0 * carousalWidth}px)`
    //   }

    //   nowCarousalPos.current = nextPos;
    //   setPos(nextPos)
    //   setTimeout(() => {
    //     styleObj.transition = "transform 0.5s"
    //     styleObj.transform = `translateX(-${nextPos * carousalWidth}px)`
    //   }, 50)

    // }, 3000)
    // return timer
    if(articleFlag){
      setArtleFlag(false)
      let nextPos: number = nowCarousalPos.current + myvalue
      const styleObj = carousalRef.current.style
      if (nextPos > copyArticlesArr.length - 3) {
        nextPos = nowCarousalPos.current;
        nowCarousalPos.current = nextPos;
        message.error('This is the first post');
      }
      if (nextPos<0) {
        nextPos=0
        nowCarousalPos.current = nextPos;
        message.error('This is the last one');
      }

      nowCarousalPos.current = nextPos;
      // setPos(nextPos)
      setTimeout(() => {
        styleObj.transition = "transform 0.5s"
        styleObj.transform = `translateX(-${nextPos * carousalWidth}px)`
        setTimeout(()=>{
          setArtleFlag(true)
        },500)
      }, 100)
    }
  }




  // useEffect(() => {
  //   // init
  //   // setShowAriclesArr([...showAriclesArr, ...showAriclesArr])
  //   if (timerRef.current === -1) {

  //     const timer = doInterval()
  //     timerRef.current = timer
  //   } else {
  //     clearInterval(timerRef.current)
  //     const timer = doInterval()
  //     timerRef.current = timer
  //   }

  //   carousalRef.current.onmouseenter = () => {
  //     clearInterval(timerRef.current)
  //   }

  //   carousalRef.current.onmouseleave = () => {
  //     const timer = doInterval()
  //     timerRef.current = timer
  //   }
  // }, [copyArticlesArr])





  const dispatch = useAppDispatch();
  const [size, setSize] = useState<SizeType>('small');
  const [addUser, setAddUser] = useState<String>()




  const props: UploadProps = {
    name: 'file',
    // action: '',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange(info) {
      // if (info.file.status !== 'uploading') {
      //   console.log(info.file, info.fileList);
      // }
      // if (info.file.status === 'done') {
      //   message.success(`${info.file.name} file uploaded successfully`);
      // } else if (info.file.status === 'error') {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    },
  };

  const editAdminState = () => {
    let adminCopy: any = {};
    for (let k in storeAdmin) {
      adminCopy[k] = storeAdmin[k];
    }
    adminCopy.state = state;

    dispatch(editAdminUserState(adminCopy))

  }
  const changeInputValue = (e: any) => {
    setState(e.target.value)
  }


  const { Option } = Select;

  const onChange = (value: string) => {
    setAddUser(value)

  };


  const onSearch = (value: string) => {
    // console.log('search:', value);

  };
  const changeInputSearchValue = (e: any) => {
    setSearchPostValue(e.target.value)
  }
  const SearchPosts = () => {
    let myarticle: Array<ArticleInterface> = [];
    ariclesArr.forEach(item => myarticle.push(item))

    myarticle = myarticle.filter((item) => (item.content.indexOf(searchPostValue) !== -1 || item.author.indexOf(searchPostValue)!==-1))
    // setAriclesArr([...myarticle])
    console.log(myarticle)
    setCopyArticleArr([...myarticle])
    // search article

  }
  const postArticle = () => {
    const addArticleItem = { id:  1, author: storeAdmin?.username, content: articleValue }
    setAriclesArr([ addArticleItem,...ariclesArr])
  }

  const adminUserInfo = () => {
    return <div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <div style={{ height: "32px", display: 'inline-block' }}><img style={{ height: '100%' }} src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.2qqtouxiang.com%2Fpic%2FTX10509_16.jpg&refer=http%3A%2F%2Fimg.2qqtouxiang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667619632&t=312786ae93044edd4402b2e56364393f" alt="" /></div>

        <span className={styles.headerBox}>username:{storeAdmin?.username}</span>
        <span className={styles.headerBox}>state:{storeAdmin?.state}</span>
        <Input className={styles.stateInput} onChange={(e) => { changeInputValue(e) }} type="text" placeholder='edit user state' />
        <Button type="primary" size={size} className={styles.stateBtn} onClick={() => editAdminState()}>
          submit
        </Button>
        <Button type="primary" size={size} className={styles.stateBtn} onClick={() => navigate('/')}>
          logout
        </Button>

        <Button type="primary" size={size} className={styles.stateBtn} onClick={() => navigate('/profile')}>
          profile
        </Button>

      </div>
    </div>

  }

  return (<div className={styles.cardBox}>
    <Card title={adminUserInfo()} style={{ width: '100%', height: '100%' }}>


      <div className="site-card-border-less-wrapper" style={{ display: 'flex', width: '100%', textAlign: 'left' }}>
        <Card title="attention users" bordered={false} style={{ flex: 1 }}>
          <div style={{ display: 'flex', paddingBottom: '10px' }}>
            <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                style={{ minWidth: '250px' }}
                filterOption={(input, option) => {
                  return (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                }
                }
            >

              {storeNeedAttentionUsers.map((item) => {
                return <Option value={item.username}>{item.username}</Option>
              })}


            </Select>

            <Button type="primary" size={size} className={styles.btn} onClick={() => {
              storeNeedAttentionUsers.forEach(item => {
                if (item.username === addUser) {
                  dispatch(addAttention(item))
                }
              })
            }}>
              add
            </Button>
          </div>
          {storeAttentionUsers.map(item => <div style={{ display: 'flex' }}><div><div style={{ width: "100px" }}><img style={{ width: '100%' }} src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.2qqtouxiang.com%2Fpic%2FTX10509_16.jpg&refer=http%3A%2F%2Fimg.2qqtouxiang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667619632&t=312786ae93044edd4402b2e56364393f" alt="" /></div>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{item.username}</div>
            <div>{item.state}</div></div><Button danger size={size} className={styles.btn} onClick={() => dispatch(unfollow(item))}>
            unfollow
          </Button></div>)}



        </Card>

        <Card title="article" bordered={false} style={{ flex: 5 }}>
          <div style={{ display: 'flex' }}>
            <div style={{ paddingRight: '20px' }}>
              <Upload {...props} multiple>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>
            <div style={{ flex: 1 }}><TextArea
                value={articleValue}
                onChange={e => setArticleValue(e.target.value)}
                placeholder="edit aricle"
                autoSize={{ minRows: 3, maxRows: 5 }}
            /></div>
          </div>
          <div className={styles.articlebtn}>
            <Button type="primary" size={size} className={styles.btn} onClick={() => setArticleValue('')}>
              cancel
            </Button>
            <Button type="primary" size={size} className={styles.btn} onClick={postArticle}>
              post
            </Button>
          </div>
          <hr />
          <div >
            <Input className={styles.postsInput} onChange={(e) => { changeInputSearchValue(e) }} type="text" placeholder='search your posts' />
            <Button type="primary" size={size} className={styles.stateBtn} onClick={() => SearchPosts()}>
              search
            </Button>
          </div>
          <div style={{display:'flex',alignItems:'center'}}>
            <LeftCircleOutlined className={styles.circleLineBtn} onClick={()=>doInterval(-1)} />
            <div style={{ width: '960px', overflow: 'hidden', padding: '20px 0 0 0 ' }}>
              <ul className={styles.carousal} ref={carousalRef}>
                {showAriclesArr.map(item => <li style={{ float: 'left', padding: '0 10px' }}>
                  <div>
                    <Car
                        imgList={["https://i.etsystatic.com/32950390/r/il/63673b/3560516200/il_1588xN.3560516200_f74v.jpg", "https://www.earthtouchnews.com/media/1951732/bigpicture_black-grouse_2019-05-02.jpg"]}
                    />
                  </div>
                  <div style={{textAlign:'right', height:"30px", lineHeight:"30px"}}><h3 style={{display:"inline-block"}}>author:</h3> {item.author}</div>
                  <div className={styles.carousalContent} >{item.content}</div>
                  <div className={styles.articlebtn}>
                    <Button size={size} className={styles.stateBtn}>
                      Edit
                    </Button>
                    <Button size={size} className={styles.stateBtn}>
                      Comment
                    </Button></div>
                </li>)}
              </ul>
            </div>

            <RightCircleOutlined className={styles.circleLineBtn} onClick={()=>doInterval(1)} />


          </div>

        </Card>
      </div>
    </Card>
  </div>)

}


export default Main;
