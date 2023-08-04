import { Col, Divider, Form, Input, Row, Select } from "antd";
import React from "react";
import { stateData } from "../../helper";
import TextArea from "antd/lib/input/TextArea";

const ReceiverFields = ({ receiverDropdown, handleSelectReceiver }) => {
  const { Option } = Select;
  return (
    <>
      <Divider orientation="left" style={{ fontSize: 20, fontWeight: "bold" }}>
        Receiver Details
      </Divider>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="receiverName"
            label="Select Name"
            rules={[
              {
                required: true,
                message: "Please select name",
              },
            ]}
          >
            <Select
              showSearch
              filterOption={(input, option) => (option?.children ?? '').toLowerCase().includes(input.toLowerCase())}
              placeholder="Select name"
              allowClear
              onChange={handleSelectReceiver}
            >
              {receiverDropdown.map((val) => (
                <Option key={val.value} value={val.value}>
                  {val.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="receiverAddress" label="Receiver Address">
            <TextArea rows={4} placeholder="Receiver Address" maxLength={6} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="receiverState"
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
        <Col span={8}>
          <Form.Item name="receiverGSTIN" label="Receiver GSTIN">
            <Input placeholder="Please input receiver gst" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="receiverPan" label="Receiver PAN">
            <Input placeholder="Please input receiver PAN" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default ReceiverFields;
