import { useEffect } from "react";
import Link from "next/link";

const ApplyCoupon39 = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location =
        "tez://upi/pay?pa=dotpe.payu@indus&pn=DOTPE%20PRIVATE%20LIMITED&tr=13334427897&tid=CY5VONInNtZsQccz&am=257.26&cu=INR&tn=Starbucks%20-%204945971";
    }, 500);
  }, []);

  return (
    <div className="wrapper">
      <div className="container m-0 p-0">
        <div className="status-bar-cont">
          <div className="d-flex status-bar-inner">
            <div className="status-name">
              <button>
                <i className="fas fa-chevron-left"></i>
              </button>
              <p className="mb-0">Apply Coupon</p>
            </div>
          </div>
        </div>

        <div className="page-wrapper">
          <div className="special-code-cpnt">
            <h3 className="heading-bold-small mb-4">Have a special code?</h3>

            <div className="special-request-inp-container m-0 position-relative">
              <input type="text" placeholder="Enter Here" />
              <div className="abs-apply-btn">
                <button className="mb-0 remove-item-btn">Apply</button>
              </div>
            </div>
          </div>

          <div className="apply-coupon-cont">
            <h3 className="heading-bold-small mb-4">Available coupons</h3>
            <div className="cart-list-inner">
              <div className="cart-list-item mb-0">
                <div className="cart-list-item-flexbox">
                  <div className="cart-list-item-name-cont">
                    <p className="mb-0 cart-list-item-name">Oyeti First</p>
                    <p className="mb-0 cart-list-item-toppings text-muted w-100 max-w-100">
                      Get additional ₹ 100 off on your 1st order{" "}
                    </p>
                  </div>
                  <div className="cart-list-item-price">
                    <button className="mb-0 remove-item-btn">Apply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="apply-coupon-cont">
            <div className="cart-list-inner">
              <div className="cart-list-item mb-0">
                <div className="cart-list-item-flexbox">
                  <div className="cart-list-item-name-cont">
                    <p className="mb-0 cart-list-item-name">Oyeti First</p>
                    <p className="mb-0 cart-list-item-toppings text-muted w-100 max-w-100">
                      Get additional ₹ 100 off on your 1st order{" "}
                    </p>
                  </div>
                  <div className="cart-list-item-price">
                    <button className="mb-0 remove-item-btn">Apply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="apply-coupon-cont">
            <div className="cart-list-inner">
              <div className="cart-list-item mb-0">
                <div className="cart-list-item-flexbox">
                  <div className="cart-list-item-name-cont">
                    <p className="mb-0 cart-list-item-name">Oyeti First</p>
                    <p className="mb-0 cart-list-item-toppings text-muted w-100 max-w-100">
                      Get additional ₹ 100 off on your 1st order{" "}
                    </p>
                  </div>
                  <div className="cart-list-item-price">
                    <button className="mb-0 remove-item-btn">Apply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyCoupon39;
