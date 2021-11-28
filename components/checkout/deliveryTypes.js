import { React, useState, useEffect } from "react";
import OrderTypeCMP from "./orderType";
import { useSelector } from "react-redux";

const Index = ({
  onSelectType,
  onClose,
  name,
  orderType,
  setSelectTypePopup,
}) => {
  const orderTypes = useSelector((state) => state.deliveryTypes);

  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  const merchantName = () => {
    if (typeof window !== "undefined") {
      let label = localStorage.getItem("Merchant Name");
      return label?.replace(/[^\w.,\s]/g, "");
    }
  };

  return (
    <div className="log-modal-overlay">
      <div className="log-modal">
        <div className={`log-modal-inner ${dark && "log-modal-inner-dark"}`}>
          <div
            className={`log-modal-header ${dark && "log-modal-header-dark"}`}
          >
            <p>Welcome to</p>
            <h3>{merchantName()}</h3>
            <p style={{ marginTop: "15px", fontStyle: "italic" }}>
              What would you like to do today...
            </p>
          </div>

          {/* <div className="rep-modal-close" onClick={() => onClose()}>
            <i
              className={`fas fa-times cross-icon ${dark && "cross-icon-dark"}`}
            ></i>
          </div> */}

          <div className="log-modal-body-wrap">
            <div className="log-modal-body">
              <OrderTypeCMP
                orderType={orderType}
                orderTypes={orderTypes}
                onSetOrderType={(orderType) => onSelectType(orderType)}
              />
            </div>

            {orderType ? (
              <div
                className={`btm-fxd-btn-border ${
                  dark && "btm-fxd-btn-border-dark"
                }`}
                style={{ marginTop: "20px" }}
              >
                <div className="d-flex w-100 justify-content-between align-items-center">
                  <button
                    onClick={() => setSelectTypePopup(false)}
                    className={`btm-fxd-btn ${dark && "btm-fxd-btn-dark"}`}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          {/* <div className="log-modal-continue-btn" >
                  <button  onClick={() => phoneSet  ? submitOTP(this) : _setPhone(this) }>{_getLable(phoneSet, submiting)}</button>
              </div> */}
        </div>
      </div>
    </div>
  );
};

export default Index;
