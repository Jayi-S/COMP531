import { Button,Card} from 'antd';
import React, { useState,useEffect } from 'react';
import styles from './index.module.css';
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import RegisterForm from '../RegisterForm';
import {
getemailApi,
putemailApi,
getHeadlineApi,
getzipcodeApi,
} from "../../api";
import {
  remeberAdminUser,
  adminUser,
} from '../../app/users/usersSlice';
import myAvater from '../../common/images/avater.jpg'
import SkeletonAvatar from 'antd/lib/skeleton/Avatar';
const Adimn1="kk"
const Profile: React.FC = () => {
  const navigate = useNavigate()
  const storeAdmin: any = useAppSelector(adminUser);
  const dispatch = useAppDispatch();
  const [headline, setHeadline] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [dob, setDob] = useState();
  const [avatar,setAvater]=useState("")
  


  useEffect(() => {
    const userInfo = sessionStorage.getItem("userInfo");
    if (userInfo) {
      const userInfoObj=JSON.parse(userInfo)
      setUsername(userInfoObj.username)
      initApi();
    } else {
      navigate("/");
    }
  
},[])
const initApi=async()=>{
 const emailData=await getemailApi()
 if(emailData&&emailData.code===0){
  setEmail(emailData.data.email)
 }
 const zipData=await getzipcodeApi()
 if(zipData&&zipData.code===0){
  setZip(zipData.data.zipcode)
 }
 const dobData=await getzipcodeApi()
 if(dobData&&dobData.code===0){
  setDob(dobData.data.dob)
 }

 
 getHeadline()
}


const getHeadline=async ()=>{
  const headlineData = await getHeadlineApi();
  if (headlineData && headlineData.code === 0) {
    setHeadline(headlineData.data.headline)
  }
}




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
      <Card style={{ width: '40%', height: "maxContent",  }} title={adminUserInfo()}>
        <div  style={{ display: 'flex'}}>
          <div style={{ flex: 1 }}>
            <div style={{ padding: '20px' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Current Info</div>
              <div style={{ width: "100px" }}><img style={{ width: '100%' }} src={avatar} alt="" /></div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }} data-testid='loginUsername'>{username}</div>
              <div>{email}</div>
              {/* <div>{phone}</div> */}
              <div>{zip}</div>
              <div>{headline}</div>
              <div>{dob}</div>

          </div>
          </div>
          <div style={{ flex: 1 }}>
         <RegisterForm showAvater={setAvater}></RegisterForm>
        </div>
        </div>
        

      </Card>

    </div>


  );
};


export default Profile;
