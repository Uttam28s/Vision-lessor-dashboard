/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { useEffect } from "react";
import { stateData } from "../../helper";

const ReceiversModal = ({ data, handleSubmitReceiver, isLoading }) => {
  const [receiverForm] = Form.useForm();
  const { Option } = Select;

  useEffect(() => {
    if(data) {
      receiverForm.setFieldsValue({
        ...data,
        state: data?.stateCode
      })
    }
  }, [data])
  
  return (
    <div>
      <Form
        onFinish={handleSubmitReceiver}
        layout="vertical"
        form={receiverForm}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="name" label="Receiver Name.">
              <Input placeholder="Please input Receiver Name." />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="address" label="Receiver Address.">
              <Input placeholder="Please input Receiver Address." />
            </Form.Item>
          </Col>
          <Col span={24}>
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
          <Col span={24}>
            <Form.Item name="pan" label="Receiver Pan no.">
              <Input placeholder="Please input Receiver Pan no." />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="gstin" label="Receiver GSTIN.">
              <Input placeholder="Please input Receiver GSTIN." />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button loading={isLoading} disabled={isLoading} type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ReceiversModal;
