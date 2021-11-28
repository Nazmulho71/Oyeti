import { useEffect } from "react";
import Images from "../../utils/ImageConst";

const PaymentOption = (props) => {
  return (
    <div className="wrapper">
      <div className="container m-0 p-0">
        <div className="status-bar-cont">
          <div className="d-flex status-bar-inner">
            <div className="status-name">
              <button>
                <i className="fas fa-chevron-left"></i>
              </button>
              <p className="mb-0">Payment Options 1</p>
            </div>
          </div>
        </div>

        <div className="pb-0 page-wrapper">
          <div className="payment-section-cont">
            <h3 className="heading-bold-small mb-3">
              Wallets{" "}
              <span className="heading-supporter">
                ( select wallet to pay form )
              </span>{" "}
            </h3>
            <div className="payment-option-name-cont payment-option-name-cont-active">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="pon-icon">
                    <img
                      className="img-fluid pay-icon-img"
                      src={Images.amazonPay}
                      alt=""
                    />
                  </div>
                  <p className="pon-name mb-0">Amazon Pay</p>
                </div>
                <p className="pon-amount mb-0">₹2,318</p>
              </div>
            </div>
          </div>

          <hr className="hr-10" />

          <div className="payment-section-cont">
            <h3 className="heading-bold-small mb-3">
              Cards{" "}
              <span className="heading-supporter">
                ( Enter details to pay )
              </span>{" "}
            </h3>
            <div className="payment-option-name-cont">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="pon-icon">
                    <img
                      className="img-fluid"
                      src={Images.credit_card}
                      alt=""
                    />
                  </div>
                  <p className="pon-name mb-0">Credit, Debit, ATM, etc.</p>
                </div>
                <p className="pon-amount mb-0">
                  <i className="fas fa-arrow-right"></i>
                </p>
              </div>
            </div>
          </div>

          <hr className="hr-10" />

          <div className="payment-section-cont">
            <h3 className="heading-bold-small mb-3">
              UPI{" "}
              <span className="heading-supporter">( Select UPI service )</span>{" "}
            </h3>
            <div className="payment-option-name-cont">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="pon-icon">
                    <img
                      className="img-fluid pay-icon-img"
                      src={Images.amazonPay}
                      alt=""
                    />
                  </div>
                  <p className="pon-name mb-0">9663536272@apl</p>
                </div>
              </div>
            </div>

            <div className="payment-option-name-cont mt-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="pon-icon">
                    <img
                      className="img-fluid pay-icon-img"
                      src={Images.phonepe}
                      alt=""
                    />
                  </div>
                  <p className="pon-name mb-0">9663536272@oksbi</p>
                </div>
              </div>
            </div>

            <div className="add-pay-opt-cont">
              <div className="mr-3">
                <img className="img-fluid" src={Images.addCircle} alt="" />
              </div>
              <div className="m-0 new-pay-opt-add-text">
                <p className="mb-0">Add new UPI Id</p>
                <p className="mb-0 text-muted">
                  You need to have registered UPI ID
                </p>
              </div>
            </div>
          </div>

          <hr className="hr-10" />

          <div className="payment-section-cont">
            <h3 className="heading-bold-small mb-3">
              Pay at store{" "}
              <span className="heading-supporter">
                ( Pay at store using cash/card/etc )
              </span>{" "}
            </h3>
            <div className="payment-option-name-cont">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="pon-icon">
                    <img className="img-fluid" src={Images.payAtShop} alt="" />
                  </div>
                  <p className="pon-name mb-0">Pay ay store</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pay-opt-now-btn-cont">
            <button onClick={() => props.history.push("/pay-with-card29")}>
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOption;
