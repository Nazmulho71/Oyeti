import $ from "jquery";
import { useEffect, useState } from "react";
import nextCookie from "next-cookies";
import Router from "next/router";
import LoginCMP from "../../components/login/login";
import Cart from "../../components/order/cart";
import SuggestedProducts from "../../components/order/suggestedProducts";
import { _getCartsFun } from "../../lib/helpers/menu";

const Index = ({ isLoggedIn }) => {
  const [orderType, setOrderType] = useState("");
  const [loginStatus, setLoginStatus] = useState(isLoggedIn);
  const [carts, setCarts] = useState([]);

  const _getCarts = () => {
    _getCartsFun(setCarts);
  };

  useEffect(() => {
    document.querySelector(".confirm-ord-btn").value = 0;
    $(".confirm-ord-btn").on("change", function () {
      var slidepos = $(this).val();
      if (slidepos > 96) {
        // User slided the slider
        Router.push(`/my-order22`);
      } else {
        document.querySelector(".confirm-ord-btn").value = 0;
      }
    });
  }, []);

  useEffect(() => {
    _getCarts();
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
          <Cart carts={carts} setCarts={setCarts} />

          <div className="special-request-inp-container mt-0">
            <input type="text" placeholder="Type in any Special Requests" />
          </div>

          <SuggestedProducts carts={carts} setCarts={setCarts} />

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
        {!loginStatus ? (
          <LoginCMP
            onSuccessLogin={() => setLoginStatus(true)}
            orderType={orderType}
            onSetType={(type) => setOrderType(type)}
          />
        ) : null}
        {/* <!-- login to continue popup ends --> */}
      </div>
    </div>
  );
};

Index.getInitialProps = async (ctx) => {
  const { token } = nextCookie(ctx);
  let isLoggedIn = token ? true : false;
  return { isLoggedIn };
};

export default Index;
