import { useState, useEffect, Fragment } from "react";
import loaderAction from "../../lib/helpers/loader";
import { _getOrdeInfo } from "../../lib/helpers/payment";
import { _clearCart } from "../../lib/helpers/common";
import {
  _createFeedBack,
  _getRedirecturl,
  getCountryCodePhone,
  _getStorePhone,
} from "../../lib/helpers/afterPayment";
import HelpCMP from "../../components/common/help";
import nextCookie from "next-cookies";
import SuccessCMP from "../../components/payment/success";
import PayCMP from "../../components/payment/pay";

import HeaderCMP from "../../components/common/header";

const Index = ({ query, amount, redirect }) => {
  const [orderInfo, setOrderInfo] = useState({});
  const [help, setHelp] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [oyetiPhone, setOyetiPhone] = useState("");
  const [storeInfo, setStoreInfo] = useState({});

  const _getIntData = async () => {
    loaderAction(true);
    _getUrl();
    if (!amount) {
      await _getOrdeInfo(query.refcode, setOrderInfo);
    }
    loaderAction(false);
    let response = await _getStorePhone(
      query.refcode,
      orderInfo.m_phone,
      amount
    );
    if (!amount) {
      setOyetiPhone(response);
    } else {
      setStoreInfo(response);
    }
  };

  const _getUrl = async () => {
    let url = await _getRedirecturl(orderInfo, query.refcode);
    setRedirectUrl(url);
  };

  const push = () => {
    if (redirect) {
      window.location.replace(redirect);
      return;
    }
    window.location.replace(redirectUrl);
  };

  useEffect(() => {
    _getIntData();
  }, []);

  useEffect(() => {
    _clearCart();
  }, []);

  return (
    <div className="wrapper">
      <HeaderCMP
        goBack={() => push()}
        // title={`Order #${
        //   !orderInfo.order_id ? query.refcode : orderInfo.order_id
        // }`}
        // subtitle={"Help"}
        // onSubTitileClick={() => setHelp(true)}
      />

      {amount ? (
        <PayCMP
          refcode={query.refcode}
          amount={amount}
          storeInfo={storeInfo}
          goback={() => push()}
        />
      ) : (
        <SuccessCMP
          createFeedBack={(starIndex) =>
            _createFeedBack(starIndex, query.refcode, orderInfo)
          }
        />
      )}

      {help ? (
        <HelpCMP
          oyetiPhone={oyetiPhone}
          storePhone={getCountryCodePhone(orderInfo.m_phone)}
          onClose={() => setHelp(false)}
        />
      ) : null}
    </div>
  );
};

Index.getInitialProps = async (ctx) => {
  const { asPath, query } = ctx;
  const { amount, redirect } = nextCookie(ctx);
  return { asPath, query, amount, redirect };
};

export default Index;
