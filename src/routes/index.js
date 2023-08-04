import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../Pages/Layout';
import Home from "../Pages/home.js"
import CreateBill from "../Pages/CreateBill.js"
import ViewBills from "../Pages/ViewBills.js"
import AddUser from "../Pages/AddUser.js"
import Master from "../Pages/Master.js"

// const Home = React.lazy(() => import('../Pages/home.js'));
// const CreateBill = React.lazy(() => import('../Pages/CreateBill.js'));
// const ViewBills = React.lazy(() => import('../Pages/ViewBills.js'));
// const AddUser = React.lazy(() => import('../Pages/AddUser.js'));
// const Master = React.lazy(() => import('../Pages/Master.js'));

const AllRoutes = () => {
  return (
    <MainLayout>
      <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/create-bill" element={<CreateBill />} />
          <Route path="/view-bills" element={<ViewBills />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/master" element={<Master />} />
          <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </MainLayout>
  );
};

export default memo(AllRoutes);
