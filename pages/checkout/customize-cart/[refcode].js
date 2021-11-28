import { useEffect, useState, Fragment } from "react";
import nextCookie from "next-cookies";
import Router from "next/router";
import LoginCMP from "../../../components/login/login";
import SelectType from "../../../components/checkout/deliveryTypes";
import Cart from "../../../components/order/cart";
import GroceryCart from "../../../components/order/groceryCart";
import AmountSummary from "../../../components/checkout/amountSummary";
import AddressSelect from "../../../components/checkout/address";
import { OrderTypeEnums } from "../../../lib/enums";
import GroceryAmountSummary from "../../../components/checkout/groceryAmountSummary";
import CallWaiter from "../../../components/common/callWaiter";
import ErrorCMP from "../../../components/common/errorPopup";
import NoData from "../../../components/common/noData";
import Header from "../../../components/common/header";
import Coupon from "../../../components/checkout/coupon";
import { _getCartsFun } from "../../../lib/helpers/menu";
import { _callWaiter } from "../../../lib/helpers/home";
import { getTable } from "../../../lib/helpers/common";
import {
  _getCheckoutDataFun,
  createOrder,
  createGroceryOrder,
  _getCheckoutDataFunGroccery,
  getOrderTypeLocal,
  setOrderTypeLocal,
  setCheckoutDataType,
  orderTypeString,
} from "../../../lib/helpers/checkout";
import loaderAction from "../../../lib/helpers/loader";
import GroceryBookingStatus from "../../../components/checkout/groceryBookingStatus";
import storeDispatchCheckout, {
  dispatchStoreDeliveryType,
} from "../../../lib/helpers/storeDispatch";
import {
  _getCartsAndStoreData,
  _getCheckoutDataFunForCustomize,
} from "../../../lib/helpers/customCheckount";
import { _clearCookie } from "../../../lib/helpers/pay";
import styled from "styled-components";

import { useSelector } from "react-redux";

const Index = ({ isLoggedIn, query }) => {
  const [orderType, setOrderType] = useState("");
  const [comment, setComment] = useState("");
  const [loginStatus, setLoginStatus] = useState(isLoggedIn);
  const [carts, setCarts] = useState([]);
  const [checkoutData, setCheckoutData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGroceryLoader, setIsGroceryLoader] = useState(false);
  const [orderItem, setOrderItem] = useState({});
  const [isGrocery, setIsGrocery] = useState(false);
  const [selectTypePopup, setSelectTypePopup] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(true);
  const [isApplyCoupon, setIsApplyCoupon] = useState(false);
  const [isCallWaiter, setIsCallWaiter] = useState(false);
  const [isAddressSelect, setisAddressSelect] = useState(false);
  const [customizeData, setCustomizeData] = useState({});
  const [address, setAddress] = useState({});

  const [groceryBookinginfo, setGroceryBookinginfo] = useState({
    status: "",
  });

  const checkoutDataStore = useSelector((state) => state.checkoutData);
  const loader = useSelector((state) => state.isLoading);

  const _payNow = (type) => {
    let data = orderItem;
    if (comment) {
      data = { ...data, comment };
    }
    setSelectTypePopup(false);
    data = { ...data, order_type: type };
    createOrder(data, isLoading, setIsLoading);
  };

  const _getCheckoutCartsData = async (
    onRemove = false,
    addr = null,
    data = null
  ) => {
    if (onRemove && carts.length == 1) {
      Router.back();
      return;
    }
    loaderAction(true);
    if (address && address.name) {
      addr = address;
    }

    let customize = customizeData;
    if (data) {
      customize = data;
    }
    await _getCheckoutDataFunForCustomize(
      customize,
      setCheckoutData,
      setOrderItem,
      0,
      addr
    );
    setTimeout(() => {
      loaderAction(false);
      setIsLoadingInit(false);
    }, 1000);
  };

  const _onRemove = (cart) => {
    let carts = customizeData.carts;
    carts = carts.filter((crt) => crt.id == cart.id);
    setCarts(carts);
    let customize = { ...customizeData, carts };
    setCustomizeData(customize);
    setTimeout(() => {
      _getCheckoutCartsData(true, null, customize);
    }, 100);
  };

  const couponAction = (discount, status) => {
    setIsApplyCoupon(false);
    _getCheckoutDataFunForCustomize(
      customizeData,
      setCheckoutData,
      setOrderItem,
      discount,
      address
    );
    setCouponApplied(status);
  };

  const onTypeSelect = (type) => {
    setOrderType(type);
    setLoginStatus(true);
    setSelectTypePopup(false);
    _getCheckoutCartsData();
    setOrderTypeLocal(type);
  };

  const _checkLogin = async () => {
    try {
      loaderAction(true);
      let data = await _getCartsAndStoreData(query, setCustomizeData, setCarts);
      if (data && data.delivery_type) {
        onTypeSelect(data.delivery_type);
      }

      if (data && data.c_comment) {
        setComment(data.c_comment);
      }

      if (data && data.table_number) {
        getTable(data.table_number);
      }

      await _getCheckoutDataFunForCustomize(
        data,
        setCheckoutData,
        setOrderItem,
        0,
        null
      );
      loaderAction(false);
    } catch (error) {
      loaderAction(false);
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

  useEffect(() => {
    _checkLogin();
    _clearCookie();
    // dispatchStoreDeliveryType()
  }, []);

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
  return (
    <div className="wrapper">
      <div className="container m-0 p-0">
        <Header
          title={"Bill"}
          onSubTitileClick={() => setSelectTypePopup(true)}
          subtitle={orderTypeString(orderType)}
          goBack={() => Router.back()}
        />

        {carts.length == 0 && !isLoadingInit ? (
          <NoData />
        ) : (
          <div className={`page-wrapper ${isGrocery ? "grocery" : "qsr"}`}>
            {isGrocery ? (
              <Fragment>
                <GroceryCart
                  carts={carts}
                  setCarts={setCarts}
                  onChangeData={() => console.log(1)}
                  onItemRemoved={() => _getCheckoutCartsData(true)}
                />
                <div className="bill-details-container">
                  <div
                    className="bill-details-inner"
                    style={{
                      textAlign: "-webkit-right",
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                  ></div>
                </div>
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
                <div className="btn-botton-fixed-trans">
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      onClick={() =>
                        Router.push(`/menu/12/${localStorage.getItem("mid")}`)
                      }
                      className="add-new-btn"
                    >
                      Menu
                    </button>
                    <button
                      className="add-new-btn"
                      onClick={() =>
                        createGroceryOrder(
                          orderItem,
                          isGroceryLoader,
                          setIsGroceryLoader,
                          setGroceryBookinginfo
                        )
                      }
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                {loader ? null : (
                  <Cart
                    carts={carts}
                    custome={true}
                    setCarts={setCarts}
                    onItemRemoved={(cart) => _onRemove(cart)}
                  />
                )}

                <div className="special-request-inp-container mt-0">
                  <input
                    value={comment}
                    type="text"
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Type in any Special Requests"
                  />
                </div>

                {couponApplied ? null : (
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
                )}

                <AmountSummary key={amount} checkoutData={checkoutData} />

                <div className="btn-botton-fixed">
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <button
                      onClick={() =>
                        orderType
                          ? _payNow(orderType)
                          : setSelectTypePopup(true)
                      }
                      className="btm-fxd-btn"
                    >
                      Proceed to pay
                    </button>
                  </div>
                </div>
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

        {isCallWaiter ? (
          <CallWaiter onClose={() => setIsCallWaiter(false)} />
        ) : null}
        {selectTypePopup ? (
          <SelectType
            onClose={() => onTypeSelect(orderType)}
            onSelectType={(type) => _onSelectType(type)}
            orderTypes={
              checkoutData.deliveryTypes ? checkoutData.deliveryTypes : []
            }
          />
        ) : null}

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
  const { query } = ctx;
  let isLoggedIn = token ? true : false;
  return { isLoggedIn, token, query };
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
