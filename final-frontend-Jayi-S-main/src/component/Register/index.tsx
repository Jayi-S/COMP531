import {Card } from 'antd';
import React from 'react';
import styles from './index.module.css';
import RegisterForm from '../RegisterForm';

const Register: React.FC = () => {
// const page="register"
  return (
    <div className={styles.cardBox}> <Card title="register">
<RegisterForm ></RegisterForm>
</Card>
    </div>
  );
};


export default Register;
