import React, { useEffect, useRef, useState, createContext } from 'react';
import { Breadcrumb, message } from 'antd';
import { AiOutlineShareAlt, AiOutlineHeart, AiOutlineSafety, AiOutlineRight, AiOutlineLeft, AiFillStar } from "react-icons/ai";
import { TbShoppingBag } from "react-icons/tb"
import { BsPlusLg, BsDashLg, BsChatSquareText, BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { GrCircleInformation } from "react-icons/gr"
import { RiHeartAddLine } from "react-icons/ri";
import { IoStorefrontOutline } from "react-icons/io5";
import { BiPhoneCall } from 'react-icons/bi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/bundle';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { Link as Linkroute } from 'react-router-dom';
import { Link } from 'react-scroll';
import cartSlice from '../../Slice/cartSlice';
import { NumericFormat } from "react-number-format";

export const DataContext = createContext();

const ProductDetail = () => {
    const inputRef = useRef();
    const handlePlus = () => {
        quantity++
        inputRef.current.value = quantity;
    }

    const handleMinus = () => {
        if (quantity > 1) {
            quantity--;
            inputRef.current.value = quantity;
        }
    }

    console.dir(inputRef.current);
    let quantity = inputRef.current?.value;


    const handleQuantityChange = () => {
        quantity = parseInt(inputRef.current.value)
    };

    const dispatch = useDispatch();

    let currentUser = useSelector((state) => state.auth.currentUser);

    const postData = async (cartItem) => {
        try {
            const response = await axios.post(`http://localhost:5000/giohang`, cartItem)
            return response.data
        }
        catch (err) {
            console.error('Error posting data:', err);
        }
    }

    const putData = async (id, cartItem) => {
        try {
            const response = await axios.put(`http://localhost:5000/giohang/${id}`, cartItem)
            return response.data
        }
        catch (err) {
            console.error('Error posting data:', err);
        }
    }
    const [messageApi, contextHolder] = message.useMessage();
    function handleCart() {
        if (currentUser == null) { alert('vui lòng đăng nhập') }
        else {
            const cartItem = {
                idProduct: newDetail.id,
                title: newDetail.title,
                price: newDetail.price,
                brand: newDetail.brand,
                quantity: parseInt(quantity),
                images: newDetail.images[0],
                userId: currentUser.id,
                discountPercentage: newDetail.discountPercentage
            }
            messageApi.open({
                type: 'success',
                content: 'Thêm giỏ hàng thành công',
                className: 'custom-class',
                style: {
                    marginTop: '20vh',
                },
            });
            const getData = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/giohang`)
                    //console.log(response.data)
                    return response.data
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            getData().then((data) => {
                //console.log(data)
                const existingObjectIndex = data.findIndex(obj => obj.userId == cartItem.userId && obj.idProduct == cartItem.idProduct);

                if (existingObjectIndex == -1) {
                    postData(cartItem)
                    dispatch(cartSlice.actions.countCartPlus())
                } else {
                    console.log('Đã có:');
                    console.log(data[existingObjectIndex]);
                    const currentCart = data[existingObjectIndex];
                    const quantity = currentCart.quantity += cartItem.quantity;
                    putData(currentCart.id, { ...currentCart, quantity });
                }

            }
            )
                .catch((err) => alert(err))
        }
    }

    const [newData, setNewData] = useState([]);
    const [countData, setCountData] = useState(1)

    const { id } = useParams();
    //console.log(id)

    const getProduct = async () => {
        try {
            const response = await axios.get('http://localhost:5000/sanpham')
            // console.log(response.data)
            return response.data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        let newArray = []
        getProduct()
            .then((data) => {
                // console.log(data)
                newArray.push(...data.splice(0, 12 * countData))
                setNewData(newArray)
            }
            )
            .catch((err) => alert(err))
    }, [countData])

    const getProductId = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/sanpham?id=${id}`)
            //console.log(response.data)
            return response.data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [newDetail, setNewDetail] = useState({})
    const [image, setImage] = useState('');
    const [length, setLength] = useState(0);

    useEffect(() => {
        inputRef.current.value = "1";
        quantity = 1;
        getProductId()
            .then((data) => {
                setImage(data[0].images[0]);
                setLength(data[0].images.length);
                setNewDetail(data[0])
            }
            )
            .catch((err) => alert(err))
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [id])

    const showBorder = (index) => {
        newDetail.images.forEach((image, idx) => {
            if (idx !== index) {
                const element = document.getElementById(`${idx}`);
                element.classList.remove('border-image');
            }
        });
        const element = document.getElementById(`${index}`);
        element.classList.add('border-image');
    }

    const handleNav = (index) => {
        showBorder(index);
        setSlide(index + 1);
        setImage(newDetail.images[index])
    }

    const handleClick = () => {
        const contentDiv = document.getElementById("content");
        const btn = document.getElementById("btn");
        console.log(contentDiv.style.maxHeight)
        if (contentDiv.style.maxHeight) {
            // Đã được mở rộng, cần ẩn đi
            contentDiv.style.maxHeight = null;
            btn.textContent = "Ẩn đi";
        } else {
            // Chưa được mở rộng, cần xem thêm
            contentDiv.style.maxHeight = "300px";
            btn.textContent = "Xem thêm";
        }
    }

    const [slide, setSlide] = useState(1)

    const handleIncrease = () => {
        if (slide != length) { setSlide(slide + 1); setImage(newDetail.images[slide]); showBorder(slide) }
        else { setSlide(length); setImage(newDetail.images[length - 1]); showBorder(length - 1) }
    }

    const handleDecrease = () => {
        if (slide != 1) { setSlide(slide - 1); console.log(slide); setImage(newDetail.images[slide - 2]); showBorder(slide - 2) }
        else { setSlide(1); setImage(newDetail.images[0]); showBorder(0) }
    }


    const handleSeeMore = () => {
        setCountData(countData + 1)
    }

    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => {
        const handleScroll = () => {

            if (window.scrollY > 650) {
                setShowHeader(true);
            } else {
                setShowHeader(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        // Hủy lắng nghe sự kiện scroll khi component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    console.log('render')

    return (
        <>
            {contextHolder}
            {showHeader && <div className='sticky bg-white top-16 px-3 md:px-5 lg:px-10 z-50 text-[14px]'>
                <div className='flex mx-0 md:mx-1 lg:mx-2 xl:mx-5 text-center list-none'>
                    <li className='m-0 w-1/4 py-2 relative'>
                        <Link
                            to="general"
                            activeClass="before:absolute before:h-[3px] before:left-0 before:right-0 before:m-auto before:bottom-0  before:bg-red-500 text-red-500 font-bold"
                            spy={true} smooth={true} offset={-180} duration={1000}
                            className=" cursor-pointer hover:before:absolute hover:before:h-[3px] hover:before:left-0 hover:before:right-0 hover:before:m-auto hover:before:bottom-0 hover:before:bg-red-500 "
                        >
                            Tổng quan
                        </Link>
                    </li>
                    <li className='m-0 w-1/4 py-2 relative'>
                        <Link
                            to="review"
                            activeClass="before:absolute before:h-[3px] before:left-0 before:right-0 before:m-auto before:bottom-0 before:bg-red-500 text-red-500 font-bold"
                            spy={true} smooth={true} offset={-180} duration={1000}
                            className="cursor-pointer hover:before:absolute hover:before:h-[3px] hover:before:left-0 hover:before:right-0 hover:before:m-auto hover:before:bottom-0 hover:before:bg-red-500 "
                        >
                            Đánh giá
                        </Link>
                    </li>
                    <li className='m-0 w-1/4 py-2 relative'>
                        <Link
                            to="question"
                            activeClass="before:absolute before:h-[3px] before:left-0 before:right-0 before:m-auto before:bottom-0 before:bg-red-500 text-red-500 font-bold"
                            spy={true} smooth={true} offset={-180} duration={1000}
                            className="cursor-pointer hover:before:absolute hover:before:h-[3px] hover:before:left-0 hover:before:right-0 hover:before:m-auto hover:before:bottom-0 hover:before:bg-red-500"
                        >

                            Hỏi đáp

                        </Link>
                    </li>
                    <li className='m-0 w-1/4 py-2 relative'>
                        <Link
                            to="foryou"
                            activeClass="before:absolute before:h-[3px] before:left-0 before:right-0 before:m-auto before:bottom-0 before:bg-red-500 text-red-500 font-bold"
                            spy={true} smooth={true} offset={-180} duration={1000}
                            className="cursor-pointer hover:before:absolute hover:before:h-[3px] hover:before:left-0 hover:before:right-0 hover:before:m-auto hover:before:bottom-0 hover:before:bg-red-500 "
                        >
                            Dành cho bạn
                        </Link>
                    </li>
                </div>
            </div>
            }
            <div className='main mx-0 md:mx-1 lg:mx-2 xl:mx-5 px-[16px]'>
                <div className='step py-2'>
                    <Breadcrumb
                        items={[
                            {
                                title: 'Sendo.vn',
                            },
                            {
                                title: <a href="/">{newDetail.category}</a>,
                            },
                            {
                                title: `${newDetail.title}`,
                            },
                        ]}
                    />
                </div>
                <div className='product lg:flex rounded-xl bg-white'>
                    <div className='content-left w-full p-5'>
                        <div className="relative w-full">
                            <div className=' image w-full h-full flex items-center justify-between'>
                                <span className='relative'>
                                    <span className='bg-gray-100 hover:bg-gray-300  absolute left-2 p-2 rounded' onClick={() => handleDecrease()}><AiOutlineLeft className='ml-0' /></span>
                                </span>
                                <img src={image} className='w-full h-full' />
                                <span className='relative'>
                                    <span className='bg-gray-100 hover:bg-gray-300 absolute right-2 p-2 rounded' onClick={() => handleIncrease()} ><AiOutlineRight className='ml-0' /></span>
                                </span>
                            </div>
                            <div className='infor-img w-full flex justify-between absolute bottom-2'>
                                <div className="number bg-zinc-200 px-3 rounded-3xl text-sm flex items-center">{slide}/{length}</div>
                                <div className='flex'>
                                    <div className="bg-zinc-200 p-2 rounded text-sm"> <AiOutlineShareAlt className='text-base' /></div>
                                    <div className="bg-zinc-200 p-2 ml-2 rounded text-sm"> <AiOutlineHeart className='text-base' /> </div>
                                </div>
                            </div>
                        </div>
                        <div className="suggestion width-full bg-white flex">
                            {newDetail && newDetail.images && newDetail.images.map((item, index) => {
                                return (

                                    <div className='bg-white w-20 cursor-pointer m-1 rounded border-2 hover:border-red-500' onClick={() => { handleNav(index) }} id={index}>
                                        <img heigh="100%" width="100%" src={item} />
                                    </div>

                                )
                            })
                            }
                        </div>
                    </div>
                    <div className='content-right p-5 w-full'>
                        <div className='title'>
                            <h1 className='flex items-center text-xl'>
                                <img src="https://media3.scdn.vn/img4/2022/08_17/nbMbRRfJY3a65DmxuyUH.png" alt="Shop's badge" className='h-4 mr-2' />
                                {newDetail.title}
                            </h1>
                        </div>
                        <div className='brand text-sm mt-2'>
                            <span className='font-normal'>Thương hiệu: </span>
                            <a className='text-blue-600' href="/thuong-hieu/elmich">{newDetail.brand}</a>
                        </div>
                        <div className="price mt-2">
                            <div className='text-red-600 font-bold text-2xl'>
                                <NumericFormat
                                    type="text"
                                    value={newDetail.price * 10000}
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    suffix={"đ"}
                                    displayType="text"
                                />

                            </div>

                            <span>
                                <NumericFormat
                                    type="text"
                                    value={newDetail.price / (100 - newDetail.discountPercentage) * 100 * 10000}
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    suffix={"đ"}
                                    decimalScale={0}
                                    displayType="text"
                                    className="line-through w-[13%] text-gray-400 font-light text-[14px]"
                                />
                            </span>
                            <span className='text-red-500 text-[14px]'>Giảm đến {newDetail.discountPercentage}%</span>
                        </div>
                        <div className='mt-12 flex items-center'>
                            <TbShoppingBag className='text-xl text-gray-500' />
                            <span className='text-sm pl-1 text-gray-500'>{newDetail.purchaseCount} lượt mua </span>
                        </div>
                        <div className="amount text-sm mt-5 flex items-center ">
                            <div className='text-sm text-gray-500 mr-12'>Chọn số lượng:</div>
                            {/* <Amount /> */}
                            <div className='flex items-center'>
                                <button className='px-2 bg-gray-200 rounded h-8 text-xl text-gray-400 mx-0.5 border hover:bg-gray-100' onClick={handleMinus}><BsDashLg /></button>
                                <button className='px-1 bg-white border border-gray-400 rounded w-15 h-8 mx-0.5 hover:border-blue-500 font-bold'>

                                    <input
                                        className="text-center"
                                        defaultValue={1}
                                        ref={inputRef}
                                        type="number"
                                        // value={1}
                                        onChange={handleQuantityChange}
                                        min="1"
                                        style={{ width: '33px', height: '30px', outline: 'none' }}
                                    />

                                </button>
                                <button className='px-2 bg-gray-200 rounded h-8 text-xl text-gray-400 mx-0.5 border hover:bg-gray-100' onClick={handlePlus}><BsPlusLg /></button>
                            </div>

                        </div>
                        <div className='flex mt-5'>
                            <button className='w-1/2 bg-gray-200 rounded h-[48px] text-base font-bold text-black mx-0.5 border' onClick={handleCart}>

                                <span>Thêm vào giỏ</span>
                            </button>
                            <button className='w-1/2 bg-red-600 rounded h-[48px] text-base font-bold text-white mx-0.5 border'>
                                <span>Mua ngay</span>
                            </button>
                        </div>
                        <hr className='mt-5' />
                        <div className='mt-5 flex justify-between'>
                            <div className='text-base font-bold'>
                                <p>Ưu đãi dành cho bạn</p>
                            </div>
                            <div className='mr-3'>
                                <GrCircleInformation className='text-2xl' />
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <img src="https://media3.scdn.vn/img4/2022/12_19/k4fhvv3i925lb0CUgGn4.png" alt="Trả góp Kredivo" className='w-7 h-7 mr-1' />
                            <span className='text-sm'>Trả góp Kredivo</span>
                        </div>
                        <hr className='mt-5' />
                        <div className='mt-5 flex justify-between'>
                            <div className='text-base font-bold'>
                                <p>Quyền lợi khách hàng & Bảo hành</p>
                            </div>
                            <div className='mr-3'>
                                <GrCircleInformation className='text-2xl' />
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='flex mr-9'>
                                <AiOutlineSafety className='text-2xl mr-2 text-green-700' />
                                <p className='text-sm'>7 ngày hoàn trả</p>
                            </div>
                            <div className=' flex '>
                                <AiOutlineSafety className='text-2xl mr-2 text-green-700' />
                                <p className='text-sm w-40'>Bảo hành theo chính sách từ Nhà bán hàng</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='detail lg:flex mt-6 gap-x-[20px]'>
                    <div className='detail-left w-full lg:w-[50%]'>
                        <div className='sticky top-32 bg-white  p-6 rounded-xl'>
                            <h1 className='text-base font-bold'>Thông tin nhà cung cấp</h1>
                            <div className='flex'>
                                <img className='w-20 ' src="https://media3.scdn.vn/img4/2022/09_27/nqrquod949Ya6lzfHNQX.png" />
                                <div>
                                    <h1 className='text-[16px] m-0'>{newDetail.brand}</h1>
                                    <img src="https://media3.scdn.vn/img4/2022/08_17/nbMbRRfJY3a65DmxuyUH.png" alt="Shop's badge" className='h-4 mr-2' />
                                    <div className='flex items-center'>
                                        <span className='text-gray-500'>Hà Nội</span>
                                        <span className='text-gray-500 point pl-2 relative'>{newDetail.rating}</span>
                                        <AiFillStar className='text-amber-300' />
                                    </div>
                                </div>
                            </div>
                            <div className='flex text-center'>
                                <div className='flex-1'>
                                    <h1 className='font-bold text-base m-0'>{newDetail.year} năm</h1>
                                    <h2 className='text-m font-[400] leading-5'>Bán ở Sendo</h2>
                                </div>
                                <div className='flex-1'>
                                    <h1 className='font-bold text-base m-0'>{newDetail.stock}</h1>
                                    <h2 className='text-m font-[400] leading-5'>Sản phẩm</h2>
                                </div>
                                <div className='flex-1'>
                                    <h1 className='font-bold text-base m-0'>2 ngày</h1>
                                    <h2 className='text-m font-[400] leading-5'>Chuẩn bị hàng</h2>
                                </div>
                                <div className='flex-1'>
                                    <h1 className='font-bold text-base m-0'>{newDetail.tyLePhanHoi}%</h1>
                                    <h2 className='text-m font-[400] leading-5'>Tỷ lệ phản hồi</h2>
                                </div>
                                <div className='flex-1'>
                                    <h1 className='font-bold text-base m-0'>{newDetail.shopPhanHoi}%</h1>
                                    <h2 className='text-m font-[400] leading-5'>Shop phản hồi</h2>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='flex w-[45%] bg-gray-200 rounded mr-3 justify-center items-center py-2 font-bold text-sm'> <RiHeartAddLine className='text-lg' /> <p className='pl-2 m-0'> Theo dõi shop</p></div>
                                <div className='flex w-[45%] bg-gray-200 rounded mr-3 justify-center items-center py-2 font-bold text-sm'> <IoStorefrontOutline className='text-lg' /> <p className='pl-2 m-0'> Vào shop</p> </div>
                                <div className='w-[10%] flex bg-gray-200 rounded mr-3 justify-center items-center py-2 font-bold text-sm'><BiPhoneCall className='text-lg' /></div>
                            </div>
                            <hr className='my-4' />
                            <h1 className='text-sm font-bold'>Gợi ý thêm từ shop</h1>
                            <div className='bg-gradient-to-b from-white to-red-300 rounded-lg flex items-center'>
                                <button className="custom-prev absolute bg-gray-200 p-[10px] rounded z-50 text-[18px] left-[-10px] "><BsChevronLeft /></button>
                                <Swiper
                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                    spaceBetween={50}
                                    slidesPerView={3}
                                    navigation={{
                                        prevEl: '.custom-prev',
                                        nextEl: '.custom-next',

                                    }}
                                    scrollbar={{ draggable: true }}
                                >
                                    {

                                        newData.map((slide) => (
                                            <SwiperSlide key={slide.id} className='bg-white shadow-lg shadow-black-500 hover:shadow-gray-500 h-[200px] rounded-lg'>
                                                <Linkroute to={`/productdetail/${slide.id}`} >
                                                    <div className='bg-white h-[200px] rounded-lg relative'>
                                                        <img className="w-[100%] h-28    object-cover rounded-t-[10px]" src={slide.images[0]}></img>
                                                        <div className='p-2 rounded-b-[10px] '>
                                                            <div className='leading-5'>
                                                                <span className='text-sm line-clamp-2'>{slide.title}</span>
                                                            </div>
                                                            <div className='absolute bottom-1'>
                                                                <div className='leading-5'>
                                                                    <NumericFormat
                                                                        type="text"
                                                                        value={slide.price / (100 - slide.discountPercentage) * 100 * 10000}
                                                                        thousandsGroupStyle="thousand"
                                                                        thousandSeparator="."
                                                                        decimalSeparator=","
                                                                        suffix={"đ"}
                                                                        decimalScale={0}
                                                                        displayType="text"
                                                                        className="line-through w-[50%] text-gray-500 font-light"
                                                                    />
                                                                    <span className='text-red-500'>{slide.discountPercentage}%</span>
                                                                </div>
                                                                <div className='leading-4 text-sm font-bold text-red-600'>
                                                                    <span >
                                                                        <NumericFormat
                                                                            type="text"
                                                                            value={slide.price * 10000}
                                                                            thousandsGroupStyle="thousand"
                                                                            thousandSeparator="."
                                                                            decimalSeparator=","
                                                                            suffix={"đ"}
                                                                            displayType="text"
                                                                        /></span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Linkroute>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                                <button className="custom-next absolute right-[-10px] bg-gray-200 p-[10px] rounded z-50 text-[18px]"><BsChevronRight /></button>

                            </div>
                        </div>
                    </div>
                    <div className='detail-right'>
                        <div className=' bg-white p-6 rounded-xl ' id="general">
                            <div id="content" style={{ maxHeight: "300px" }}>
                                <h1 className='text-base font-bold'>Mô tả sản phẩm</h1>
                                <p className='text-[14px] leading-5 pt-1'>{newDetail.describe}</p>
                                <h1 className='text-sm font-bold'>Thông tin cơ bản</h1>
                                <table className=' bg-white w-full text-[14px] text-gray-500 font-normal rounded-lg overflow-hidden'>
                                    <tr>
                                        <td className='w-[30%]'>Dung tích</td>
                                        <td> 4L-5L</td>
                                    </tr>
                                    <tr>
                                        <td className='w-[30%]'>Hãng sản xuất</td>
                                        <td>ELMICH</td>
                                    </tr>
                                    <tr>
                                        <td className='w-[30%]'>Kiểu nắp</td>
                                        <td>Nắp gài</td>
                                    </tr>
                                    <tr>
                                        <td className='w-[30%]'>Kiểu nồi</td>
                                        <td>Nồi thông thương</td>
                                    </tr>
                                    <tr>
                                        <td className='w-[30%]'>Xuất xứ</td>
                                        <td>Trung Quốc</td>
                                    </tr>
                                </table>
                                <h1 className='text-sm font-bold pt-4'>Chi tiết sản phẩm</h1>
                                <p className='text-[14px] leading-5 pt-1'>Giới thiệu sản phẩm <br />
                                         {newDetail.detail}
                                </p>
                            </div>
                            <div>
                                <button id="btn" className='bg-gray-200 w-full rounded font-bold text-[14px] py-1 text-gray-600' onClick={handleClick} >Xem thêm</button>
                            </div>
                        </div>

                        <div className=' bg-white p-6 rounded-xl mt-6 ' id="review">
                            <img className="mx-auto" src="https://web-static.scdn.vn/sendo-communication-rating/863edd0-web/media/rating-empty.f56ae9e22805ed6a864d1a540bea0947.svg"></img>
                            <h1 className='text-sm font-bold text-center'>Sản phẩm chưa có đánh giá</h1>
                            <h1 className='text-sm font-bold text-center text-gray-500'>Chọn mua sản phẩm để là người đầu tiên đánh giá sản phẩm này.</h1>
                        </div>
                        <div className=' bg-white p-6 rounded-xl mt-6 ' id="question">
                            <h1 className='text-sm font-bold'>Hỏi về sản phẩm</h1>
                            <h1 className='text-sm font-bold text-gray-500'>Bạn có thắc mắc cần giải đáp </h1>
                            <div>

                                <button id="btn" className='bg-gray-200 w-full rounded font-bold text-[14px] py-1 text-gray-600 flex justify-center items-center' onClick={handleClick} > <BsChatSquareText className='text-[20px] mr-2' />Hỏi shop ngay</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='favorite mt-6' id="foryou">
                    <h1 className='text-base font-bold'>Ở đây có sản phẩm bạn thích</h1>
                    <div className='mt-5 flex w-full flex-wrap justify-between'>
                        {
                            newData.map((product) => (
                                <div key={product.id} className='w-[45%] lg:w-[23%] xl:w-[15%] m-2 bg-white shadow-lg shadow-black-500 hover:shadow-gray-500 rounded-lg'>
                                    <Linkroute to={`/productdetail/${product.id}`} >
                                        <div className='bg-white h-[300px] rounded-lg relative'>
                                            <img className="w-[100%] h-36 object rounded-t-[10px]" src={product.images[0]}></img>
                                            <div className='p-2 rounded-b-[10px] '>
                                                <div className='leading-5'>
                                                    <span className='text-sm line-clamp-2'>{product.title}</span>
                                                </div>
                                                <div className='absolute bottom-1 w-[100%]'>
                                                    <div className='leading-5'>
                                                        <NumericFormat
                                                            type="text"
                                                            value={product.price / (100 - product.discountPercentage) * 100 * 10000}
                                                            thousandsGroupStyle="thousand"
                                                            thousandSeparator="."
                                                            decimalSeparator=","
                                                            suffix={"đ"}
                                                            decimalScale={0}
                                                            displayType="text"
                                                            className="line-through w-[40%] text-gray-500 font-light"
                                                        />
                                                        <span className='text-red-500'>{product.discountPercentage}%</span>
                                                    </div>
                                                    <div className='leading-4 text-sm font-bold text-red-600'>
                                                        <span >
                                                            <NumericFormat
                                                                type="text"
                                                                value={product.price * 10000}
                                                                thousandsGroupStyle="thousand"
                                                                thousandSeparator="."
                                                                decimalSeparator=","
                                                                displayType="text"
                                                                suffix={"đ"}
                                                            /></span></div>

                                                    <div className='w-[50%]'>
                                                        <div className='flex items-center bg-blue-100 rounded-lg leading-4 justify-evenly'>
                                                            <img src="https://media3.scdn.vn/img4/2022/12_19/k4fhvv3i925lb0CUgGn4.png" alt="Trả góp Kredivo" className='w-3 h-3' />
                                                            <span className='text-[11px] text-blue-800'>Trả góp Kredivo</span>
                                                        </div>
                                                    </div>
                                                    <span>Đã bán 6</span>
                                                    <div className='flex w-[100%] justify-between'>
                                                        <div className='flex items-center'>
                                                            <span className='mr-1'>{product.rating}/5</span>
                                                            <AiFillStar className='text-amber-300' />
                                                        </div>
                                                        <span className='pr-4'>Hà Nội</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Linkroute>
                                </div>
                            ))
                        }
                    </div>
                    <div className='mt-10 flex justify-center'>
                        <button className='bg-white w-[30%] rounded-[5px] font-bold py-2 text-[16px]' onClick={handleSeeMore}>Xem thêm</button>
                    </div>
                </div>
            </div>

        </>
    )
}
export default ProductDetail;