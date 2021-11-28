import { useEffect, useRef, useState } from "react";
import { OTPTypes } from "../../lib/enums";
import LoginOTP from "./otp";
import OrderTypeCMP from "./orderType";

import $ from "jquery";

const Index = ({ orderType, onSetType }) => {
  const [loginType, setLoginType] = useState(1);
  const [phoneSet, setPhoneSet] = useState(false);

  const loginModalRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (e) => {
    if (loginModalRef && !loginModalRef.current.contains(e.target)) {
      setLoginModal(false);
    }
  };

  return (
    <div className="log-modal-overlay">
      <div className="log-modal">
        <div ref={loginModalRef} className="log-modal-inner">
          <div className="log-modal-header">
            <h3>Login to continue</h3>
          </div>
          <div className="log-modal-body-wrap">
            <div className="log-modal-body">
              <div className="input-group log-m-ph-inp">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="phone-number">
                    +91 -{" "}
                  </span>
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  className="form-control"
                  placeholder="Enter Mobile Number"
                  aria-label="Username"
                  aria-describedby="phone-number"
                />
              </div>

              <div className="choose-method-radio custom-radio">
                <p
                  className="mb-0"
                  onClick={() => {
                    setLoginType(OTPTypes.SMS);
                    document.getElementById("otp").checked = true;
                  }}
                >
                  <input
                    type="radio"
                    id="otp"
                    name="radio-group1"
                    checked={loginType == OTPTypes.SMS ? true : false}
                  />
                  <label for="otp">SMS OTP</label>
                </p>
                <p
                  className="mb-0"
                  onClick={() => {
                    setLoginType(OTPTypes.WhatsApp);
                    document.getElementById("whatsapp").checked = true;
                  }}
                >
                  <input
                    type="radio"
                    id="whatsapp"
                    name="radio-group1"
                    checked={loginType == OTPTypes.WhatsApp ? true : false}
                  />
                  <label for="whatsapp">WhatsApp</label>
                </p>
              </div>

              {/* <OrderTypeCMP onChangeDeliveryType={type => onSetType(type)} onPress={() => {this.setState({selectedType: orderType.value }); onChangeDeliveryType(orderType.value)}} orderType={orderType}/> */}

              {phoneSet ? <LoginOTP /> : null}

              <div
                className="allow-whats-app-notification"
                style={{ display: loginType == OTPTypes.WhatsApp && "none" }}
              >
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label" for="flexCheckDefault">
                    Allow notifications and order status to be shared On
                    WhatsApp
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="log-modal-continue-btn">
            <button>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
