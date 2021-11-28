import { useState, useEffect } from "react";
import loaderAction from "../../lib/helpers/loader";
import { _getOrdeInfo } from "../../lib/helpers/payment";
import { _clearCart } from "../../lib/helpers/common";
import HeaderCMP from "../../components/common/header";
import { _getRedirecturl } from "../../lib/helpers/afterPayment";
import Images from "../../utils/ImageConst";
import { setCheckoutDataType, createOrder } from "../../lib/helpers/checkout";

const Index = ({ query }) => {
  const [orderInfo, setOrderInfo] = useState({});
  const [checkoutData, setCheckoutData] = useState({});
  const [comment, setComment] = useState("");
  const [orderItem, setOrderItem] = useState({});
  const [isGrocery, setIsGrocery] = useState(true);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const _getIntData = async () => {
    loaderAction(true);
    _getUrl();
    await _getOrdeInfo(query.refcode, setOrderInfo);
    loaderAction(false);
  };

  const _getUrl = async () => {
    let url = await _getRedirecturl();
    setRedirectUrl(url);
  };

  const push = () => {
    window.location.replace(redirectUrl);
    _clearCart();
  };

  const _payNow = (type) => {
    let data = orderItem;
    if (comment) {
      data = { ...data, comment };
    }
    data = { ...data, order_type: type };
    createOrder(data, isLoading, setIsLoading);
  };

  const _tryAgain = async () => {
    await setCheckoutDataType(
      setCheckoutData,
      setOrderItem,
      setIsGrocery,
      orderInfo.discount
    );
    setComment(orderInfo.comment);
    _payNow(orderInfo.order_type);
  };

  useEffect(() => {
    _getIntData();
  }, []);

  return (
    <div className="wrapper">
      <div className="container m-0 p-0">
        <HeaderCMP
          title={"Payment Failed"}
          subtitle={"Home"}
          onSubTitileClick={() => push()}
          dontShowBack={true}
          goBack={() => console.log("")}
        />

        <div className="page-wrapper px-20 pb-0">
          <div className="full-page-image">
            <img className="img-fluid" src={Images.failedImage} alt="" />
          </div>
          <p className="para-small mb-0 text-center">
            <b>
              <h3>Your payment failed do to technical difficulty</h3>
            </b>
          </p>
          <p className="para-small mb-0 text-center">
            Try again or pay in cash
          </p>

          <div className="btn-botton-fixed">
            <div className="d-flex w-100 justify-content-between align-items-center">
              <button onClick={() => _tryAgain()} className="btm-fxd-btn">
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Index.getInitialProps = async (ctx) => {
  const { asPath, query } = ctx;
  return { asPath, query };
};

export default Index;
