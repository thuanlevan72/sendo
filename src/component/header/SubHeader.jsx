import { useState } from "react";
import { Router } from "react-router-dom";
import { Link as Linkroute } from 'react-router-dom';
const SubHeader = () => {

    const subHeaderTitle = ['Cho bạn', 'Thiết bị điện tử', 'Mỹ phẩm', ' Thực phẩm', 'Nhà cửa']
    const detail = [
        {
            'Rau sạch Sendo Farm': 'https://media3.scdn.vn/img4/2023/08_08/RyNbdmXyUn9I8Tlhx8PF.png',
            'Techzone xả kho - 49%': 'https://media3.scdn.vn/img4/2023/05_12/6owrV2vGror1LBCGTHRe.png',
            'Giá sốc mỗi ngày': 'https://media3.scdn.vn/img4/2023/05_12/6owrV2vGror1LBCGTHRe.png',
            'Giao nhanh 4H': 'https://media3.scdn.vn/img4/2023/04_29/mF5Uq2nP0I95cW6HSbpv.png',
            'Bách hóa từ 9K': 'https://media3.scdn.vn/img4/2023/04_27/gkpT5SPjDMbEavhyys8k.png',
            'Nhà cửa freeship 0Đ': 'https://media3.scdn.vn/img4/2022/07_15/yzaU0kMQko7vpznoytrZ.png',
            'Thời trang 9K': 'https://media3.scdn.vn/img4/2023/04_27/POwAHBdOBQwYnrtfHqKt.png',
            'QUà tặng làm đẹp 0Đ': 'https://media3.scdn.vn/img4/2023/08_08/RyNbdmXyUn9I8Tlhx8PF.png',
            'Nạp thẻ & dịch vụ ': 'https://media3.scdn.vn/img4/2021/04_30/Dnwui395gD7DCTSPcbsx.png',
            'Voucher & Mã giảm giá': 'https://media3.scdn.vn/img4/2021/01_12/Crz8i79uPgWYZJXgJF79.png'
        },
        {
            'Laptop': 'https://media3.scdn.vn/img4/2023/08_08/RyNbdmXyUn9I8Tlhx8PF.png',
            'Techzone xả kho - 49%': 'https://media3.scdn.vn/img4/2023/05_12/6owrV2vGror1LBCGTHRe.png',
            'Giá sốc mỗi ngày': 'https://media3.scdn.vn/img4/2023/05_12/6owrV2vGror1LBCGTHRe.png',
            'Giao nhanh 4H': 'https://media3.scdn.vn/img4/2023/04_29/mF5Uq2nP0I95cW6HSbpv.png',
            'Bách hóa từ 9K': 'https://media3.scdn.vn/img4/2023/04_27/gkpT5SPjDMbEavhyys8k.png',
            'Nhà cửa freeship 0Đ': 'https://media3.scdn.vn/img4/2022/07_15/yzaU0kMQko7vpznoytrZ.png',
            'Thời trang 9K': 'https://media3.scdn.vn/img4/2023/04_27/POwAHBdOBQwYnrtfHqKt.png',
            'QUà tặng làm đẹp 0Đ': 'https://media3.scdn.vn/img4/2023/08_08/RyNbdmXyUn9I8Tlhx8PF.png',
            'Nạp thẻ & dịch vụ ': 'https://media3.scdn.vn/img4/2021/04_30/Dnwui395gD7DCTSPcbsx.png',
            'Voucher & Mã giảm giá': 'https://media3.scdn.vn/img4/2021/01_12/Crz8i79uPgWYZJXgJF79.png'
        },
        {
            'Serum': 'https://media3.scdn.vn/img4/2023/08_08/RyNbdmXyUn9I8Tlhx8PF.png',
            'Techzone xả kho - 49%': 'https://media3.scdn.vn/img4/2023/05_12/6owrV2vGror1LBCGTHRe.png',
            'Giá sốc mỗi ngày': 'https://media3.scdn.vn/img4/2023/05_12/6owrV2vGror1LBCGTHRe.png',
            'Giao nhanh 4H': 'https://media3.scdn.vn/img4/2023/04_29/mF5Uq2nP0I95cW6HSbpv.png',
            'Bách hóa từ 9K': 'https://media3.scdn.vn/img4/2023/04_27/gkpT5SPjDMbEavhyys8k.png',
            'Nhà cửa freeship 0Đ': 'https://media3.scdn.vn/img4/2022/07_15/yzaU0kMQko7vpznoytrZ.png',
            'Thời trang 9K': 'https://media3.scdn.vn/img4/2023/04_27/POwAHBdOBQwYnrtfHqKt.png',
            'QUà tặng làm đẹp 0Đ': 'https://media3.scdn.vn/img4/2023/08_08/RyNbdmXyUn9I8Tlhx8PF.png',
            'Nạp thẻ & dịch vụ ': 'https://media3.scdn.vn/img4/2021/04_30/Dnwui395gD7DCTSPcbsx.png',
            'Voucher & Mã giảm giá': 'https://media3.scdn.vn/img4/2021/01_12/Crz8i79uPgWYZJXgJF79.png'
        },
        {
            'Bánh kẹo': 'https://media3.scdn.vn/img4/2023/08_08/RyNbdmXyUn9I8Tlhx8PF.png',
            'Techzone xả kho - 49%': 'https://media3.scdn.vn/img4/2023/05_12/6owrV2vGror1LBCGTHRe.png',
            'Giá sốc mỗi ngày': 'https://media3.scdn.vn/img4/2023/05_12/6owrV2vGror1LBCGTHRe.png',
            'Giao nhanh 4H': 'https://media3.scdn.vn/img4/2023/04_29/mF5Uq2nP0I95cW6HSbpv.png',
            'Bách hóa từ 9K': 'https://media3.scdn.vn/img4/2023/04_27/gkpT5SPjDMbEavhyys8k.png',
            'Nhà cửa freeship 0Đ': 'https://media3.scdn.vn/img4/2022/07_15/yzaU0kMQko7vpznoytrZ.png',
            'Thời trang 9K': 'https://media3.scdn.vn/img4/2023/04_27/POwAHBdOBQwYnrtfHqKt.png',
            'QUà tặng làm đẹp 0Đ': 'https://media3.scdn.vn/img4/2023/08_08/RyNbdmXyUn9I8Tlhx8PF.png',
            'Nạp thẻ & dịch vụ ': 'https://media3.scdn.vn/img4/2021/04_30/Dnwui395gD7DCTSPcbsx.png',
            'Voucher & Mã giảm giá': 'https://media3.scdn.vn/img4/2021/01_12/Crz8i79uPgWYZJXgJF79.png'
        },
        {
            'Sofa': 'https://media3.scdn.vn/img4/2023/08_08/RyNbdmXyUn9I8Tlhx8PF.png',
            'Techzone xả kho - 49%': 'https://media3.scdn.vn/img4/2023/05_12/6owrV2vGror1LBCGTHRe.png',
            'Giá sốc mỗi ngày': 'https://media3.scdn.vn/img4/2023/05_12/6owrV2vGror1LBCGTHRe.png',
            'Giao nhanh 4H': 'https://media3.scdn.vn/img4/2023/04_29/mF5Uq2nP0I95cW6HSbpv.png',
            'Bách hóa từ 9K': 'https://media3.scdn.vn/img4/2023/04_27/gkpT5SPjDMbEavhyys8k.png',
            'Nhà cửa freeship 0Đ': 'https://media3.scdn.vn/img4/2022/07_15/yzaU0kMQko7vpznoytrZ.png',
            'Thời trang 9K': 'https://media3.scdn.vn/img4/2023/04_27/POwAHBdOBQwYnrtfHqKt.png',
            'QUà tặng làm đẹp 0Đ': 'https://media3.scdn.vn/img4/2023/08_08/RyNbdmXyUn9I8Tlhx8PF.png',
            'Nạp thẻ & dịch vụ ': 'https://media3.scdn.vn/img4/2021/04_30/Dnwui395gD7DCTSPcbsx.png',
            'Voucher & Mã giảm giá': 'https://media3.scdn.vn/img4/2021/01_12/Crz8i79uPgWYZJXgJF79.png'
        }]
    const [selectedPosition, setSelectedPosition] = useState(0);
    const handleClick = (index) => {
        setSelectedPosition(index);
    }
    const selectedObject = detail[selectedPosition];
    return (
        <>
            <div className='sticky bg-red-600 top-[100px] md:top-16 px-3 md:px-10 z-50 text-[16px]'>
                <div className='flex mx-0 md:mx-1 lg:mx-2 xl:mx-5 text-center list-none text-white'>
                    {subHeaderTitle.map((item, index) => (
                        <li key={index} className={`m-0 text-[12px] md:text-[14px] w-1/4 pt-2 line-clamp-1 relative cursor-pointer ${selectedPosition === index ? 'font-bold border-b-2 border-white' : ''
                            }`} onClick={() => handleClick(index)}>
                            {item}
                        </li>
                    ))}
                </div>
            </div>
            <div className="bg-white">
                <div className="px-0 md:px-5 lg:px-10 mx-0 md:mx-1 lg:mx-2 xl:mx-5 text-center text-[14px]" >
                    <div className="flex flex-wrap justify-between px-1 py-[16px] md:p-[16px]">
                        {Object.entries(selectedObject).map(([key, value], index) => (
                            <div key={index} className="w-[20%] md:w-[10%]">
                                <img className="w-[44px] m-auto" src={value} alt={key} />
                                <p className="leading-5 pt-1 mt-2">{key}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}

export default SubHeader;