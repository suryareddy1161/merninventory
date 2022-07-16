import React from 'react';
import { Link } from "react-router-dom";
import 'antd/dist/antd.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";


import {
    Button,
    Checkbox,
    Form,
    Input,
    Select 
  } from 'antd';
  const { Option } = Select;

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 12,
      },
      sm: {
        span: 8,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  
  const Signup1 = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
  
    const onFinish = (values) => {
      console.log('Received values of form: ', values);

      if (
        values.name === "" ||
        values.email === "" ||
        values.password === "" ||
        values.password_confirmation === ""
      ) {
        alert("User Name and password should not be blank.");
        return;
      } else if (values.password !== values.password_confirmation) {
        alert("Password and confirm Password does not matched");
        return;
      }
      axios
        .post("http://localhost:8080/auth/signup", values)
        .then((res) => {
        //   setFlag(res);
          navigate("/signin");
          console.log("data recieved");
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
  
    return (
        <div style={{backgroundColor:"GrayText",height:"1000px"}}>
           <div style={{display:"flex" ,alignContent:"center",alignItems:"center",color:"blueviolet"}}>
           <h1 style={{color:"yellow",marginLeft:"30%"}} > Registration Form</h1>

           </div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >

        
<Form.Item
          name="first"
          label="Name"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: 'Please input your Name!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        
        
<Form.Item
          name="last"
          label="Surname"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: 'Please input your Name!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item
          name="password_confirmation"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
  
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name={"address"} label="Address"
        
        rules={[
            {
              required: true,
              message: 'Address is required',
            },
          ]}
        >
        <Input.TextArea />
      </Form.Item>
      
    <Form.Item
    label="Role"
            // name={['Role', 'province']}
            name={"role"}
            
            rules={[
              {
                required: true,
                message: 'Province is required',
              },
            ]}
          >
            <Select placeholder="Select Role">
              <Option value="admin">admin</Option>
              <Option value="user">user</Option>
            </Select>
          
          </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
          I have already account <Link to="/signin">click here</Link>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      </div>
    );
  };
  
  export default Signup1;