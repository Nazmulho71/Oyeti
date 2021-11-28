import { useEffect, useState, Fragment, useRef } from "react";
import nextCookie from "next-cookies";
import Router from "next/router";
import LoginCMP from "../../components/login/login";
import SelectType from "../../components/checkout/deliveryTypes";
import Cart from "../../components/order/cart";
import GroceryCart from "../../components/order/groceryCart";
import AmountSummary from "../../components/checkout/amountSummary";
import AddressSelect from "../../components/checkout/address";
import { OrderTypeEnums } from "../../lib/enums";
import GroceryAmountSummary from "../../components/checkout/groceryAmountSummary";
import CallWaiter from "../../components/common/callWaiter";
import ErrorCMP from "../../components/common/errorPopup";
import NoData from "../../components/common/noData";
import Header from "../../components/common/header";
import Coupon from "../../components/checkout/coupon";
import { _getCartsFun } from "../../lib/helpers/menu";
import { _callWaiter } from "../../lib/helpers/home";
import { _getStoreData } from "../../lib/helpers/common";
import ImageConst from "../../utils/ImageConst";
import {
  _getCheckoutDataFun,
  createOrder,
  createGroceryOrder,
  _getCheckoutDataFunGroccery,
  getOrderTypeLocal,
  setOrderTypeLocal,
  setCheckoutDataType,
  orderTypeString,
} from "../../lib/helpers/checkout";
import loaderAction from "../../lib/helpers/loader";
import { currency, GROCERY_ORDER_STATUSES_NEW } from "../../lib/enums";
import GroceryBookingStatus from "../../components/checkout/groceryBookingStatus";
import storeDispatchCheckout, {
  dispatchStoreDeliveryType,
} from "../../lib/helpers/storeDispatch";
import { _clearCookie } from "../../lib/helpers/pay";
import styled from "styled-components";
import { useSelector } from "react-redux";
import SwipeableButton from "../../components/SwipeableButton";
import CloseIcon from "@material-ui/icons/Close";
import LoadingBar from "react-top-loading-bar";
import { getGroceryStatusesByOrderNew } from "../../lib/helpers/checkout";
import { _getOrdeInfo } from "../../lib/helpers/payment";

const Index = ({
  query,
  isLoggedIn,
  orderStatus,
  deliveryType,
  statusId,
  order_status_id,
}) => {
  const [orderType, setOrderType] = useState("");
  // if (!checkoutData.final) {
  //   return <div></div>;
  // }
  // let brakdown = checkoutData.brakdown;

  const [comment, setComment] = useState("");
  const [loginStatus, setLoginStatus] = useState(isLoggedIn);
  const [carts, setCarts] = useState([]);
  const [checkoutData, setCheckoutData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGroceryLoader, setIsGroceryLoader] = useState(false);
  const [orderItem, setOrderItem] = useState({});
  const [isGrocery, setIsGrocery] = useState(true);
  const [callModal, setCallModal] = useState(false);
  const [selectTypePopup, setSelectTypePopup] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(true);
  const [isApplyCoupon, setIsApplyCoupon] = useState(false);
  const [isCallWaiter, setIsCallWaiter] = useState(false);
  const [isAddressSelect, setisAddressSelect] = useState(false);
  const [address, setAddress] = useState({});
  const [progress, setProgress] = useState(0);
  const [cartExpanded, setCartExpanded] = useState(false);
  const [ordPrice, setOrdPrice] = useState(0);
  const ref = useRef(null);
  // const [orderInfo, setOrderInfo] = useState({});

  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  const [groceryBookinginfo, setGroceryBookinginfo] = useState({
    status: "",
  });

  const checkoutDataStore = useSelector((state) => state.checkoutData);

  const _getCarts = () => {
    _clearCookie();
    _getCartsFun(setCarts);
  };

  const _payNow = (type) => {
    let data = orderItem;
    if (comment) {
      data = { ...data, comment };
    }
    setSelectTypePopup(false);
    data = { ...data, order_type: type };
    createOrder(data, isLoading, setIsLoading);
  };

  const _getCheckoutCartsData = async (onRemove, addr) => {
    if (onRemove && carts.length == 1) {
      Router.back();
      return;
    }
    loaderAction(true);
    if (address && address.name) {
      addr = address;
    }
    await setCheckoutDataType(
      setCheckoutData,
      setOrderItem,
      setIsGrocery,
      0,
      addr
    );
    setTimeout(() => {
      loaderAction(false);
      setIsLoadingInit(false);
    }, 1000);
  };

  const couponAction = (discount, status) => {
    setIsApplyCoupon(false);
    setCheckoutDataType(
      setCheckoutData,
      setOrderItem,
      setIsGrocery,
      discount,
      address
    );
    setCouponApplied(status);
  };

  const onTypeSelect = (type) => {
    setOrderType(type);
    setLoginStatus(true);
    setSelectTypePopup(false);
    setOrderTypeLocal(type);
    if (type == OrderTypeEnums.Home) {
      setisAddressSelect(true);
    } else {
      _getCheckoutCartsData();
    }
  };

  const _checkLogin = async () => {
    let type = getOrderTypeLocal();
    if (type == OrderTypeEnums.Home) {
      setisAddressSelect(true);
      return;
    }
    loaderAction(true);
    await _getCheckoutCartsData();
    if (type) {
      setOrderType(type);
    } else {
      if (isLoggedIn) {
        setSelectTypePopup(true);
      }
    }
  };

  const _onSelectType = (type) => {
    if (type == OrderTypeEnums.Home) {
      setSelectTypePopup(false);
      setisAddressSelect(true);
      setOrderTypeLocal(type);
      setOrderType(type);
    } else {
      onTypeSelect(type);
    }
  };

  const _onAddressSelect = (address) => {
    setAddress(address);
    setisAddressSelect(false);
    _getCheckoutCartsData(null, address);
  };

  const onHomeError = () => {
    setSelectTypePopup(true);
    storeDispatchCheckout({
      isValid: true,
      error: "",
    });
  };

  const onSuccess = () => {
    orderType ? _payNow(orderType) : setSelectTypePopup(true);
  };

  useEffect(() => {
    _checkLogin();
    _getCarts();
    dispatchStoreDeliveryType();
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const newNum = progress + 0.1;
      if (progress < 100) setProgress(newNum);
    };

    setTimeout(updateProgress, 10);
  }, [progress]);

  let amount = orderItem.amount ? orderItem.amount : 0;
  let tableNo = orderItem.table_number;
  let mid = orderItem._meta ? orderItem._meta.mid : "";

  if (isApplyCoupon) {
    return (
      <Coupon
        onClose={() => setIsApplyCoupon(false)}
        couponApplied={couponApplied}
        discount={orderItem.discount}
        onDelete={() => couponAction(0, false)}
        onSuccess={(coupon_code, discount) => couponAction(discount, true)}
        amount={amount}
        id={orderItem.id}
      />
    );
  }

  let taxAmount = 0;
  let totalAmount = 0;
  if (checkoutData.brakdown) {
    taxAmount =
      checkoutData.brakdown.find((property) => property.charge_id === "tax")
        .value ?? 0;
    totalAmount =
      checkoutData.brakdown.find((property) => property.charge_id === "total")
        .value ?? 0;
  }

  // const handleLoad = () => {
  //   // console.log("ref.current -->", ref.current);
  //   ref.current?.staticStart();
  //   setTimeout(() => {
  //     ref.current?.complete();
  //   }, 9000);
  // };

  const orderTypeLabel = () => {
    if (typeof window !== "undefined") {
      let label = localStorage.getItem("typeLabel");
      return label?.replace(/[^\w.,\s]/g, "");
    }
  };

  // const _getCheckoutCartsData = async () => {
  //   loaderAction(true);
  //   // await _getCheckoutDataFunGroccery(setCheckoutData, setOrderItem, setIsGrocery)
  //   await _getOrdeInfo(query.refcode, setOrderInfo);
  //   setTimeout(() => {
  //     loaderAction(false);
  //   }, 1000);
  // };

  // const stages = [];
  // let completed = true;

  // if (
  //   statusId == GROCERY_ORDER_STATUSES_NEW.accepted.id &&
  //   order_status_id == GROCERY_ORDER_STATUSES_NEW.accepted.valueInt
  // ) {
  //   order_status_id = GROCERY_ORDER_STATUSES_NEW.paid.valueInt;
  // }

  // if (order_status_id == GROCERY_ORDER_STATUSES_NEW.OntheWay.valueInt) {
  //   order_status_id = GROCERY_ORDER_STATUSES_NEW.ready.valueInt;
  // }

  // let StagesByDeliveryType = getGroceryStatusesByOrderNew({
  //   delivery_type: deliveryType,
  //   order_status_id,
  // });

  // if (StagesByDeliveryType && StagesByDeliveryType.length > 0) {
  //   StagesByDeliveryType.forEach((stage, index) => {
  //     stages.push({
  //       ...stage,
  //       completed,
  //       // current: stage.label.toLowerCase() === orderStatus.toLowerCase(),
  //       current: stage.valueInt === order_status_id,
  //       index: index + 1,
  //     });
  //     if (stage.valueInt === order_status_id) {
  //       completed = false;
  //     }
  //   });
  // } else {
  //   StagesByDeliveryType = [];
  // }

  // console.log("order_status_id -->", order_status_id);

  return (
    <div className="wrapper">
      <div className="container m-0 p-0">
        <Header
          title={"Bill"}
          onSubTitileClick={() => {
            _callWaiter(query?.mid, query?.tableNo, setIsCallWaiter);
            setCallModal(true);
          }}
          subtitle={`${isGrocery ? "" : "Call waiter"}`}
          goBack={() => Router.back()}
        />

        {callModal ? (
          <div className="log-modal-overlay">
            <div className="log-modal">
              <div
                className={`log-modal-inner ${dark && "log-modal-inner-dark"}`}
              >
                <div
                  className={`log-modal-header text-end ${
                    dark && "log-modal-header-dark"
                  }`}
                >
                  <CloseIcon
                    className={`callMod-close ${dark && "callMod-close-dark"}`}
                    style={{
                      // display: "flex",
                      // alignItems: "center",
                      bottom: "5%",
                      padding: "0px",
                      width: "35px",
                      height: "35px",
                      borderRadius: "8px",
                    }}
                    onClick={() => setCallModal(false)}
                  />
                </div>

                <div className="log-modal-body-wrap">
                  <div
                    className={`log-modal-body callMod-body text-center ${
                      dark && "callMod-body-dark"
                    }`}
                  >
                    <img
                      src={
                        dark ? ImageConst.callNotifDark : ImageConst.callNotif
                      }
                      alt=""
                    />
                    <p>We just notified the waiter</p>
                  </div>

                  {progress === 100 ? (
                    <div
                      className={`btm-fxd-btn-border ${
                        dark && "btm-fxd-btn-border-dark"
                      }`}
                      style={{ marginTop: "80px" }}
                    >
                      <div className="d-flex w-100 justify-content-between align-items-center">
                        <button
                          onClick={() => {
                            _callWaiter(
                              query?.mid,
                              query?.tableNo,
                              setIsCallWaiter
                            );
                            setCallModal(false);
                          }}
                          className={`btm-fxd-btn ${
                            dark && "btm-fxd-btn-dark"
                          }`}
                        >
                          Call waiter again
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <LoadingBar
              color="#FF118E"
              progress={progress}
              onLoaderFinished={() => setProgress(100)}
              className="loadingBar"
            />
          </div>
        ) : null}

        {carts.length == 0 && !isLoadingInit ? (
          <NoData />
        ) : (
          <div className={`page-wrapper ${isGrocery ? "grocery" : "qsr"}`}>
            {isGrocery ? (
              <Fragment>
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "space-between",
                  }}
                >
                  <div className={`cart-title ${dark && "cart-title-dark"}`}>
                    {/* {stages[1].completed ? <div>Accepted</div> : null} */}
                    <h3>Booking Details</h3>
                    {/* <p>@ Lunch Box - Rajajinagar</p> */}
                  </div>

                  {/* <div
                    className={`bill-details-total ${
                      dark && "bill-details-total-dark"
                    }`}
                  >
                    <p
                      style={{
                        paddingRight: "20px",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      {currency} {totalAmount}
                    </p>
                  </div> */}
                </div>

                {/* <div
                  className={`w-100 d-flex justify-content-center groc-ordtype ${
                    dark && "groc-ordtype-dark"
                  }`}
                >
                  <div
                    className={`pagination-dot-active ${
                      dark && "pagination-dot-dark-active"
                    }`}
                  ></div>
                  <p className="m-0">{orderTypeString(orderType)}</p>
                  <div
                    className={`pagination-dot-active ${
                      dark && "pagination-dot-dark-active"
                    }`}
                  ></div>
                </div> */}

                <GroceryCart
                  carts={carts}
                  setCarts={setCarts}
                  onChangeData={() =>
                    setCheckoutDataType(
                      setCheckoutData,
                      setOrderItem,
                      setIsGrocery,
                      0,
                      address
                    )
                  }
                  onItemRemoved={() => _getCheckoutCartsData(true)}
                  query={query}
                />
                {/* <div
                  className={`bill-details-container-border ${
                    dark && "bill-details-container-border-dark"
                  }`}
                ></div>
                <div className="bill-details-container">
                  <div
                    className="bill-details-inner"
                    style={{
                      textAlign: "-webkit-right",
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                  ></div>
                </div> */}
                <GroceryAmountSummary
                  checkoutData={checkoutData}
                  carts={carts}
                />
                <GroceryBookingStatus
                  info={groceryBookinginfo}
                  retry={() =>
                    createGroceryOrder(
                      orderItem,
                      isGroceryLoader,
                      setIsGroceryLoader,
                      setGroceryBookinginfo
                    )
                  }
                />
                <div
                  className={`btn-botton-fixed-trans ${
                    dark && "btn-botton-fixed-trans-dark"
                  }`}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    {/* <div> */}
                    <button
                      onClick={() =>
                        // Router.push(`/menu/12/${localStorage.getItem("mid")}`)
                        Router.back()
                      }
                      className={`add-new-btn ${dark && "add-new-btn-dark"}`}
                    >
                      Menu
                    </button>
                    {/* </div> */}
                    {/* <div
                      className={`btm-fxd-btn-border ${
                        dark && "btm-fxd-btn-border-dark"
                      }`}
                    > */}
                    <button
                      className={`btm-fxd-btn ${dark && "btm-fxd-btn-dark"}`}
                      onClick={() => {
                        createGroceryOrder(
                          orderItem,
                          isGroceryLoader,
                          setIsGroceryLoader,
                          setGroceryBookinginfo
                        );
                      }}
                      style={{
                        border: dark
                          ? "1px solid #1E2328"
                          : "1px solid #DBE6F2",
                        color: "#FF118E",
                        margin: "10px",
                      }}
                    >
                      Book Now
                    </button>
                    {/* </div> */}
                  </div>
                </div>
              </Fragment>
            ) : (
              <Fragment>
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

                  {/* <div
                    className={`bill-details-total ${
                      dark && "bill-details-total-dark"
                    }`}
                  >
                    <p
                      style={{
                        paddingRight: "20px",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      {checkoutData?.final?.label}
                    </p>
                  </div> */}
                </div>

                {/* {carts.map((cart, i) => ( */}
                {/* <div key={i}> */}
                <div
                  className={`d-flex align-items-center justify-content-between expand-carts ${
                    dark && "expand-carts-dark"
                  }`}
                  onClick={() => setCartExpanded(!cartExpanded)}
                  style={{
                    margin: `20px 20px ${cartExpanded ? "-20px" : "20px"} 20px`,
                    borderBottom: `${
                      cartExpanded
                        ? "0px"
                        : `1px solid ${
                            dark ? "#fff" : "rgba(107, 130, 153, 0.7)"
                          }`
                    }`,
                  }}
                >
                  <p className="mb-3">1st Order • {carts?.length} items</p>

                  {cartExpanded ? (
                    <i className="fas fa-chevron-down mb-3"></i>
                  ) : (
                    <i className="fas fa-chevron-right mb-3"></i>
                  )}
                </div>

                {cartExpanded ? (
                  <Cart
                    // product={product}
                    carts={carts}
                    setCarts={setCarts}
                    onItemRemoved={() => _getCheckoutCartsData(true)}
                    onChangeData={() =>
                      setCheckoutDataType(
                        setCheckoutData,
                        setOrderItem,
                        setIsGrocery,
                        0,
                        address
                      )
                    }
                    ordPrice={ordPrice}
                    setOrdPrice={setOrdPrice}
                  />
                ) : null}
                {/* </div> */}
                {/* ))} */}

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
                        placeholder="Any Spacial Requests? Let us know."
                      />
                    </div>
                  </div>
                </div>

                {couponApplied ? null : (
                  <div
                    className="special-req-cont"
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
                          <h5 className="mb-0">
                            Have a promo code? enter here
                          </h5>
                          {/* <p className="text-muted mb-0">
                          Enter you code or select a code
                        </p> */}
                        </div>
                        {/* <div className="sp-req-btn" style={{ height: "56px" }}>
                        <i className="fas fa-chevron-right"></i>
                      </div> */}
                      </div>
                    </div>
                  </div>
                )}

                <AmountSummary key={amount} checkoutData={checkoutData} />

                {orderTypeString(orderType) === "Dine In" ? (
                  <SwipeableButton
                    onSuccess={onSuccess}
                    color={dark ? "#3b4451" : "#404B69"}
                    text="Place order"
                    dark={dark}
                  />
                ) : (
                  <div
                    className={`btn-botton-fixed ${
                      dark && "btn-botton-fixed-dark"
                    }`}
                  >
                    <div
                      className={`btm-fxd-btn-border ${
                        dark && "btm-fxd-btn-border-dark"
                      }`}
                    >
                      <div className="d-flex w-100 justify-content-between align-items-center">
                        <button
                          onClick={
                            () =>
                              // orderType ?
                              _payNow(orderType)
                            // : setSelectTypePopup(true)
                          }
                          className={`btm-fxd-btn ${
                            dark && "btm-fxd-btn-dark"
                          }`}
                        >
                          Proceed to pay
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Fragment>
            )}
          </div>
        )}

        {checkoutDataStore &&
        !checkoutDataStore.isValid &&
        checkoutDataStore.error ? (
          <ErrorCMP
            error={checkoutDataStore.error}
            onClose={() => onHomeError()}
          />
        ) : null}

        {/* {isCallWaiter ? (
          <CallWaiter onClose={() => setIsCallWaiter(false)} />
        ) : null} */}
        {/* {selectTypePopup ? (
          <SelectType
            onClose={() => onTypeSelect(orderType)}
            onSelectType={(type) => _onSelectType(type)}
            orderTypes={
              checkoutData.deliveryTypes ? checkoutData.deliveryTypes : []
            }
          />
        ) : null} */}

        {isAddressSelect && (
          <AddressSelect
            onClose={() => {
              setisAddressSelect(false);
              setSelectTypePopup(true);
            }}
            onSelectAddress={(addre) => _onAddressSelect(addre)}
          />
        )}

        {!loginStatus ? (
          <LoginCMP
            onClose={() => Router.back()}
            onSuccessLogin={() => onTypeSelect(orderType)}
            orderType={orderType}
            orderTypes={
              checkoutData.deliveryTypes ? checkoutData.deliveryTypes : []
            }
            onSetType={(type) => setOrderType(type)}
          />
        ) : null}
      </div>
    </div>
  );
};

Index.getInitialProps = async (ctx) => {
  const { token } = nextCookie(ctx);

  let isLoggedIn = token ? true : false;
  return { isLoggedIn, token };
};

const Rect = styled.div`
  display: flex;
  height: 55px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 19px;
  border-width: 1px;
  border-color: #000000;
  flex-direction: column;
  margin-top: 108px;
  border-style: solid;
  width: 100vw;
`;

const Rect1 = styled.div`
  width: 80px;
  height: 55px;
  background-color: rgba(252, 240, 198, 1);
  border-top-right-radius: 19px;
  border-bottom-right-radius: 19px;
  margin-left: 294px;
`;

export default Index;
