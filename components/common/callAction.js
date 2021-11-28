import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getCountryCodePhone,
  _getStorePhone,
} from "../../lib/helpers/afterPayment";
import ImageConst from "../../utils/ImageConst";

const Index = ({ orderInfo, isGrocery }) => {
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  let [oyetiPhone, setOyetiPhone] = useState("");
  const _getIntData = async () => {
    if (isGrocery && orderInfo.payment && orderInfo.payment.refcode) {
      let response = await _getStorePhone(
        orderInfo.payment.refcode,
        orderInfo.m_phone
      );
      setOyetiPhone(response);
    }

    if (!isGrocery && orderInfo.refcode) {
      let response = await _getStorePhone(orderInfo.refcode, orderInfo.m_phone);
      setOyetiPhone(response);
    }
  };

  useEffect(() => {
    _getIntData();
  }, []);

  let storePhone = "";

  if (isGrocery && orderInfo && orderInfo.merchant) {
    storePhone = getCountryCodePhone(orderInfo.merchant.phone);
  }

  if (!isGrocery && orderInfo) {
    storePhone = getCountryCodePhone(orderInfo.m_phone);
  }

  return (
    <div className="bill-details-container">
      <div
        className="bill-details-inner"
        style={{
          textAlign: "-webkit-right",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        {/* <div className={`call-action-placeholder-content`}>
          <div className={`profile-icon`}>
            <img src={ImageConst.call2Icon} />{" "}
          </div>
          <a
            className={`profile-placeholder-text`}
            target="_blank"
            href={`tel:${oyetiPhone}`}
          >
            Call Oyeti
          </a>

          <div className={`call-action-placeholder-arrow`}>
            <img
              className={`profile-image`}
              src={ImageConst.rightArrowImage}
              src={ImageConst.rightArrowImage}
            />
          </div>
        </div> */}

        <div
          className={`call-action-border ${dark && "call-action-border-dark"}`}
          style={{ marginBottom: "-20px" }}
        >
          <div
            className={`call-action-placeholder-content ${
              dark && "call-action-placeholder-content-dark"
            }`}
          >
            <a href={`tel:${storePhone}`} className={`profile-icon`}>
              {dark ? (
                <img src={ImageConst.callDark} alt="" />
              ) : (
                <img src={ImageConst.call} alt="" />
              )}
            </a>
            {/* <a
            className={`profile-placeholder-text`}
            target="_blank"
            href={`tel:${storePhone}`}
          >
            Call Store
          </a> */}

            {/* <div className={`call-action-placeholder-arrow`}>
            <img
              className={`profile-image`}
              src={ImageConst.rightArrowImage}
              src={ImageConst.rightArrowImage}
            />
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
