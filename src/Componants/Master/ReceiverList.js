import React, { useEffect, useState } from 'react'
import { deleteData, getConditionalData, updateData } from '../../helper/FirebaseHelper'
import { Modal, Table, notification } from 'antd'
import ReceiversModal from './ReceiversModal'
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { selectedState } from '../BillForm/Index';

const ReceiverList = ({activeTab, setReceiverAdded, receiverAdded}) => {
  const [receiverData, setReceiverData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedReceiverData, setSelectedReceiverData] = useState({})

  const getReceiverData = () => {
    setIsLoading(true);
    getConditionalData('receiver').then(res => {
      setReceiverData(res.map((val, id) => ({ ...val, key: id + 1 })));
      setIsLoading(false)
    }).catch(err => {
      setIsLoading(false)
    })
  }

  useEffect(() => {
    if(activeTab === 'receiver' ) {
      getReceiverData();
    } 
    if(receiverAdded){
      getReceiverData();
      setReceiverAdded(false);
    }
  }, [activeTab, receiverAdded]);

  const handleDeleteReceiver = (data) => {
    setIsLoading(true);
    deleteData("receiver", data.id)
      .then(() => {
        getReceiverData();
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }

  const handleEditReceiver = (data) => {
    setIsModalOpen(true);
    setSelectedReceiverData(data);
  }

  const handleUpdateData = async(data) => {
    const obj = {
      name: data.name || '-',
      address: data.address || '-',
      pan: data.pan || '-',
      gstin: data.gstin || '-',
      stateCode: data.state || '-',
      state: selectedState(data.state)?.label,
    }
    await updateData('receiver', data?.id, obj).then(res => {
      notification.success({message:'data updated successfully'});
      setIsModalOpen(false)
      setIsLoading(false);
      getReceiverData();
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
    dataIndex: 'name',
    render: (text) => <p>{text || "-"}</p>,
  }, {
    title: 'Address',
    dataIndex: 'address',
    render: (text) => <p>{text || "-"}</p>,
  }, {
    title: 'State',
    dataIndex: 'state',
    render: (text) => <p>{text || "-"}</p>,
  }, {
    title: 'Pan No.',
    dataIndex: 'pan',
    render: (text) => <p>{text || "-"}</p>,
  }, {
    title: 'Gst IN',
    dataIndex: 'gstin',
    render: (text) => <p>{text || "-"}</p>,
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
          onClick={() => handleEditReceiver(record)}
          style={{ fontSize: "24px", cursor: "pointer" }} />
        <DeleteTwoTone
          onClick={() => handleDeleteReceiver(record)}
          style={{ fontSize: "24px", cursor: "pointer" }}
          twoToneColor="#d4380d"
        />
      </div>
    ),
  },]
  
  return (
    <div>
      <Modal
        title="Update Receiver"
        open={isModalOpen}
        onOk={handleUpdateData}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={false}
        confirmLoading={isLoading}
      >
        <ReceiversModal data={selectedReceiverData} isLoading={isLoading} handleSubmitReceiver={handleUpdateData}/>
      </Modal>
      <Table
        columns={columns}
        dataSource={receiverData}
        loading={isLoading}
        bordered
      />
    </div>
  )
}

export default ReceiverList