import React from "react";
import { useLocation } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
const OrderDetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  if (!order) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        No order data found.
      </div>
    );
  }

  let shipping = {};
  try {
    const fixedJSON = order.shippingAddress
      ?.replace(/([a-zA-Z0-9_]+):/g, '"$1":') // Quote keys
      .replace(/'/g, '"') // Convert single quotes to double
      .replace(/"(\w+)"\s*:\s*undefined/g, '"$1": null') // Handle undefined
      .replace(/,(\s*})/g, "$1"); // Remove trailing commas

    shipping = JSON.parse(fixedJSON);
  } catch (err) {
    console.error("Error parsing shippingAddress:", err);
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Order Details</h1>
      <div className="mt-6 bg-white border border-gray-200 shadow-sm rounded-lg p-4 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircleIcon className="h-6 w-6 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-800">Order Status</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="text-gray-500">Order Date</p>
            <p className="font-medium">
              {new Date(order.dateOrdered).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Current Status</p>
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-800"
                  : order.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product List */}
        <div className="md:col-span-2 bg-white shadow-md rounded-lg p-6 border border-gray-200 space-y-6">
          {order.orderItems.map((item, index) => (
            <div
              key={item._id || index}
              onClick={() =>navigate(`/product/${item.product._id}`)}
              style={{ cursor: "pointer" }}
              className="flex flex-col md:flex-row gap-4 border-b pb-4 last:border-none"
            >
              <img
                src={item?.product?.image || "/placeholder.jpg"}
                alt={item?.name}
                className="w-18 h-32 object-cover rounded-md border"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {item?.name}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Sold by:{" "}
                  <span className="font-medium">
                    {item?.product?.vendor || "N/A"}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Quantity: {item?.quantity}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Order ID:{" "}
                  <span className="font-medium">{order?.orderId || "N/A"}</span>
                </p>
                <p className="text-lg font-bold text-green-600 mt-2">
                  ₹{item?.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Shipping & Price Details */}
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 space-y-6">
          {/* Shipping Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
            <p className="font-medium">{shipping?.name || "N/A"}</p>
            <p className="text-sm text-gray-700 leading-6">
              {shipping?.addressType || ""} {shipping?.apartment || ""}{" "}
              {shipping?.street || ""}
              <br />
              {shipping?.city || ""}, {shipping?.state || ""} -{" "}
              {shipping?.zip || ""}
              <br />
              {shipping?.country || ""}
              <br />
              <span className="font-semibold">Phone:</span>{" "}
              {shipping?.phone || "N/A"}
            </p>
          </div>

          {/* Price Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Price Details</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <hr className="my-2 border-t" />
              <p className="font-medium" style={{fontSize:15}}>Total Amount: ₹{order.totalPrice}</p>
              <p className="text-sm text-gray-600 mt-1">
                Payment Mode:{" "}
                <span className="font-medium">
                  {order?.user?.paymentCOD
                    ? "Cash on Delivery"
                    : "Online Payment"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
