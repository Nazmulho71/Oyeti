import { useEffect } from "react";
import Images from "../../../utils/ImageConst";

const PayAtStore31 = (props) => {
  return (
    <div
      className="wrapper"
      onClick={() => props.history.push("/apply-coupon")}
    >
      <div className="container m-0 p-0">
        <div className="status-bar-cont">
          <div className="d-flex status-bar-inner">
            <div className="status-name">
              <button>
                <i className="fas fa-chevron-left"></i>
              </button>
              <p className="mb-0">Pay at store</p>
            </div>
          </div>
        </div>

        <div className="page-wrapper px-20 pb-0">
          <div className="full-page-image">
            <img className="img-fluid" src={Images.payAtShopImage} alt="" />
          </div>
          <p className="para-small mb-0 text-center">
            <b>We have informed the cashier to meet you</b>
          </p>
          <p className="para-small mb-0 text-center">
            You can pay in cash or card.
          </p>

          <div className="btn-botton-fixed shadow-none px-4">
            <div className="progress-line-pas">
              <div className="pas-prog-active"></div>
            </div>
            <p className="mb-0 mt-2 text-center">
              <b>24</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayAtStore31;
