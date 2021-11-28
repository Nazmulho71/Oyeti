import { useEffect } from "react";
import $ from "jquery";
import Images from "../../../utils/ImageConst";

const MyOrder24 = (props) => {
  useEffect(() => {
    document.querySelector(".confirm-ord-btn").value = 0;
    $(".confirm-ord-btn").on("change", function () {
      var slidepos = $(this).val();
      if (slidepos > 96) {
        // User slided the slider
        props.history.push("/my-order37");
      } else {
        document.querySelector(".confirm-ord-btn").value = 0;
      }
    });
  }, []);

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

        <div class="pb-4 page-wrapper">
          <div class="special-request-inp-container mt-3 mb-3">
            <input type="text" placeholder="You are at table No. 12" disabled />
          </div>

          <div class="cart-list-containr py-0">
            <div class="accordion cart-list-inner pl-25 position-relative py-2 item-served-pd">
              <div class="cart-list-label">A</div>
              {/* <!-- Acc. item --> */}
              <div class="p-0" id="accordionExample">
                {/* <!-- acc header --> */}
                <div class="cart-list-item mb-0">
                  <div
                    class="cart-list-item-flexbox"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <div class="cart-list-item-name d-flex w-100 justify-content-between align-items-center">
                      <p class="mb-0 font-small">Items already served</p>
                      <i class="fas fa-chevron-down"></i>
                    </div>
                  </div>
                </div>
                {/* <!-- acc body --> */}
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse mt-2"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  {/* <!-- item  --> */}
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
                  {/* <!-- item ends --> */}
                  {/* <!-- item --> */}
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
                  {/* <!-- item ends --> */}
                </div>
              </div>
            </div>
          </div>

          <div class="hr-sep-bold"></div>

          <div class="cart-list-containr pt-0">
            <div class="cart-list-inner pl-25 position-relative">
              <div class="cart-list-label">A</div>
              <div class="cart-list-item mb-0">
                <div class="cart-list-item-flexbox">
                  <div class="cart-list-item-name-cont">
                    <p class="mb-0 cart-list-item-name">1 X Classic Lemonade</p>
                    <p class="mb-0 cart-list-item-toppings text-muted">
                      Mineral water
                    </p>
                  </div>
                  <div class="cart-list-item-price">
                    <p class="mb-0 item-price">249</p>
                    <button class="mb-0 remove-item-btn-red">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="suggested-dishes-cont">
            <h3 class="heading-bold-small">Suggested dishes for you</h3>

            <div class="suggested-dishes-flex-container">
              <div class="suggested-dishes-flex-inner">
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

          <div class="confirm-order-btn-cont">
            <div className="confirm-ord-btn-inner-cont">
              <div className="confirm-swiper-cont">
                <input
                  min="0"
                  max="100"
                  type="range"
                  className="confirm-ord-btn position-relative"
                />
                <p className="mb-0 con-ord-para-sm">Confirm Order</p>
              </div>
            </div>
          </div>

          <div class="confirm-order-btn-cont">
            <div class="d-flex w-100 justify-content-between align-items-center">
              <button
                onClick={() => props.history.push("/my-order37")}
                class="menu-btn"
              >
                Menu
              </button>
              <button
                onClick={() => props.history.push("/my-order37")}
                class="bill-btn"
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

export default MyOrder24;
