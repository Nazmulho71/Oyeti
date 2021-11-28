import { useState, useEffect } from "react";
import Router from "next/router";
import loaderAction from "../../lib/helpers/loader";
import { isGroceryFun } from "../../lib/helpers/common";
import { _getOrdeInfo } from "../../lib/helpers/payment";
import CallWaiter from "../../components/common/callWaiter";
import Header from "../../components/common/header";
import QSROrderDetails from "../../components/order/qsrOrderDetails";
import GroceryOrderDetails from "../../components/order/groceryOrderDetails";
import { _getStoreDetails } from "../../lib/helpers/afterPayment";
import { _callWaiter } from "../../lib/helpers/home";

const Index = ({ query }) => {
  const [orderInfo, setOrderInfo] = useState({});
  const [isCallWaiter, setIsCallWaiter] = useState(false);
  const [isGrocery, setIsGrocery] = useState(true);
  const [storeDetails, setStoreDetails] = useState({});

  const _getIntData = async () => {
    loaderAction(true);
    await _getOrdeInfo(query.refcode, setOrderInfo);
    loaderAction(false);
    let type = isGroceryFun(orderInfo.flow);
    setIsGrocery(type);
  };

  const _payNow = () => {};

  const callWaiter = async () => {
    if (storeDetails.app_id) {
      _callWaiter(storeDetails.app_id, orderInfo.table_number, setIsCallWaiter);
    } else {
      loaderAction(true);
      let response = await _getStoreDetails(query.refcode);
      setStoreDetails(response);
      _callWaiter(response.app_id, orderInfo.table_number, setIsCallWaiter);
    }
  };

  useEffect(() => {
    _getIntData();
  }, []);

  const _pushBack = () => {
    if (query.feedback) {
      Router.push("/");
    } else {
      Router.back();
    }
  };

  return (
    <div className="wrapper">
      <div className="container m-0 p-0">
        <Header
          // title={"My Order"}
          // onSubTitileClick={() => callWaiter()}
          //  subtitle={'Call Waiter'}
          goBack={() => _pushBack()}
        />

        {isGrocery ? (
          <GroceryOrderDetails
            orderInfo={orderInfo}
            query={query}
            onPay={() => _payNow()}
          />
        ) : (
          <QSROrderDetails orderInfo={orderInfo} query={query} />
        )}
        {isCallWaiter ? (
          <CallWaiter onClose={() => setIsCallWaiter(false)} />
        ) : null}
      </div>
    </div>
  );
};

Index.getInitialProps = async (ctx) => {
  const { asPath, query } = ctx;
  return { asPath, query };
};
export default Index;
