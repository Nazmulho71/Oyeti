import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { currency } from "../../lib/enums";

const Index = ({ summery, isGrocery }) => {
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  return !summery.totalQuantity ? (
    <div></div>
  ) : (
    // <div
    //   className={`fixed-order-btn-cont-border ${
    //     dark && "fixed-order-btn-cont-border-dark"
    //   }`}
    // >
    <div
      className={`fixed-order-btn-cont ${dark && "fixed-order-btn-cont-dark"}`}
      style={{ position: "fixed", padding: "10px 15px" }}
    >
      <Link href="/checkout">
        <a>
          <div
            className={`fixed-order-btn-border ${
              dark && "fixed-order-btn-border-dark"
            }`}
          >
            <div
              className={`fixed-order-btn ${dark && "fixed-order-btn-dark"}`}
            >
              <div className="fo-item-details">
                <p className={`fo-item-qty ${dark && "fo-item-qty-dark"}`}>
                  {summery.totalQuantity} ITEM
                </p>
                <div
                  className={`pagination-dot-active ${
                    dark && "pagination-dot-dark-active"
                  }`}
                ></div>
                <p className={`fo-item-price ${dark && "fo-item-price-dark"}`}>
                  {currency}
                  {summery.totalAmount}
                  {/* <span>Plus Taxes</span> */}
                </p>
              </div>
              <div className="fo-view-order">
                <p className={`view-order mb-0 ${dark && "view-order-dark"}`}>
                  View Order&nbsp;
                  <i
                    className={`fas fa-arrow-right right-arr-icon ${
                      dark && "right-arr-icon-dark"
                    }`}
                    aria-hidden="true"
                  ></i>{" "}
                </p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
    // </div>
  );
};

export default Index;
