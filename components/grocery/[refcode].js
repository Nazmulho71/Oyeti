import { useEffect, useState, Fragment } from "react";
import nextCookie from "next-cookies";
import Router from "next/router";
import LoginCMP from "../../../components/login/login";
import ApplyCoupon from "../../../components/checkout/applyCoupon";
import { _getCartsFun } from "../../../lib/helpers/menu";
import {
  _getCheckoutDataFun,
  _getCheckoutDataFunGroccery,
} from "../../../lib/helpers/checkout";
import loaderAction from "../../../lib/helpers/loader";
import { _getOrdeInfo } from "../../../lib/helpers/payment";
import {
  getModifiedOrderAttribute,
  _getGroceryBillingData,
} from "../../../lib/helpers/common";
import {
  currency,
  OrderDeliverEnums,
  GROCERY_ORDER_STATUSES,
} from "../../../lib/enums";
import StatusTimeline from "./components/statusTimeline";

const OrderListItem = ({ product, orderItems, index }) => {
  const isLastItem = index == orderItems.length - 1;
  const isFirstItem = index == 0;

  return (
    <div
      className={`grocery--modified-items-list-item ${
        isFirstItem ? "pt-0" : ""
      } ${isLastItem ? "pb-0" : ""}`}
      style={{ borderBottom: isLastItem ? "none" : "1px solid gray" }}
    >
      <div>
        <div className="list-item-left">
          <div className="list-item-quantity">
            {getModifiedOrderAttribute(product) === "quantity" ? (
              <Fragment>
                <span className="text-strike-through list-item-modified-qty">
                  {product.ordered_qty}
                </span>
                <span style={{ color: "#FF118E" }}>
                  {product.processed_qty}
                </span>
              </Fragment>
            ) : (
              <span>{product.ordered_qty}</span>
            )}
          </div>
          {" X "}
          <div className="mx-3 flex-occupy">
            <div>
              <span className="font-15 font-800">{product.name}</span>
            </div>
            <div className="d-flex qty-text-light">
              {product.unit !== "" ? (
                <div className="mr-8">
                  {`${product.unit_quantity} ${product.unit}`}
                </div>
              ) : null}
              {product.processed_qty}
              {" x "}
              {getModifiedOrderAttribute(product) === "price" ? (
                <div className="flex">
                  <span className="text-strike-through list-item-modified-qty">
                    {currency}
                    {product.price}
                  </span>
                  <span style={{ color: "#FF118E" }}>
                    {currency}
                    {product.processed_price}
                  </span>
                </div>
              ) : (
                `${currency}${product.processed_price}`
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="category--item--right-right font-18 font-800 flex-occupy">
        <span>
          {`${currency}${product.processed_qty * product.processed_price}`}
        </span>
      </div>
    </div>
  );
};

const Index = ({ isLoggedIn, query }) => {
  const [tipAmount, setTipAmount] = useState("20");
  const [orderType, setOrderType] = useState("");
  const [loginStatus, setLoginStatus] = useState(isLoggedIn);
  const [carts, setCarts] = useState([]);
  const [checkoutData, setCheckoutData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGroceryLoader, setIsGroceryLoader] = useState(false);
  const [orderItem, setOrderItem] = useState({});
  const [isGrocery, setIsGrocery] = useState(true);
  const [orderInfo, setOrderInfo] = useState({});
  const [confirmedOrderItemsInfo, setConfirmedItemsInfo] = useState({
    modified: [],
    unmodified: [],
  });
  const [billingData, setBillingData] = useState([]);

  const _getCarts = () => {
    _getCartsFun(setCarts);
  };

  const _getCheckoutCartsData = async () => {
    loaderAction(true);
    await _getCheckoutDataFunGroccery(
      setCheckoutData,
      setOrderItem,
      setIsGrocery
    );
    await _getOrdeInfo(query.refcode, setOrderInfo);
    setTimeout(() => {
      loaderAction(false);
    }, 1000);
  };

  useEffect(() => {
    _getCarts();
  }, []);

  useEffect(() => {
    loaderAction(true);
    _getCheckoutCartsData();
  }, []);

  useEffect(() => {
    const products = [];
    const confirmedOrderInfo = {
      modified: [],
      unmodified: [],
    };
    if (Object.keys(orderInfo).length != 0) {
      orderInfo.items.forEach((item) => {
        item.sub_categories.forEach((subCategory) => {
          subCategory.products.forEach((product) => {
            products.push(product);
          });
        });
      });
    }
    products.forEach((product) => {
      if (getModifiedOrderAttribute(product) !== "") {
        confirmedOrderInfo.modified.push(product);
      } else {
        confirmedOrderInfo.unmodified.push(product);
      }
    });
    setConfirmedItemsInfo(confirmedOrderInfo);
    _getGroceryBillingData(orderInfo, setBillingData);
  }, [orderInfo]);

  let amount = 0;
  if (billingData && billingData.length > 0) {
    amount = billingData.find(
      (billing_property) => billing_property.id === "total"
    )["amount"];
  }

  useEffect(() => {
    console.log(document.referrer);
  }, []);

  const _pushBack = () => {
    if (query.feedback) {
      Router.push("/");
    } else {
      Router.back();
    }
  };

  if (!orderInfo.order_status) return null;

  return (
    <div className="wrapper page-wrapper grocery">
      <div className="container m-0 p-0">
        <div className="status-bar-cont">
          <div className="d-flex status-bar-inner">
            <div className="status-name" onClick={() => _pushBack()}>
              <button>
                <i className="fas fa-chevron-left"></i>
              </button>
              <p className="mb-0">Bill</p>
            </div>
            <div className="status-btn">
              <button>{OrderDeliverEnums[orderInfo.delivery_type]}</button>
            </div>
          </div>
        </div>
        <div className="status-timeline-wrapper">
          <StatusTimeline
            orderStatus={orderInfo.order_status}
            deliveryType={orderInfo.delivery_type}
          />
        </div>

        <div className={`grocery-my-order`}>
          {confirmedOrderItemsInfo.modified.length > 0 && (
            <div className="grocery--modified-items-container">
              <span className="font-15 font-800">
                Merchant has {confirmedOrderItemsInfo.modified.length}{" "}
                {confirmedOrderItemsInfo.modified.length === 1
                  ? "change"
                  : "changes"}{" "}
                to your order.
              </span>
              {confirmedOrderItemsInfo.modified.map((product, index) => (
                <OrderListItem
                  product={product}
                  orderItems={confirmedOrderItemsInfo.modified}
                  index={index}
                />
              ))}
            </div>
          )}

          <div className="bg-white br-20 px-20 py-20 ">
            {confirmedOrderItemsInfo.unmodified.map((product, index) => (
              <OrderListItem
                product={product}
                orderItems={confirmedOrderItemsInfo.unmodified}
                index={index}
              />
            ))}
          </div>
        </div>

        {GROCERY_ORDER_STATUSES.confirmed.id == orderInfo.status_id ? (
          <>
            <ApplyCoupon amount={amount} />
          </>
        ) : null}
        {billingData.length > 0 && (
          <div className="bill-details-container">
            <div className="bill-details-inner">
              <p className="heading-bold-small">Bill Details</p>
              <div className="bill-amount-details-cont">
                {billingData
                  .filter((billing_property) => billing_property.id !== "total")
                  .map((item, index) => (
                    <div className="bill-det-amt-item" key={index}>
                      <p>{item.label}</p>
                      <p>{item.amount}</p>
                    </div>
                  ))}
              </div>
              <hr className="my-2" />
              <div className="bill-details-total">
                <p>
                  {
                    billingData.find(
                      (billing_property) => billing_property.id === "total"
                    )["label"]
                  }
                </p>
                <p>
                  {
                    billingData.find(
                      (billing_property) => billing_property.id === "total"
                    )["amount"]
                  }
                </p>
              </div>
            </div>
          </div>
        )}
        {!loginStatus ? (
          <LoginCMP
            onSuccessLogin={() => setLoginStatus(true)}
            orderType={orderType}
            onSetType={(type) => setOrderType(type)}
          />
        ) : null}
      </div>
      {orderInfo.payment &&
        orderInfo.payment.status.toLowerCase() === "pending" && (
          <div className="btn-botton-fixed">
            <div className="d-flex w-100 justify-content-between align-items-center">
              <button
                className="btm-fxd-btn"
                onClick={() =>
                  Router.push(`/payment?refcode=${orderInfo.payment.refcode}`)
                }
              >
                Proceed to pay
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

Index.getInitialProps = async (ctx) => {
  const { token } = nextCookie(ctx);
  let isLoggedIn = token ? true : false;
  return { isLoggedIn, token, query: ctx.query };
};

export default Index;
