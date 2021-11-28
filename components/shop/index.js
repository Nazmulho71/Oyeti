import Router from "next/router";
import Header from "../common/header";
import { _getStores, _getSearchStores } from "../../lib/helpers/home";
import styled from "styled-components";
import ImageConst from "../../utils/ImageConst";
import ErrorPopup from "../common/errorPopup";
import SearchCMP from "../common/search";
import AvatarCMP from "../../components/shop/avatar";
import { View } from "../helperComponents/RNmigrateHelpers";
import { BaseStyles } from "../helperComponents/BaseStyles";
import { useState, useEffect } from "react";
import { flowTypes, titleEnums, storeFlowTypes } from "../../lib/enums";
import { useSelector } from "react-redux";

import random from "random";

const colors = [
  "#1059FC",
  "#239549",
  "#3F3D9D",
  "#02023F",
  "#EB8213",
  "#225a27",
  "#3b697b",
  "#10375c",
  "#0A97B0",
];
const Avatar = ({ randomIndex, children }) => (
  <View
    style={{
      borderRadius: 10,
      padding: 4,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 21,
      fontWeight: 600,
      height: 60,
      width: 60,
      color: "white",
      background: "white",

      color: colors[randomIndex],

      marginRight: 8,
    }}
  >
    {children}
  </View>
);

const Index = ({ query, isShop }) => {
  const [stores, setStores] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isSearchEnable, setIsSearchEnable] = useState(false);
  const [error, setErrror] = useState("");
  const isLoading = useSelector((state) => state.isLoading);
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  // location
  const navigate = (mid, Grocery, name) => {
    if (query.type == titleEnums.Grocery || Grocery) {
      return Router.push("/menu/" + flowTypes.Grocery + "/" + mid);
    }
    return Router.push("/menu/" + flowTypes.QSR + "/" + mid);
  };

  const _getData = async () => {
    try {
      if (!isShop) {
        _getSearchStores(setStores, setErrror, query.type);
        return;
      }
      _getStores(setStores, setLoader, query.type);
    } catch (error) {}
  };

  useEffect(() => {
    _getData();
  }, []);

  // stores.map((store, i) => {
  //   console.log("store:- ", store);
  // });
  // console.log("stores: " + stores);
  // console.log("isShop: " + isShop);
  // console.log("query: " + query);

  useEffect(() => {
    const stickyText = document.getElementById("stickyText");

    const scrollStickyText = function () {
      var y = window.scrollY;
      if (y >= 100) {
        stickyText.className = "show";
      } else {
        stickyText.className = "hide";
      }
    };

    window.addEventListener("scroll", scrollStickyText);

    return () => window.removeEventListener("scroll", scrollStickyText);
  }, []);

  return (
    <div
      className="wrapper"
      style={{ height: "100vh", ...BaseStyles.bgWhite, marginTop: "15%" }}
    >
      {error ? (
        <ErrorPopup error={error} onClose={() => setErrror("")} />
      ) : null}
      <div className="container p-0" style={{ marginTop: "30%" }}>
        {isSearchEnable ? (
          <SearchCMP
            onProductClick={(mid, Grocery) =>
              navigate(mid, !isShop ? Grocery : null)
            }
            title={"Store"}
            products={stores}
            onClose={() => setIsSearchEnable(false)}
          />
        ) : null}

        {!isSearchEnable && (
          <>
            <Header
              title={"Shop " + query.type}
              onSubTitileClick={() => setIsSearchEnable(true)}
              subtitle={
                <i
                  className={`fas fa-search search-icon ${
                    dark && "search-icon-dark"
                  }`}
                  style={{
                    fontSize: "18px",
                    marginRight: "-10px",
                    marginLeft: "-10px",
                  }}
                ></i>
              }
              goBack={() => Router.back()}
            />

            {/* <div
              className={`status-btn-border ${
                dark && "status-btn-border-dark"
              }`}
            >
              <div className={`status-btn ${dark && "status-btn-dark"}`}>
                <button onClick={() => setIsSearchEnable(true)}>adfasdf</button>
              </div>
            </div> */}

            <div className={`shop-header ${dark && "shop-header-dark"}`}>
              <div>
                <h4 id="stickyText" className="hide">
                  Food and more
                </h4>
                <h4>Food and more</h4>
                {/* <p>Rajajinagar</p> */}
                {/* <p>{titleSub}</p> */}
              </div>

              <p style={{ fontWeight: 600 }}>{stores.length} Stores</p>
            </div>
          </>
        )}
        {!isLoading && stores.length == 0 ? (
          <div style={{ textAlign: "center" }}>
            {" "}
            <img src={ImageConst.noStore}></img>
          </div>
        ) : (
          !isSearchEnable &&
          stores.map((store, index) => {
            const str = store.merchant_name;
            const matches = str.match(/\b(\w)/g);
            const acronym = matches.join("");

            return (
              <div
                className="shop-list-container"
                key={index}
                onClick={() => {
                  navigate(
                    store.mid,
                    store.flow_type == storeFlowTypes.GrocerySearch,
                    store.name,
                    store.address_line_1
                  );
                  localStorage.setItem(
                    "Merchant Name",
                    JSON.stringify(store.merchant_name)
                  );
                }}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 58.8%, rgba(0, 0, 0, 0.8) 67.13%, rgba(0, 0, 0, 0.8) 100%), url(${
                    store.store_image ? store.store_image : null
                  })`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "160px",
                  border: `${dark ? "1px solid gold" : "1px solid whitesmoke"}`,
                  borderRadius: "12px",
                  boxShadow:
                    "4px 4px 15px rgba(2, 3, 3, 0.5), 4px 1px 15px rgba(232, 237, 243, 0.05), inset -16px -6px 80px rgba(248, 249, 249, 0.03)",
                }}
              >
                <div
                  className={`shop-list-address ${
                    store.store_image && "shop-list-address-img"
                  }`}
                >
                  {store.store_image ? null : (
                    <div className="shop-first-char">{acronym}</div>
                  )}
                  <div className="shop-list-name">{store.merchant_name}</div>
                  {/* <div className="shop-list-text-small">
                    {store.address_line_1}
                  </div> */}
                  <div className="shop-list-distance">
                    <div>
                      <img
                        className="shop-list-icon"
                        src={ImageConst.locationIcon}
                        alt="locationImg"
                      ></img>
                    </div>
                    <div className="shop-list-text-smaller">
                      {store.distance} KM
                    </div>
                    <div>
                      <img
                        className="shop-list-icon"
                        src={ImageConst.clockIcon}
                        alt="clockImg"
                      ></img>
                    </div>
                    <div className="shop-list-text-smaller">
                      {store.start_time} - {store.end_time}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Index;
