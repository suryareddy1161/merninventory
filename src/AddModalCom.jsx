import { Button, Modal } from "antd";
import axios from "axios";
import { Form, Input,  } from "antd";
import { useState,  } from "react";
// import "antd/dist/antd.css";
import 'antd/dist/antd.min.css';
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

const AddModalCom = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const onFinish = async (values) => {
    console.log(values);
    await axios
      .post("http://localhost:8080/company", values)
      .then((res) => {
        alert("Record Saved");
        console.log("post", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <>
      <Button onClick={showModal}>Add Company</Button>
      <Modal
        title="Add Company"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="CompName"
            label="Company Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="BusType"
            label="Businss Type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Contact"
            label="Contact No."
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
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={onFinish}>
              Submit
            </Button>
          </Form.Item>
        </Form>

      </Modal>
    </>
  );
};

export default AddModalCom;