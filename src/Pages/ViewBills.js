/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Col, DatePicker, Input, Modal, Row, Table, notification } from "antd";
import { Tag } from "antd/lib";
import { PrinterTwoTone, DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import {
  deleteData,
  getConditionalData,
  updateData,
} from "../helper/FirebaseHelper";
import { dateDifference, dateFormate } from "../helper";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../helper/pdfHtmlTemplate";

const ViewBills = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(false);
  const [chequeNo, setChequeNo] = useState("");
  const [paymentDate, setPaymentDate] = useState(moment());
  const navigate = useNavigate();
  const componentRef = useRef(null);

  useEffect(() => {
    getInvoiceData();
  }, []);

  const handleNavigateBill = (data) => {
    navigate("/create-bill", { state: data });
  };

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "AwesomeFileName",
    removeAfterPrint: true,
  });

  const handleDeleteBill = (data) => {
    setLoading(true);
    deleteData("bills", data.id)
      .then(() => {
        getInvoiceData();
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleBillPaid = (data) => {
    setIsModalOpen(true);
    setSelectedBill(data);
  };

  const handleUpdateBill = async () => {
    setIsLoading(true);
    const obj = {
      ...selectedBill,
      paymentDate: paymentDate.toDate(),
      chequeNo: chequeNo,
      status: "paid",
    };
    try {
      await updateData("bills", selectedBill?.id, obj).then((res) => {
        notification.success({ message: "data updated successfully" });
        setIsModalOpen(false);
        setPaymentDate(false);
        setChequeNo("");
        setIsLoading(false);
        getInvoiceData();
      });
    } catch (e) {
      notification.error({ message: e?.message || "Payment info not updated" });
      setIsModalOpen(false);
      setIsLoading(false);
    }
  };

  const getInvoiceData = () => {
    setLoading(true);
    getConditionalData("bills", false, {
      fieldName: "invoiceNo",
      order: "desc",
    })
      .then((data) => {
        setLoading(false);
        setCardData(data.map((val) => ({ ...val, key: val.id })));
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const columns = [
    {
      title: "Invoice No.",
      dataIndex: "invoiceNo",
    },
    {
      title: "Kaneria No.",
      dataIndex: "kaneriaBillNo",
      render: (text) => <p>{text || "-"}</p>,
    },
    {
      title: "Invoice Date",
      dataIndex: "invoiceDate",
      render: (text) => (
        <p>{text?.seconds ? dateFormate(text?.seconds) : "-"}</p>
      ),
    },
    {
      title: "Days",
      dataIndex: "invoiceDate",
      render: (text) => (
        <p>{text?.seconds ? dateDifference(text?.seconds) || '0' : "-"}</p>
      ),
    },
    {
      title: "Receiver Name",
      dataIndex: "receiverName",
      render: (text) => <p>{text?.label}</p>,
    },
    {
      title: "Total Amount",
      dataIndex: "totalSum",
    },
    {
      title: "Cheque No",
      dataIndex: "chequeNo",
      render: (text) => <p>{text || "-"}</p>,
    },
    {
      title: "Payment Date",
      dataIndex: "paymentDate",
      render: (text) => (
        <p>{text?.seconds ? dateFormate(text?.seconds) : "-"}</p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, record) => (
        <>
          <Tag
            style={{ cursor: "pointer" }}
            onClick={() => {
              record?.status !== "paid" && handleBillPaid(record);
            }}
            color={record?.status === "paid" ? "green" : "volcano"}
            key={record?.status}
          >
            {record?.status ? record?.status.toUpperCase() : "-"}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          {record?.status !== "paid" && (
            <EditTwoTone
              onClick={() => handleNavigateBill(record)}
              style={{ fontSize: "24px", cursor: "pointer" }}
            />
          )}
          <PrinterTwoTone
            onClick={async () => {
              setLoading(true);
              setSelectedBill(record);
              setTimeout(() => {
                handlePrint();
                setLoading(false);
              }, 1000);
            }}
            style={{ fontSize: "24px", cursor: "pointer" }}
            twoToneColor="#389e0d"
          />
          <DeleteTwoTone
            onClick={() => handleDeleteBill(record)}
            style={{ fontSize: "24px", cursor: "pointer" }}
            twoToneColor="#d4380d"
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ height : 'fit' }}>
      <div style={{display: 'none'}}><ComponentToPrint data={selectedBill} ref={componentRef} /></div>
      <Modal
        title="Update PaymentData"
        open={isModalOpen}
        onOk={handleUpdateBill}
        onCancel={() => {
          setChequeNo("");
          setPaymentDate(moment());
          setIsModalOpen(false);
        }}
        confirmLoading={isLoading}
      >
        <Row gutter={12}>
          <Col span={12}>
            <Input
              placeholder="Cheque No"
              value={chequeNo}
              onChange={(e) => setChequeNo(e.target.value)}
            />
          </Col>
          <Col span={12}>
            <DatePicker
              placeholder="Select Payment date"
              value={paymentDate}
              onChange={(date) => setPaymentDate(date)}
            />
          </Col>
        </Row>
      </Modal>
      
      <Table
        columns={columns}
        dataSource={cardData}
        loading={loading}
        bordered
      />
    </div>
  );
};

export default ViewBills;
