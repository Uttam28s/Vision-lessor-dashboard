import { Col, Divider, Form, Input, Row } from "antd";
import React from "react";

const VehicleDetails = () => {
  return (
    <>
      <Divider
        orientation="left"
        style={{ fontSize: 20, fontWeight: "bold" }}
      >
        Vehicle Details
      </Divider>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="transporterName"
            label="Transporter Name"
            rules={[
              {
                required: true,
                message: "Please input transporter name",
              },
            ]}
          >
            <Input placeholder="Please input transporter name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="vehNo"
            label="Vehicle No"
            rules={[
              {
                required: true,
                message: "Please input vehicle number",
              },
            ]}
          >
            <Input placeholder="Please input vehicle number" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default VehicleDetails;
