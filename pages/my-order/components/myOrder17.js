import $ from "jquery";
import { useEffect, useRef, useState } from "react";
import Images from "../../../utils/ImageConst";
// import { SvgFood, SvgLunch } from '../../../utils/SvgColored';

const MyOrder17 = (props) => {
  const [loginModal, setLoginModal] = useState(true);
  const [loginType, setLoginType] = useState(1);
  const [orderType, setOrderType] = useState(1);

  const loginModalRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (e) => {
    if (loginModalRef && !loginModalRef.current.contains(e.target)) {
      setLoginModal(false);
    }
  };

  useEffect(() => {
    // loginModalEvent
    $(".otp-from")
      .find("input")
      .each(function () {
        $(this).attr("maxlength", 1);
        $(this).on("keyup input", function (e) {
          var parent = $($(this).parent());
          if (e.keyCode === 8 || e.keyCode === 37) {
            var prev = parent.find("input#" + $(this).data("previous"));
            if (prev.length) {
              $(prev).select();
            }
          } else if (
            (e.keyCode >= 48 && e.keyCode <= 57) ||
            (e.keyCode >= 65 && e.keyCode <= 90) ||
            (e.keyCode >= 96 && e.keyCode <= 105) ||
            e.keyCode === 39
          ) {
            var next = parent.find("input#" + $(this).data("next"));
            if (next.length) {
              $(next).select();
            } else {
              if (parent.data("autosubmit")) {
                // parent.submit();
              }
            }
          }
        });
      });
  }, []);

  useEffect(() => {
    document.querySelector(".confirm-ord-btn").value = 0;
    $(".confirm-ord-btn").on("change", function () {
      var slidepos = $(this).val();
      if (slidepos > 96) {
        // User slided the slider
        props.history.push("/my-order22");
      } else {
        document.querySelector(".confirm-ord-btn").value = 0;
      }
    });
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
              <p className="mb-0">My Order</p>
            </div>
            <div className="status-btn">
              <button>Call Waiter</button>
            </div>
          </div>
        </div>

        <div className="pb-4 page-wrapper">
          <div className="cart-list-containr">
            <div className="cart-list-inner">
              <div className="cart-list-item">
                <div className="cart-list-item-flexbox">
                  <div className="cart-list-item-name">
                    <p className="mb-0">1 X Penna Arrabiata</p>
                  </div>
                  <div className="cart-list-item-price">
                    <p className="mb-0 item-price">249</p>
                    <button className="mb-0 remove-item-btn">Remove</button>
                  </div>
                </div>
              </div>

              <div className="cart-list-item">
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
                    <button className="mb-0 remove-item-btn">Remove</button>
                  </div>
                </div>
                <div className="cart-list-item-addons-flexbox">
                  <p className="product-list-item-extra-list mb-0">
                    Extra Cheese @ ₹60
                  </p>
                  <button className="mb-0 remove-item-btn">Remove</button>
                </div>
              </div>
            </div>
          </div>

          <div className="special-request-inp-container mt-0">
            <input type="text" placeholder="Type in any Special Requests" />
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

          <div className="confirm-order-btn-cont">
            <div className="confirm-ord-btn-inner-cont">
              <div className="confirm-swiper-cont">
                <input
                  min="0"
                  max="100"
                  type="range"
                  className="confirm-ord-btn position-relative"
                />
                <p className="mb-0 con-ord-para">Confirm Order</p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- login to continue popup --> */}
        <div
          className="log-modal-overlay"
          style={{ display: !loginModal && "none" }}
        >
          <div className="log-modal">
            <div ref={loginModalRef} className="log-modal-inner">
              <div className="log-modal-header">
                <h3>Login to continue</h3>
              </div>
              <div className="log-modal-body-wrap">
                <div className="log-modal-body">
                  <div className="input-group log-m-ph-inp">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="phone-number">
                        +91 -{" "}
                      </span>
                    </div>
                    <input
                      type="text"
                      inputmode="numeric"
                      className="form-control"
                      placeholder="Enter Mobile Number"
                      aria-label="Username"
                      aria-describedby="phone-number"
                    />
                  </div>

                  <div className="choose-method-radio custom-radio">
                    <p
                      className="mb-0"
                      onClick={() => {
                        setLoginType(1);
                        document.getElementById("otp").checked = true;
                      }}
                    >
                      <input
                        type="radio"
                        id="otp"
                        name="radio-group1"
                        checked={loginType == 1 ? true : false}
                      />
                      <label for="otp">SMS OTP</label>
                    </p>
                    <p
                      className="mb-0"
                      onClick={() => {
                        setLoginType(2);
                        document.getElementById("whatsapp").checked = true;
                      }}
                    >
                      <input
                        type="radio"
                        id="whatsapp"
                        name="radio-group1"
                        checked={loginType == 2 ? true : false}
                      />
                      <label for="whatsapp">WhatsApp</label>
                    </p>
                  </div>

                  <div className="select-order-type-cont">
                    <p className="sot-heading">Select Order Type</p>
                    <div className="select-order-type-item-flexbox">
                      <div
                        onClick={() => setOrderType(1)}
                        className={
                          orderType == 1
                            ? "sot-item sot-item-active"
                            : "sot-item"
                        }
                      >
                        {/* <img className="img-fluid" src={Images.food} alt="" /> */}
                        {/* <SvgFood color={orderType == 1 ? "#FF118E" : "#1A1A1A"} /> */}
                        <p className="text-muted">Dine in</p>
                      </div>
                      <div
                        onClick={() => setOrderType(2)}
                        className={
                          orderType == 2
                            ? "sot-item sot-item-active"
                            : "sot-item"
                        }
                      >
                        {/* <img className="img-fluid" src={Images.lunch} alt="" /> */}
                        {/* <SvgLunch color={orderType == 2 ? "#FF118E" : "#1A1A1A"} /> */}
                        <p className="text-muted">Take away</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="enter-otp-cont"
                    style={{ display: loginType !== 1 && "none" }}
                  >
                    <p className="sot-heading">Enter Otp</p>
                    <form className="otp-from">
                      <input
                        inputmode="numeric"
                        type="text"
                        maxlength="1"
                        className="form-control"
                        id="digit-1"
                        name="digit-1"
                        data-next="digit-2"
                        placeholder=""
                      />
                      <span className="otp-partion">.</span>
                      <input
                        inputmode="numeric"
                        type="text"
                        maxlength="1"
                        className="form-control"
                        id="digit-2"
                        name="digit-2"
                        data-previous="digit-1"
                        data-next="digit-3"
                        placeholder=""
                      />
                      <span className="otp-partion">.</span>
                      <input
                        inputmode="numeric"
                        type="text"
                        maxlength="1"
                        className="form-control"
                        id="digit-3"
                        name="digit-3"
                        data-previous="digit-2"
                        data-next="digit-4"
                        placeholder=""
                      />
                      <span className="otp-partion">.</span>
                      <input
                        inputmode="numeric"
                        type="text"
                        maxlength="1"
                        className="form-control"
                        id="digit-4"
                        name="digit-4"
                        data-previous="digit-3"
                        placeholder=""
                      />
                    </form>
                  </div>

                  <div
                    className="allow-whats-app-notification"
                    style={{ display: loginType !== 2 && "none" }}
                  >
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        for="flexCheckDefault"
                      >
                        Allow notifications and order status to be shared On
                        WhatsApp
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="log-modal-continue-btn">
                <button>Continue</button>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- login to continue popup ends --> */}
      </div>
    </div>
  );
};

export default MyOrder17;
