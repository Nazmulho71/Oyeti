import { useEffect } from "react";

const MyOrder38 = (props) => {
  return (
    <div class="wrapper">
      <div class="container m-0 p-0">
        <div class="status-bar-cont">
          <div class="d-flex status-bar-inner">
            <div class="status-name">
              <button>
                <i class="fas fa-chevron-left"></i>
              </button>
              <p class="mb-0">My Order</p>
            </div>
            <div class="status-btn">
              <button>Call Waiter</button>
            </div>
          </div>
        </div>

        <div class="page-wrapper">
          <div class="special-request-inp-container mt-3 mb-3">
            <input type="text" placeholder="Order ID" disabled />
          </div>
          <div class="cart-list-containr pt-0">
            <div class="cart-list-inner pl-25 position-relative">
              <div class="cart-list-label">A</div>
              <div class="cart-list-item mb-0">
                <div class="cart-list-item-flexbox">
                  <div class="cart-list-item-name">
                    <p class="mb-0">1 X Penna Arrabiata</p>
                  </div>
                  <div class="cart-list-item-price">
                    <p class="mb-0 item-price">249</p>
                  </div>
                </div>
              </div>
              <hr class="hr-thin" />
              <div class="cart-list-item mb-0">
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
                  </div>
                </div>
                <div class="cart-list-item-addons-flexbox">
                  <p class="product-list-item-extra-list mb-0">
                    Extra Cheese @ ₹60
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="order-timeline-container">
            <div class="order-timeline-inner position-relative">
              <div class="timeline-line"></div>
              <div class="timeline-elements">
                <div class="position-relative time-elements-inner">
                  <span class="t-dot t-dot-full t-position-0"></span>
                  <span class="t-dot t-dot-full t-position-1"></span>
                  <span class="t-dot t-dot-full t-position-2"></span>
                  <span class="t-text t-position-3" style={{ width: "70%" }}>
                    Order Delivered
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="btn-botton-fixed">
            <div class="d-flex w-100 justify-content-between align-items-center">
              <button
                onClick={() => props.history.push("/bill27")}
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

export default MyOrder38;
