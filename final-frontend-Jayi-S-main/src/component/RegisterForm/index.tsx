import { Button, Form, Input, Upload, message } from "antd";
import type { UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  addUser,
  usersArr,
  adminUser,
  remeberAdminUser,
  attentionUsersSet,
  initUserArr,
} from "../../app/users/usersSlice";
import { store } from "../../app/store";
import { 
  registerApi,
  putpasswordApi,
  getemailApi,
  putemailApi,
  getzipcodeApi,
  putzipcodeApi,
  getdobApi,
  putdobApi,
  getavatarApi,
  putavatarApi,
} from "../../api";
import { UserInfo } from "../../uilts/interface";

const RegisterForm = ({showAvater}: any) => {

  const [form] = Form.useForm();
  const location = useLocation();

  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false)
  const [avatar,setAvater]=useState("")
  // const storeUsersArr = useAppSelector(usersArr);
  // const storeAdminUser = useAppSelector(adminUser);
  // const dispatch = useAppDispatch();
  useEffect(() => {
    //   setTimeout(async () => {
    //     if (location.pathname === "/register") {
    //       localStorage.removeItem("adminUser");
    //       const { data } = await getAllUser();
    //       const myData = data.map((item: any) => {
    //         return {
    //           id: item.id,
    //           username: item.username,
    //           password: item.address.street,
    //           phone: item.phone,
    //           email: item.email,
    //           zip: item.address.zipcode,
    //           avatar: "../common/images/chart.svg",
    //           state: "online",
    //         };
    //       });
    //       dispatch(initUserArr(myData));
    //     }
    //   }, 0);
    if (location.pathname === "/profile") {
    initForm()
      const userInfo = sessionStorage.getItem("userInfo");
      if (userInfo) {
        const userInfoObj = JSON.parse(userInfo)
        form.setFieldsValue({ username: userInfoObj.username });
        setDisabled(true)
      }
    }


  }, []);

  const initForm=async()=>{
 const getEmail=await getemailApi()
 if(getEmail&&getEmail.code===0){
 form.setFieldsValue({ email: getEmail.data.email });
 }
 const getAvatar=await getavatarApi()
 if(getAvatar&&getAvatar.code===0){
  setAvater(getAvatar!.data!.avatar)
  }
 const zipCode=await getzipcodeApi()
 if(zipCode&&zipCode.code===0){
  form.setFieldsValue({ zip: zipCode.data.zipCode });
  }
 const getDob=await getdobApi()
 if(getDob&&getDob.code===0){
  form.setFieldsValue({ dob: getDob.data.dob });
  }

  }

  // 页面跳转方法
  const onFinish = async (values: UserInfo) => {
    values.avatar=avatar
    if (location.pathname === "/register") {
      const data = await registerApi(values);
      const { code, msg } = data;
      message.success(msg);
      if (code === 0) {
        navigate("/");
      }
    } else {
      putpasswordApi(values.password)
      putemailApi(values.email)
     putzipcodeApi(values.zip)
     putdobApi(values.dob)
    await putavatarApi(avatar)
    showAvater(avatar)


    }

    // values.avatar = values.avatar?.file?.name || "";
    // values.state = "online";
    // let flag = storeUsersArr.some((item) => {
    //   return item.username === values.username;
    // });
    // if (flag && location.pathname === "/register") {
    //   return message.error("this user had exist");
    // }
    // if (location.pathname === "/register") {
    //   values.id = storeUsersArr.length + 1;
    //   localStorage.setItem("page", "register");
    //   dispatch(addUser(values));
    //   dispatch(remeberAdminUser(values));
    //   dispatch(attentionUsersSet());
    // } else {
    //   let adminUser = JSON.parse(localStorage.getItem("adminUser")!);
    //   adminUser = { ...values };
    //   dispatch(remeberAdminUser(adminUser));
    // }
    // message.success("submit success");
    // navigate("/main");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const uploadProps: UploadProps = {
    name: "image",
    /*## 需要更改为后端绝对地址 否则无法图片上传*/
    action: "https://yourbookserver2022.herokuapp.com/upload",
    maxCount:1,
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        setAvater(info.file.response.data.url)
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input disabled={disabled}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="confirm"
        name="pw2"
        rules={[
          { required: true },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("must be the same as the password");
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          {
            pattern: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]*/,
            message: "eg.kk@a.c",
          },
        ]}
      >
        <Input />
      </Form.Item>
      {/* <Form.Item
        label="Phone"
        name="phone"
        rules={[
          { required: true, message: "Please input your phone!" },
          { pattern: /\d\d\d-\d\d\d-\d\d\d\d/, message: "eg.123-123-1234" },
        ]}
      >
        <Input />
      </Form.Item> */}
      <Form.Item
        label="Zip"
        name="zip"
        rules={[
          { required: true, message: "Please input your zip!" },
          { pattern: /\d\d\d\d\d/, message: "eg.12345" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Dob"
        name="dob"
        rules={[
          { required: true, message: "Please input your dob!" },
          {
            pattern: /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
            message: "eg.2022-11-25",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Avatar" name="avatar">
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <div className={styles.btnsBox}>
          <Button className={styles.submitBox} type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
