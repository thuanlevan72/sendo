import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="mt-10">
            <section className="px-[16px] bg-zinc-50">
                <div className="flex mx-0 lg:mx-[5%] justify-between p-10 flex-wrap">
                    <div className="w-[50%] lg:w-[20%] leading-4">
                        <div>
                            <img className="mx-auto" src="https://media3.scdn.vn/img4/2020/12_16/gJwXr6FFZKZCGKWaz4RB.png" alt="" style={{ width: '120px' }} />
                        </div>
                        <div className="text-center">
                            <p className="font-bold my-1" >Siêu nhiều hàng tốt</p>
                            <p className="px-[30px] text-gray-500" >Cần gì cũng có 26 ngành hàng &amp; 10 triệu sản phẩm</p>
                        </div>
                    </div>
                    <div className="w-[50%] lg:w-[20%] leading-4">
                        <div>
                            <img className="mx-auto" src="https://media3.scdn.vn/img4/2020/12_16/EfZWQVfV6nQzu2vMmnwC.png" alt="" style={{ width: '120px' }} />
                        </div>
                        <div className="text-center ">
                            <p className="font-bold my-1" >Siêu yên tâm</p>
                            <p className="px-[30px] text-gray-500" >Miễn phí đổi trả 48h</p>
                        </div>
                    </div>
                    <div className="w-[50%] lg:w-[20%] leading-4">
                        <div>
                            <img className="mx-auto" src="https://media3.scdn.vn/img4/2020/12_16/j5C6IQz7gIXPgjFJxmRz.png" alt="" style={{ width: '120px' }} />
                        </div>
                        <div className="text-center">
                            <p className="font-bold my-1" >Siêu tiết kiệm</p>
                            <p className="px-[30px] text-gray-500">Giá hợp lý, vừa túi tiền. Luôn có nhiều chương trình khuyến mãi</p>
                        </div>
                    </div>
                    <div className="w-[50%] lg:w-[20%] leading-4">
                        <div>
                            <img className="mx-auto" src="https://media3.scdn.vn/img4/2020/12_16/7AJFQGQ5qvS7gGOz8P7a.png" alt="" style={{ width: '120px' }} />
                        </div>
                        <div className="text-center ">
                            <p className="font-bold my-1" >Siêu nhiều hàng tốt</p>
                            <p className="px-[30px] text-gray-500">Mang thế giới mua sắm của Sendo trong tầm tay bạn</p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="mx-0 lg:mx-[5%] flex p-[16px] leading-6">
                    <div className=" w-[25%] cursor-pointer">
                        <h1 className="font-bold">VỀ CHÚNG TÔI</h1>
                        <ul>
                            <li><Link to={"/aboutus"}>Giới thiệu Sendo.vn</Link></li>
                            <li>Giới thiệu SenMall</li>
                            <li>Quy chế hoạt động</li>
                            <li>Chính sách bảo mật</li>
                            <li>Giao hàng và Nhận hàng</li>
                        </ul>
                    </div>
                    <div className=" w-[25%] cursor-pointer">
                        <h1 className="font-bold">DÀNH CHO NGƯỜI MUA</h1>
                        <ul>
                            <li>Giải quyết khiếu nại</li>
                            <li>Hướng dẫn mua hàng</li>
                            <li>Chính sách đổi trả</li>
                            <li>Chăm sóc khách hàng</li>
                            <li>Nạp tiền điện thoại</li>
                        </ul>
                    </div>
                    <div className=" w-[25%] cursor-pointer">
                        <h1 className="font-bold ">DÀNH CHO NGƯỜI BÁN</h1>
                        <ul>
                            <li>Quy định đối với người bán</li>
                            <li>Chính sách bán hàng</li>
                            <li>Hệ thống tiêu chí kiểm duyệt</li>
                            <li>Mở shop trên Sendo</li>
                        </ul>
                    </div>
                    <div className=" w-[25%] cursor-pointer">
                        <h1 className="font-bold">TẢI ỨNG DỤNG SENDO</h1>
                        <p className="pr-[10px] leading-4">Mang thế giới mua sắm của Sendo trong tầm tay bạn</p>
                        <div className="flex flex-wrap">
                            <a className="w-[90%] lg:w-[60%] xl:w-[40%]" href="https://apps.apple.com/vn/app/sendo-b%C3%A1n/id922780987?l=vi" target="_blank">
                                <button className="mr-2 mb-2">
                                    <img src="	https://media3.scdn.vn/img4/2020/12_16/5lUTWdk3DXr8nlC9MDII.png" alt="" />
                                </button>
                            </a>
                            <a className="w-[90%] lg:w-[60%] xl:w-[40%]" href="https://play.google.com/store/apps/details?id=com.sendo&pcampaignid=web_share" target="_blank">
                                <button className="mr-2 mb-2 ">
                                    <img src="	https://media3.scdn.vn/img4/2021/10_26/0ZARLASzVrfL92924rzW.png" alt="" />
                                </button>
                            </a>
                            <a className="w-[90%] lg:w-[60%] xl:w-[40%]" href="https://appgallery.huawei.com/app/C101535313" target="_blank">
                                <button className="mr-2 mb-2">
                                    <img src="	https://media3.scdn.vn/img4/2021/03_19/AMV086JNpEbm4OGAvVng.png" alt="" />
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-slate-800 px-[16px] py-8 text-white leading-5 ">
                <div className="flex mx-0 lg:mx-[5%] justify-between">
                    <div className="w-[40%] ">
                        <h1 className="font-bold">Công ty Cổ phần Công nghệ Sen Đỏ, thành viên của Tập đoàn FPT</h1>
                        <p>Số ĐKKD: 0312776486 - Ngày cấp: 13/05/2014, được sửa đổi lần thứ 20, ngày 26/04/2022.</p>
                        <p>Cơ quan cấp: Sở Kế hoạch và Đầu tư TPHCM.</p>
                        <p>Địa chỉ: Tầng 5, Tòa nhà A, Vườn Ươm Doanh Nghiệp, Lô D.01, Đường Tân Thuận, Khu chế xuất Tân Thuận, Phường Tân Thuận Đông, Quận 7, Thành phố Hồ Chí Minh, Việt Nam.</p>
                        <p>Email: lienhe@sendo.vn</p>
                        <div className="flex">
                            <a className="w-[100px] mr-5" href="http://online.gov.vn/Home/WebDetails/21391" target="_blank" >
                                <img src="https://media3.scdn.vn/img4/2020/12_16/XhpGDnvWqrlKeHLst3aS.png" alt="" />
                            </a>
                            <a className="w-[100px]" href="https://help.sendo.vn/hc/vi/articles/115001260091-L%C3%A0m-th%E1%BA%BF-n%C3%A0o-%C4%91%E1%BB%83-tr%E1%BA%A3-h%C3%A0ng" target="_blank" >
                                <img src="https://media3.scdn.vn/img4/2020/12_16/h6lEMGIAt4Uapd0Mls34.png" alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="w-[50%]">
                        <h1>Đăng ký nhận bản tin ưu đãi khủng từ Sendo</h1>
                        <form action="" className="flex">
                            <div className="w-[50%] mr-2">
                                <input className="rounded-[2px] p-2 w-[100%] text-[14px] outline-none focus:outline-1 focus:outline-blue-600" type="email" placeholder="Email của bạn là" />
                            </div>
                            <div className="w-[50%]">
                                <button className="bg-red-500 rounded-[2px] font-bold p-2 w-[60%] text-[14px]" type="submit"> Đăng kí</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <section className="bg-zinc-50">
                <div></div>
            </section>
        </footer>)
}
export default Footer;