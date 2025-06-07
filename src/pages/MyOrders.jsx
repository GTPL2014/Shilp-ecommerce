import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoData from "../components/NoData";

const MyOrders = () => {
  const navigate = useNavigate();
  const orders = useSelector((state) => state.orders.order);
  console.log("orders", orders);
  return (
    <div>
      <div className="bg-white shadow-md p-3 font-semibold">
        <h1>Orders</h1>
      </div>

      {!orders?.length ? (
        <NoData />
      ) : (
        orders.map((order, index) => {
          let address = {};
          try {
            address = JSON.parse(order?.shippingAddress.name || "{}");
          } catch (err) {
            console.error("Invalid shippingAddress JSON:", err);
          }

          return (
            <div
              key={order._id + index + "order"}
              onClick={() =>
                navigate(`/dashboard/orderdetail/${order._id}`, {
                  state: { order },
                })
              }
              style={{ cursor: "pointer" }}
              className="order rounded p-4 mb-4 border border-gray-200 shadow-sm bg-white text-sm"
            >
              <p className="mb-2 font-medium text-blue-700">
                Order No: {order?.orderId}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Date:</span>{" "}
                {new Date(order?.dateOrdered).toLocaleString()}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Status:</span>{" "}
                {order?.status || "Pending"}
              </p>
              <p className="text-gray-600 mb-1" style={{ fontSize: 15 }}>
                <span className="font-medium">Total:</span> ₹{order?.totalPrice}
              </p>
              <div className="mt-3">
                <span className="font-medium block mb-2">Items:</span>
                {order?.orderItems?.map((item, itemIndex) => (
                  <div
                    key={item._id + itemIndex}
                    className="flex gap-3 mb-4 items-center"
                  >
                    <img
                      src={item?.product?.image || "/placeholder.jpg"}
                      alt={item?.product?.name || item?.name}
                      className="w-14 h-18 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">
                        {item?.product?.name || item?.name}
                      </p>
                      <p>Quantity: {item?.quantity}</p>
                      <p>Price: ₹{item?.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyOrders;
