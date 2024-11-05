import React, { useContext, useState } from "react";
import Title from "../Components/Title";
import CartTotal from "../Components/cartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../Context/ShopContext";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const Placeorder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    additionalDirection: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((products) => products._id === items)
            );
            if (itemInfo) {
              itemInfo.quantity = cartItems[items][item]; // Removed size-related functionality
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
      };

      switch (method) {
        case "cod":
          const codResponse = await axios.post(
            `${backendUrl}order/place`, // Adjusted URL to point to your backend
            orderData,
            { headers: { token } }
          );
          if (codResponse.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(codResponse.data.message);
          }
          break;

        case "chapa":
          const response = await axios.post(
            `${backendUrl}order/place`,
            orderData,
            { headers: { token } }
          );

          // Redirect to Chapa payment URL
          window.location.href = response.data.checkoutUrl;
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
      toast.error(
        error.response ? error.response.data.message : "An error occurred"
      );
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="flex gap-3 ">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="E-mail"
        />
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone number"
        />
        <input
          required
          onChange={onChangeHandler}
          name="state"
          value={formData.state}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="State"
        />
        <div className="flex gap-3 ">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
        </div>
        <div className="flex gap-3 ">
          <input
            required
            onChange={onChangeHandler}
            name="additionalDirection"
            value={formData.additionalDirection}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Additional Direction"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"Payment"} text2={"Method"} />

          {/* Payment Method */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("chapa")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "chapa" ? "bg-green-400" : ""
                }`}>
                {" "}
              </p>
              chapa
              <img className="h-5 mx-4" src={assets.chapa_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                Cash on delivery
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-400 text-white px-16 py-3 text-sm">
              Place order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
