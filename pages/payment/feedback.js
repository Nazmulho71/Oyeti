import Router from "next/router";
import { useState, useEffect } from "react";
import loaderAction from "../../lib/helpers/loader";
import { _getOrdeInfo } from "../../lib/helpers/payment";

const Index = ({ query }) => {
  const [orderInfo, setOrderInfo] = useState({});
  const _getIntData = async () => {
    loaderAction(true);
    await _getOrdeInfo(query.refcode, setOrderInfo);
    loaderAction(false);
  };

  useEffect(() => {
    _getIntData();
  }, []);

  return (
    <div className="wrapper">
      <div className="container m-0 p-0">
        <div className="status-bar-cont">
          <div className="d-flex status-bar-inner">
            <div className="status-name" onClick={() => console.log("")}>
              <button>
                <i className="fas fa-chevron-left"></i>
              </button>
              <p className="mb-0">Bill</p>
            </div>
            <div className="status-btn">
              <button>Call Waiter</button>
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
