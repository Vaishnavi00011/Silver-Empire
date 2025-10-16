import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const BuyNowPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { product, quantity = 1, selectedSize } = location.state || {};

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    altPhone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    deliveryOption: "Standard",
    giftMessage: "",
    specialInstructions: "",
  });

  const [pendingOrder, setPendingOrder] = useState(null);

  if (!product) {
    return <p className="text-center mt-20">No product selected!</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const shippingCost = form.deliveryOption === "Express" ? 300 : 100;
  const totalAmount = product.current_price * quantity + shippingCost;

  const handlePlaceOrder = async () => {
    const orderData = {
      total_amount: totalAmount.toFixed(2),
      status: "Processing",
      items: [
        {
          product_id: product.id,
          name: product.name,
          variation: selectedSize,
          quantity,
          unit_price: product.current_price.toFixed(2),
          image: product.primary_image?.image
            ? `http://91.108.105.41:8000${product.primary_image.image}`
            : product.image,
        },
      ],
      shipping_address: form.address1 + (form.address2 ? `, ${form.address2}` : ""),
      shipping_city: form.city,
      shipping_state: form.state,
      shipping_postal_code: form.pincode,
      shipping_country: form.country,
      shipping_cost: shippingCost.toFixed(2),
      deliveryOption: form.deliveryOption,
      giftMessage: form.giftMessage,
      specialInstructions: form.specialInstructions,
    };

    try {
      localStorage.setItem("pendingOrder", JSON.stringify(orderData));
      setPendingOrder(orderData);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://91.108.105.41:8000/api/orders/",
        orderData,
        token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {}
      );

      // Update pendingOrder with order number & delivery estimate
      setPendingOrder({
        ...orderData,
        orderNumber: res.data.id || Math.floor(Math.random() * 100000),
        deliveryEstimate: form.deliveryOption === "Express" ? "1–2 business days" : "3–5 business days",
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Order failed. Check console for details.");
    }
  };

  // ---------- Pending Order UI ----------
  if (pendingOrder) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 mt-10">
          <div className="text-center">
            <div className="inline-block bg-green-100 text-green-800 p-4 rounded-full mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your order number: <span className="font-semibold">{pendingOrder.orderNumber}</span>
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {pendingOrder.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 border p-3 rounded-xl shadow-sm">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="font-semibold">₹{(item.quantity * item.unit_price).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-between border-t border-gray-200 pt-4 text-gray-700 font-medium">
            <span>Delivery ({pendingOrder.deliveryOption})</span>
            <span>₹{shippingCost}</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-2 text-gray-900 font-bold text-lg">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>

          <p className="mt-4 text-center text-gray-600">
            Expected Delivery: <span className="font-semibold">{pendingOrder.deliveryEstimate}</span>
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <button
              className="bg-black text-white px-6 py-2 rounded-xl hover:bg-white hover:text-black border border-black transition"
              onClick={() => alert("Track Order clicked!")}
            >
              Track Order
            </button>
            <button
              className="bg-gray-200 px-6 py-2 rounded-xl hover:bg-gray-300 transition"
              onClick={() => {
                setPendingOrder(null);
                localStorage.removeItem("pendingOrder");
                navigate("/");
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ---------- Normal BuyNow Form ----------
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
        {/* Left Form */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-6">
          {/* Shipping Details */}
          <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Shipping Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {["name","email","phone","altPhone","address1","address2","city","state","pincode","country"].map((field, idx)=>(
                <input
                  key={idx}
                  type={field==="email"?"email":field==="phone"?"tel":"text"}
                  name={field}
                  placeholder={field==="address1"?"Address Line 1":field==="address2"?"Address Line 2 (optional)":field.charAt(0).toUpperCase()+field.slice(1)}
                  value={form[field]}
                  onChange={handleChange}
                  className="p-2 sm:p-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-black"
                />
              ))}
            </div>
          </div>

          {/* Delivery & Notes */}
          <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Delivery & Notes</h2>
            <div className="flex flex-col gap-2 mb-3">
              {["Standard","Express"].map((option, idx)=>(
                <label key={idx} className="flex items-center gap-2">
                  <input type="radio" name="deliveryOption" value={option} checked={form.deliveryOption===option} onChange={handleChange} className="accent-black"/>
                  {option} Delivery (₹{option==="Standard"?100:300})
                </label>
              ))}
            </div>
            <textarea name="giftMessage" placeholder="Gift Message (optional)" value={form.giftMessage} onChange={handleChange} className="w-full p-2 sm:p-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-black mb-3"/>
            <textarea name="specialInstructions" placeholder="Special Instructions (optional)" value={form.specialInstructions} onChange={handleChange} className="w-full p-2 sm:p-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-black"/>
          </div>
        </div>

        {/* Right Order Summary */}
        <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col justify-between h-max">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex items-center gap-3 p-2 sm:p-3 border border-gray-300 rounded-xl mb-3">
            <img src={product.primary_image?.image ? `http://91.108.105.41:8000${product.primary_image.image}` : product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg"/>
            <div className="flex-1">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-500 text-sm">Qty: {quantity} | ₹{product.current_price * quantity}</p>
            </div>
            <div className="font-semibold">₹{product.current_price * quantity}</div>
          </div>

          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Delivery</span>
            <span>₹{shippingCost}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>

          <button onClick={handlePlaceOrder} className="w-full py-3 rounded-xl text-white bg-black hover:bg-white hover:text-black border border-black transition duration-300">
            Confirm & Pay
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BuyNowPage;
