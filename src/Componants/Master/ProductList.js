import React, { useEffect, useState } from 'react'
import { deleteData, getConditionalData, updateData } from '../../helper/FirebaseHelper'
import { Modal, Table, Tag, notification } from 'antd'
import ProductsModal from './ProductModal'
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { selectedState } from '../BillForm/Index';

const ProductList = ({activeTab, setProductAdded, productsAdded}) => {
  const [productsData, setProductData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProductData, setSelectedProductData] = useState({})

  const getProductData = () => {
    setIsLoading(true);
    getConditionalData('products').then(res => {
      console.log("🚀 ~ file: ProductList.js:17 ~ getConditionalData ~ res:", res)
      setProductData(res.map((val, id) => ({ ...val, key: id + 1 })));
      setIsLoading(false)
    }).catch(err => {
      setIsLoading(false)
    })
  }

  useEffect(() => {
      getProductData();
    if(productsAdded){
      setProductAdded(false);
    }
  }, [activeTab, productsAdded]);

  const handleDeleteProduct = (data) => {
    setIsLoading(true);
    deleteData("products", data.id)
      .then(() => {
        getProductData();
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }

  const handleEditProduct = (data) => {
    setIsModalOpen(true);
    setSelectedProductData(data);
  }

  const handleUpdateData = async(data, units, orData) => {
    setIsLoading(true);
    const obj = {
      hsn: data.hsn || '-',
      label: data.label || '-',
      value: data.label || '-',
      unit: units || '-',
    }
    await updateData('products', orData?.id, obj).then(res => {
      notification.success({message:'data updated successfully'});
      setIsModalOpen(false)
      setIsLoading(false);
      getProductData();
    }).catch((err) => {
      notification.error({message:'data updated failed'});
      setIsLoading(false)
    })
  }

  const columns = [{
    title: 'No.',
    dataIndex: 'key',
    render: (text) => <p>{text || "-"}</p>,
  },{
    title: 'Name',
    dataIndex: 'label',
    render: (text) => <p>{text || "-"}</p>,
  }, {
    title: 'hsn',
    dataIndex: 'hsn',
    render: (text) => <p>{text || "-"}</p>,
  }, {
    title: 'Units',
    dataIndex: 'unit',
    render: (text) => (<>{text.map(val => <Tag color='blue'>{val.label || "-"}</Tag>)}</>),
  }, {
    title: "Action",
    dataIndex: "action",
    width: 120,
    render: (_, record) => (
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <EditTwoTone
          onClick={() => handleEditProduct(record)}
          style={{ fontSize: "24px", cursor: "pointer" }} />
        <DeleteTwoTone
          onClick={() => handleDeleteProduct(record)}
          style={{ fontSize: "24px", cursor: "pointer" }}
          twoToneColor="#d4380d"
        />
      </div>
    ),
  },]
  
  return (
    <div>
      <Modal
        title="Update Product"
        open={isModalOpen}
        onOk={handleUpdateData}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={false}
        confirmLoading={isLoading}
      >
        <ProductsModal data={selectedProductData} handleSubmitProduct={handleUpdateData} isLoading={isLoading}/>
      </Modal>
      <Table
        columns={columns}
        dataSource={productsData}
        loading={isLoading}
        bordered
      />
    </div>
  )
}

export default ProductList