const NotFoundPage = () => {
    return (
        <div className="bg-white pb-20">
            <div className="w-[50%] m-auto text-center">
                <img className="m-auto" src="https://w3front.scdn.vn/sendo-buyers/9f147c2c-web/w3front/static/media/404.7e93682a7b32e37e37c6574b56ba2833.svg" alt="" />
                <h1 className="text-[20px] font-bold m-0">Địa chỉ không hợp lệ</h1>
                <p className="m-0 leading-4 text-[14px]">Địa chỉ URL bạn yêu cầu không tìm thấy trên server.</p>
                <p className="m-0 leading-6 text-[14px]">Có thể bạn gõ sai địa chỉ hoặc dữ liệu này đã bị xóa khỏi server.</p>
                <button className="bg-red-500 text-white text-[14px] p-1 px-3 rounded mt-6">Tiếp tục mua sắm</button>
            </div>
        </div>
    )
}

export default NotFoundPage;
