import { useEffect } from "react";
import Images from "../../../utils/ImageConst";

const NewUpiID = (props) => {
  return (
    <div className="wrapper">
      <div className="container m-0 p-0">
        <div className="status-bar-cont">
          <div className="d-flex status-bar-inner">
            <div className="status-name">
              <button>
                <i className="fas fa-chevron-left"></i>
              </button>
              <p className="mb-0">New UPI ID</p>
            </div>
          </div>
        </div>

        <div className="page-wrapper px-20 pb-0">
          <p className="text-muted para-small mb-4">
            Rest Assured your UPI ID is safe with us.
          </p>

          <div className="payment-section-container">
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control upi-input"
                i
                d="exampleInputPassword1"
                placeholder="Enter Your UPI ID"
              />
            </div>
          </div>

          <div className="pay-opt-now-btn-cont px-0">
            <button onClick={() => props.history.push("/new-upi30")}>
              Verify Now
            </button>
          </div>
        </div>
      </div>
      <hr className="hr-10" />
    </div>
  );
};

export default NewUpiID;
