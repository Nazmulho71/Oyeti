import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import { BaseStyles } from "../helperComponents/BaseStyles";
import ImageConst from "../../utils/ImageConst";

const Index = ({ query }) => {
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  const isHome = (query) => {
    if (query != "/orders") {
      return true;
    }
    return false;
  };

  return (
    <div
      className={`btn-botton-fixed ${dark && "btn-botton-fixed-dark"}`}
      style={{
        justifyContent: "space-around",
        display: "flex",
        height: "8%",
        background: dark ? "#2C2F33" : "#E0E5EC",
        boxShadow: dark
          ? "inset 0px 4px 4px rgba(0, 0, 0, 0.25)"
          : "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
        height: "75px",
      }}
    >
      <div onClick={() => Router.push("/")}>
        <div
          style={{
            ...BaseStyles.flex,
            ...BaseStyles.vertical_align,
            ...BaseStyles.center,
            color: isHome(query) ? `rgb(254, 52, 110)` : "#6F7A97",
            fontWeight: "normal",
            fontSize: "12px",
            fontStyle: "italic",
          }}
        >
          <img
            src={isHome(query) ? ImageConst.oyetiQSR : ImageConst.oyetiQSRWhite}
            alt=""
          />
          Home
          <i class="fas fa-circle" style={{ fontSize: "6px" }}></i>
        </div>
      </div>
      <div onClick={() => Router.push("/orders")}>
        <div
          style={{
            ...BaseStyles.flex,
            ...BaseStyles.vertical_align,
            ...BaseStyles.center,
            color: !isHome(query) ? `rgb(254, 52, 110)` : "#6F7A97",
            fontWeight: "normal",
            fontSize: "12px",
            fontStyle: "italic",
          }}
        >
          <img
            src={
              isHome(query) ? ImageConst.orderIcon : ImageConst.orderIconColor
            }
            alt=""
          />
          Orders
          <i class="fas fa-circle" style={{ fontSize: "6px" }}></i>
        </div>
      </div>
    </div>
  );
};

export default Index;
