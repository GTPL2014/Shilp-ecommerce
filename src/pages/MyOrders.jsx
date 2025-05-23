import React from 'react';
import { useSelector } from 'react-redux';
import NoData from '../components/NoData';

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order);

  return (
    <div>
      <div className='bg-white shadow-md p-3 font-semibold'>
        <h1>Order</h1>
      </div>

      {!orders?.length ? (
        <NoData />
      ) : (
        orders.map((order, index) => (
          <div key={order._id + index + 'order'} className='order rounded p-4 text-sm border-b'>
            <p className='mb-2 font-medium'>Order No: {order?.orderId}</p>

            {order?.orderItems?.map((item, itemIndex) => (
              <div key={item._id + itemIndex} className='flex gap-3 mb-4 items-center'>
                <img
                  src={item.product?.image}
                  alt={item.product?.name}
                  className='w-14 h-14 object-cover rounded'
                />
                <p className='font-medium'>{item.product?.name}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
