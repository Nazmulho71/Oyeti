import AvailableCoupons from "./available_coupons";
import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import Header from "../../common/header";
import { _applyCoupon } from "../../../lib/helpers/checkout";

const Index = ({
  onClose,
  onSuccess,
  amount,
  id,
  couponApplied,
  onDelete,
  code,
  inPage = false,
}) => {
  const [coupon, setCounpon] = useState("");

  const _actionOnClick = () => {
    if (couponApplied) {
      setCounpon("");
      onDelete();
    } else {
      if (code) {
        let isGrocery = true;
        _applyCoupon(coupon, amount, code, onSuccess, isGrocery);
      } else {
        _applyCoupon(coupon, amount, id, onSuccess);
      }
    }
  };

  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  if (inPage) {
    return (
      <div className="special-req-cont">
        <div className="special-req-box d-flex justify-content-between align-items-center">
          <div className="sp-req-text">
            <h5 className="mb-0">Apply Coupon</h5>
            <p className="text-muted mb-0">Enter you code or select a code</p>
            <input
              disabled={couponApplied}
              type="text"
              value={coupon}
              onChange={(e) => setCounpon(e.target.value)}
              className="form-control form-input-btm-outline pb-0 "
            />
          </div>
          <div className="sp-req-btn" onClick={() => _actionOnClick()}>
            {couponApplied ? (
              <i className="fas fa-trash-alt"></i>
            ) : (
              <i className="fas fa-chevron-right"></i>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="container m-0 p-0">
        <Header goBack={() => onClose()} title="Apply Coupon" />

        <div className="page-wrapper">
          <div className="special-code-cpnt">
            <h3
              className={`heading-bold-small mb-4 ${
                dark && "heading-bold-small-dark"
              }`}
            >
              Have a special code?
            </h3>
            <div
              className={`special-request-inp-container m-0 position-relative inp-background ${
                dark && "special-request-inp-container-dark inp-background-dark"
              }`}
            >
              <input
                type="text"
                placeholder="Enter Here"
                value={coupon}
                onChange={(e) => setCounpon(e.target.value)}
              />
              <div className="abs-apply-btn">
                <button
                  className="mb-0 remove-item-btn"
                  onClick={() => _actionOnClick()}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* <AvailableCoupons onApplyCoupon={(code) => _applyCoupon(code, amount, id, onSuccess)}/> */}
        </div>
      </div>
    </div>
  );
};

export default Index;
