import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import SubHeader from "../header/SubHeader";
import { NumericFormat } from "react-number-format";
const HomePage = () => {
  const [countData, setCountData] = useState(1);
  const [newData, setNewData] = useState([]);

  const getProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/sanpham`);
      // console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    let newArray = [];
    getProduct()
      .then((data) => {
        // console.log(data)
        newArray.push(...data.splice(0, 12 * countData));
        setNewData(newArray);
      })
      .catch((err) => alert(err));
  }, [countData]);

  const handleSeeMore = () => {
    setCountData(countData + 1);
  };

  return (
    <>
      <SubHeader />
      <div className="px-3 md:px-10 ">
        <div className="mx-0 md:mx-1 lg:mx-2 xl:mx-5 mt-5 p-2 bg-white rounded-lg">
          <div>
            <div className="font-sans font-bold text-[24px] italic tracking-tighter">
              FLASH SALE
            </div>
          </div>
          <div className="slide relative flex items-center ">
            <button className="custom-prev absolute bg-gray-200 p-[10px] rounded z-10 text-[18px] left-[-20px] ">
              <BsChevronLeft />
            </button>
            <Swiper
              className="px-2 "
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={7}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}>
              {newData.map((slide) => (
                <SwiperSlide
                  key={slide.id}
                  className="bg-white shadow shadow-black-500 z-2 hover:shadow-gray-500 h-[200px] rounded-lg">
                  <Link to={`/productdetail/${slide.id}`}>
                    <div className="bg-white h-[200px] rounded-lg relative ">
                      <img
                        className="w-[100%] h-28    object-cover rounded-t-[10px]"
                        src={slide.images[0]}></img>
                      <div className="p-2 rounded-b-[10px] ">
                        <div className="leading-5">
                          <span className="text-sm line-clamp-2">
                            {slide.title}
                          </span>
                        </div>
                        <div className="absolute bottom-1">
                          <div className="leading-5 flex justify-start">
                            <span className=" text-gray-500 font-light">
                              <NumericFormat
                                type="text"
                                value={
                                  (slide.price /
                                    (100 - slide.discountPercentage)) *
                                  100 *
                                  10000
                                }
                                thousandsGroupStyle="thousand"
                                thousandSeparator="."
                                decimalSeparator=","
                                suffix={"đ"}
                                decimalScale={0}
                                displayType="text"
                                className="line-through w-full"
                              />
                            </span>
                            <span className="text-red-500">
                              {slide.discountPercentage}%
                            </span>
                          </div>
                          <div className="leading-4 text-sm font-bold text-red-600">
                            <span>
                              <NumericFormat
                                type="text"
                                value={slide.price * 10000}
                                thousandsGroupStyle="thousand"
                                thousandSeparator="."
                                decimalSeparator=","
                                suffix={"đ"}
                                displayType="text"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="custom-next absolute right-[-20px] bg-gray-200 p-[10px] rounded z-10 text-[18px]">
              <BsChevronRight />
            </button>
          </div>
        </div>
        <div className="brand  mx-0 md:mx-1 lg:mx-2 xl:mx-5 mt-5 p-4 bg-white rounded-lg">
          <div className="flex items-center mb-2">
            <img
              className="w-6 h-6 mr-3 cursor-pointer"
              src="https://media3.scdn.vn/img4/2023/05_17/2qchQKBYZR2DeGt4eAa3.png"
              alt=""
            />
            <p className="font-bold text-[16px] m-0">Thương hiệu chính hãng </p>
          </div>
          <img
            className="rounded-lg"
            src="https://media3.scdn.vn/img4/2023/08_11/2033uyqDc1FFvaaa5oXj.jpg"
            alt=""
          />
          <div className="flex mt-5 gap-2 md:gap-5">
            <div className="shadow p-2 rounded-lg cursor-pointer">
              <img
                src="https://media3.scdn.vn/img4/2023/08_11/BlBM9G6XpDHK3zjhy0G2.png"
                alt=""
              />
              <p className="mt-3 text-center font-bold text-[14px]">
                CHỈ TỪ 29K
              </p>
            </div>
            <div className="shadow p-2 rounded-lg cursor-pointer">
              <img
                src="https://media3.scdn.vn/img4/2023/08_11/35zHFnBzYYxCLYQKFXhh.png"
                alt=""
              />
              <p className="mt-3 text-center font-bold text-[14px]">
                GIẢM ĐẾN 50%
              </p>
            </div>
            <div className="shadow p-2 rounded-lg cursor-pointer">
              <img
                src="https://media3.scdn.vn/img4/2023/08_11/E2Up8O1qfetDcVbOcAMA.png"
                alt=""
              />
              <p className="mt-3 text-center font-bold text-[14px]">
                Chỉ từ 99K
              </p>
            </div>
            <div className="shadow p-2 rounded-lg cursor-pointer">
              <img
                src="https://media3.scdn.vn/img4/2023/08_13/TxZwOmsKFT4EWx6igCdq.jpg"
                alt=""
              />
              <p className="mt-3 text-center font-bold text-[14px]">
                GIẢM ĐẾN 50%
              </p>
            </div>
            <div className="shadow p-2 rounded-lg cursor-pointer">
              <img
                src="https://media3.scdn.vn/img4/2023/08_11/5QnJHurdhnCfNjcLIcQJ.png"
                alt=""
              />
              <p className="mt-3 text-center font-bold text-[14px]">
                CHỈ TỪ 99K
              </p>
            </div>
            <div className="shadow p-2 rounded-lg cursor-pointer">
              <img
                src="https://media3.scdn.vn/img4/2023/08_13/VY49sSGzLxihHQErA0Nd.jpg"
                alt=""
              />
              <p className="mt-3 text-center font-bold text-[14px]">
                CHỈ TỪ 9K
              </p>
            </div>
          </div>
        </div>
        <div className="utility mx-0 md:mx-1 lg:mx-2 xl:mx-5 mt-5 p-4 bg-white rounded-lg">
          <div className="flex items-center mb-2">
            <img
              className="w-6 h-6 mr-3"
              src="https://media3.scdn.vn/img4/2023/05_17/yinpavnKTeNesRxwyq5x.png"
              alt=""
            />
            <p className="font-bold text-[16px] m-0 ">Tiện ích cho bạn</p>
          </div>
          <div className="flex mt-3 justify-between flex-wrap gap-1 md:gap-2">
            <div className="bg-red-100 p-1 md:p-4  rounded-lg w-[18%] lg:w-[9%] cursor-pointer">
              <img
                className="w-11 h-11 m-auto"
                src="https://media3.scdn.vn/img4/2022/11_22/oTS47qm4NHgSucqXKo50.png"
                alt=""
              />
              <p className="m-0 leading-5 pt-2 text-center">Hóa đơn điện</p>
            </div>
            <div className="bg-blue-100 p-1 md:p-4 rounded-lg w-[18%] lg:w-[9%] cursor-pointer">
              <img
                className="w-11 h-11 m-auto"
                src="https://media3.scdn.vn/img4/2022/11_17/6XeWaJY0gq5rf5g8B0AY.png"
                alt=""
              />
              <p className="m-0 leading-5 pt-2 text-center">Mua thẻ cào</p>
            </div>
            <div className="bg-red-100 p-1 md:p-4 rounded-lg w-[18%] lg:w-[9%] cursor-pointer">
              <img
                className="w-11 h-11 m-auto"
                src="https://media3.scdn.vn/img4/2022/11_22/VTLUgFa6KOdIT1jdOYcs.png"
                alt=""
              />
              <p className="m-0 leading-5 pt-2 text-center">Mua thẻ game</p>
            </div>
            <div className="bg-green-100 p-1 md:p-4 rounded-lg w-[18%] lg:w-[9%] cursor-pointer">
              <img
                className="w-11 h-11 m-auto"
                src="https://media3.scdn.vn/img4/2022/11_22/K0IjWKO9wXLysQbirwSk.png"
                alt=""
              />
              <p className="m-0 leading-5 pt-2 text-center">Mua hộ Vietlott</p>
            </div>
            <div className="bg-red-100 p-1 md:p-4 rounded-lg w-[18%] lg:w-[9%] cursor-pointer">
              <img
                className="w-11 h-11 m-auto"
                src="https://media3.scdn.vn/img4/2022/11_22/3ZXUlSIWwBXgNyzkjHie.png"
                alt=""
              />
              <p className="m-0 leading-5 pt-2 text-center">Bao bay giá rẻ</p>
            </div>
            <div className="bg-blue-100 p-1 md:p-4 rounded-lg w-[18%] lg:w-[9%] cursor-pointer">
              <img
                className="w-11 h-11 m-auto"
                src="https://media3.scdn.vn/img4/2022/11_23/udI33vs2vfdAX1XHPcQa.png"
                alt=""
              />
              <p className="m-0 leading-5 pt-2 text-center">Ưu đãi đối tác</p>
            </div>
            <div className="bg-red-50 p-1 md:p-4 rounded-lg w-[18%] lg:w-[9%] cursor-pointer">
              <img
                className="w-11 h-11 m-auto"
                src="https://media3.scdn.vn/img4/2022/11_17/NVVKXKYImjyVVLmTrh5u.png"
                alt=""
              />
              <p className="m-0 leading-5 pt-2 text-center">
                Nạp tiền điện thoại
              </p>
            </div>
            <div className="bg-yellow-100 p-1 md:p-4 rounded-lg w-[18%] lg:w-[9%] cursor-pointer">
              <img
                className="w-11 h-11 m-auto"
                src="https://media3.scdn.vn/img4/2022/11_22/UxOzTiyxgMXe1eIBgxRp.png"
                alt=""
              />
              <p className="m-0 leading-5 pt-2 text-center">Hóa đơn nước</p>
            </div>
            <div className="bg-red-100 p-1 md:p-4 rounded-lg w-[18%] lg:w-[9%] cursor-pointer">
              <img
                className="w-11 h-11 m-auto"
                src="https://media3.scdn.vn/img4/2022/11_22/Ju39kvVpMR8vdKYz73Hn.png"
                alt=""
              />
              <p className="m-0 leading-5 pt-2 text-center">Hóa đơn Internet</p>
            </div>
            <div className="bg-blue-100 p-1 md:p-4 rounded-lg w-[18%] lg:w-[9%] cursor-pointer">
              <img
                className="w-11 h-11 m-auto"
                src="https://media3.scdn.vn/img4/2022/11_22/J3Z3cu8Wp6JIvTmr7TQB.png"
                alt=""
              />
              <p className="m-0 leading-5 pt-2 text-center">Vé tàu</p>
            </div>
          </div>
        </div>
        <div className="mx-0 md:mx-1 lg:mx-2 xl:mx-5 mt-5">
          <div className="flex w-full flex-wrap justify-between">
            {newData.map((product) => (
              <div
                key={product.id}
                className="w-[45%] md:w-[30%] lg:w-[23%] xl:w-[15%] mb-4 bg-white shadow-lg shadow-black-500 hover:shadow-gray-500 rounded-lg">
                <Link to={`/productdetail/${product.id}`}>
                  <div className="bg-white h-[310px] py-2 rounded-lg relative">
                    <img
                      className="w-[80%] mx-[10%] h-36 object rounded-[10px]"
                      src={product.images[0]}></img>
                    <div className="p- rounded-b-[10px] ">
                      <div className="leading-5">
                        <span className="text-sm line-clamp-2 px-4">
                          {product.title}
                        </span>
                      </div>
                      <div className="absolute bottom-1 w-[100%] px-4">
                        <div className="leading-5">
                          <NumericFormat
                            type="text"
                            value={
                              (product.price /
                                (100 - product.discountPercentage)) *
                              100 *
                              10000
                            }
                            thousandsGroupStyle="thousand"
                            thousandSeparator="."
                            decimalSeparator=","
                            suffix={"đ"}
                            decimalScale={0}
                            displayType="text"
                            className="line-through  text-gray-500 font-light"
                          />

                          <span className="text-red-500">
                            {product.discountPercentage}%
                          </span>
                        </div>
                        <div className="leading-4 text-sm font-bold text-red-600">
                          <span>
                            <NumericFormat
                              type="text"
                              value={product.price * 10000}
                              thousandsGroupStyle="thousand"
                              thousandSeparator="."
                              decimalSeparator=","
                              suffix={"đ"}
                              displayType="text"
                            />
                          </span>
                        </div>

                        <div className="w-[50%]">
                          <div className="flex items-center bg-blue-100 rounded-lg leading-4 justify-evenly">
                            <img
                              src="https://media3.scdn.vn/img4/2022/12_19/k4fhvv3i925lb0CUgGn4.png"
                              alt="Trả góp Kredivo"
                              className="w-3 h-3"
                            />
                            <span className="text-[11px] text-blue-800">
                              Trả góp Kredivo
                            </span>
                          </div>
                        </div>
                        <span>Đã bán 6</span>
                        <div className="flex w-[100%] justify-between px-2">
                          <div className="flex items-center">
                            <span className="mr-1">{product.rating}/5</span>
                            <AiFillStar className="text-amber-300" />
                          </div>
                          <span className="pr-4">Hà Nội</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <button
              className="bg-white w-[30%] rounded-[5px] font-bold py-2 text-[16px]"
              onClick={handleSeeMore}>
              Xem thêm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
