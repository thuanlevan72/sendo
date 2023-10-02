import { Input, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa6";
import { MdPayment, MdPlace } from "react-icons/md";
import { TbDiscount2, TbTruckDelivery } from "react-icons/tb";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";

const CheckOut = () => {
    const product = useSelector((state) => state.checkOut)
    let currentUser = useSelector((state) => state.auth.currentUser);
    // console.log(product);

    const [borderPayNow, setBorderPayNow] = useState('solid')
    const [borderPayLater, setBorderPayLater] = useState('')
    const [colorPayNow, setColorPayNow] = useState('red')
    const [colorPayLater, setColorPayLater] = useState('gray')
    const [showPayNow, setShowPayNow] = useState(true)
    const [showPayLater, setShowPayLater] = useState(false)
    const handlePayNow = () => {
        setBorderPayNow('solid')
        setBorderPayLater('')
        setColorPayLater('gray')
        setColorPayNow('red')
        setShowPayNow(true)
        setShowPayLater(false)
    }
    const handlePayLater = () => {
        setBorderPayNow('')
        setBorderPayLater('solid')
        setColorPayNow('gray')
        setColorPayLater('red')
        setShowPayNow(false)
        setShowPayLater(true)
    }
    return (
        <div className='mx-0 md:mx-1 lg:mx-2 xl:mx-5 px-3 md:px-5 lg:px-10'>
            <div className="px-2 bg-white shadow">
                <h1 className=" uppercase text-[16px] ">
                    Xác nhận- Thanh toán
                </h1>
            </div>
            <div className="mt-3 md:flex gap-2">
                <div className="checkoutLeft md:w-[65%]">
                    <div className="address bg-white rounded shadow">
                        <div className="flex bg-gradient-to-r rounded-t from-red-100 to-white px-2 justify-between items-center">
                            <div className="text-[16px] font-medium flex items-center py-2">
                                <MdPlace className=" text-red-500 mr-1 text-[18px]" />
                                Địa chỉ nhận hàng
                            </div>
                            <div className="text-red-500 text-[14px] flex items-center">
                                Thay đổi
                                <AiFillCaretRight className="ml-1" /></div>
                        </div>
                        <div className="p-2 text-[14px] ">
                            <span className="font-medium pr-2">{currentUser.name}</span>
                            <span className="pl-2 border-l border-gray-500 text-gray-500">{currentUser.phone}</span>
                            <div className="text-gray-500">
                                {currentUser.address}
                            </div>
                        </div>
                    </div>
                    <div className="delivery bg-white rounded mt-3 shadow">
                        <div className="bg-gradient-to-r rounded-t from-red-100 to-white px-2 ">
                            <div className="text-[16px] font-medium flex items-center py-2">
                                <TbTruckDelivery className=" text-red-500 mr-1 text-[18px]" />
                                Phương thức giao hàng
                            </div>

                        </div>
                        <div className="p-2 text-[14px]">
                            <p className="font-medium m-0">Giao tiêu chuẩn</p>
                            <p className="m-0 text-gray-500">Dự kiến thứ 3, 2/9</p>
                            <div className="text-gray-500">
                                <Radio.Group >
                                    <Radio value={1} className="w-full p-2">
                                        <div>
                                            <p className="font-medium m-0">Từ thứ 2 -thứ 6 (8-18h)</p>
                                            <p className="m-0 text-gray-500">Phù hợp với địa chỉ cơ quan, văn phòng</p>
                                        </div>
                                    </Radio>
                                    <Radio value={2} className="w-full p-2">
                                        <div>
                                            <p className="font-medium m-0">Cả tuần (trừ CN & ngày lễ)</p>
                                            <p className="m-0 text-gray-500">Phù hợp với địa chỉ nhà riêng, luôn có người nhận. Giao hàng từ 8:00 - 18:00</p>
                                        </div>
                                    </Radio>
                                </Radio.Group>
                            </div>
                        </div>
                    </div>
                    <div className="payment bg-white rounded mt-3 shadow">
                        <div className="bg-gradient-to-r rounded-t from-red-100 to-white px-2 ">
                            <div className="text-[16px] font-medium flex items-center py-2">
                                <MdPayment className=" text-red-500 mr-1 text-[18px]" />
                                Phương thức thanh toán
                            </div>
                        </div>
                        <div className="px-2 pt-2 text-[14px] flex justify-start border-b">
                            <li className='m-0 cursor-pointer list-none px-4 font-medium' style={{ color: `${colorPayNow}`, borderBottom: `2px ${borderPayNow} red` }} onClick={handlePayNow}>
                                Trả thẳng
                            </li>
                            <li className='m-0 cursor-pointer list-none px-4 font-medium' style={{ color: `${colorPayLater}`, borderBottom: `2px ${borderPayLater} red` }} onClick={handlePayLater}>
                                Mua trước trả sau
                            </li>
                        </div>
                        {showPayNow &&
                            <div className="px-4 mt-4 w-full " id="paynow">
                                <Radio.Group className="w-full ">
                                    <div className="rounded shadow w-full p-2 mt-1">
                                        <Radio value={3} className="w-full">
                                            <div className="font-medium">Tiền mặt(COD)</div>
                                            <div className="text-gray-500 text-[12px]">Phí thu hộ: Miễn phí</div>
                                        </Radio>
                                    </div>
                                    <div className="rounded shadow w-full p-2 mt-2">
                                        <Radio value={4} className="w-full">
                                            <div className="font-medium">Ví Senpay</div>
                                            <div className="text-gray-500 text-[12px]">Số dư: 0đ</div>
                                        </Radio>
                                    </div>
                                    <div className="rounded shadow w-full p-2 mt-2">
                                        <Radio value={5} className="w-full">
                                            <div className="font-medium">Thanh toán kết hợp</div>
                                            <div className="text-gray-500 text-[12px]">Số dư trong Ví Senpay phải có ít nhất 1.000đ để thanh toán. </div>
                                        </Radio>
                                    </div>
                                </Radio.Group>
                            </div>
                        }

                        {showPayLater &&
                            <div className="px-4 mt-4 w-full " id="paynow">
                                <Radio.Group className="w-full ">
                                    <div className="rounded shadow w-full p-2 mt-1">
                                        <Radio value={3} className="w-full">
                                            <div className="font-medium">TKredivo</div>
                                            <div className="text-gray-500 text-[12px]">Lưu ý: Kiểm tra hạn mức ở tài khoản Kredivo của bạn trước khi thanh toán</div>
                                        </Radio>
                                    </div>

                                </Radio.Group>
                            </div>
                        }
                        <div className="w-full flex justify-center pt-3">
                            <button className="mt-4 text-[18px] text-gray-700 font-bold px-[100px] py-2 bg-gray-300 rounded m-auto">Thêm phương thức khác</button>
                        </div>
                        <div className="flex justify-center gap-2 mt-2 pb-6">
                            <img src="https://media3.scdn.vn/img4/2021/08_09/qIIWONXoKSmIyMqi1x0p.png" alt="" className="w-[30px] h-[30px] " />
                            <img src="	https://media3.scdn.vn/img4/2021/08_09/V34jyhlvVafDlGq0z8vk.png" alt="" className="w-[30px] h-[30px]" />
                            <img src="	https://media3.scdn.vn/img4/2021/08_09/ZLcKkkyD3cfygVcrfI9R.png" alt="" className="w-[30px] h-[30px]" />
                            <img src="https://media3.scdn.vn/img4/2021/08_09/b1FgApo9krOeImlPAHJq.png" alt="" className="w-[30px] h-[30px]" />
                            <img src="	https://media3.scdn.vn/img4/2021/08_09/ACZZo7BchIz2wW3mYiBq.png" alt="" className="w-[30px] h-[30px]" />
                            <img src="	https://media3.scdn.vn/img4/2021/08_09/gt2XsOs28xo0GXzi8xYG.png" alt="" className="w-[30px] h-[30px]" />
                            <img src="	https://media3.scdn.vn/img4/2021/08_09/8ZTe1mKibhY4nT4VCC5F.png" alt="" className="w-[30px] h-[30px]" />
                            <img src="https://media3.scdn.vn/img4/2021/11_01/9h9J2A887ybJNDVdMI5y.png" alt="" className="w-[30px] h-[30px]" />
                            <img src="https://media3.scdn.vn/img4/2022/05_23/Bi78sj9Rf960TB34S6wE.png" alt="" className="w-[30px] h-[30px]" />
                        </div>
                    </div>
                </div>
                <div className="checkoutRight md:w-[35%]">
                    <div className="promotion bg-white rounded shadow">
                        <div className=" bg-gradient-to-r rounded-t from-red-100 to-white px-2 ">
                            <div className="text-[16px] font-medium flex items-center py-2">
                                <TbDiscount2 className=" text-red-500 mr-1 text-[18px]" />
                                Mã ưu đãi Sendo
                            </div>
                        </div>
                        <div className="p-2 text-[14px] py-[14px]">
                            <p className="m-0 font-medium rounded text-center py-2 text-blue-600 border border-dashed"> Chọn/Nhập mã</p>
                        </div>
                    </div>
                    <div className="order bg-white rounded shadow ">
                        <div className=" bg-gradient-to-r rounded-t from-red-100 to-white px-2 ">
                            <div className="text-[16px] font-medium flex items-center py-2">
                                <FaClipboardList className=" text-red-500 mr-1 text-[18px]" />
                                Thông tin đơn hàng
                            </div>
                        </div>
                        <div className="p-2 text-[14px] py-[14px]">
                            <p>Bán bởi shop: {product.brand} </p>
                            <div className="flex">
                                <img className="w-[50px] h-[50px] mr-3" src={product.image} alt="" />
                                <div className="w-full" >
                                    <p className="mb-1">{product.title}</p>
                                    <div className="flex justify-between">
                                        <div className="flex">
                                            <h1 className="text-[16px] font-bold m-0 text-red-500">
                                                <NumericFormat
                                                    type="text"
                                                    value={product.price * 10000}
                                                    thousandsGroupStyle="thousand"
                                                    thousandSeparator="."
                                                    decimalSeparator=","
                                                    suffix={"đ"}
                                                    displayType="text"
                                                />
                                            </h1>
                                            <p>
                                                <NumericFormat
                                                    type="text"
                                                    value={product.price / (100 - product.discountPercentage) * 100 * 10000}
                                                    thousandsGroupStyle="thousand"
                                                    thousandSeparator="."
                                                    decimalSeparator=","
                                                    suffix={"đ"}
                                                    decimalScale={0}
                                                    displayType="text"
                                                    className="line-through text-gray-500 "
                                                />
                                            </p>
                                        </div>
                                        <div className="font-medium">x{product.quantity}</div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="flex  rounded-t  px-2 justify-between items-center">
                                <div className="text-[16px] font-medium flex items-center py-2">
                                    <TbDiscount2 className=" text-red-500 mr-1 text-[18px]" />
                                    Mã giảm giá của Shop
                                </div>
                                <div className="text-red-500 text-[14px] flex items-center">
                                    Chọn/ Nhập mã</div>
                            </div>
                        </div>
                        <hr />
                        <div className="p-4">
                            <TextArea
                                placeholder="Ghi chú cho Shop"
                                autoSize={{
                                    minRows: 3,
                                    maxRows: 5,
                                }}
                            />
                        </div>
                    </div>

                    <div className="total bg-white rounded shadow ">
                        <div className="p-2 ">
                            <div className="flex justify-between">
                                <p className="m-0 text-[14px]">Tiền hàng</p>
                                <h1 className="text-[14px] m-0 font-bold">
                                    <NumericFormat
                                        type="text"
                                        value={product.price * product.quantity * 10000}
                                        thousandsGroupStyle="thousand"
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        suffix={"đ"}
                                        displayType="text"
                                    />
                                </h1>
                            </div>
                            <div className="flex justify-between">
                                <p className="m-0 text-[14px]">Phí giao hàng</p>
                                <h1 className="text-[14px] m-0 font-bold">
                                    <NumericFormat
                                        type="text"
                                        value="30.000đ"
                                        thousandsGroupStyle="thousand"
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        suffix={"đ"}
                                        displayType="text"
                                    />
                                </h1>
                            </div>
                            <hr className="my-2"/>
                            <div className="flex justify-between">
                                <p className="m-0 text-[14px]">Tổng thanh toán</p>
                                <h1 className="text-[16px] text-red-500 font-bold">
                                    <NumericFormat
                                        type="text"
                                        value={product.price * product.quantity * 10000 + 30000}
                                        thousandsGroupStyle="thousand"
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        suffix={"đ"}
                                        displayType="text"
                                    />
                                </h1>
                            </div>
                            <button className="bg-red-500 w-full text-white font-bold text-[16px] rounded h-12">Thanh toán</button>
                              
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default CheckOut;