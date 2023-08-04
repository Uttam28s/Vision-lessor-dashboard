import { Button, Modal, Tabs, notification } from "antd";
import React, { useEffect, useState } from "react";
import ReceiverList from "../Componants/Master/ReceiverList";
import ProductList from "../Componants/Master/ProductList";
import { useLocation, useNavigate } from "react-router-dom";
import ReceiversModal from "../Componants/Master/ReceiversModal";
import { addData } from "../helper/FirebaseHelper";
import { selectedState } from "../Componants/BillForm/Index";
import ProductsModal from "../Componants/Master/ProductModal";

const Master = () => {
  const [activeTab, setActiveTab] = useState("receiver");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setActiveTab(location?.state);
  }, [location]);

  const onChange = (key) => {
    navigate("/master", { state: key });
  };

  const handleAddProduct = (data, units) => {
    setIsLoading(true);
    const obj = {
      hsn: data.hsn || '-',
      label: data.label || '-',
      value: data.label || '-',
      unit: units || '-',
    };
    addData("products", obj)
      .then((res) => {
        notification.success({ message: "Receiver has been added!" });
        setIsModalOpen(false);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        notification.error({ message: "Receiver could not be added!" });
      });
  };

  const handleAddReceiver = (data) => {
    setIsLoading(true);
    const obj = {
      name: data.name || "-",
      address: data.address || "-",
      pan: data.pan || "-",
      gstin: data.gstin || "-",
      stateCode: data.state || "-",
      state: selectedState(data.state)?.label,
    };
    addData("receiver", obj)
      .then((res) => {
        notification.success({ message: "Receiver has been added!" });
        setIsModalOpen(false);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        notification.error({ message: "Receiver could not be added!" });
      });
  };

  const tabItems = [
    {
      label: "Receivers",
      key: "receiver",
      children: <ReceiverList activeTab={activeTab} />,
    },
    {
      label: "Products",
      key: "products",
      children: <ProductList />,
    },
  ];
  return (
    <div>
      <Tabs
        onChange={onChange}
        type="card"
        activeKey={activeTab}
        items={tabItems}
        tabBarExtraContent={
          <Button
            disabled={isLoading}
            type="dashed"
            onClick={() => setIsModalOpen(true)}
          >
            {`Add ${activeTab === "receiver" ? "receiver" : "products"}`}
          </Button>
        }
      />
      <Modal
        title={`Add ${activeTab === "receiver" ? "Receiver" : "Product"}`}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={false}
        confirmLoading={isLoading}
      >
        {activeTab === "receiver" ? (
          <ReceiversModal
            handleSubmitReceiver={handleAddReceiver}
            isLoading={isLoading}
          />
        ) : (
          <ProductsModal 
             handleSubmitProduct={handleAddProduct}
             isLoading={isLoading}
          />
        )}
      </Modal>
    </div>
  );
};

export default Master;
