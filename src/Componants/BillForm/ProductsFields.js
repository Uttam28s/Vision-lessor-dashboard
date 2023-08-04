import { Button, Col, Divider, Form, Input, Row, Select, Switch } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const ProductsFields = ({ productData = [], handleSelectProduct, selectedProduct, form }) => {
  const [hsnValues, setHsnValues] = useState([]);
  const { Option } = Select;
  const handleProductChange = async (value, name, fieldPath) => {
    const selectProduct = await handleSelectProduct(value)
    hsnValues[fieldPath?.fieldKey] = selectProduct?.hsn;
    // form.resetFields()
    setHsnValues(hsnValues)
  }

  return (
    <>
      <Divider orientation="left" style={{ fontSize: 20, fontWeight: "bold" }}>
        Product Details
      </Divider>
      <Form.List name="product">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row
                key={key}
                style={{ marginBottom: 8, alignItems: "baseline" }}
                gutter={16}
              >
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    rules={[
                      { required: true, message: "Missing product name" },
                    ]}
                  >
                    <Select
                      filterOption={(input, option) =>
                        (option?.children ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      onChange={(value, option) =>
                        handleProductChange(value, name, restField)}
                      placeholder="Select product name"
                      allowClear
                    >
                      {productData.map((val) => (
                        <Option key={val.value} value={val.value}>
                          {val.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "quantity"]}
                    rules={[{ required: true, message: "Missing product quantity" }]}
                  >
                    <Input placeholder="Quantity" />
                  </Form.Item>
                </Col>
                {selectedProduct &&
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "unit"]}
                    rules={[{ required: true, message: "Missing product unit" }]}
                  >
                    <Select
                      filterOption={(input, option) =>
                        (option?.children ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      placeholder="Select product unit"
                      allowClear
                    >
                      {productData.find(val => val.label === form.getFieldValue(`product`)[restField?.fieldKey]?.name)?.unit?.map((val) => (
                        <Option key={val.value} value={val.value}>
                          {val.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>}
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "pice"]}
                    rules={[{ required: true, message: "Missing product pice" }]}
                  >
                    <Input placeholder="Qty In PCS / KG" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "price"]}
                    rules={[{ required: true, message: "Missing product rate" }]}
                  >
                    <Input placeholder="Rate" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "gst"]}
                    rules={[{ required: true, message: "Missing product gst" }]}
                  >
                    <Input placeholder="GST %" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    {...restField}
                    name={[name, "isIGSTIN"]}
                    label="isIGSTIN"
                  >
                    <Switch checked={form.getFieldValue(`product`)[0]?.isIGSTIN}/>
                  </Form.Item>
                </Col>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Row>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default ProductsFields;
