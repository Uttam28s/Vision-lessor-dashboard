import React, { useEffect, useState } from 'react'
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useLocation, useNavigate } from 'react-router-dom/dist';
import { HomeOutlined, FormOutlined, UnorderedListOutlined, UserAddOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


const menuData = [{
  title: 'Create Bill',
  icon: FormOutlined,
  link: '/create-bill',
  role: ['admin', 'manager']
}, {
  title: 'View Bills',
  icon: UnorderedListOutlined,
  link: '/view-bills',
  role: ['admin', 'manager']
}, {
  title: 'Add Users',
  icon: UserAddOutlined,
  link: '/add-user',
  role: ['admin']
}, {
  title: 'Master',
  icon: AppstoreAddOutlined,
  link: '/master',
  role: ['admin']
}]

const PageLayout = ({ children }) => {
  const [pageTitle, setPageTitle] = useState('Create Bill')
  const [selectedMenu, setSelectedMenu] = useState()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if(location && location.pathname){
      setPageTitle(menuData.find(val => val.link === location.pathname)?.title)
      setSelectedMenu(location.pathname)
    }
  }, [location])
  
  const onClick = (e) => {
    setPageTitle(menuData.find(val => val.link === e.key)?.title)
    if(e) {
     return navigate(`${e.key}`, {state: 'receiver'})
    }
    navigate(`${e.key}`)
  }
  const user = JSON.parse(window.localStorage.getItem('users'))
  const handleSignOut = () => {
    window.localStorage.removeItem('users')
    window.localStorage.removeItem('isLogin')
    navigate("/")
    signOut(auth)
  }
  return (
    <Layout>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        // console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        // console.log(collapsed, type);
      }}
    >
      <div className="vision-logo">
        <p>Vision Lessor</p>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[`${selectedMenu}`]}
        onClick={onClick}
        items={menuData.filter(val => val?.role?.includes(user?.role)).map(
          (data, index) => ({
            key: data.link,
            icon: React.createElement(data.icon),
            label: `${data.title}`,
          }),
        )}
      />
    </Sider>
    <Layout>
      <Header
        className="site-layout-sub-header-background"
        style={{
          padding: '0',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <p style={{
          padding: '0 18px',
          fontSize: 'x-large',
          fontWeight: '700'
        }}>
          {pageTitle}
        </p>
        <p style={{
          padding: '0 18px',
          backgroundColor: '#334454b0',
          color: 'white',
          fontSize: '20px',
          alignSelf: 'center',
          margin:'0',
          cursor: 'pointer'
        }} onClick={handleSignOut}>Log out</p>
      </Header>
      <Content
        style={{
          margin: '24px 16px 0',
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: '84vh',
          }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Zeonlabs ©2023 Created for Vision Lessor
      </Footer>
    </Layout>
  </Layout>
  )
}

export default PageLayout