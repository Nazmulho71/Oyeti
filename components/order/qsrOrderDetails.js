import React, { useState, useEffect } from "react";
import { _getOrdeInfo } from "../../lib/helpers/payment";
import { useSelector } from "react-redux";
import { currency } from "../../lib/enums";
import { _getAddonStr, orderTypeString } from "../../lib/helpers/checkout";
import CallAction from "../common/callAction";
import ImageConst from "../../utils/ImageConst";
import DetailsStatus from "./detailsStatus";

const Index = ({ collapsed, query, orderInfo }) => {
  const [orderType, setOrderType] = useState("");
  const [comment, setComment] = useState("");
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed);

  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  let items = orderInfo.items ?? [];

  const getAddonTitle = (item) => {
    let data = { ...item, addons: [item.addons] };
    return _getAddonStr(data);
  };

  const orderTypeLabel = () => {
    if (typeof window !== "undefined") {
      let label = localStorage.getItem("typeLabel");
      return label?.replace(/[^\w.,\s]/g, "");
    }
  };

  return (
    <div className="page-wrapper" style={{ paddingBottom: "150px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "end",
          justifyContent: "space-between",
        }}
      >
        <div className={`cart-title ${dark && "cart-title-dark"}`}>
          <h3>
            My Order - {orderTypeLabel()}
            {/* {orderTypeString(orderType)} */}
          </h3>
          {/* <p>@ Lunch Box - Rajajinagar</p> */}
        </div>

        {orderInfo.id && <CallAction orderInfo={orderInfo} isGrocery={false} />}
      </div>

      <div className={`order-det-border ${dark && "order-det-border-dark"}`}>
        <div
          className={`order-det justify-content-between align-items-center ${
            dark && "order-det-dark"
          }`}
        >
          <div
            className={`order-det-text align-items-center ${
              dark && "order-det-text-dark"
            }`}
          >
            <h5 className="mb-0">Order Status</h5>
            <p>Time of order : 14.24</p>
          </div>

          <div
            className={`order-det-img justify-content-between align-center ${
              dark && "order-det-img-dark"
            }`}
          >
            <div className="d-flex align-center">
              <img
                src={ImageConst.orderAccepted}
                alt=""
                style={{ width: "30px", marginRight: "20px" }}
              />
              <div className="d-block">
                <h2>Order Accepted</h2>
                <p>The restaurant has acceped your order</p>
              </div>
            </div>
            <div onClick={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? (
                <i
                  className={`fas fa-chevron-down down-icon ${
                    dark && "down-icon-dark"
                  }`}
                ></i>
              ) : (
                <i
                  className={`fas fa-chevron-up up-icon ${
                    dark && "up-icon-dark"
                  }`}
                ></i>
              )}
            </div>
          </div>

          <div
            className={`collapse-content ${
              isCollapsed ? "collapsed" : "expanded"
            }`}
            aria-expanded={isCollapsed}
          >
            <div className={`order-det-img ${dark && "order-det-img-dark"}`}>
              <img
                src={ImageConst.preparingFood}
                alt=""
                style={{ marginRight: "20px", width: "30px" }}
              />
              <div style={{ opacity: "0.5" }} className="d-block">
                <h2>Preparing food</h2>
                <p>The restaurant is preparing your food</p>
              </div>
            </div>
          </div>

          <div
            className={`collapse-content ${
              isCollapsed ? "collapsed" : "expanded"
            }`}
            aria-expanded={isCollapsed}
          >
            <div className={`order-det-img ${dark && "order-det-img-dark"}`}>
              <img
                src={ImageConst.orderAccepted}
                alt=""
                style={{ marginRight: "20px", width: "30px" }}
              />
              <div style={{ opacity: "0.5" }} className="d-block">
                <h2>Packing your food</h2>
                <p>The restaurant is packing your food</p>
              </div>
            </div>
          </div>

          <div
            className={`collapse-content ${
              isCollapsed ? "collapsed" : "expanded"
            }`}
            aria-expanded={isCollapsed}
          >
            <div className={`order-det-img ${dark && "order-det-img-dark"}`}>
              <img
                src={ImageConst.preparingFood}
                alt=""
                style={{ marginRight: "20px", width: "30px" }}
              />
              <div style={{ opacity: "0.5" }} className="d-block">
                <h2>Your food is ready to go</h2>
                <p>Collect your food at the counter</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="order-details-inp-container mt-3 mb-3">
          <input
            type="text"
            placeholder="Order ID"
            value={`Order ID #${orderInfo.order_id}`}
            disabled
          />
        </div> */}

      <div className="cart-list-containr pt-0">
        <div
          className={`cart-list-inner position-relative ${
            dark && "cart-list-inner-dark"
          }`}
        >
          {/* <div className="cart-list-label">A</div> */}

          {items.map((item, index) => {
            return (
              <div className="cart-list-item py-20" key={index}>
                <div className="cart-list-item-flexbox">
                  <div className="cart-list-item-name-cont">
                    <p
                      className={`mb-0 cart-list-item-name ${
                        dark && "cart-list-item-name-dark"
                      }`}
                    >
                      {/* {item.add_item_quantity} X */}
                      {item.item_name}
                    </p>
                    {item.addons.length > 0 ? (
                      <p className="mb-0 cart-list-item-toppings text-muted">
                        {" "}
                        {getAddonTitle(item)}{" "}
                      </p>
                    ) : null}
                  </div>
                  <div className="cart-list-item-price">
                    <p
                      className={`mb-0 item-price ${dark && "item-price-dark"}`}
                    >
                      {currency}
                      {item.item_total}
                    </p>
                  </div>
                </div>
                {/* <div className={`extra-cost ${dark && "extra-cost-dark"}`}>
                  Extra :{" "}
                </div> */}
                {/* <div className="cart-list-item-addons-flexbox">
                                        <p className="product-list-item-extra-list mb-0">Extra Cheese @ ₹60</p>
                                    </div> */}
                {/* <hr className="hr-thin" /> */}
              </div>
            );
          })}
        </div>
      </div>
      <DetailsStatus order={orderInfo} />

      <div
        className={`special-request-inp-container-border ${
          dark && "special-request-inp-container-border-dark"
        }`}
      >
        <div
          className={`special-request-inp-input ${
            dark && "special-request-inp-input-dark"
          }`}
        >
          <div
            className={`special-request-inp-container mt-0 ${
              dark && "special-request-inp-container-dark"
            }`}
          >
            {dark ? (
              <img
                style={{ width: 15, height: 15, marginLeft: 15 }}
                src={ImageConst.chatDark}
                alt=""
              />
            ) : (
              <img
                style={{
                  width: 15,
                  height: 15,
                  marginLeft: 15,
                }}
                src={ImageConst.chat}
                alt=""
              />
            )}
            <input
              value={comment}
              type="text"
              onChange={(e) => setComment(e.target.value)}
              placeholder="Please make Rajma Chawal spicy"
            />
          </div>
        </div>
      </div>

      <div
        className={`btn-botton-fixed ${dark && "btn-botton-fixed-dark"}`}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className={`btm-fxd-btn-border ${dark && "btm-fxd-btn-border-dark"}`}
        >
          <div className="d-flex w-100 justify-content-between align-items-center">
            <button className={`btm-fxd-btn ${dark && "btm-fxd-btn-dark"}`}>
              Am at the Restaurant
            </button>
          </div>
        </div>
        <button
          className={`btm-fxd-btn ${dark && "btm-fxd-btn-dark"}`}
          style={{
            boxShadow: "none",
            background: "none",
            paddingBottom: 0,
          }}
        >
          Share my location for ETA
        </button>
      </div>

      {/* <div
          className={`btn-botton-fixed ${dark && "btn-botton-fixed-dark"}`}
          style={{ background: "none", boxShadow: "none", paddingBottom: 0 }}
        >
          <div
            className={`btm-fxd-btn-border ${
              dark && "btm-fxd-btn-border-dark"
            }`}
            style={{ backgroundImage: "none" }}
          >
            <div
              className="d-flex w-100 justify-content-between align-items-center"
              style={{ background: "none" }}
            >
              <button
                className={`btm-fxd-btn ${dark && "btm-fxd-btn-dark"}`}
                style={{
                  boxShadow: "none",
                  background: "none",
                  paddingBottom: "10px",
                }}
              >
                Share my location for ETA
              </button>
            </div>
          </div>
        </div> */}
    </div>
  );
};

export default Index;
