import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import nextCookie from "next-cookies";
import Router from "next/router";
import LoginCMP from "../../../components/login/login";
import ErrorPopup from "../../../components/common/errorPopup";
import PopUpConfirm from "../../../components/common/confirm";
import CallAction from "../../../components/common/callAction";
import ApplyCoupon from "../../../components/checkout/applyCoupon";
import { _getCartsFun } from "../../../lib/helpers/menu";
import {
  _getCheckoutDataFun,
  _getCheckoutDataFunGroccery,
} from "../../../lib/helpers/checkout";
import loaderAction from "../../../lib/helpers/loader";
import { _getOrdeInfo, _cancelOrder } from "../../../lib/helpers/payment";
import {
  getModifiedOrderAttribute,
  _getGroceryBillingData,
} from "../../../lib/helpers/common";
import {
  currency,
  OrderDeliverEnums,
  GROCERY_ORDER_STATUSES,
  OrderChanged,
} from "../../../lib/enums";
import StatusTimeline from "../../../components/grocery/components/statusTimeline";
import Coupon from "../../../components/checkout/coupon";
import GroceryContent from "../../../components/common/groceryContent";
import { amountFix } from "../../../lib/helpers/commonHelper";
import Header from "../../../components/common/header";
import ImageConst from "../../../utils/ImageConst";
import { getCountryCodePhone } from "../../../lib/helpers/afterPayment";
import Checkout from "../../checkout";

const OrderListItem = ({ product, orderItems, index, changed }) => {
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  const isLastItem = index == orderItems.length - 1;
  const isFirstItem = index == 0;

  const priceChangeMessage = (product) => {
    let string = "";

    if (getModifiedOrderAttribute(product) === OrderChanged.Both) {
      string = `price changed from ${currency}${product.price} to ${currency}${product.processed_price} and quantity changed from ${product.ordered_qty} to ${product.processed_qty}`;
    }

    if (getModifiedOrderAttribute(product) === OrderChanged.Quantity) {
      string = `quantity changed from ${product.ordered_qty} to ${product.processed_qty}`;
    }
    if (getModifiedOrderAttribute(product) === OrderChanged.Price) {
      string = `price changed from ${currency}${product.price} to ${currency}${product.processed_price}`;
    }

    if (getModifiedOrderAttribute(product) === OrderChanged.Item) {
      string = `merchant suggested item from ${product.name} to ${product.alt_name}`;
    }

    return string;
  };

  return (
    // <div
    //   className={`grocery--${changed ? "" : "un"}modified-items-list-item ${
    //     isFirstItem ? "pt-0" : ""
    //   } ${isLastItem ? "pb-0" : ""}`}
    //   style={{ border: changed ? "border: 1px solid #f8f9fa !important" : "" }}
    // >
    <div>
      <div>
        {/* {
                    priceChangeMessage(product)
                } */}

        <div className="list-item-left">
          {/* <div className="list-item-quantity">
            {getModifiedOrderAttribute(product) === OrderChanged.Quantity ||
            getModifiedOrderAttribute(product) === OrderChanged.Both ? (
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
          {" X "} */}
          <div className="d-flex align-items-center justify-content-between w-100">
            <div>
              <div>
                <span
                  className={`font-14 font-600 ${
                    product.processed_qty == 0 ? "text-strike-through" : ""
                  }`}
                >
                  {product.name}
                </span>
              </div>

              <div
                className={`d-flex qty-text-light ${dark && "qty-text-dark"}`}
              >
                {product.unit !== "" ? (
                  <div className="mr-8">
                    {`${product.unit_quantity} ${product.unit}`}
                  </div>
                ) : null}
                {product.processed_qty}
                {" x "}
                {getModifiedOrderAttribute(product) === OrderChanged.Price ||
                getModifiedOrderAttribute(product) === OrderChanged.Both ? (
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

            <div
              className={`category--item--right-right ${
                dark && "category--item--right-right-dark"
              }`}
            >
              <span>
                {`${currency}${amountFix(
                  product.processed_qty * product.processed_price
                )}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = ({ isLoggedIn, query }) => {
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);
  const [orderType, setOrderType] = useState("");
  const [loginStatus, setLoginStatus] = useState(isLoggedIn);
  const [carts, setCarts] = useState([]);
  const [orderItem, setOrderItem] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [isApplyCoupon, setIsApplyCoupon] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [error, setError] = useState("");
  const [isCancel, setIsCancel] = useState(false);
  const [display, setDisplay] = useState(false);

  const [confirmedOrderItemsInfo, setConfirmedItemsInfo] = useState({
    modified: [],
    unmodified: [],
    priceChanged: [],
    quantityChanged: [],
    bothChanged: [],
  });

  const [billingData, setBillingData] = useState([]);

  const _getCarts = () => {
    _getCartsFun(setCarts);
  };

  const _getCheckoutCartsData = async () => {
    loaderAction(true);
    // await _getCheckoutDataFunGroccery(setCheckoutData, setOrderItem, setIsGrocery)
    await _getOrdeInfo(query.refcode, setOrderInfo);
    setTimeout(() => {
      loaderAction(false);
    }, 1000);
  };

  const couponAction = async (discount, status) => {
    setIsApplyCoupon(false);
    // setCheckoutDataType(setCheckoutData, setOrderItem, setIsGrocery, discount, address)
    // await _getCheckoutDataFunGroccery(setCheckoutData, setOrderItem, setIsGrocery, discount)
    _getGroceryBillingData(orderInfo, setBillingData, discount);

    setCouponApplied(status);
  };

  const onAction = (type) => {
    setIsCancel(false);
    if (type == "yes") {
      _cancelOrder(query.refcode, setError);
    }
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
      priceChanged: [],
      quantityChanged: [],
      bothChanged: [],
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
      if (getModifiedOrderAttribute(product) == "") {
        confirmedOrderInfo.unmodified.push(product);
      } else if (getModifiedOrderAttribute(product) == "price") {
        confirmedOrderInfo.priceChanged.push(product);
      } else if (getModifiedOrderAttribute(product) == "quantity") {
        confirmedOrderInfo.quantityChanged.push(product);
      } else if (getModifiedOrderAttribute(product) == "both") {
        confirmedOrderInfo.bothChanged.push(product);
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

  let storePhone = "";
  let isGrocery = true;

  if (isGrocery && orderInfo && orderInfo.merchant) {
    storePhone = getCountryCodePhone(orderInfo.merchant.phone);
  }

  if (!isGrocery && orderInfo) {
    storePhone = getCountryCodePhone(orderInfo.m_phone);
  }

  if (!orderInfo.order_status) return null;

  let code = orderInfo.code;

  if (isApplyCoupon) {
    return (
      <Coupon
        onClose={() => setIsApplyCoupon(false)}
        couponApplied={couponApplied}
        discount={orderItem.discount}
        onDelete={() => couponAction(0, false)}
        onSuccess={(coupon_code, discount) => couponAction(discount, true)}
        amount={amount}
        code={code}
        id={orderItem.id}
      />
    );
  }

  console.log("orderInfo -->", orderInfo);

  const unlistedProd = () => {
    if (typeof window !== "undefined") {
      let name = localStorage.getItem("Unlisted Product");
      return name?.replace(/[^\w.,\s]/g, "");
    }
  };

  const unlistedQty = () => {
    if (typeof window !== "undefined") {
      let name = localStorage.getItem("Unlisted Product Quantity");
      return name?.replace(/[^\w.,\s]/g, "");
    }
  };

  const unlistedUnit = () => {
    if (typeof window !== "undefined") {
      let name = localStorage.getItem("Unlisted Product Unit");
      return name?.replace(/[^\w.,\s]/g, "");
    }
  };

  return (
    <div className="wrapper page-wrapper grocery">
      <div className="container m-0 p-0">
        <Header
          // title={"My Order"}
          // onSubTitileClick={() => callWaiter()}
          subtitle={
            <a
              href={`tel:${storePhone}`}
              className={`profile-icon`}
              style={{ margin: "3px -3px" }}
            >
              {dark ? (
                <img src={ImageConst.callDark} alt="" />
              ) : (
                <img src={ImageConst.call} alt="" />
              )}
            </a>
          }
          goBack={() => _pushBack()}
        />

        <div style={{ display: "none" }}>
          <Checkout
            orderStatus={orderInfo.order_status}
            deliveryType={orderInfo.delivery_type}
            statusId={orderInfo.status_id}
            order_status_id={orderInfo.order_status_id}
          />
        </div>

        {/* <div className="status-bar-cont">
          <div className="d-flex status-bar-inner">
            <div className="status-name" onClick={() => _pushBack()}>
              <button>
                <i className="fas fa-chevron-left"></i>
              </button>
              <p className="mb-0">Order Details</p>
            </div>
            <div className="status-btn">
              <button disabled={true}>
                {OrderDeliverEnums[orderInfo.delivery_type]}
              </button>
            </div>
          </div>
        </div> */}

        {GROCERY_ORDER_STATUSES.confirmed.id === orderInfo.status_id ? (
          <div
            className={`unlisted-accepted-label ${
              dark && "unlisted-accepted-label-dark"
            }`}
          >
            <img
              src={`/assets/icons/${
                dark ? "unlisted-info-dark.svg" : "unlisted-info.svg"
              }`}
              alt=""
            />
            <p>
              The store has accepted your order and updated the price of
              unlisted product.
            </p>
          </div>
        ) : null}

        <div
          className={`status-timeline-wrapper-border mt-4 ${
            dark && "status-timeline-wrapper-border-dark"
          }`}
        >
          <div
            className={`status-timeline-wrapper ${
              dark && "status-timeline-wrapper-dark"
            }`}
          >
            <StatusTimeline
              orderStatus={orderInfo.order_status}
              deliveryType={orderInfo.delivery_type}
              statusId={orderInfo.status_id}
              order_status_id={orderInfo.order_status_id}
              dark={dark}
            />
          </div>
        </div>

        <div className={`grocery-my-order`}>
          {/* {
                confirmedOrderItemsInfo.modified.length > 0 && (
                    <div className="grocery--modified-items-container">
                        <span className="font-15 font-800">
                            Merchant has {confirmedOrderItemsInfo.modified.length} {confirmedOrderItemsInfo.modified.length === 1 ? 'change' : 'changes'} to your order.
                        </span>
                        {
                            confirmedOrderItemsInfo.modified.map((product, index) => (
                                <OrderListItem product={product} key={index} orderItems={confirmedOrderItemsInfo.modified} index={index} />
                            ))
                        }
                    </div>
                )
            } */}

          {confirmedOrderItemsInfo.unmodified.length ? (
            <div className={`groOrd-items ${dark && "groOrd-items-dark"}`}>
              {confirmedOrderItemsInfo.unmodified.map((product, index) => (
                <OrderListItem
                  product={product}
                  key={index}
                  orderItems={confirmedOrderItemsInfo.unmodified}
                  index={index}
                />
              ))}
            </div>
          ) : null}

          {confirmedOrderItemsInfo.bothChanged.length ? (
            <div className="br-20  py-20 ">
              <Fragment>
                <p>Both changed</p>
                {confirmedOrderItemsInfo.bothChanged.map((product, index) => (
                  <OrderListItem
                    changed={true}
                    product={product}
                    key={index}
                    orderItems={confirmedOrderItemsInfo.unmodified}
                    index={index}
                  />
                ))}
                {/*<div style ={{'display': 'flex', 'margin-top': '10px'}}> */}
                <div style={{ display: "none", marginTop: "10px" }}>
                  <button
                    className="repeat-btn white"
                    onClick={() => alert("reject")}
                  >
                    Reject
                  </button>
                  <button
                    className="add-new-btn"
                    onClick={() => alert("accept")}
                  >
                    Accept
                  </button>
                </div>
              </Fragment>
            </div>
          ) : null}

          {confirmedOrderItemsInfo.priceChanged.length ? (
            <div>
              <div className={`text-alert`}>Price changed</div>
              <Fragment className="bg-white">
                {confirmedOrderItemsInfo.priceChanged.map((product, index) => (
                  <OrderListItem
                    changed={true}
                    product={product}
                    key={index}
                    orderItems={confirmedOrderItemsInfo.unmodified}
                    index={index}
                  />
                ))}
                <button
                  className="accept-button"
                  onClick={() => alert("accept")}
                >
                  Accept
                </button>
                <button
                  className="reject-button"
                  onClick={() => alert("reject")}
                >
                  Reject
                </button>
              </Fragment>
            </div>
          ) : null}

          {confirmedOrderItemsInfo.quantityChanged.length ? (
            <div>
              <Fragment>
                <div className={`text-alert`}>Quantity changed</div>

                {confirmedOrderItemsInfo.quantityChanged.map(
                  (product, index) => (
                    <OrderListItem
                      changed={true}
                      product={product}
                      key={index}
                      orderItems={confirmedOrderItemsInfo.unmodified}
                      index={index}
                    />
                  )
                )}
                <button
                  className="accept-button"
                  onClick={() => alert("accept")}
                >
                  Accept
                </button>
                <button
                  className="reject-button"
                  onClick={() => alert("rejct")}
                >
                  Rejct
                </button>
              </Fragment>
            </div>
          ) : null}
        </div>
        {/* {GROCERY_ORDER_STATUSES.confirmed.id  == orderInfo.status_id  ? 
            <ApplyCoupon 
                onClose={() => setIsApplyCoupon(false)} couponApplied={couponApplied}
                discount={orderItem.discount}
                onDelete={() => couponAction(0, false)}
                onSuccess={(coupon_code, discount) => couponAction(discount, true)}
                amount={amount} 
                code={code}
                id={orderItem.id}
            /> : null} */}

        {typeof window !== "undefined" &&
        localStorage.getItem("Unlisted Product") !== null ? (
          // <div style={{ margin: "-20px 20px" }}>
          <div className={`grocery-my-order`}>
            <div className={`groOrd-items ${dark && "groOrd-items-dark"}`}>
              <div
                className={`cart-title mx-2 mt-2 ${dark && "cart-title-dark"}`}
              >
                <h3>Unlisted Products</h3>
              </div>

              <div
                className={`unlisted-cart-prod mx-2 mb-2 ${
                  dark && "unlisted-cart-prod-dark"
                }`}
              >
                <p>{unlistedProd()}</p>
                <p style={{ color: dark ? "#E0E5EC" : "#404b69" }}>
                  {unlistedQty() + " " + unlistedUnit()}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {GROCERY_ORDER_STATUSES.confirmed.id == orderInfo.status_id ? (
          <div className="bill-details-container py-0">
            <div
              className="bill-details-inner"
              style={{
                textAlign: "-webkit-right",
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              {/* {couponApplied ? null : (
                <div
                  className="special-req-cont"
                  onClick={() => setIsApplyCoupon(true)}
                >
                  <div className="special-req-box d-flex justify-content-between align-items-center">
                    <div className="sp-req-text">
                      <h5 className="mb-0">Apply Coupon</h5>
                      <p className="text-muted mb-0">
                        Enter you code or select a code
                      </p>
                    </div>
                    <div className="sp-req-btn" style={{ height: "56px" }}>
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                </div>
              )} */}

              {couponApplied ? null : (
                <div
                  className="special-req-cont p-0"
                  onClick={() => setIsApplyCoupon(true)}
                >
                  <div
                    className={`special-req-box-border ${
                      dark && "special-req-box-border-dark"
                    }`}
                  >
                    <div
                      className={`special-req-box d-flex justify-content-between align-items-center ${
                        dark && "special-req-box-dark"
                      }`}
                    >
                      <div
                        className={`sp-req-text d-flex align-items-center ${
                          dark && "sp-req-text-dark"
                        }`}
                      >
                        {dark ? (
                          <img
                            style={{ width: 15, height: 15, marginRight: 15 }}
                            src={ImageConst.promoDark}
                            alt=""
                          />
                        ) : (
                          <img
                            style={{ width: 15, height: 15, marginRight: 15 }}
                            src={ImageConst.promo}
                            alt=""
                          />
                        )}
                        <h5 className="mb-0">Have a promo code? enter here</h5>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* {orderInfo.id && <CallAction orderInfo={orderInfo} isGrocery={true} />} */}
        <GroceryContent />

        {billingData.length > 0 && (
          <div className="bill-details-container">
            <div className="bill-details-inner">
              <p
                className={`heading-bold-small ${
                  dark && "heading-bold-small-dark"
                }`}
              >
                Bill Details
              </p>
              <div className="bill-amount-details-cont">
                {billingData
                  .filter((billing_property) => billing_property.id !== "total")
                  .map((item, index) => (
                    <div
                      className={`bill-det-amt-item ${
                        dark && "bill-det-amt-item-dark"
                      }`}
                      key={index}
                    >
                      <p>{item.label}</p>
                      <p>{item.amount}</p>
                    </div>
                  ))}
              </div>
              <hr className={`bill-hr my-2 ${dark && "bill-hr-dark"}`} />
              <div
                className={`bill-details-total ${
                  dark && "bill-details-total-dark"
                }`}
              >
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

        {error && <ErrorPopup error={error} onClose={() => setError("")} />}

        {isCancel && (
          <PopUpConfirm
            onClose={() => setIsCancel(false)}
            onAction={(actionType) => onAction(actionType)}
            title={"Cancel order"}
          />
        )}
      </div>
      {orderInfo.payment &&
        orderInfo.payment.status.toLowerCase() === "pending" && (
          <div
            className={`btn-botton-fixed ${dark && "btn-botton-fixed-dark"}`}
          >
            <div className="d-flex w-100 justify-content-between align-items-center">
              <div
                className={`btm-fxd-btn-border w-100 ${
                  dark && "btm-fxd-btn-border-dark"
                }`}
              >
                <button
                  className={`btm-fxd-btn w-100 ${dark && "btm-fxd-btn-dark"}`}
                  onClick={() =>
                    Router.push(`/payment/${orderInfo.payment.refcode}`)
                  }
                >
                  Proceed to pay
                </button>
              </div>
            </div>

            <div className="d-flex w-100 justify-content-between align-items-center">
              <button
                className="cancel-order"
                onClick={() => setIsCancel(true)}
              >
                Cancel order
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
