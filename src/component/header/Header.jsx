import React, { useEffect, useState } from 'react';
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { BiSearch } from "react-icons/bi"
import { FaCartPlus } from "react-icons/fa"
import { SmileOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Space, AutoComplete, Input, Button } from 'antd';
import { Link as Linkroute } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../../Slice/authSlice';
import cartSlice from '../../Slice/cartSlice';
import axios from 'axios';

const renderTitle = (title) => (
    <span>
        {title}
        <a
            style={{
                float: 'right',
            }}
            href="https://www.google.com/search?q=antd"
            target="_blank"
            rel="noopener noreferrer"
        >
            more
        </a>
    </span>
);

const renderItem = (title, count) => ({
    value: title,
    label: (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {title}
            <span>
                <UserOutlined /> {count}
            </span>
        </div>
    ),
});

const options = [
    {
        label: renderTitle('Libraries'),
        options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
    },
    {
        label: renderTitle('Solutions'),
        options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
    },
    {
        label: renderTitle('Articles'),
        options: [renderItem('AntDesign design language', 100000)],
    },
];

const Header = () => {
    const counter = useSelector((state) => state.cart.count)
    // useSElecter trỏ vào kho lấy giá trị, tìm xem có cart và count trong cart k
    //console.log(counter);

    const [countCart, setCountCart] = useState(0);
    useEffect(() => {
        setCountCart(counter);
    }
        , [counter]
    )

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

    let isLogged = useSelector((state) => state.auth.isLogged);
    let currentUser = useSelector((state) => state.auth.currentUser);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isLogged && currentUser) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/giohang?userId=${currentUser.id}`);
                    const data = await response.json();
                    console.log(data);
                    const initialCount = data.length;
                    dispatch(cartSlice.actions.setInitialCount(initialCount));
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [dispatch, isLogged, currentUser]);


    const handleLogOut = () => {
        dispatch(signout());
    };

    const items = [
        {
            key: '1',
            label: (
                <Linkroute to={"/inforUser"}>
                    Thông tin tài khoản
                </Linkroute>
            ),
        },
        {
            key: '2',
            label: (
                <Linkroute to={"/"} onClick={() => handleLogOut()}>
                    Đăng xuất
                </Linkroute>
            ),
        }
    ];

    const itemMenu = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item (disabled)
                </a>
            ),
            icon: <SmileOutlined />,
            disabled: true,
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item (disabled)
                </a>
            ),
            disabled: true,
        },
        {
            key: '4',
            danger: true,
            label: 'a danger item',
        },
    ];

    const menuProps = {
        items: itemMenu,
    };

    return (
        <>
            <div className=" bg-red-700  text-white px-3 md:px-10">
                <div className="sub-header-content mx-0 font-bold md:mx-1 lg:mx-2 xl:mx-5">
                    <span className="download py-3 pr-2 md:pr-5 cursor-pointer">Tải ứng dụng</span>
                    <span className="customer-care py-3 pr-2 md:pr-5 cursor-pointer">Chăm sóc khách hàng</span>
                    <span className="order-check py-3 pr-2 md:pr-5 cursor-pointer">Kiểm tra đơn hàng</span>
                </div>
            </div>
            <div className="main-header w-full bg-red-600 text-white px-3 md:px-10 sticky top-0 z-50">
                <div className="main-header-content mx-0 md:mx-1 lg:mx-2 xl:mx-5 flex h-16 items-center relative">
                    <div className="">
                        <Linkroute to={"/"}>
                            <svg className="w-20" viewBox="0 0 87 48" xmlns="http://www.w3.org/2000/svg"><path d="m69.052 12.375-3.097 16.548a44.418 44.418 0 0 0-.74 6.633h-4.378l.27-2.94h-.068a6.042 6.042 0 0 1-5.251 3.008c-2.761 0-4.983-2.188-4.983-6.154 0-5.675 4.04-10.872 10.1-10.872.74 0 1.481.137 2.222.41l1.212-6.564 4.713-.069zm-6.666 10.394a2.664 2.664 0 0 0-1.885-.547c-2.828 0-4.848 3.35-4.848 6.496 0 1.983.875 3.077 2.222 3.077 1.414 0 3.03-1.436 3.636-4.581l.875-4.445zM4.481 30.017a10.123 10.123 0 0 0 5.252 1.436c1.818 0 3.501-.889 3.501-2.667 0-1.299-.942-2.12-2.962-3.145-2.424-1.3-4.646-3.009-4.646-5.95 0-4.512 3.905-7.316 8.753-7.316 2.693 0 4.31.616 5.252 1.163l-1.481 4.034a8.713 8.713 0 0 0-4.108-1.025c-2.222 0-3.366 1.162-3.366 2.393 0 1.299 1.346 2.12 3.232 3.145 2.693 1.436 4.444 3.283 4.444 5.95 0 4.991-4.108 7.59-9.023 7.59-3.097 0-5.32-.821-6.33-1.573l1.482-4.035zm27.606 4.308a13.756 13.756 0 0 1-5.992 1.3c-4.579 0-6.935-2.668-6.935-6.839 0-4.991 3.568-10.12 9.359-10.12 3.232 0 5.588 1.847 5.588 4.855 0 4.171-3.972 5.676-10.436 5.54 0 .615.202 1.162.471 1.64.606.82 1.684 1.3 3.098 1.3 1.548 0 3.097-.342 4.51-1.026l.338 3.35zm-4.174-12.24c-2.222 0-3.434 1.846-3.771 3.35 3.703.07 5.521-.478 5.521-1.982 0-.82-.606-1.368-1.75-1.368zm5.52 13.471 2.088-11.35c.404-2.052.74-4.24.875-5.676h4.242l-.404 3.077h.068a6.707 6.707 0 0 1 5.656-3.077c2.625 0 4.107 1.64 4.107 4.444 0 .958-.135 1.847-.27 2.804l-1.818 9.778h-4.713l1.75-9.368c.135-.615.135-1.23.135-1.846 0-1.163-.404-1.915-1.548-1.915-1.549 0-3.367 1.983-3.973 5.54l-1.414 7.59h-4.78zM84 25.3c0 5.95-3.973 10.325-9.561 10.325-4.107 0-6.8-2.735-6.8-6.77 0-5.675 3.904-10.325 9.56-10.325 4.31.069 6.8 3.078 6.8 6.77m-11.445 3.487c0 1.915.942 3.146 2.558 3.146 2.626 0 4.04-3.83 4.04-6.633 0-1.504-.606-3.077-2.558-3.077-2.694 0-4.107 4.034-4.04 6.565" fill="#fff"></path> </svg>
                        </Linkroute>
                    </div>
                    <div className="menu pl-[10px] text-3xl ">
                        <Dropdown
                            menu={menuProps}
                        >
                            <a href="/" className="flex items-center" onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <HiOutlineViewGridAdd />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                    <div className='md:flex w-[40%] hidden md:w-[58%] lg:w-[65%] xl:w-[75%]'>
                        <div className="pl-4 pr-1 w-[100%]">
                            <AutoComplete
                                popupClassName="certain-category-search-dropdown"
                                className='w-[100%]'
                                options={options}
                            >
                                <Input size="large" placeholder="Tìm trên Sendo" />
                            </AutoComplete>
                        </div>
                        <div className="search p-2 bg-white rounded-md border border-zinc-300">
                            <BiSearch className="text-xl text-black" />
                        </div>
                    </div>
                    <div className='absolute right-0 flex items-center'>
                        <div className="cart text-2xl mr-2 relative ">
                            <Linkroute to={"/cart"}> <FaCartPlus className='' /> </Linkroute>
                            <span className=" absolute top-[-10px] right-[-10px] rounded-[50%] w-5 h-5 border-2 border-white bg-red-500 text-sm flex justify-center items-center ">
                                {
                                    isLogged && currentUser ? countCart : 0
                                }
                            </span>
                        </div>

                        {
                            isLogged && currentUser ?
                                <Dropdown
                                    menu={{
                                        items,
                                    }}
                                    placement="bottomRight"

                                >
                                    <Button className='bg-white px-1 ml-5 rounded-[1.25rem]'>
                                        <p className=" flex items-center text-[12px] m-0 font-bold mr-[4px]">
                                            <img className="w-6 h-6 mr-[4px]" src="https://media3.scdn.vn/images/apps/icon_user_default.png" alt="" />
                                            <span className='mr-2'>{currentUser?.name}</span>
                                        </p>
                                    </Button>
                                </Dropdown>

                                :
                                <div className="signin px-5 py-2 bg-white rounded-md">
                                    <Linkroute to={"/signin"}>
                                        <p className="text-sm m-0 text-black font-bold">
                                            Đăng nhập
                                        </p>
                                    </Linkroute>
                                </div>
                        }
                    </div>
                </div>
                <div className='md:hidden flex w-[100%] z-50 pb-2'>
                        <div className="pr-1 w-[100%]">
                            <AutoComplete
                                popupClassName="certain-category-search-dropdown"
                                className='w-[100%]'
                                options={options}
                            >
                                <Input size="large" placeholder="Tìm trên Sendo" />
                            </AutoComplete>
                        </div>
                        <div className="search p-2 bg-white rounded-md border border-zinc-300">
                            <BiSearch className="text-xl text-black" />
                        </div>
                    </div>
            </div>

        </>
    )
}

export default Header;