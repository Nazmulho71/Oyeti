import React, { useState, useEffect } from "react";

const PayWithCard = ({ onBack, propsCardData, onPayNow, error }) => {
  const [cardData, setCardData] = useState({});

  useEffect(() => {
    setCardData(propsCardData);
  }, []);

  const payNow = () => {
    onPayNow(cardData);
  };

  const _changeCardData = (key, value) => {
    let formData = { ...cardData };
    if (key == "cardName") {
      formData[key] = value;
      setCardData(formData);
      return;
    }
    value = value.replace(/\D/g, "");

    formData[key] = value;

    let regexp = /^[0-9\b]+$/;
    if (!regexp.test(value)) {
      if (value == "") {
        setCardData(formData);
      } else {
        return;
      }
    }

    if (key == "cardNumber") {
      if (value.length > 19) {
        return;
      }
    }

    if (key == "cardDate") {
      if (value.length > 4) {
        return;
      }
    }

    if (key == "cardName") {
      if (!value.length) {
        return;
      }
    }

    if (key == "cvv") {
      if (value.length > 3) {
        return;
      }
    }

    setCardData(formData);
  };

  const _creditDebitCardNo = (card) => {
    let newStr = "";
    if (!card) {
      return newStr;
    }
    for (let i = 0; i < card.length; i++) {
      if (i % 4 == 0 && i != 0) newStr += "-" + card[i];
      else newStr += card[i];
    }
    return newStr;
  };

  const _creditDebitCardExpireDate = (expire) => {
    let newStr = "";
    if (!expire) {
      return newStr;
    }
    for (let i = 0; i < expire.length; i++) {
      if (i % 2 == 0 && i != 0) newStr += "/" + expire[i];
      else newStr += expire[i];
    }
    return newStr;
  };

  return (
    <div className="wrapper">
      <div className="container m-0 p-0">
        <div className="status-bar-cont">
          <div className="d-flex status-bar-inner">
            <div className="status-name">
              <button onClick={() => onBack()}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <p className="mb-0">Pay with card</p>
            </div>
          </div>
        </div>

        <div className="page-wrapper px-20">
          <p className="text-muted para-small mb-4">
            We accept credit, debit and atm cards from Visa, Mastercards,
            Dinners, American Express, Rupay and Maestro
          </p>

          <div className="payment-section-container">
            <div className="form-group mb-3">
              <input
                type="text"
                autoComplete="off"
                className="form-control form-input-btm-outline"
                onChange={(e) => _changeCardData("cardName", e.target.value)}
                id="exampleInputPassword1"
                placeholder="Name on card"
                value={cardData.cardName ? cardData.cardName : ""}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control form-input-btm-outline"
                id="exampleInputPassword2"
                placeholder="Card Number"
                value={_creditDebitCardNo(cardData.cardNumber)}
                onChange={(e) => _changeCardData("cardNumber", e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control form-input-btm-outline"
                id="exampleInputPassword3"
                placeholder="Expiry date (MM/YY)"
                value={_creditDebitCardExpireDate(cardData.cardDate)}
                onChange={(e) => _changeCardData("cardDate", e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control form-input-btm-outline"
                id="exampleInputPassword4"
                placeholder="CVV"
                onChange={(e) => _changeCardData("cvv", e.target.value)}
                value={cardData.cvv ? cardData.cvv : ""}
              />
            </div>
          </div>

          {error ? <p className="text-muted para-small mb-4">{error}</p> : null}

          <div className="pay-opt-now-btn-cont px-0">
            <button onClick={() => payNow()}>Pay Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayWithCard;
