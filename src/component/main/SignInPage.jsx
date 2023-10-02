import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link as Linkroute, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { signin } from '../../Slice/authSlice';
const SignInPage = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const onFinish = (values) => {
        const getData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/user?email=${values.email}`)
                // console.log(response.data)
                return response.data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getData().then((res) => {
            console.log(res)
            if (res != 0) {
                console.log(res)
                if (res[0].password == values.password) {
                    toast.success('Login successfully')
                    navigate("/")
                    dispatch(signin(res[0])) 
             
                }
                else {
                    toast('Mật khẩu sai, vui lòng nhập lại')
                }
            }
            else {
                toast('bạn chưa có tài khoản với Email này!')
            }
        })
        .catch((err) => {
            toast.error('Failed data:' + err.message)
        })

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className=' md:flex justify-center bg-white p-10'>
                <div className='md:w-[50%] md:border-r-2 px-5'>
                    <h1 className='text-center text-[20px] pt-6 text-red-500'>Bạn đã có tài khoản SENDO</h1>
                    <p className='text-center text-[14px] px-6'>Nếu bạn đã có tài khoản, hãy đăng nhập để nhận được những ưu đãi tốt hơn!</p>
                    <Form className='w-full   '
                        name="basic"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        // style={{
                        //     maxWidth: 600,
                        // }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                    type: 'email'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button className="bg-red-500 text-white font-bold" htmlType="submit">
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='md:w-[50%] px-5'>
                    <h1 className='text-center text-[20px] pt-6 text-red-500'>Khách hàng mới của SENDO</h1>
                    <p className='text-center text-[14px] px-6'>Nếu bạn chưa có tài khoản trên sendo.vn, hãy sử dụng tùy chọn này để truy cập biểu mẫu đăng ký.
                        Bằng cách cung cấp cho Sendo thông tin chi tiết của bạn, quá trình mua hàng trên sendo.vn sẽ là một trải nghiệm thú vị và nhanh chóng hơn!</p>

                    <div className='flex justify-center'>
                        <Linkroute to={"/signup"}>
                            <Button className="bg-red-500 text-white font-bold" htmlType="submit" >
                                Đăng ký
                            </Button>
                        </Linkroute>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignInPage;