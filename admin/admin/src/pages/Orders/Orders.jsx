import React, { useState, useEffect } from 'react';
import './Orders.css';
import toast from 'react-hot-toast';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error('Failed to fetch orders');
      }
    } catch (error) {
      toast.error('Server Error');
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name}x{item.quantity}
                    {idx < order.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>

              <p className="order-item-name">
                {order.address?.firstName} {order.address?.lastName}
              </p>

              <div className="order-item-address">
                <p>{order.address?.street},</p>
                <p>
                  {order.address?.city}, {order.address?.state},{' '}
                  {order.address?.country}, {order.address?.zipcode}
                </p>
              </div>

              <p className="order-item-phone">{order.address?.phone}</p>
            </div>

            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
