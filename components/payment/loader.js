import Images from "../../utils/ImageConst";
import HeaderCMP from "../common/header";
import { useState, useEffect, Fragment } from "react";
import loaderAction from "../../lib/helpers/loader";
import { _getOrdeInfo, _upiPaymentProcess } from "../../lib/helpers/payment";
import { createUrl, getLocalPayType } from "../../lib/helpers/upiPay";

const Loader = ({ query, amount }) => {
  const [width, setWidth] = useState(0);
  const [timerData, setTimerData] = useState("");

  const [orderInfo, setOrderInfo] = useState({});

  const _getIntData = async () => {
    try {
      if (amount) {
        _customPay(amount);
      } else {
        loaderAction(true);
        let response = await _getOrdeInfo(
          query.refcode,
          setOrderInfo,
          _customPay
        );
        loaderAction(false);
        _customPay(response.amount);
      }

      initScoket();
      countdownTimer();
    } catch (error) {
      console.log(error);
    }
  };

  const initScoket = () => {
    let object = {
      refcode: query.refcode,
      setWidth: setWidth,
    };
    _upiPaymentProcess(object);
  };

  const _customPay = (amount) => {
    console.log(amount);
    let type = getLocalPayType();
    if (type) {
      amount = parseFloat(amount).toFixed(2);
      let url = createUrl(type, amount, query.refcode);
      window.location = url;
    }
  };

  const countdownTimer = () => {
    let duration = 120 * 1;
    let widthTimer = 0;
    let timer = duration,
      minutes,
      seconds;
    if (timer > 0) {
      let interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        widthTimer = widthTimer + 0.833;

        if (--timer < 0) {
          timer = 0;
          clearInterval(interval);
        }
        let textContent = minutes + ":" + seconds;
        setTimerData(textContent);
        if (widthTimer > 100) {
          widthTimer = 100;
        }
        setWidth(widthTimer);
      }, 1000);
    }
  };

  useEffect(() => {
    _getIntData();
  }, []);

  return (
    <div className="wrapper">
      <div className="container m-0 p-0">
        <HeaderCMP
          title={"Payment Status"}
          subtitle={""}
          dontShowBack={true}
          goBack={() => console.log("")}
        />
        <div className="page-wrapper px-20 pb-0">
          <div className="full-page-image">
            <img className="img-fluid" src={Images.payImage} alt="" />
          </div>

          <Fragment>
            <p className="para-small mb-0 text-center">
              <b>
                <h3>Please Switch to your bank mobile application now.</h3>
              </b>
            </p>
            <p className="para-small mb-0 text-center">
              {" "}
              You need to enter PIN in your bank application to complete the
              transaction.
            </p>
          </Fragment>

          <div className="btn-botton-fixed shadow-none px-4">
            <div className="progress-line-pas">
              <div
                className="pas-prog-active"
                style={{ width: width + "%" }}
              ></div>
            </div>
            <Fragment>
              <p className="mb-0 mt-2 text-center">
                <b>{timerData}</b>
              </p>
              <p className="para-small mb-0 text-center">
                {" "}
                For security reasons, this page will expire in 2 minutes
              </p>
            </Fragment>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
