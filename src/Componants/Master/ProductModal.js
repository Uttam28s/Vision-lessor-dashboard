/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Form, Input, Row, Select, Tag, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { stateData } from "../../helper";
import { PlusCircleOutlined } from "@ant-design/icons";

const ProductsModal = ({ data, handleSubmitProduct, isLoading }) => {
  const [units, setUnits] = useState([])
  const [productForm] = Form.useForm();
  const { Option } = Select;

  useEffect(() => {
    if(data) {
      productForm.setFieldsValue({
        ...data,
        unit: ''
      })
      setUnits(data?.unit)
    }
  }, [data])
  
  const handleAddUnits = () => {
    const unitData = productForm.getFieldValue('unit') 
    if(unitData){
      const copyArray = [...units, {label: unitData, value: unitData}]
      setUnits(copyArray);
      productForm.setFieldValue('unit', '');
    }
  }

  return (
    <div>
      <Form
        onFinish={(value) => handleSubmitProduct(value, units, data)}
        layout="vertical"
        form={productForm}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="label" label="Product Name.">
              <Input placeholder="Please input Product Name." />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="hsn" label="Product Hsn.">
              <Input placeholder="Please input Product Hsn." />
            </Form.Item>
          </Col>
          <Col style={{display: "flex", alignItems: 'center', justifyContent:'space-between'}} span={24}>
            <Form.Item style={{width: '88%'}} name="unit" label="Product Unit.">
              <Input placeholder="Please input Product Unit." />
            </Form.Item>
            <div>
              <Tooltip placement="top" title="Add Unit">
                <Button type="primary" shape="circle" icon={<PlusCircleOutlined />} onClick={handleAddUnits}/>
              </Tooltip>
            </div>
          </Col>
          <Col span={24}>
          <Form.Item>
            <h6>Unit's list</h6>
            {units?.map(val => (
              <Tag color='blue'>{val?.label}</Tag>
            ))}
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

export default ProductsModal;
