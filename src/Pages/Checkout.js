import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const CheckoutBlackWhite = () => {
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    country: "India",
    deliveryOption: "Standard",
  });
  const [pendingOrder, setPendingOrder] = useState(null);

  // Load Cart & Pending Order
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    const storedPendingOrder = JSON.parse(localStorage.getItem("pendingOrder"));
    if (storedPendingOrder) setPendingOrder(storedPendingOrder);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const totalAmount = cartItems.reduce(
    (t, item) => t + item.price * item.quantity,
    0
  );
  const shippingCost = form.deliveryOption === "Express" ? 300 : 100;

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Please login before placing an order.");
      return;
    }
    if (cartItems.length === 0) {
      alert("⚠️ Your cart is empty!");
      return;
    }

    const orderData = {
      total_amount: (totalAmount + shippingCost).toFixed(2),
      status: "Processing",
      items: cartItems.map((item) => ({
        product_id: item.id || 1,
        quantity: item.quantity,
        unit_price: item.price.toFixed(2),
        name: item.name,
        image: item.image,
      })),
      shipping_address:
        form.address1 + (form.address2 ? `, ${form.address2}` : ""),
      shipping_city: form.city,
      shipping_postal_code: form.pincode,
      shipping_country: form.country,
      shipping_cost: shippingCost.toFixed(2),
      deliveryOption: form.deliveryOption,
    };

    try {
      localStorage.setItem("pendingOrder", JSON.stringify(orderData));
      setPendingOrder(orderData);

      const res = await axios.post(
        "http://91.108.105.41:8000/api/orders/",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update pendingOrder with order number & delivery estimate
      setPendingOrder({
        ...orderData,
        orderNumber: res.data.id || Math.floor(Math.random() * 100000),
        deliveryEstimate:
          form.deliveryOption === "Express" ? "1–2 business days" : "3–5 business days",
      });

      localStorage.removeItem("cart");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("❌ Order failed. Check console for details.");
    }
  };

  // ---------- Order Confirmation UI ----------
  if (pendingOrder) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 mt-10">
          <div className="text-center">
            <div className="inline-block bg-green-100 text-green-800 p-4 rounded-full mb-4">
              🎉
            </div>
            <h2 className="text-3xl font-bold mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your order number: <span className="font-semibold">{pendingOrder.orderNumber || "12345"}</span>
            </p>
          </div>

          {/* Products Summary */}
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

          {/* Delivery & Payment Info */}
          <div className="flex justify-between border-t border-gray-200 pt-4 text-gray-700 font-medium">
            <span>Delivery ({pendingOrder.deliveryOption})</span>
            <span>₹{shippingCost}</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-2 text-gray-900 font-bold text-lg">
            <span>Total Amount</span>
            <span>₹{totalAmount + shippingCost}</span>
          </div>

          {/* Delivery Estimate */}
          <p className="mt-4 text-center text-gray-600">
            Expected Delivery: <span className="font-semibold">{pendingOrder.deliveryEstimate}</span>
          </p>

          {/* CTA Buttons */}
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

  // ---------- Normal Checkout ----------
  return (
    <div className="relative bg-gray-100 min-h-screen overflow-auto">
      <Header />
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
        {/* LEFT SECTION: Shipping + Delivery */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
            <h2 className="flex items-center text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
              <span className="w-8 h-8 sm:w-10 sm:h-10 bg-black text-white rounded-full flex items-center justify-center mr-3 sm:mr-4 animate-pulse">1</span>
              Shipping Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {["address1","address2","city","pincode","country"].map((name, idx) => (
                <input
                  key={idx}
                  name={name}
                  placeholder={name === "address1" ? "Address Line 1" :
                              name === "address2" ? "Address Line 2 (optional)" :
                              name.charAt(0).toUpperCase() + name.slice(1)}
                  value={form[name]}
                  onChange={handleChange}
                  className={`p-2 sm:p-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-black ${
                    name === "address1" || name === "address2" ? "col-span-2" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
            <h2 className="flex items-center text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
              <span className="w-8 h-8 sm:w-10 sm:h-10 bg-black text-white rounded-full flex items-center justify-center mr-3 sm:mr-4 animate-pulse">2</span>
              Delivery Option
            </h2>
            <div className="flex flex-col gap-2">
              {["Standard","Express"].map((option, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value={option}
                    checked={form.deliveryOption===option}
                    onChange={handleChange}
                    className="accent-black"
                  />
                  {option} Delivery (₹{option==="Standard"?100:300})
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: Order Summary */}
        <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col justify-between h-max">
          <h2 className="flex items-center text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
            <span className="w-8 h-8 sm:w-10 sm:h-10 bg-black text-white rounded-full flex items-center justify-center mr-3 sm:mr-4 animate-pulse">3</span>
            Order Summary
          </h2>

          {cartItems.length===0 ? (
            <p className="text-center text-gray-500 py-10">🛍️ Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-2 sm:p-3 border border-gray-300 rounded-xl mb-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg"/>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity} | ₹{item.price*item.quantity}</p>
                  </div>
                </div>
              ))}
              <hr className="my-4"/>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₹{totalAmount+shippingCost}</span>
              </div>
              <button onClick={handlePayment} className="mt-6 w-full py-3 rounded-xl text-white bg-black hover:bg-white hover:text-black border border-black transition duration-300">
                Confirm & Pay
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutBlackWhite;
