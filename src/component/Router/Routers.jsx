import { Route, Routes } from "react-router-dom";
import Main from "../main/Main";
import Cart from "../cart/Cart";
import ProductDetail from "../main/ProductDetail";
import AboutUsPage from "../main/AboutUsPage";
import SignInPage from "../main/SignInPage";
import SignUpPage from "../main/SignUpPage";
import NotFoundPage from "../main/NotFoundPage";
import InforUserPage from "../main/InforUserPage";
import CheckOut from "../main/CheckOut";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/productdetail/:id" element={<ProductDetail />}> </Route>
            <Route path="/aboutus" element={<AboutUsPage/>}> </Route>
            <Route path="/signin" element={<SignInPage/>}> </Route>
            <Route path="/signup" element={<SignUpPage/>}> </Route>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/inforUser" element={<InforUserPage/>}/>
            <Route path="/checkOut" element={<CheckOut/>}/>
        </Routes>
    )
}
export default Routers;
