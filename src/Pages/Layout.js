import React from 'react'
import PageLayout from '../Componants/Layouts/PageLayout';
import LoginLayout from '../Componants/Layouts/LoginLayout';

const MainLayout = ({ children }) => {
  if(window.localStorage.getItem('isLogin')){
    return <PageLayout children={children}/>
  }
  return <LoginLayout children={children}/>
}

export default MainLayout