import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import OrderCard from "../../components/order/NewOrderCard";
import { _getMyOrders } from "../../lib/helpers/home";
import BottomMenu from "../../components/home/bottomMenu";
import Header from "../../components/common/header";
import { completedOrderStatus } from "../../lib/enums";
import Router from "next/router";
import { BaseStyles } from "../../components/helperComponents/BaseStyles";
import { Fragment } from "react";

let setLoader = true;
const Index = ({ asPath }) => {
  const [orders, setMyOrders] = useState([]);
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  useEffect(() => {
    _getMyOrders(setMyOrders, setLoader);
  }, []);

  const completedOrders = orders.filter(
    (order) =>
      order.o_status_id === completedOrderStatus.GroceryCompleted ||
      order.o_status_id === completedOrderStatus.QSRCompleted
  );
  const liveOrders = orders.filter(
    (order) =>
      order.o_status_id !== completedOrderStatus.GroceryCompleted &&
      order.o_status_id !== completedOrderStatus.QSRCompleted
  );

  return (
    <div
      className="wrapper"
      style={{
        ...BaseStyles.bgWhite,
        ...BaseStyles.p_b,
        ...BaseStyles.p_t,
        ...BaseStyles.p_l,
        ...BaseStyles.p_r,
      }}
    >
      <div className="container m-0 p-0">
        {/* <Header title="Live Order" goBack={() => Router.back()} /> */}
        <div className="d-flex align-items-center justify-content-between">
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ marginTop: "20px" }}
          >
            <img src="/assets/img/Cart.svg" alt="" />
            <p
              className="mb-0 ms-2"
              style={{
                color: dark ? "white" : "#404B69",
                fontWeight: 600,
                fontSize: "18px",
              }}
            >
              Orders
            </p>
          </div>
          <div>&nbsp;</div>
        </div>
      </div>

      <div className={`page-wrapper  qsr p-0`}>
        <div className="container py-2 px-0">
          <div className="d-flexd story-flexboxd">
            {liveOrders.map((order, index) => {
              return (
                <div style={{ ...BaseStyles.m_b_m, margin: "5px" }} key={index}>
                  {/* <OrderCard order={order}  withLabel={true} /> */}
                </div>
              );
            })}
          </div>
          {completedOrders.length > 0 ? (
            <Fragment>
              {/* <div className="divider"></div> */}
              <div
                className={`completed-orders ${
                  dark && "completed-orders-dark"
                }`}
              >
                Completed Orders
              </div>
              {/* <div className="divider"></div> */}
              <div className="d-flexd story-flexboxd">
                {completedOrders.map((order, index) => {
                  return (
                    <div style={{ ...BaseStyles.m_b_m }} key={index}>
                      <OrderCard order={order} withLabel={true} />
                    </div>
                  );
                })}
              </div>
            </Fragment>
          ) : (
            <p>No orders found</p>
          )}
        </div>
        <BottomMenu query={asPath} />
      </div>
    </div>
  );
};

Index.getInitialProps = async (ctx) => {
  const { asPath, query } = ctx;
  return { asPath, query };
};

export default Index;
