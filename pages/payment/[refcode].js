import Router from "next/router";
import React, { useState, useEffect } from "react";
import nextCookie from "next-cookies";

import UPIList from "../../components/checkout/upiList";
import AddNewUpi from "../../components/checkout/newUpi";
import PayStore from "../../components/checkout/payStore";
import AmazonPay from "../../components/checkout/amazonPay";
import CardPayment from "../../components/checkout/cardPayment";
import PayWithCard from "../../components/checkout/payWithCard";
import LoginCMP from "../../components/login/login";

import loaderAction from "../../lib/helpers/loader";
import { testApi, _getBalance, getAllUpi } from "../../lib/helpers/checkout";
import {
  _loadRazorPayScript,
  _getOrdeInfo,
  openCheckout,
  LinkAccount,
} from "../../lib/helpers/payment";
import { getAuth } from "../../lib/helpers/common";
import {
  actionTypes,
  paymentTypes,
  assistantPaymentTypes,
} from "../../lib/enums";
import { _loginByToken } from "../../lib/helpers/auth";
let isTestEnabled = parseInt(process.env.NEXT_PUBLIC_IS_TEST_ENABLED);
const Index = ({ query, amount }) => {
  const [isLoader, setIsLoader] = useState(false);
  const [aplBalance, setAplBalance] = useState(0);
  const [paymentType, setPaymentType] = useState("");
  const [actionType, setActionType] = useState("");
  const [upis, setUpis] = useState([]);
  const [upi, setUpi] = useState("");
  const [methods, setMethods] = useState([]);
  const [razorpay, setRazorPay] = useState(null);
  const [error, setError] = useState(null);
  const [orderInfo, setOrderInfo] = useState({});
  const [payAmount, setPayAmount] = useState(0);
  const [updatePhone, setUpdatePhone] = useState(
    parseInt(query.new) && query.type ? true : false
  );
  const [userData, setUserData] = useState({});

  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardDate: "",
    cvv: "",
    cardName: "",
  });

  const _getIntData = async () => {
    loaderAction(true);
    let apl_code = null;
    if (query.code) {
      apl_code = query.code;
    }
    if (amount) {
      setPayAmount(amount);
    } else {
      let response = await _getOrdeInfo(query.refcode, setOrderInfo);
      setPayAmount(response.amount);
    }

    let payNow = false;
    if (query.token) {
      let res = await _loginByToken(query.token);
      if (!res) {
        // window.location.replace('/')
        return;
      } else {
        payNow = true;
      }
    }

    let user = getAuth();
    setUserData(user);

    if (user && user.phone) {
      await _getBalance(setAplBalance, apl_code);
    }
    await getAllUpi(setUpis);
    if (payNow) {
      _onSuccessLogin();
    }
    loaderAction(false);
  };

  useEffect(() => {
    _getIntData();
  }, []);

  useEffect(() => {
    _loadRazorPayScript(setMethods, setRazorPay);
  }, []);

  const _goBack = (type) => {
    if (type) {
      setActionType("");
    } else {
      Router.back();
    }
  };

  const _payNow = (paymentType, upiId = null, dataCard = {}) => {
    let user = getAuth();
    let object = {
      razorpay,
      cardData: dataCard,
      isLoader,
      setIsLoader,
      paymentType,
      setError,
      amount: payAmount,
      loaderAction,
      setMethods,
      setRazorPay,
      upiId: upiId,
      aplBalance,
      user,
      refcode: query.refcode,
    };
    openCheckout(object);
  };

  const _amazonPayNow = () => {
    setPaymentType(paymentTypes.AmazonPay);
    let linkonly = query.linkonly;
    if (aplBalance && !linkonly) {
      _payNow(paymentTypes.AmazonPay);
    } else {
      LinkAccount(window.location.href);
    }
  };

  const _onSelectUpi = (data) => {
    setUpi(data);
    setPaymentType(paymentTypes.UPI);
    _payNow(paymentTypes.UPI, data);
  };

  const _addNewUpiCheck = (upiId) => {
    setActionType("");
    setUpi(upiId);
    setPaymentType(paymentTypes.UPI);
    _payNow(paymentTypes.UPI, upiId);
  };

  const _onSuccessLogin = () => {
    if (history.pushState) {
      let newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;
      window.history.pushState({ path: newurl }, "", newurl);
    }
    setUpdatePhone(false);
    loaderAction(false);
    if (assistantPaymentTypes.AmazonPay == query.type) {
      _amazonPayNow();
    }
  };

  const renderData = (type) => {
    if (!type) {
      return (
        <div className="pb-0 page-wrapper">
          <AmazonPay
            onSelect={() => _amazonPayNow()}
            aplBalance={aplBalance}
            isSelceted={paymentType == paymentTypes.AmazonPay}
          />

          <hr className="hr-10" />

          <CardPayment
            onPaymentSelect={() => {
              setPaymentType(paymentTypes.CreditDebit);
              setActionType(actionTypes.CardPayment);
            }}
          />

          <hr className="hr-10" />

          <UPIList
            onSelectUpi={(data) => _onSelectUpi(data)}
            upis={upis}
            selectedUpi={upi}
            isSelceted={paymentType == paymentTypes.UPI}
            onAddNew={() => setActionType(actionTypes.NewUPI)}
            onPaymentSelect={() => setPaymentType(paymentTypes.UPI)}
            amount={orderInfo.amount}
            refCode={query.refcode}
          />

          <hr className="hr-10" />

          {/* <PayStore refcode={query.refcode} isSelceted={paymentType == paymentTypes.InStore}  onPaymentSelect={() => setPaymentType(paymentTypes.InStore)} /> */}

          {isTestEnabled ? (
            <div className="pay-opt-now-btn-cont">
              <button
                onClick={() => testApi(query.refcode, isLoader, setIsLoader)}
              >
                {isLoader ? "Wait..." : "Test"}
              </button>
              {/* <div></div>
                        <button onClick={()=>_payNow()}>Pay Now</button> */}
            </div>
          ) : null}
        </div>
      );
    }

    if (type == actionTypes.CardPayment) {
      return (
        <PayWithCard
          error={error}
          propsCardData={cardData}
          onPayNow={(data) => {
            setCardData(data);
            _payNow(paymentTypes.CreditDebit, null, data);
          }}
          onBack={() => setActionType("")}
        />
      );
    }

    if (type == actionTypes.NewUPI) {
      return (
        <AddNewUpi
          onSuccessAdd={(newUpi) => _addNewUpiCheck(newUpi)}
          upis={upis}
          setUpis={setUpis}
          onBack={() => setActionType("")}
        />
      );
    }
  };

  return (
    <div
      className="wrapper payment-wrapper"
      style={{ height: "100%", background: "white" }}
    >
      <div className="container m-0 p-0">
        <div className="status-bar-cont" style={{ background: "white" }}>
          <div className="d-flex status-bar-inner">
            <div className="status-name">
              <button onClick={() => _goBack(actionType)}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <p className="mb-0">Payment Options</p>
            </div>
          </div>
        </div>

        {renderData(actionType)}
      </div>

      {updatePhone ? (
        <LoginCMP
          dontShowType={true}
          onClose={() => window.location.replace("/")}
          onSuccessLogin={() => _onSuccessLogin()}
          updatePhone={true}
          email={query.email}
        />
      ) : null}
    </div>
  );
};

Index.getInitialProps = async (ctx) => {
  const { asPath, query } = ctx;
  const { amount } = nextCookie(ctx);
  return { asPath, query, amount };
};

export default Index;
