import Router from "next/router";
import React, { useState, useEffect } from "react";
import { testApi, _getBalance, getAllUpi } from "../../lib/helpers/checkout";
import { actionTypes, paymentTypes } from "../../lib/enums";
import UPIList from "../../components/checkout/upiList";
import AddNewUpi from "../../components/checkout/newUpi";
import PayStore from "../../components/checkout/payStore";
import AmazonPay from "../../components/checkout/amazonPay";
import CardPayment from "../../components/checkout/cardPayment";
import PayWithCard from "../../components/checkout/payWithCard";

const Index = ({ query }) => {
  const [isLoader, setIsLoader] = useState(false);
  const [aplBalance, setAplBalance] = useState(0);
  const [paymentType, setPaymentType] = useState("");
  const [actionType, setActionType] = useState("");
  const [upis, setUpis] = useState([]);
  const [upi, setUpi] = useState("");

  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardDate: "",
    cvv: "",
    cardName: "",
  });

  useEffect(() => {
    // _getBalance(setAplBalance)
    getAllUpi(setUpis);
  }, []);

  const _goBack = (type) => {
    if (type) {
      setActionType("");
    } else {
      Router.back();
    }
  };

  const renderData = (type) => {
    if (!type) {
      return (
        <div className="pb-0 page-wrapper">
          <AmazonPay
            onSelect={() => setPaymentType(paymentTypes.AmazonPay)}
            aplBalance={aplBalance}
            isSelceted={paymentType == paymentTypes.AmazonPay}
          />

          <hr className="hr-10" />

          <CardPayment
            onPaymentSelect={() => setActionType(actionTypes.CardPayment)}
          />

          <hr className="hr-10" />

          <UPIList
            onSelectUpi={(data) => {
              setPaymentType(paymentTypes.UPI);
              setUpi(data);
            }}
            upis={upis}
            selectedUpi={upi}
            isSelceted={paymentType == paymentTypes.UPI}
            onAddNew={() => setActionType(actionTypes.NewUPI)}
            onPaymentSelect={() => setPaymentType(paymentTypes.UPI)}
          />

          <hr className="hr-10" />

          <PayStore
            refcode={query.refcode}
            isSelceted={paymentType == paymentTypes.InStore}
            onPaymentSelect={() => setPaymentType(paymentTypes.InStore)}
          />

          <div className="pay-opt-now-btn-cont">
            <button
              onClick={() => testApi(query.refcode, isLoader, setIsLoader)}
            >
              {isLoader ? "Wait..." : "Test"}
            </button>
            <div></div>
            {/* <button onClick={()=>Router.push("/pay-with-card29")}>Pay Now</button> */}
          </div>
        </div>
      );
    }

    if (type == actionTypes.CardPayment) {
      return (
        <PayWithCard
          propsCardData={cardData}
          onPayNow={(data) => setCardData(data)}
          onBack={() => setActionType("")}
        />
      );
    }

    if (type == actionTypes.NewUPI) {
      return (
        <AddNewUpi
          onSuccessAdd={(newUpi) => {
            setActionType("");
            setUpi(newUpi);
            setPaymentType(paymentTypes.UPI);
          }}
          upis={upis}
          setUpis={setUpis}
          onBack={() => setActionType("")}
        />
      );
    }
  };

  return (
    <div className="wrapper">
      <div className="container m-0 p-0">
        <div className="status-bar-cont">
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
    </div>
  );
};

Index.getInitialProps = async (ctx) => {
  const { asPath, query } = ctx;
  return { asPath, query };
};

export default Index;
