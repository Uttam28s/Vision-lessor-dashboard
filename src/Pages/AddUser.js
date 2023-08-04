import { Button, Col, Input, Modal, Row, Table, notification } from 'antd';
import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { addData, getConditionalData, setData } from '../helper/FirebaseHelper';
import { EditTwoTone } from '@ant-design/icons';

const AddUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getUsersData();
  }, [])

  const getUsersData = () => {
    setIsLoading(true);
    getConditionalData("users", false, {
      fieldName: "userName",
      order: "desc",
    })
      .then((data) => {
        console.log("🚀 ~ file: AddUser.js:27 ~ .then ~ data:", data)
        setIsLoading(false);
        setUserList(data.map((val) => ({ ...val, key: val.id })));
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const handleAddUser = () => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, userName, password).then(async(userCredential) => { 
      const user = userCredential.user;
      console.log("🚀 ~ file: AddUser.js:40 ~ createUserWithEmailAndPassword ~ user:", user)
      const obj = {
        uid: user?.uid || '',
        userName,
        password,
        role
      }
      await setData("users", user?.uid || 'no_id' , obj).then(res => {
        notification.success({ message: "data added successfully" });
        getUsersData()
        setIsModalOpen(false)
      });    
    })
    .catch((error) => {
      const errorMessage = error.message;
      notification.error({ message: errorMessage });
      setIsLoading(false)
    });
  }

  const handleEditBill = (data) => {
    setRole(data?.role || '');
    setUserName(data?.userName || '');
    setPassword(data?.password || '');
    setIsModalOpen(true);
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "userName",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text) => <p>{text || "-"}</p>,
    },
    {
      title: "Password",
      dataIndex: "password",
      render: (text) => <p>{text || "-"}</p>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <EditTwoTone
          onClick={() => handleEditBill(record)}
          style={{ fontSize: "24px", cursor: "pointer" }}
        />
      ),
    },
  ];

  return (
    <div>
      <Button
        disabled={isLoading}
        type="primary"
        style={{marginBottom: '10px', float:'right'}}
        onClick={() => setIsModalOpen(true)}
      >
        {`Add User`}
      </Button>
      <Modal
        title="Add User"
        open={isModalOpen}
        onOk={handleAddUser}
        onCancel={() => {
          setUserName('');
          setRole('');
          setPassword('');
          setIsModalOpen(false);
        }}
        confirmLoading={isLoading}
      >
        <Row gutter={12}>
          <Col span={24}>
            <label htmlFor='name'>Name</label>
            <Input
              placeholder="Name"
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Col>
          <Col span={24}>
          <label htmlFor='role'>Role</label>
            <Input
              placeholder="Role"
              value={role}
              id='role'
              onChange={(e) => setRole(e.target.value)}
              />
              <p>Role should be: admin and manager</p>
          </Col>
          <Col span={24}>
          <label htmlFor='password'>Password</label>
            <Input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Row>
      </Modal>
      <Table
        columns={columns}
        dataSource={userList}
        loading={isLoading}
        bordered
      />
    </div>
  )
}

export default AddUser