import { Button, Checkbox, Form, Input, Anchor, message } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useNavigate, useLocation } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
// import {
//   remeberAdminUser,
//   usersArr,
//   initUserArr,
// } from "../../app/users/usersSlice";

import { loginApi,getgoogleApi } from "../../api";
import myAvater from "../../common/images/avater.jpg";

import { LoginInter } from "../../uilts/interface";
import { GoogleOutlined } from "@ant-design/icons";

const { Link } = Anchor;

const Login: React.FC = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   setTimeout(async () => {
  //     const { data } = await getAllUser();
  //     const myData = data.map((item: any) => {
  //       return {
  //         id: item.id,
  //         username: item.username,
  //         password: item.address.street,
  //         phone: item.phone,
  //         email: item.email,
  //         zip: item.address.zipcode,
  //         avatar: "../common/images/chart.svg",
  //         state: "online",
  //       };
  //     });
  //     localStorage.setItem("usersArr", JSON.stringify(myData));
  //     dispatch(initUserArr(myData));
  //   }, 0);
  // }, []);
  const getGoogle= ()=>{
    window.open(getgoogleApi())
  }

  const onFinish = async (values: LoginInter) => {
    const data = await loginApi(values);
    if (data) {
      const { code, msg, username, id,token } = data;
      message.success(msg);
      if (code === 0) {
        const userInfo = {
          username,
          id,
          token,
        };

        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        navigate("/main");
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const regiaterLinkTitle = () => {
    return <Button htmlType="button">register</Button>;
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.headBox}>
          <img src={myAvater} alt="" />
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
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input data-testid="nameForm" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password data-testid="passwordForm" />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <div className={styles.btnsBox}>
                <Button
                  className={styles.submitBox}
                  data-testid="clickBtn"
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
                <Button
                  // type="primary"
                  // htmlType="submit"
                  className={styles.submitBox}
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register
                </Button>
                <GoogleOutlined style={{color:"red",fontSize:"28px"}}  onClick={getGoogle}/>
                {/* <Anchor>
                  <Link href="/register" title={regiaterLinkTitle()} />
                </Anchor> */}
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
