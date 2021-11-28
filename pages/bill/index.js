import { useEffect, useState } from "react";

const Bill27 = (props) => {
  const [tipAmount, setTipAmount] = useState("₹ 20");

  return (
    <div class="wrapper">
      <div class="container m-0 p-0">
        <div class="status-bar-cont">
          <div class="d-flex status-bar-inner">
            <div class="status-name">
              <button>
                <i class="fas fa-chevron-left"></i>
              </button>
              <p class="mb-0">Bill</p>
            </div>
            <div class="status-btn">
              <button>Call Waiter</button>
            </div>
          </div>
        </div>

        <div class="page-wrapper">
          <div class="cart-list-containr">
            <div class="cart-list-inner">
              <div class="cart-list-item">
                <div class="cart-list-item-flexbox">
                  <div class="cart-list-item-name">
                    <p class="mb-0">1 X Penna Arrabiata</p>
                  </div>
                  <div class="cart-list-item-price">
                    <p class="mb-0 item-price">249</p>
                    <button class="mb-0 remove-item-btn">Remove</button>
                  </div>
                </div>
              </div>
              <hr class="mt-0 hr-thin" />

              <div class="cart-list-item">
                <div class="cart-list-item-flexbox">
                  <div class="cart-list-item-name-cont">
                    <p class="mb-0 cart-list-item-name">
                      1 X Build your own 5 Veg Pizza
                    </p>
                    <p class="mb-0 cart-list-item-toppings text-muted">
                      Onion, Potato, Baby Corn, Mushroom, chilli{" "}
                    </p>
                  </div>
                  <div class="cart-list-item-price">
                    <p class="mb-0 item-price">249</p>
                    <button class="mb-0 remove-item-btn">Remove</button>
                  </div>
                </div>
                <div class="cart-list-item-addons-flexbox">
                  <p class="product-list-item-extra-list mb-0">
                    Extra Cheese @ ₹60
                  </p>
                  <button class="mb-0 remove-item-btn">Remove</button>
                </div>
              </div>
            </div>
          </div>

          <div class="special-req-cont">
            <div class="special-req-box d-flex justify-content-between align-items-center">
              <div class="sp-req-text">
                <h5 class="mb-0">Apply Coupon</h5>
                <p class="text-muted mb-0">Enter you code or select a code</p>
              </div>
              <div class="sp-req-btn">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
          </div>

          <div className="apply-coupon-cont">
            <div className="cart-list-inner">
              <div className="cart-list-item mb-0">
                <div className="cart-list-item-flexbox">
                  <div className="cart-list-item-name-cont">
                    <p className="mb-0 cart-list-item-name">
                      Add a tip to your waiter
                    </p>
                    <p className="mb-0 cart-list-item-toppings text-muted w-100 max-w-100">
                      <input
                        style={{ width: "50px" }}
                        type="text"
                        inputmode="numeric"
                        className="form-control form-input-btm-outline pb-0 text-center"
                        i
                        d="tipInp"
                        onChange={(e) => setTipAmount(`${e.target.value}`)}
                        value={`${tipAmount}`}
                      />
                    </p>
                  </div>
                  <div className="cart-list-item-price">
                    <p class="mb-0 item-price">{tipAmount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bill-details-container">
            <div class="bill-details-inner">
              <p class="heading-bold-small">Bill Details</p>
              <div class="bill-amount-details-cont">
                <div class="bill-det-amt-item">
                  <p>Item Total</p>
                  <p>₹ 812</p>
                </div>
                <div class="bill-det-amt-item">
                  <p>PROMO - discount</p>
                  <p>-₹ 120</p>
                </div>
                <div class="bill-det-amt-item">
                  <p>Packing Charges</p>
                  <p>₹ 60</p>
                </div>
                <div class="bill-det-amt-item">
                  <p>Tax ( 5 % )</p>
                  <p>₹ 34</p>
                </div>
              </div>
              <hr class="my-2" />
              <div class="bill-details-total">
                <p>Total To Pay</p>
                <p>₹ 746</p>
              </div>
            </div>
          </div>

          <div class="btn-botton-fixed">
            <div class="d-flex w-100 justify-content-between align-items-center">
              <button
                onClick={() => props.history.push("/payment-options28")}
                class="btm-fxd-btn"
              >
                Proceed to pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bill27;
