import { useEffect } from "react";
import Images from "../../../utils/ImageConst";

const MyOrder22 = (props) => {
  return (
    <div className="wrapper">
      <div className="container m-0 p-0">
        <div className="status-bar-cont">
          <div className="d-flex status-bar-inner">
            <div className="status-name">
              <button>
                <i className="fas fa-chevron-left"></i>
              </button>
              <p className="mb-0">My Order</p>
            </div>
            <div className="status-btn">
              <button>Call Waiter</button>
            </div>
          </div>
        </div>

        <div className="pb-4 page-wrapper">
          <div className="special-request-inp-container mt-3 mb-3">
            <input type="text" placeholder="Table Number" disabled />
          </div>
          <div className="cart-list-containr pt-0">
            <div className="cart-list-inner pl-25 position-relative">
              <div className="cart-list-label">A</div>
              <div className="cart-list-item mb-0">
                <div className="cart-list-item-flexbox">
                  <div className="cart-list-item-name">
                    <p className="mb-0">1 X Penna Arrabiata</p>
                  </div>
                  <div className="cart-list-item-price">
                    <p className="mb-0 item-price">249</p>
                  </div>
                </div>
              </div>
              <hr className="hr-thin" />
              <div className="cart-list-item mb-0">
                <div className="cart-list-item-flexbox">
                  <div className="cart-list-item-name-cont">
                    <p className="mb-0 cart-list-item-name">
                      1 X Build your own 5 Veg Pizza
                    </p>
                    <p className="mb-0 cart-list-item-toppings text-muted">
                      Onion, Potato, Baby Corn, Mushroom, chilli{" "}
                    </p>
                  </div>
                  <div className="cart-list-item-price">
                    <p className="mb-0 item-price">249</p>
                  </div>
                </div>
                <div className="cart-list-item-addons-flexbox">
                  <p className="product-list-item-extra-list mb-0">
                    Extra Cheese @ ₹60
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="suggested-dishes-cont">
            <h3 className="heading-bold-small">Suggested dishes for you</h3>

            <div className="suggested-dishes-flex-container">
              <div className="suggested-dishes-flex-inner">
                {[1, 2, 3, 4, 5, 6].map((e) => (
                  <div key={`suggested${e}`} className="suggested-dish-item">
                    <div className="sdi-img">
                      <img src={Images.suggested_dish} alt="" />
                    </div>
                    <div className="adi-details-cont">
                      <p className="mb-0 sdi-name">Penna Arrabiata</p>
                      <button className="sdi-add-btn">
                        <img className="img-fluid" src={Images.plus} alt="" />{" "}
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="order-timeline-container">
            <div className="order-timeline-inner position-relative">
              <div className="timeline-line"></div>
              <div className="timeline-elements">
                <div className="position-relative time-elements-inner">
                  <span className="t-dot t-dot-full t-position-0"></span>
                  <span className="t-text t-position-1">Order Accepted</span>
                  <span className="t-dot t-dot-half t-position-5"></span>
                  <span className="t-dot t-dot-empty t-position-10"></span>
                </div>
              </div>
            </div>
          </div>

          <div className="confirm-order-btn-cont">
            <div className="d-flex w-100 justify-content-between align-items-center">
              <button
                onClick={() => props.history.push("/my-order24")}
                className="menu-btn w-100"
              >
                Menu
              </button>
              <button
                onClick={() => props.history.push("/my-order24")}
                className="bill-btn w-100"
              >
                Request Bill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrder22;
