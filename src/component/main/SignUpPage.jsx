import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Input, DatePicker, Radio } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const SignUpPage = () => {

    const navigate= useNavigate()
    const onFinish = (values) => {
        //  sendValue(values)
        console.log(values)
      
       
       const getData = async () => {
        try {
            const response = await axios.post('http://localhost:5000/user',values)
            // console.log(response.data)
            return response.data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
        getData().then((res) => {
            toast.success('Register successfully')
            navigate("/signin")
        }).catch((err) => {
            toast.error('Failed:' + err.message)
        })

    };

    return (
        <div className='mt-10 '>
            <div className='bg-white w-[80%] md:w-[50%] rounded-lg mx-auto py-10 px-10'>
                <h1 className='text-center text-[20px] pb-2 text-red-500 uppercase'>Đăng ký</h1>
                <Form
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: false,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Họ tên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Please input your email!'
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
                                message: 'Please input your password!'
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Ngày sinh"
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your birthday'
                            }
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone',

                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Giới tính"
                        name="gender"
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                        <Radio.Group>
                            <Radio value="nam"> Nam </Radio>
                            <Radio value="nữ"> Nữ </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button className="bg-red-500 text-white font-bold" htmlType="submit">
                            Đăng ký
                        </Button>

                    </Form.Item>
                </Form>
            </div>
        </div>
    )
};
export default SignUpPage;