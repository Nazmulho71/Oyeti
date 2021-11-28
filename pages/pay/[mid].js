import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Images from "../../utils/ImageConst";
import NumPad from "../../components/numpad";
import { _payNow, _getNumberPadValue, _goBackPay } from "../../lib/helpers/pay";

const PayBill = ({ query }) => {
  const [billAmount, setBillAmount] = useState("");

  let billAmountHanlder = (e) => {
    let temp = `${billAmount}${e}`;
    setBillAmount(temp);
  };

  let billBackspaceHandler = () => {
    let temp = billAmount.slice(0, -1);
    setBillAmount(temp);
  };

  const [amount, setAmount] = useState("");
  const [isPaying, setPaying] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  return (
    <div className="wrapper" style={{ backgroundColor: "#fff" }}>
      <div className="container m-0 p-0">
        <div className="py-0 m-0 pay-bill-main-cont">
          <div className="d-flex py-3 w-100 justify-content-between align-items-center payBillStatusBar">
            <div
              className="go-back"
              onClick={() => _goBackPay(query.mid, router)}
            >
              <i className="fas fa-chevron-left"></i>
            </div>
            {/* <div className="share-btn"><img src={Images.shareDark} alt="" />
                        </div> */}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3 px-1 pt-5">
            <div className="bill-amount-cont">
              <p className="bill-amt">
                <i className="fas fa-scroll"></i> &nbsp;Bill Amount
              </p>
              <div className="input-group pay-bill-Inp">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="pay-bill-input">
                    ₹
                  </span>
                </div>
                <input
                  type="text"
                  id="bilAmountInput"
                  className="form-control"
                  placeholder="Amount"
                  aria-label="Username"
                  aria-describedby="pay-bill-input"
                  value={amount}
                  disabled
                />
              </div>
              <p className="text-muted mb-0">Enter Amount on your bill</p>
            </div>
            <div className="pay-bill-img">
              <img className="img-fluid" src={Images.payBillIcon} alt="" />
            </div>
          </div>

          <div className="bold-hr-sep my-3"></div>

          <NumPad
            billAmountHanlder={(value) =>
              _getNumberPadValue(value, amount, setAmount)
            }
          />

          <div className="proceed-btn-cont">
            <button
              onClick={() =>
                _payNow(setPaying, setMessage, isPaying, amount, query)
              }
              disabled={amount > 0 ? false : true}
            >
              {isPaying ? "Paying..." : "Proceed to pay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PayBill.getInitialProps = async ({ query }) => {
  return { query };
};

export default PayBill;
