import { Button, Checkbox, Form, Input,Card,Upload,message } from 'antd';
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import styles from './index.module.css';
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  addUser,
  usersArr,
  remeberAdminUser,
} from '../../app/users/usersSlice';

const Register: React.FC = () => {
  const navigate = useNavigate()
  const  myUsersArr = useAppSelector(usersArr);
  const dispatch = useAppDispatch();
    //navigate
  const onFinish = (values: any) => {
    values.avatar=values.avatar?.file?.name||''
    values.state='online'
    
    dispatch(remeberAdminUser(values))
    dispatch(addUser(values))
    message.success("login success")
      navigate('/main')
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

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

  return (
    <div className={styles.cardBox}> <Card title="register">
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' },{pattern:/[a-z][a-z0-9]*|[A-Z][A-Z0-9]*/,message:'unvalid pattern'}]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>


    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' },{pattern:/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]*/, message:'eg.js215@rice.edu'}]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Phone"
      name="phone"
      rules={[{ required: true, message: 'Please input your phone!' },{pattern:/\d\d\d-\d\d\d-\d\d\d\d/,message:'eg.123-123-1234'}]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Zip"
      name="zip"
      rules={[{ required: true, message: 'Please input your zip!' },{pattern:/\d\d\d\d\d/,message:'5 digital'}]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Avatar"
      name="avatar"
    >
   <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
    </Form.Item>
    <Form.Item
              wrapperCol={{ span: 24 }}  >
              <div className={styles.btnsBox}>
                <Button className={styles.submitBox} type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Form.Item>

  </Form>
 
</Card>

    </div>
  
    
  );
};


export default Register;
