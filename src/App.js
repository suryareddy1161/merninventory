// import jwt_decode from "jwt-decode";

import { useSelector } from 'react-redux'
// import Inventory from "./Inventory";

import Signin1 from "./Signin1";
import Header1 from "./Header1";
import Signup1 from "./Signup1";
import AddMenu from "./AddMenu";
// import Payment from "./Payment";
// import BuyerSupplier from "./BuyerSupplier";
// import AddOrder from "./AddOrder";
// import HomePage from "./HomePage"
import { BrowserRouter , Routes, Route } from "react-router-dom";
// import HomePage from "./HomePage";
export default function App() {



  const num = useSelector((state) => state.Data)

  const headers = {
    token: localStorage.getItem("token"),
    
  };

   
var token = headers.token;
console.log(token,"appjstoken")
console.log(num.price,"nummmmmm")
  return (
    <div className="App">
      <BrowserRouter>
      
      
        

        {num.price==="signdata"||token?<Header1 />:""}
{/* <Header1/> */}
        <Routes>
          
        <Route path={"/"} element={<AddMenu />} />
          <Route path="/signin" element={<Signin1/>} />

          <Route path="/signup" element={<Signup1 />} />
         </Routes>
      
      </BrowserRouter>
    </div>
  );
}
