import Images from "../../utils/ImageConst";
import { useState, useEffect } from "react";
import Link from "next/link";
import { _getStores, _getSearchStores } from "../../lib/helpers/home";
import ImageConst from "../../utils/ImageConst";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { titleEnums } from "../../lib/enums";

const Index = ({
  onBack,
  displayKey,
  onSearchFocused,
  onChangeText,
  filters,
  isSearch,
  isGrocery,
  showMic = false,
  showCartIcon = false,
  onClearText = () => {},
  setIsCartPreviewModalOpen,
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(isSearch);
  const [searchText, setSearchText] = useState("");
  const [scrollY, setScrollY] = useState(false);

  const router = useRouter();
  // location
  const { name } = router.query;

  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  const _localClear = () => {
    if (searchText) {
      setSearchText("");
      onClearText();
    }
  };

  useEffect(() => {
    const hideSear = document.getElementById("search");

    const scrollHideSear = function () {
      var y = window.scrollY;
      if (y >= 100) {
        hideSear.style.height = "0";
        hideSear.style.opacity = "0";
        hideSear.style.transition = "0.3s";
      } else {
        hideSear.style.height = "auto";
        hideSear.style.opacity = "100";
        hideSear.style.transition = "0.3s";
      }
    };

    window.addEventListener("scroll", scrollHideSear);

    return () => window.removeEventListener("scroll", scrollHideSear);
  }, []);

  useEffect(() => {
    const smallTxt = document.getElementById("searchText");

    const scrollSmallTxt = function () {
      var y = window.scrollY;
      if (y >= 100) {
        smallTxt.style.fontSize = "12px";
        smallTxt.style.justifyContent = "center";
        smallTxt.style.marginTop = "-65px";
      } else {
        smallTxt.style.fontSize = "18px";
        smallTxt.style.justifyContent = "inherit";
        smallTxt.style.marginTop = "auto";
      }
    };

    window.addEventListener("scroll", scrollSmallTxt);

    return () => window.removeEventListener("scroll", scrollSmallTxt);
  }, []);

  useEffect(() => {
    const inp = document.getElementById("searchInputText");

    const scrollInp = function () {
      var y = window.scrollY;
      if (y >= 100) {
        inp.style.display = "none";
      } else {
        inp.style.display = "block";
      }
    };

    window.addEventListener("scroll", scrollInp);

    return () => window.removeEventListener("scroll", scrollInp);
  }, []);

  useEffect(() => {
    const scroll = function () {
      var y = window.scrollY;
      if (y >= 100) {
        setScrollY(true);
      } else {
        setScrollY(false);
      }
    };
    window.addEventListener("scroll", scroll);
  }, []);

  const orderTypeLabel = () => {
    if (typeof window !== "undefined") {
      let label = localStorage.getItem("typeLabel");
      return label?.replace(/[^\w.,\s]/g, "");
    }
  };

  const merchantName = () => {
    if (typeof window !== "undefined") {
      let label = localStorage.getItem("Merchant Name");
      return label?.replace(/[^\w.,\s]/g, "");
    }
  };

  return (
    <div
      className="justify-start py-3 px-3 search-container"
      style={{ display: displayKey ? "none" : "block" }}
    >
      <div className="mb-0 pt-0">
        <div className="input-group search-inp" style={{ height: "40px" }}>
          <div className="input-group-prepend">
            <span
              className="input-group-text"
              id="basic-addon1"
              onClick={() => onBack()}
              style={{ height: "44px" }}
            >
              <button
                style={{
                  background: "none",
                  marginBottom: "20px",
                }}
              >
                <div
                  className={`back-icon-bord ${dark && "back-icon-bord-dark"}`}
                >
                  <i
                    className={`fas fa-arrow-left back-icon ${
                      dark && "back-icon-dark"
                    }`}
                  ></i>
                </div>
              </button>
              {/* <img src={ImageConst.searchBACK}/> */}
            </span>
          </div>

          {scrollY ? (
            <div className="input-group-prepend">
              <span
                className="input-group-text"
                id="basic-addon1"
                // onClick={() => onBack()}
                onClick={onSearchFocused}
                style={{ height: "44px" }}
              >
                <button
                  style={{
                    background: "none",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    className={`back-icon-bord ${
                      dark && "back-icon-bord-dark"
                    }`}
                  >
                    <i
                      className={`fas fa-search back-icon ${
                        dark && "back-icon-dark"
                      }`}
                    ></i>
                  </div>
                </button>
              </span>
            </div>
          ) : (
            <div className="input-group-prepend">
              <span
                className="input-group-text"
                id="basic-addon1"
                style={{ height: "44px" }}
              >
                <button
                  style={{
                    background: "none",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    className={`back-icon-bord ${
                      dark && "back-icon-bord-dark"
                    }`}
                  >
                    <i
                      className={`fas fa-share back-icon ${
                        dark && "back-icon-dark"
                      }`}
                    ></i>
                  </div>
                </button>
              </span>
            </div>
          )}
        </div>

        <div className="shop-list-address-menu">
          <div
            id="searchText"
            className={`shop-list-name-menu ${
              dark && "shop-list-name-menu-dark"
            }`}
          >
            {/* {name} */}
            {merchantName()}
          </div>
          <div
            id="searchInputText"
            className={`shop-list-text-small-menu mt-1 ${
              dark && "shop-list-text-small-menu-dark"
            }`}
          >
            {orderTypeLabel()}
            {/* {location} */}
          </div>
        </div>

        <div className="mb-0 pt-0" id="search">
          <div
            className={`search-area-border ${
              dark && "search-area-border-dark"
            }`}
          >
            <div
              id="searchInputText"
              className={`input-group search-inp search-area ${
                dark && "search-area-dark"
              }`}
              style={{ width: "100%", height: "56px", borderRadius: "16px" }}
              onClick={onSearchFocused}
            >
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="basic-addon1"
                  onClick={() => (searchText ? _localClear() : console.log(""))}
                  style={{ background: "#f8f6f2", height: "44px" }}
                >
                  <button
                    style={{
                      background: "none",
                      marginBottom: "-5px",
                    }}
                  >
                    <i
                      className={`fas fa-search search-icon ${
                        dark && "search-icon-dark"
                      }`}
                      style={{
                        fontSize: "22px",
                        marginLeft: "20px",
                      }}
                    ></i>
                  </button>
                  {/* <button><i className={`fas  ${searchText ? 'fa-times' :'fa-search'}` }></i></button> */}
                  {/* <img src={ImageConst.search} /> */}
                </span>
              </div>

              <input
                type="text"
                id="searchInputText"
                style={{ background: "#f8f6f2", height: "44px" }}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  onChangeText(e.target.value);
                }}
                value={searchText}
                className="form-control"
                placeholder=""
                aria-label="Username"
                aria-describedby="basic-addon1"
                onFocus={onSearchFocused}
              />
              {/* {searchText ? <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1" onClick={() => _localClear()}>
                            <button><i className="fas fa-times"></i></button>
                        </span>
                    </div> : null } */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
