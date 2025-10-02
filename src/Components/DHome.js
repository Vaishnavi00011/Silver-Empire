// AdminHome.jsx
import React from "react";

const dashboardData = [
  { title: "Total Orders", value: 1280, color: "bg-blue-500" },
  { title: "Total Users", value: 320, color: "bg-green-500" },
  { title: "Total Products", value: 75, color: "bg-yellow-500" },
  { title: "Revenue", value: "$12,450", color: "bg-purple-500" },
];

const recentOrders = [
  { id: 1, customer: "John Doe", product: "Silver Necklace", status: "Delivered", amount: "$120" },
  { id: 2, customer: "Jane Smith", product: "Silver Earrings Set", status: "Pending", amount: "$80" },
  { id: 3, customer: "David Lee", product: "Silver Bracelet", status: "Delivered", amount: "$150" },
  { id: 4, customer: "Sara Wilson", product: "Silver Ring", status: "Cancelled", amount: "$60" },
];


const AdminHome = () => {
  return (
    <div className="p-6  ">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {dashboardData.map((item, index) => (
          <div key={index} className={`p-6 rounded-lg shadow-md text-white ${item.color}`}>
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-2xl mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Product</th>
              <th className="py-2">Status</th>
              <th className="py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{order.id}</td>
                <td className="py-2">{order.customer}</td>
                <td className="py-2">{order.product}</td>
                <td className="py-2">{order.status}</td>
                <td className="py-2">{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
