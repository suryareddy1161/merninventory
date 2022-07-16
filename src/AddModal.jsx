import { Button, Modal } from "antd";

import { useDispatch } from "react-redux";
import {  increment, } from "./reducers/Dataslice";
import { Form, Input, Select } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
// import "antd/dist/antd.css";


const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const AddModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [company, setCompany] = useState([]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // console.log(e);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [form] = Form.useForm();

  //for comapny dropdown list
  useEffect(() => {
    axios
      .get("http://localhost:8080/company")
      .then((res) => {
        setCompany(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const dispatch=useDispatch()
  // console.log("Company=", company);
  const onFinish = async (values) => {

    console.log(values);
    await axios
      .post("http://localhost:8080", values)
      .then((res) => {
        dispatch(increment())
        alert("Record Saved");
        console.log("post", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <>
      <Button
        variant="contained"
        style={{
          color: "white",
          backgroundColor: "black",
        }}
        onClick={showModal}
      >
        Add Inventry
      </Button>

      <Modal
        title="Add Items"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Item Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="qty"
            label="Quantity"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="catagory"
            label="Catagory"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gender !== currentValues.gender
            }
          ></Form.Item>

          <Form.Item label="Company">
            <Input.Group compact></Input.Group>
            <Form.Item
              name="company"
              noStyle
              rules={[{ required: true, message: "Address is required" }]}
            >
              <Select placeholder="Select province">
                {company.map((compa) => (
                  <Option value={compa.CompName}>{compa.CompName}</Option>
                ))}
              </Select>
            </Form.Item>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              variant="contained"
              style={{
                color: "white",
                backgroundColor: "black",
              }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>

      </Modal>
    </>
  );
};

export default AddModal;