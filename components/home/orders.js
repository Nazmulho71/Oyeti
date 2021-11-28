import { useState, useEffect } from "react";
import SliderCMP from "../common/slider";
import OrderCard from "../order/NewOrderCard";
import { _getMyOrders } from "../../lib/helpers/home";

const Index = () => {
  const [orders, setMyOrders] = useState([]);

  useEffect(() => {
    _getMyOrders(setMyOrders);
  }, []);

  return (
    <div className="container py-0 px-0">
      {/* <p className="cr-prod-name mb-0">Track Orders</p> */}
      <div className="d-flexd story-flexboxd">
        {orders.length > 0 ? (
          <SliderCMP>
            {orders.map((order, index) => {
              return <OrderCard order={order} key={index} />;
            })}
          </SliderCMP>
        ) : null}
      </div>
    </div>
  );
};

export default Index;
