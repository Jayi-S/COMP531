import { Button, Checkbox, Form, Input, Anchor,message} from 'antd';
import React, { useEffect, useState } from 'react';
// import chat from "../../common/images/chart.svg"
import styles from './index.module.css';
import { useNavigate } from "react-router-dom";
//import {Link} from 'react-router';
// import {userArr,adminUser,
//   setAdminUserInfo} from '../../uilts/users'
// import {UserInfo} from '../../uilts/interface'


import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  remeberAdminUser,
  usersArr,
  initUserArr
} from '../../app/users/usersSlice';

import {getAllUser} from '../../api'
import Register from "../Profile";
import TextArea from "antd/es/input/TextArea";




const { Link } = Anchor;

const Login: React.FC = () => {

  const navigate = useNavigate()
  const  myUsersArr = useAppSelector(usersArr);
  const dispatch = useAppDispatch();


  useEffect(()=>{
    setTimeout(async() => {
      const {data}=await  getAllUser()
      const myData = data.map((item: any)=>{return { id: item.id, username: item.username, password: item.address.street, phone: item.phone, email: item.email, zip: item.address.zipcode, avatar: '../common/images/chart.svg', state: "online" }})
      dispatch(initUserArr(myData))
      console.log(data)
    },0);
  },[])


  const onFinish = (values: any) => {
    let admin=false
    myUsersArr.forEach(item=>{
      if(values.username===item.username&&values.password===item.password){
        dispatch(remeberAdminUser(item))
        message.success("login success")
        admin=true
        navigate('/main')
      }
    })
    if(!admin){
      message.error("username is not or password is error")

    }


  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const regiaterLinkTitle = () => {
    return <Button htmlType="button">
      register
    </Button>

  }


  return (
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <div className={styles.headBox}>
            <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.2qqtouxiang.com%2Fpic%2FTX10509_16.jpg&refer=http%3A%2F%2Fimg.2qqtouxiang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667619632&t=312786ae93044edd4402b2e56364393f" alt="" />
          </div>
          <div className={styles.loginInfo}>
            <Form
                name="basic"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 14 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
              <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' },{required:true, message:'for json user your can use username:Bret'}]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' },{required:true, message:'for json user your can use username:Kulas Light'}]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                  wrapperCol={{ span: 24 }}  >
                <div className={styles.btnsBox}>
                  <Button className={styles.submitBox} type="primary" htmlType="submit" >
                    Submit
                  </Button>
                 
                  <Anchor>

                    <Link href="/register" title={regiaterLinkTitle()} />

                  </Anchor>
                </div>
              </Form.Item>
            </Form>
          </div>


        </div>
      </div>

  );
};

export default Login;