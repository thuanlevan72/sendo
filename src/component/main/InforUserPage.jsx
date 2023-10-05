import {
  AiOutlineFieldTime,
  AiOutlineHeart,
  AiOutlineSafetyCertificate,
  AiOutlineShop,
} from "react-icons/ai";
import { RiFileList3Line } from "react-icons/ri";
import { MdOutlinePlace } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";
import { TbDiscount2 } from "react-icons/tb";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { BsLink45Deg } from "react-icons/bs";
import "dayjs/locale/zh-cn";
import moment from "moment";
import { Button, Form, Input, DatePicker, Radio } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
const InforUserPage = () => {
  let initValues = JSON.parse(localStorage.getItem("user"));
  const currentUser = useSelector((state) => state.auth.currentUser);
  const putData = async (id, cartItem) => {
    try {
      const response = await axios.put(
        `https://api-sendo.vercel.app/user/${currentUser.id}`,
        cartItem
      );
      return response.data;
    } catch (err) {
      console.error("Error posting data:", err);
    }
  };

  const onFinish = (values) => {
    console.log(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.dir(initValues);
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="bg-gray-50 pt-2">
        <div className="mx-0 md:mx-1 lg:mx-2 xl:mx-5 px-3 md:px-5 lg:px-10 flex ">
          <div className="leftContainer w-[20%] border-r border-gray-300 ">
            <div className="flex items-center">
              <img
                className="w-10 h-10 p-1 border-solid border border-[#e7e7e7] rounded-full"
                src="data:image/gif;base64,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"
                alt=""
              />
              <div className="leading-6 pl-2">
                <p className="m-0 font-bold text-[14px]">Phạm Thị Hiền</p>
                <p className="m-0 text-gray-500">Chỉnh sửa tài khoản</p>
              </div>
            </div>
            <div className="pt-4">
              <h1 className="m-0  border-l-2 border-red-500 pl-2 text-[14px] font-bold bg-gray-100">
                Quản lý giao dịch
              </h1>
            </div>
            <div className="pl-4 py-2 text-[14px] text-gray-500">
              <li className="flex items-center hover:text-red-600">
                <RiFileList3Line className="mr-2" />
                Đơn hàng
              </li>
              <li className="flex items-center hover:text-red-600">
                <AiOutlineFieldTime className="mr-2" />
                Đơn hàng dịch vụ tiện ích
              </li>
              <li className="flex items-center hover:text-red-600">
                <AiOutlineSafetyCertificate className="mr-2" />
                Tài khoản Senpay
              </li>
              <li className="flex items-center hover:text-red-600">
                <MdOutlinePlace className="mr-2" />
                Địa chỉ nhận hàng
              </li>
              <li className="flex items-center hover:text-red-600">
                <AiOutlineHeart className="mr-2" />
                Sản phẩm yêu thích
              </li>
            </div>

            <div className="pt-4">
              <h1 className="m-0 border-l-2 border-red-500 pl-2 text-[14px] font-bold bg-gray-100">
                Quản lý tài khoản
              </h1>
            </div>
            <div className="pl-4 py-2 text-[14px] text-gray-500">
              <li className="flex items-center hover:text-red-600">
                <FaPenToSquare className="mr-2" />
                Thông tin tài khoản
              </li>
              <li className="flex items-center hover:text-red-600">
                <AiOutlineShop className="mr-2" />
                Shop yêu thích
              </li>
              <li className="flex items-center hover:text-red-600">
                <TbDiscount2 className="mr-2" />
                Ưu đãi của tôi
              </li>
              <li className="flex items-center hover:text-red-600">
                <HiOutlineChatAlt2 className="mr-2" />
                Hỏi đáp
              </li>
              <li className="flex items-center hover:text-red-600">
                <BsLink45Deg className="mr-2" />
                Liên kết mạng xã hội
              </li>
            </div>
          </div>
          <div className="rightContainer pl-3 w-[80%] ">
            <div className="bg-white border-t  ">
              <h1 className="text-[20px] text-center pt-5">
                Thông tin tài khoản
              </h1>
              <Form
                className="py-4 m-auto"
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
                  name: initValues.name,
                  email: initValues.email,
                  phone: initValues.phone,
                  gender: initValues.gender,
                  date: moment(initValues.date),
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                <Form.Item
                  label="Họ tên"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}>
                  <Input />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please input your email!",
                    },
                  ]}>
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Ngày sinh"
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: "Please input your birthday",
                    },
                  ]}>
                  <DatePicker />
                </Form.Item>

                {/* <Form.Item
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
                                </Form.Item> */}

                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone",
                    },
                  ]}>
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
                  }}>
                  <Button
                    className="bg-red-500 text-white font-bold"
                    htmlType="submit">
                    Cập nhật
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default InforUserPage;
