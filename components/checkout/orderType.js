import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { _getOrderType } from "../../lib/helpers/login";

const Index = ({ onSetOrderType, orderType, orderTypes }) => {
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  return (
    <div className="select-order-type-cont">
      {/* <p className="sot-heading">Select Order Type</p> */}
      <div className="select-order-type-item-flexbox">
        {orderTypes.map((type, index) => {
          let typeData = _getOrderType(type);
          if (orderType === type && typeof window !== "undefined")
            localStorage.setItem("typeLabel", JSON.stringify(typeData.lable));

          return (
            <div
              key={index}
              className={`d-flex flex-column align-items-center sot-cont ${
                dark && "sot-cont-dark"
              }`}
            >
              <div
                className={`sot-item-border ${dark && "sot-item-border-dark"}`}
              >
                <div
                  key={index}
                  onClick={() => onSetOrderType(type)}
                  className={`${
                    orderType === type ? "sot-item sot-item-active" : "sot-item"
                  } ${dark && "sot-item-dark"}`}
                >
                  <img
                    // className={`img-fluid ${dark && "img-fluid-dark"}`}
                    src={typeData.image}
                    alt=""
                  />
                </div>
              </div>
              <p>{typeData.lable}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
