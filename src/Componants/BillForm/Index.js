/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import { Button, Form, notification } from "antd";
import React, { useEffect, useState } from "react";
import InvoiceFields from "./InvoiceFields";
import VehicleDetails from "./VehicleDetails";
import ReceiverFields from "./ReceiverFields";
import {
  addData,
  getConditionalData,
  updateData,
} from "../../helper/FirebaseHelper";
import ProductsFields from "./ProductsFields";
import { priceCalculator, stateData } from "../../helper";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

export const selectedState = (code) => {
  return stateData.find((data) => data.value === code);
};

const BillForm = () => {
  const [billFormRef] = Form.useForm();
  const [receiverDropdown, setReceiverDropdown] = useState([]);
  const [receiverData, setReceiverData] = useState([]);
  const [productsNames, setProductNames] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedReceiver, setSelectedReceiver] = useState({});
  const [editBillData, setEditBillData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getReceiverData = () => {
    getConditionalData("receiver").then((data) => {
      setReceiverData(data);
      const updatedData = data.map((data) => ({
        label: data.name,
        value: data.id,
      }));
      setReceiverDropdown(updatedData);
    });
    getConditionalData("products").then((data) => {
      setProductNames(data);
    });
  };

  const prefilledBillValues = (data = {}) => {
    billFormRef.resetFields();
    if (data) {
      setEditBillData(data);
      const receiverDetail = receiverData.find(
        (val) => val.id === data?.receiverName?.value
        );
      setSelectedReceiver(receiverDetail);
      billFormRef.setFieldsValue({
        ...data,
        invoiceDate: moment.unix(data.invoiceDate?.seconds) || moment(),
        product: data?.products || [],
      });
    }
  };

  useEffect(() => {
    if (location.state && typeof location.state !== "string") {
      prefilledBillValues(location.state);
    } else {
      setEditBillData(false);
      billFormRef.resetFields();
    }
  }, []);

  useEffect(() => {
    getReceiverData();
  }, []);

  const handleSubmitForm = async (values) => {
    setIsLoading(true)
    const selectedStateData = editBillData
      ? { label: values?.state?.label, value: values?.state?.value }
      : {
          label: selectedState(values?.state)?.label,
          value: selectedState(values?.state)?.value,
        };
    const selectedReceiverName = {
      label: selectedReceiver?.name,
      value: selectedReceiver?.id,
    };
    // Manipulate Product array
    const arr = values?.product || [];
    const updateProducts = [];
    let i = 0;
    do {
      const assembleValue = priceCalculator.assembleValue(
        arr[i]?.quantity,
        arr[i]?.price
      );
      const assembleIgst = priceCalculator.igst(assembleValue, arr[i]?.gst);
      const totalProductPrice =
        (parseFloat(assembleValue) + parseFloat(assembleIgst)).toFixed(2) || 0;
      const pObj = {
        ...arr[i],
        assembleIgst: assembleIgst,
        assembleValue: assembleValue,
        hsn:
          editBillData && typeof arr[i]?.name?.label === "string"
            ? productsNames.find((val) => val.label === arr[i]?.name?.label)
                ?.hsn
            : productsNames.find((val) => val.label === arr[i]?.name)?.hsn,
        isIGSTIN: arr[0]?.isIGSTIN || false,
        name:
          editBillData && typeof arr[i]?.name?.label === "string"
            ? {
                label: arr[i]?.name?.label || "",
                value: arr[i]?.name?.label || "",
              }
            : {
                label: arr[i]?.name || "",
                value: arr[i]?.name || "",
              },
        totalProductPrice: totalProductPrice,
        unit:
          editBillData && typeof arr[i]?.unit?.label === "string"
            ? {
                label: arr[i]?.unit?.label || "",
                value: arr[i]?.unit?.label || "",
              }
            : {
                label: arr[i]?.unit || "",
                value: arr[i]?.unit || "",
              },
      };
      updateProducts.push(pObj);
      i++;
    } while (i < arr.length);

    const totalSum = updateProducts.reduce((acc, item) => {
      return parseFloat(acc) + parseFloat(item.totalProductPrice);
    }, 0);

    const totalGstIn = updateProducts.reduce((acc, item) => {
      return parseFloat(acc) + parseFloat(item.assembleIgst);
    }, 0);

    const obj = {
      ...values,
      invoiceDate: values?.invoiceDate.toDate(),
      state: selectedStateData || "-",
      receiverName: selectedReceiverName || "-",
      receiverState: selectedReceiver?.state || "-",
      receiverStateCode: selectedReceiver?.stateCode || "-",
      products: updateProducts || "-",
      totalSum: totalSum.toFixed(2) || "-",
      totalGstIn: totalGstIn.toFixed(2) || "-",
      isIGSTIN: updateProducts[0].isIGSTIN || false,
      status: "pending",
    };
    delete obj.product;

    try {
      if (editBillData && Object.keys(editBillData).length > 0) {
        if(!selectedReceiver) {
          obj.receiverName = editBillData?.receiverName || {};
          obj.receiverState = editBillData?.receiverState;
          obj.receiverStateCode = editBillData?.receiverStateCode;
        }
        await updateData('bills', editBillData?.id, obj).then(res => {
          notification.success({message:'data updated successfully'});
          setIsLoading(false)
          navigate('/view-bills');
        })
      } else {
        await addData("bills", obj).then(res => {
          setIsLoading(false)
          notification.success({ message: "data added successfully" });
        });
      }
      billFormRef.resetFields();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error adding buyer:", error);
    }
  };

  const handleSelectReceiver = (value) => {
    const receiverDetail = receiverData.find((val) => val.id === value);
    setSelectedReceiver(receiverDetail);
    billFormRef.setFieldsValue({
      receiverAddress: receiverDetail?.address,
      receiverState: receiverDetail?.stateCode,
      receiverGSTIN: receiverDetail?.gstin,
      receiverPan: receiverDetail?.pan,
    });
  };

  const handleSelectProduct = (value) => {
    const selectedProduct = productsNames.find((val) => val.label === value);
    setSelectedProduct(selectedProduct);
    return selectedProduct;
  };

  return (
    <div>
      <Form onFinish={handleSubmitForm} form={billFormRef}>
        <InvoiceFields />
        <VehicleDetails />
        <ReceiverFields
          receiverDropdown={receiverDropdown}
          handleSelectReceiver={handleSelectReceiver}
        />
        <ProductsFields
          form={billFormRef}
          productData={productsNames}
          selectedProduct={selectedProduct}
          handleSelectProduct={handleSelectProduct}
        />
        <Form.Item>
          <Button loading={isLoading} disabled={isLoading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BillForm;
