import { Col, DatePicker, Divider, Form, Input, Row, Select } from "antd";
import React from "react";
import { stateData } from "../../helper";

const InvoiceFields = () => {
  const { Option } = Select;
  return (
    <>
      <Divider
        orientation="left"
        style={{ fontSize: 20, fontWeight: "bold", marginTop: "0" }}
      >
        Invoice Details
      </Divider>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="invoiceNo"
            label="Invoice No"
            rules={[
              {
                required: true,
                message: "Please input Invoice No",
              },
            ]}
          >
            <Input placeholder="Please input Invoice No" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="kaneriaBillNo" label="Kaneria bill No.">
            <Input placeholder="Please input Kaneria bill No." />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="invoiceDate"
            label="Invoice Date"
            rules={[
              {
                required: true,
                message: "Please input Invoice Date",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="state"
            label="Select State"
            rules={[
              {
                required: true,
                message: "Please select state",
              },
            ]}
          >
            <Select placeholder="Select State" allowClear>
              {stateData.map((val) => (
                <Option key={val.value} value={val.value}>
                  {val.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default InvoiceFields;
