import { useDispatch, useSelector } from "react-redux";
import { Tooltip, Modal } from 'antd';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BsChatLeftText, BsChevronRight, BsDashLg, BsPlusLg } from "react-icons/bs";
import { Radio } from 'antd';
import { BiSolidDiscount } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md"
import { NumericFormat } from "react-number-format";
import { Link as Linkroute } from "react-router-dom";
import checkOutSlice from "../../Slice/checkOutSlice";
import cartSlice from "../../Slice/cartSlice";

const Cart = () => {
    const counter = useSelector((state) => state.cart.count)
    const currentUser = useSelector((state) => state.auth.currentUser);

    const [cartItem, setCartItem] = useState([])

    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/giohang?userId=${currentUser.id}`)
            return response.data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData()
            .then((data) => {
                setCartItem(data)
            }
            )
            .catch((err) => alert(err))
    }, [])

    const [total, setTotal] = useState(0);
    const [numberProduct, setNumberProduct] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState()

    const onChange = (e) => {
        let index = e.target.value;
        setSelectedIndex(index);
        getData()
            .then((data) => {
                // console.log(data)
                setCartItem(data)
            }
            )
            .catch((err) => alert(err))
        console.log(index, cartItem[index], cartItem[index].quantity)
        let total = cartItem[index].price * 10000 * cartItem[index].quantity;
        setTotal(total);
        setNumberProduct(cartItem[index].quantity)

    };

    const putData = async (id, cartItem) => {
        try {
            const response = await axios.put(`http://localhost:5000/giohang/${id}`, cartItem)
            return response.data
        }
        catch (err) {
            console.error('Error posting data:', err);
        }
    }

    const deleteData = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/giohang/${id}`)
            return response.data
        }
        catch (err) {
            console.error('Error posting data:', err);
        }
    }

    const inputRefs = useRef([]);
    const handlePlus = (index) => {
        let quantity = inputRefs.current[index].value;
        quantity++;
        inputRefs.current[index].value = quantity;
        putData(cartItem[index].id, { ...cartItem[index], quantity })
        getData()
            .then((data) => {
                setCartItem(data)
            }
            )
            .catch((err) => alert(err))
        let total = cartItem[index].price * 10000 * quantity;
        if (selectedIndex == index) {
            setTotal(total)
            setNumberProduct(quantity)
        }
    }

    const handleMinus = (index) => {
        let quantity = inputRefs.current[index].value;
        if (quantity > 1) {
            quantity--;
            inputRefs.current[index].value = quantity;
            putData(cartItem[index].id, { ...cartItem[index], quantity })
            getData()
                .then((data) => {
                    setCartItem(data)
                }
                )
                .catch((err) => alert(err))
            let total = cartItem[index].price * 10000 * quantity;

            if (selectedIndex == index) {
                setTotal(total)
                setNumberProduct(quantity)
            }
        }
    }

    const handleQuantityChange = (index) => {
        let quantity = parseInt(inputRefs.current[index].value)
        if (isNaN(quantity)) { quantity = 0 }
        putData(cartItem[index].id, { ...cartItem[index], quantity })
        getData()
            .then((data) => {
                setCartItem(data)
            }
            )
            .catch((err) => alert(err))
        let total = cartItem[index].price * 10000 * quantity;
        if (selectedIndex == index) {
            setTotal(total)
            setNumberProduct(quantity)
        }
    };

    const heart = <span>Yêu thích</span>;
    const dele = <span>Xóa</span>

    const [selectedColorIndices, setSelectedColorIndices] = useState([]);

    const handleColor = (index) => {
        console.log(index)
        if (selectedColorIndices.includes(index)) {
            setSelectedColorIndices(selectedColorIndices.filter(i => i !== index));
        } else {
            setSelectedColorIndices([...selectedColorIndices, index]);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [index, setIndex] = useState()

    const showModal = (index) => {
        setIndex(index)
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        dispatch(cartSlice.actions.countCartMinus())
        deleteData(cartItem[index].id)
        const updatedCart = cartItem.reduce((acc, currentValue, currentIndex) => {
            if (currentIndex != index) {
                acc.push(currentValue)
            }
            return acc;
        }, [])
        setCartItem(updatedCart)
    }

    const handleCancel = () => {
        setIsModalOpen(false);

    };
    const dispatch = useDispatch();
    const handleBuy = () => {
        if (selectedIndex == undefined) {
            alert('Vui lòng chọn sản phẩm')
        }
        else {
            const product = {
                title: cartItem[selectedIndex].title,
                quantity: cartItem[selectedIndex].quantity,
                price: cartItem[selectedIndex].price,
                brand: cartItem[selectedIndex].brand,
                image: cartItem[selectedIndex].images,
                discountPercentage: cartItem[selectedIndex].discountPercentage
            }
            dispatch(checkOutSlice.actions.checkOutChange(product))
        }
    }
    return (
        <>
            {cartItem == undefined || cartItem.length == 0 ? (
                <div className="mx-auto w-96 mt-20">
                    <img className="w-full" src="https://media3.scdn.vn/img4/2021/02_02/JikA6AqzCC55LcNmcHjZ.png" alt="" />
                    <h2 className="text-base font-bold text-center mt-4">Giỏ hàng cảm thấy trống trải</h2>
                    <h3 className="text-base font-normal text-center mt-4 text-gray-300">Ai đó ơi, mua sắm để nhận khuyến mãi từ Sendo ngay!</h3>
                    <div className=" flex justify-center">
                        <Linkroute to={'/'}>
                            <button className=" px-7 bg-red-500 rounded text-white font-bold text-sm py-3">Mua sắm ngay</button>
                        </Linkroute>
                    </div>
                </div>
            ) : (
                <div className="mx-0 md:mx-1 lg:mx-2 xl:mx-5 px-3 md:px-[16px] pt-[22px]">
                    <div className="title flex items-center mb-4">
                        <h1 className="text-[20px] font-bold mr-4 mb-0">Giỏ hàng của bạn ({counter})</h1>
                        {/* <button className="bg-white px-[20px] h-8 font-bold rounded text-[14px]">Sửa</button> */}
                    </div>
                    <div className="content flex gap-4">
                        <div className="list-product w-full md:w-[70%] ">
                            <Radio.Group onChange={onChange} className="w-full">
                                {cartItem.map((item, index) => {
                                    return (
                                        <div className="bg-white rounded-lg p-[10px] md:p-[20px] mb-4 w-full text-[14px]">
                                            <div className="shop-name flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <span><img className="w-5 h-5 mr-2" src={item.images} alt="" /> </span>
                                                    <h1 className="m-0 text-[14px] font-bold">{item.brand}</h1>
                                                </div>
                                                <div className="flex items-center text-[14px]">
                                                    <BsChatLeftText />
                                                    <h1 className="m-0 ml-2">Chat với Shop</h1>
                                                </div>
                                            </div>
                                            <div className="flex py-6 text-[14px]">
                                                <Radio value={index}>
                                                </Radio>
                                                <div className="hidden md:flex w-[100%] items-center justify-between">
                                                    <div className="lg:flex">
                                                        <img className="w-16 h-16 mx-3" src={item.images} alt="" />
                                                        <div className="w-[50%] m-0">
                                                            <p className="m-0 bg-blue-100 rounded-[20px] text-[12px] text-blue-800 font-bold px-2 w-[120px]">Mua trước trả sau</p>
                                                            <Linkroute to={`/productdetail/${item.idProduct}`} >
                                                                <h1 className="text-[14px] px-1 my-1">{item.title}</h1>
                                                            </Linkroute>
                                                        </div>
                                                    </div>
                                                    <div className="px-1 md:px-5 w-[120px]">
                                                        <h1 className="text-[16px] font-bold m-0">
                                                            <NumericFormat
                                                                type="text"
                                                                value={item.price * 10000}
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
                                                                value={item.price / (100 - item.discountPercentage) * 100 * 10000}
                                                                thousandsGroupStyle="thousand"
                                                                thousandSeparator="."
                                                                decimalSeparator=","
                                                                suffix={"đ"}
                                                                decimalScale={0}
                                                                displayType="text"
                                                                className="line-through text-gray-500 font-semibold"
                                                            />
                                                        </p>
                                                    </div>
                                                    <div className='flex items-center md:mr-3'>
                                                        <button className='px-2 bg-gray-200 rounded h-8 md:text-xl text-gray-400 mx-0.5 border hover:bg-gray-100' onClick={() => handleMinus(index)}> <BsDashLg /></button>
                                                        <button className='px-1 bg-white border border-gray-400 rounded w-15 h-8 mx-0.5 hover:border-blue-500 font-bold'>
                                                            <input
                                                                className="text-center"
                                                                defaultValue={item.quantity}
                                                                ref={(input) => (inputRefs.current[index] = input)}
                                                                type="number"
                                                                onChange={() => handleQuantityChange(index)}
                                                                min="1"
                                                                style={{ width: '33px', height: '30px', outline: 'none' }}
                                                            />
                                                        </button>
                                                        <button className='px-2 bg-gray-200 rounded h-8 md:text-xl text-gray-400 mx-0.5 border hover:bg-gray-100' onClick={() => handlePlus(index)}><BsPlusLg /></button>
                                                    </div>
                                                    <div className="flex md:px-3">
                                                        <Tooltip title={heart}>
                                                            <AiOutlineHeart
                                                                className="text-[20px] cursor-pointer md:mr-4"
                                                                style={{ color: selectedColorIndices.includes(index) ? 'red' : 'initial' }}
                                                                onClick={() => handleColor(index)}
                                                            />
                                                        </Tooltip>
                                                        <Tooltip title={dele}>
                                                            <MdDeleteOutline
                                                                className="text-[20px] cursor-pointer "
                                                                // onClick={() => handleDelete(index)} 
                                                                onClick={() => showModal(index)} />
                                                        </Tooltip>
                                                        <Modal
                                                            title="Xác nhận"
                                                            open={isModalOpen}
                                                            onOk={handleOk}
                                                            onCancel={handleCancel}
                                                            okText="Xóa"
                                                            cancelText="Thoát"
                                                            centered
                                                            okButtonProps={{
                                                                className: "bg-red-500 font-bold text-white hover:bg-red-400"
                                                            }}
                                                            cancelButtonProps={{
                                                                className: "border-none font-bold shadow-none"
                                                            }}
                                                            okType="none"
                                                        >
                                                            <p>Xóa sản phẩm khỏi giỏ hàng?</p>

                                                        </Modal>
                                                    </div>
                                                </div>
                                                <div className="w-[100%] md:hidden items-center justify-between">
                                                    <div className="flex">
                                                        <img className="w-16 h-16 mx-3" src={item.images} alt="" />
                                                        <div className="w-[50%] m-0">
                                                            <p className="m-0 bg-blue-100 rounded-[20px] text-[12px] text-blue-800 font-bold px-2 w-[120px]">Mua trước trả sau</p>
                                                            <Linkroute to={`/productdetail/${item.idProduct}`} >
                                                                <h1 className="text-[14px] px-1 my-1">{item.title}</h1>
                                                            </Linkroute>
                                                            <div className="px-1 md:px-5 w-[120px] flex align-center">
                                                                <h1 className="text-[16px] font-bold m-0">
                                                                    <NumericFormat
                                                                        type="text"
                                                                        value={item.price * 10000}
                                                                        thousandsGroupStyle="thousand"
                                                                        thousandSeparator="."
                                                                        decimalSeparator=","
                                                                        suffix={"đ"}
                                                                        displayType="text"
                                                                    />
                                                                </h1>
                                                                <p className="ml-2">
                                                                    <NumericFormat
                                                                        type="text"
                                                                        value={item.price / (100 - item.discountPercentage) * 100 * 10000}
                                                                        thousandsGroupStyle="thousand"
                                                                        thousandSeparator="."
                                                                        decimalSeparator=","
                                                                        suffix={"đ"}
                                                                        decimalScale={0}
                                                                        displayType="text"
                                                                        className="line-through text-gray-500 font-semibold"
                                                                    />
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex px-3">
                                                            <Tooltip title={heart}>
                                                                <AiOutlineHeart
                                                                    className="text-[20px] cursor-pointer mr-4"
                                                                    style={{ color: selectedColorIndices.includes(index) ? 'red' : 'initial' }}
                                                                    onClick={() => handleColor(index)}
                                                                />
                                                            </Tooltip>
                                                            <Tooltip title={dele}>
                                                                <MdDeleteOutline
                                                                    className="text-[20px] cursor-pointer "
                                                                    // onClick={() => handleDelete(index)} 
                                                                    onClick={() => showModal(index)} />
                                                            </Tooltip>
                                                            <Modal
                                                                title="Xác nhận"
                                                                open={isModalOpen}
                                                                onOk={handleOk}
                                                                onCancel={handleCancel}
                                                                okText="Xóa"
                                                                cancelText="Thoát"
                                                                centered
                                                                okButtonProps={{
                                                                    className: "bg-red-500 font-bold text-white hover:bg-red-400"
                                                                }}
                                                                cancelButtonProps={{
                                                                    className: "border-none font-bold shadow-none"
                                                                }}
                                                                okType="none"
                                                            >
                                                                <p>Xóa sản phẩm khỏi giỏ hàng?</p>

                                                            </Modal>
                                                        </div>
                                                    </div>
                                                    <div className='flex align-center md:mr-3'>
                                                        <h1 className="text-[16px] mr-5 ">Số lượng</h1>
                                                        <button className='px-2 bg-gray-200 rounded h-8 md:text-xl text-gray-400 mx-0.5 border hover:bg-gray-100' onClick={() => handleMinus(index)}> <BsDashLg /></button>
                                                        <button className='px-1 bg-white border border-gray-400 rounded w-15 h-8 mx-0.5 hover:border-blue-500 font-bold'>
                                                            <input
                                                                className="text-center"
                                                                defaultValue={item.quantity}
                                                                ref={(input) => (inputRefs.current[index] = input)}
                                                                type="number"
                                                                onChange={() => handleQuantityChange(index)}
                                                                min="1"
                                                                style={{ width: '33px', height: '30px', outline: 'none' }}
                                                            />
                                                        </button>
                                                        <button className='px-2 bg-gray-200 rounded h-8 md:text-xl text-gray-400 mx-0.5 border hover:bg-gray-100' onClick={() => handlePlus(index)}><BsPlusLg /></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="hidden md:flex items-center font-semibold">
                                                <BiSolidDiscount className="text-gray-600 text-[24px] mr-2" />
                                                Mã giảm giá của Shop
                                                <BsChevronRight className="text-[16px] ml-2" />
                                            </div>
                                            {
                                                selectedIndex==index &&
                                                <div className="md:hidden px-5 pb-4 text-[14px]">
                                                    <div className="flex justify-between">
                                                        <h1>Tạm tính ({numberProduct} sản phẩm):</h1>
                                                        <h1 className="text-[22px] text-red-500 font-bold">
                                                            <NumericFormat
                                                                type="text"
                                                                value={total}
                                                                thousandsGroupStyle="thousand"
                                                                thousandSeparator="."
                                                                decimalSeparator=","
                                                                suffix={"đ"}
                                                                displayType="text"
                                                            /></h1>
                                                    </div>
                                                    <Linkroute to={"/checkOut"}>
                                                        <button className="bg-red-500 w-full text-white font-bold text-[16px] rounded h-12" onClick={handleBuy}>Mua ngay</button>
                                                    </Linkroute>
                                                </div>
                                            }
                                        </div>
                                    )
                                })}
                            </Radio.Group>
                        </div>
                        <div className="total hidden md:block bg-white rounded-lg w-[30%] h-[250px] md:h-[250px] lg:h-[180px] ">
                            <div className="flex justify-between px-5 pt-4">
                                <div className="flex items-center font-bold text-[14px]">
                                    <BiSolidDiscount className="text-gray-600 text-[24px] mr-2" />
                                    Mã ưu đãi Sendo
                                </div>
                                <div className="text-blue-600 text-[13px]">Chọn/Nhập mã</div>
                            </div>
                            <hr className="border-[1px] my-3" />
                            <div className="px-5 pb-4 text-[14px]">
                                <div className="flex justify-between">
                                    <h1>Tạm tính ({numberProduct} sản phẩm):</h1>
                                    <h1 className="text-[22px] text-red-500 font-bold">
                                        <NumericFormat
                                            type="text"
                                            value={total}
                                            thousandsGroupStyle="thousand"
                                            thousandSeparator="."
                                            decimalSeparator=","
                                            suffix={"đ"}
                                            displayType="text"
                                        /></h1>
                                </div>
                                <Linkroute to={"/checkOut"}>
                                    <button className="bg-red-500 w-full text-white font-bold text-[16px] rounded h-12" onClick={handleBuy}>Mua ngay</button>
                                </Linkroute>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}
export default Cart;