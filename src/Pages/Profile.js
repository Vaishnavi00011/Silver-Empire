import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Key, LogOut, Package, Diamond, Settings, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

// --- Static User Data ---
const dummyUser = {
  first_name: "Vaishnavi",
  last_name: "Patil",
  email: "vaishnavipatilvashu@gmail.com",
  phone: "9876543210",
  join_date: "October 2025",
};

// --- Dummy Orders ---
const dummyOrders = [
  { id: 'ORD001', date: '10 Sep 2024', status: 'Delivered', total: 45200, items: 1, image: 'https://images.unsplash.com/photo-1628045995536-1e6a9d701a5e?q=80&w=200&h=200&fit=crop' },
  { id: 'ORD002', date: '01 Oct 2024', status: 'Shipped', total: 12500, items: 2, image: 'https://images.unsplash.com/photo-1594950228028-112e4f04c660?q=80&w=200&h=200&fit=crop' },
];

// --- Order Card ---
const OrderCard = ({ order }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
    <div className="flex items-center space-x-4">
      <img 
        src={order.image} 
        alt="Product" 
        className="w-16 h-16 object-cover rounded-md border border-gray-200"
      />
      <div>
        <p className="text-sm font-semibold text-gray-900">Order ID: {order.id}</p>
        <p className="text-xs text-gray-500">Placed on: {order.date}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-lg font-bold text-gray-800">₹{order.total.toLocaleString('en-IN')}</p>
      <span className={`px-3 py-0.5 text-xs font-medium rounded-full ${
        order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 
        order.status === 'Shipped' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-700'
      }`}>
        {order.status}
      </span>
    </div>
  </div>
);

// --- Dashboard Item Card ---
const DashboardItem = ({ icon: Icon, title, count, color, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white p-5 rounded-lg border border-gray-200 cursor-pointer hover:shadow-lg hover:border-black transition-all duration-300"
  >
    <div className={`flex items-center space-x-3 mb-2 ${color}`}>
      <Icon className="w-6 h-6" />
      <p className="text-lg font-semibold text-gray-900">{title}</p>
    </div>
    {count !== undefined && (
      <p className="text-3xl font-bold text-gray-700">{count}</p>
    )}
  </div>
);

// --- Dashboard Content ---
const DashboardContent = ({ user, setActiveTab, wishlistCount, addressCount }) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-serif font-light text-gray-900 border-b pb-4">Account Dashboard</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <DashboardItem 
        icon={Package} 
        title="My Orders" 
        count={dummyOrders.length}
        color="text-black"
        onClick={() => setActiveTab('orders')}
      />
      <DashboardItem 
        icon={Heart} 
        title="Wishlist" 
        count={wishlistCount}
        color="text-red-500"
        onClick={() => setActiveTab('wishlist')}
      />
      <DashboardItem 
        icon={MapPin} 
        title="Addresses" 
        count={addressCount}
        color="text-gray-700"
        onClick={() => setActiveTab('address')}
      />
      <DashboardItem 
        icon={Settings} 
        title="Account Settings" 
        color="text-gray-700"
        onClick={() => setActiveTab('account')}
      />
    </div>

    {/* Recent Orders */}
    <div className="space-y-4 pt-4">
      <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
        <ShoppingBag className="w-5 h-5 text-gray-500" /> Recent Purchases
      </h3>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {dummyOrders.slice(0, 2).map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
        <button 
          onClick={() => setActiveTab('orders')}
          className="w-full text-center text-sm font-medium py-3 text-black hover:bg-gray-100 transition-colors duration-200"
        >
          View All Orders
        </button>
      </div>
    </div>
  </div>
);

// --- Main Profile Component ---
const JewelryProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(dummyUser);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [wishlistCount, setWishlistCount] = useState(0);
  const [addressCount] = useState(1); // फिलहाल static रखा गया है
  const LOGOUT_API = 'http://91.108.105.41:8000/api/auth/logout/';

  // ✅ Wishlist count update from localStorage
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlistCount(JSON.parse(storedWishlist).length);
    } else {
      setWishlistCount(0);
    }
  }, []);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.first_name) {
          setUser(userData);
        }
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }
  }, []);

  const handleUserUpdate = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem('user', JSON.stringify(newUserData));
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.post(LOGOUT_API, {}, { headers: { 'Authorization': `Bearer ${token}` } });
        alert('You have been logged out successfully.');
      } catch (error) {
        alert('An error occurred during server logout, but you have been logged out locally.');
      }
    }
    localStorage.clear();
    setUser(null);
    navigate('/');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Diamond, content: <DashboardContent user={user} setActiveTab={setActiveTab} wishlistCount={wishlistCount} addressCount={addressCount} /> },
    { id: 'orders', label: 'My Orders', icon: Package, content: <div className='p-10 text-gray-500'>All Orders will be shown here.</div> },
    { id: 'address', label: 'Shipping Addresses', icon: MapPin, content: <div className='py-10 text-center text-gray-500'>Addresses management section goes here.</div> },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, content: <div className='py-10 text-center text-gray-500'>Your curated wishlist of items.</div> },
    { id: 'account', label: 'Account Details', icon: Settings, content: <div className='p-10 text-gray-500'>Account settings form.</div> },
  ];

  const ActiveContent = navItems.find(item => item.id === activeTab)?.content;

  return (
    <div>
        <Header></Header>
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0 hidden md:block bg-white border border-gray-200 rounded-lg h-fit sticky top-10">
            <div className="flex flex-col items-center p-6 border-b border-gray-200">
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center font-bold text-2xl mb-2 border-2 border-amber-400">
                {user.first_name[0].toUpperCase()}
              </div>
              <p className="font-semibold text-lg text-gray-900">{user.first_name} {user.last_name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <nav className="p-4 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-md transition-all duration-200 text-left ${
                    activeTab === item.id 
                      ? 'bg-black text-white font-semibold' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-amber-400' : 'text-gray-400'}`} />
                  <span className="text-base">{item.label}</span>
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 p-3 rounded-md transition-all duration-200 text-left text-red-600 hover:bg-red-50 mt-2"
              >
                <LogOut className="w-5 h-5 text-red-400" />
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 min-w-0 bg-white"
          >
            {ActiveContent}
          </motion.div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default JewelryProfilePage;
