import { useState } from "react";
import { _applyCoupon } from "../../lib/helpers/checkout";

const Index = ({ onSuccess, amount, id, couponApplied, onDelete }) => {
  const [coupon, setCounpon] = useState("");

  const _actionOnClick = () => {
    if (couponApplied) {
      setCounpon("");
      onDelete();
    } else {
      _applyCoupon(coupon, amount, id, onSuccess);
    }
  };

  return (
    <div className="special-req-cont" onClick={() => setIsApplyCoupon(true)}>
      <div className="special-req-box d-flex justify-content-between align-items-center">
        <div className="sp-req-text">
          <h5 className="mb-0">Apply Coupon</h5>
          <p className="text-muted mb-0">Enter you code or select a code</p>
        </div>
        <div className="sp-req-btn" style={{ height: "56px" }}>
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
    </div>
  );
};

export default Index;
