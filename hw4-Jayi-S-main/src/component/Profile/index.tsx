import { Button, Checkbox, Form, Input, Card, Upload, message, Avatar } from 'antd';
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import styles from './index.module.css';
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { UserInfo } from '../../uilts/interface'
import {
  remeberAdminUser,
  adminUser,
  usersArr,
  attentionUsers,
  editAdminUserState,
  addAttention,
  needAttentionUsers,
} from '../../app/users/usersSlice';
import { profile } from 'console';

const Register: React.FC = () => {
  const navigate = useNavigate()
  const myUsersArr = useAppSelector(usersArr);
  const stroeUsersArr: Array<UserInfo> = useAppSelector(usersArr);
  const storeAdmin: any = useAppSelector(adminUser);
  const storeAttentionUsers: Array<UserInfo> = useAppSelector(attentionUsers);
  const storeNeedAttentionUsers: Array<UserInfo> = useAppSelector(needAttentionUsers);
  const dispatch = useAppDispatch();
  // navigate
  const onFinish = (values: any) => {
    values.avatar =''
    dispatch(remeberAdminUser(values))
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
  const adminUserInfo = () => {
    return <div>
     <span style={{fontSize:'20px',fontWeight:'bold',padding:'0 20px'}}>profile</span>
      <Button type="primary" size="small" className={styles.stateBtn} onClick={() => navigate('/main')}>
        main page
      </Button>
    </div>

  }

  return (
    <div className={styles.cardBox}>
      <Card style={{ width: '40%', height: '60%',  }} title={adminUserInfo()}>
        <div  style={{ display: 'flex'}}>
          <div style={{ flex: 1 }}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Upload new picture</Button>
            </Upload>
           

            <div style={{ padding: '20px' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Current Info</div>
              <div style={{ width: "100px" }}><img style={{ width: '100%' }} src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.2qqtouxiang.com%2Fpic%2FTX10509_16.jpg&refer=http%3A%2F%2Fimg.2qqtouxiang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667619632&t=312786ae93044edd4402b2e56364393f" alt="" /></div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{storeAdmin.username}</div>
              <div>{storeAdmin.email}</div>
              <div>{storeAdmin.phone}</div>
              <div>{storeAdmin.zip}</div>
              <div>{storeAdmin.state}</div>

          </div>
          </div>
          <div style={{ flex: 1 }}>
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
              rules={[{ required: true, message: 'Please input your zip code!' },{pattern:/\d\d\d\d\d/,message:'5 digit eg.77030'}]}
            >
              <Input />
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
        </div>
        </div>
        

      </Card>

    </div>


  );
};


export default Register;
