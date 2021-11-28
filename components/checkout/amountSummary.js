import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { OrderTypeEnums } from "../../lib/enums";

const Index = ({ checkoutData, cartPrice }) => {
  if (!checkoutData.final) {
    return <div></div>;
  }
  let brakdown = checkoutData.brakdown;

  const getOrderTypeLocal = () => {
    return localStorage.getItem("type");
  };
  let orderType = getOrderTypeLocal();

  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  const orderTypeString = (type) => {
    if (type == OrderTypeEnums.DineIn) {
      return "Dine In";
    }

    if (type == OrderTypeEnums.Home) {
      return "Home";
    }

    if (type == OrderTypeEnums.Pickup) {
      return "Pickup";
    }

    if (type == OrderTypeEnums.SelfPickup) {
      return "Call Waiter";
    }
  };

  return (
    <div className="bill-details-container">
      {orderTypeString(orderType) === "Dine In" ? null : (
        <div className="bill-details-inner">
          <p
            className={`heading-bold-small ${
              dark && "heading-bold-small-dark"
            }`}
          >
            Bill Details
          </p>
          <div
            className={`bill-amount-details-cont ${
              dark && "bill-amount-details-cont-dark"
            }`}
          >
            {brakdown.map((item, index) => {
              console.log("item", item);

              return (
                <div
                  className={`bill-det-amt-item ${
                    dark && "bill-det-amt-item-dark"
                  }`}
                  key={index}
                >
                  <p>{item.title}</p>
                  <p>{item.label}</p>
                </div>
              );
            })}
          </div>
          <hr className={`bill-hr my-2 ${dark && "bill-hr-dark"}`} />
          <div
            className={`bill-details-total ${
              dark && "bill-details-total-dark"
            }`}
          >
            <p>{checkoutData.final.title}</p>
            <p>{checkoutData.final.label}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
