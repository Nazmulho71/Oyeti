import { withoutAuthSync } from "../../middleware/auth";
import React from "react";
import { OTPTypes } from "../../lib/enums";
// import OrderTypeCMP from "../checkout/orderType";
import {
  _setPhone,
  generateOTP,
  submitOTP,
  _getLable,
  _setOtp,
  otpDatas,
  _updateUserPhone,
} from "../../lib/helpers/login";
import { _isValidNumberInput, _getStoreData } from "../../lib/helpers/common";
import LoginOTP from "./otp";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      errors: null,
      phoneSet: false,
      phone: "",
      submiting: false,
      otpType: OTPTypes.SMS,
      selectedType: "",
      message: "",
      otpDatas,
      redirect:
        props.query && props.query.redirect ? props.query.redirect : "/",
    };
  }

  _updateMobile(newPhone) {
    let { phone } = this.state;
    let isValid = _isValidNumberInput(newPhone, phone, 10);
    this.setState({
      errors: null,
    });
    if (isValid) {
      this.setState({
        phone: newPhone,
      });
    } else {
      this.setState({
        phone,
      });
    }
  }

  setLoginType(otpType) {
    this.setState({ otpType });
    if (this.state.phoneSet) {
      generateOTP(this);
    }
  }

  onSuccessEmailLogin() {}

  render() {
    const { phone, phoneSet, submiting, otpType, errors, selectedType } =
      this.state;
    const { onSetType, orderTypes, onClose, dontShowType, updatePhone, dark } =
      this.props;

    return (
      <div className="log-modal-overlay">
        <div className="log-modal">
          {/* <div ref={loginModalRef} className="log-modal-inner"> */}
          <div className={`log-modal-inner ${dark && "log-modal-inner-dark"}`}>
            <div
              className={`d-flex align-items-end justify-content-between log-modal-header ${
                dark && "log-modal-header-dark"
              }`}
              style={{
                borderRadius: "12px 12px 0px 0p",
                boxShadow: dark
                  ? "5px 5px 15px rgba(0, 0, 0, 0.35)"
                  : "2px 2px 5px rgb(105 141 173 / 40%)",
                padding: "20px 15px 20px 15px",
                marginTop: "-25px",
                marginRight: "-20px",
                marginLeft: "-20px",
              }}
            >
              <div>
                <h3 className="m-0">Login to continue</h3>
              </div>

              <div
                className="rep-modal-close"
                onClick={() => onClose()}
                style={{ cursor: "pointer" }}
              >
                <i
                  className="fas fa-times"
                  style={{ fontSize: "20px", color: dark ? "#fff" : "#404B69" }}
                ></i>
              </div>
            </div>

            <div className="log-modal-body-wrap">
              <div className="log-modal-body">
                <div
                  className={`log-modal-title ${
                    dark && "log-modal-title-dark"
                  }`}
                >
                  <h4 className="mb-3 mt-2">Mobile number</h4>
                </div>

                <div
                  className={`log-m-ph-inp-bord ${
                    dark && "log-m-ph-inp-bord-dark"
                  }`}
                >
                  <div
                    className={`input-group log-m-ph-inp ${
                      dark && "log-m-ph-inp-dark"
                    }`}
                  >
                    <div
                      className={`input-group-prepend country-code ${
                        dark && "country-code-dark"
                      }`}
                    >
                      <span
                        className="input-group-text country-code-text"
                        id="phone-number"
                      >
                        +91 -{" "}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => this._updateMobile(e.target.value)}
                      inputMode="numeric"
                      className="form-control"
                      placeholder="Enter Mobile Number"
                      aria-label="Username"
                      aria-describedby="phone-number"
                    />
                    {phone.length === 10 ? (
                      <img
                        className="me-3"
                        src="assets/img/validPhone.svg"
                        alt=""
                      />
                    ) : null}
                  </div>
                </div>

                {errors ? (
                  <div
                    // className="log-modal-header"
                    style={{ textAlign: "center" }}
                  >
                    <button className="mb-0 mt-2 remove-item-btn">
                      <b>{errors}</b>
                    </button>
                  </div>
                ) : null}

                <div
                  className={`choose-method-radio custom-radio ${
                    dark && "custom-radio-dark"
                  }`}
                >
                  <p
                    className="mb-0"
                    onClick={() => {
                      this.setLoginType(OTPTypes.SMS);
                      document.getElementById("otp").checked = true;
                    }}
                  >
                    <input
                      type="radio"
                      id="otp"
                      name="radio-group1"
                      defaultChecked={otpType == OTPTypes.SMS ? true : false}
                    />
                    <label htmlFor="otp">SMS OTP</label>
                  </p>
                  <p
                    className="mb-0"
                    onClick={() => {
                      this.setLoginType(OTPTypes.WhatsApp);
                      document.getElementById("whatsapp").checked = true;
                    }}
                  >
                    <input
                      type="radio"
                      id="whatsapp"
                      name="radio-group1"
                      defaultChecked={
                        otpType == OTPTypes.WhatsApp ? true : false
                      }
                    />
                    <label htmlFor="whatsapp">WhatsApp</label>
                  </p>
                </div>

                {/* {dontShowType ? null : (
                  <OrderTypeCMP
                    orderTypes={orderTypes}
                    onSetOrderType={(orderType) => {
                      this.setState({ selectedType: orderType });
                      onSetType(orderType);
                    }}
                    orderType={selectedType}
                  />
                )} */}

                {phoneSet ? (
                  <LoginOTP
                    updatePhone={updatePhone}
                    submitForm={() => submitOTP(this)}
                    onChangeInput={(e) => _setOtp(e, this)}
                    dark={dark}
                  />
                ) : null}

                {/* {phoneSet ? <div className="" style={{textAlign: 'center'}}>
                                    <p><button className="_submitButton" onClick={() => generateOTP(this)}>Resend</button></p>
                                </div>: null} */}

                {!phoneSet ? null : (
                  <div
                    className="bill-details-inner"
                    style={{ textAlign: "center" }}
                  >
                    <button
                      className="mb-0 mt-3 remove-item-btn"
                      style={{
                        fontWeight: "normal",
                        fontSize: "15px",
                        lineHeight: "24px",
                        color: dark ? "#fff" : "#404B69",
                      }}
                    >
                      Didn’t received the OTP?
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "15px",
                          color: "#ff118e",
                        }}
                        onClick={() => generateOTP(this)}
                      >
                        &nbsp;Resend
                      </span>
                    </button>
                  </div>
                )}

                {/* {otpType == OTPTypes.WhatsApp ? <div className="allow-whats-app-notification" >
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="1" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Allow notifications and order status to be shared On WhatsApp
                                    </label>
                                    </div>
                                </div> : null} */}
              </div>
            </div>
            <div
              className={`log-modal-continue-btn ${
                dark && "log-modal-continue-btn-dark"
              }`}
            >
              <div
                className={`log-modal-continue-btn-bord ${
                  dark && "log-modal-continue-btn-bord-dark"
                }`}
              >
                <button
                  onClick={() => (phoneSet ? submitOTP(this) : _setPhone(this))}
                >
                  {_getLable(phoneSet, submiting)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.getInitialProps = async ({ query }) => {
  return { query };
};

export default withoutAuthSync(App);
