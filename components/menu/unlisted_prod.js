import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Fragment } from "react/cjs/react.production.min";
import { withProductCartData, addProductToCart } from "../../lib/helpers/menu";
import { getMid } from "../../lib/helpers/common";
import { addUpdateCart } from "../../store/actions/cart";

const Index = ({
  onClose,
  setUnlistedModal,
  handleSubmit,
  name,
  setName,
  unit,
  setUnit,
  unitQty,
  setUnitQty,
}) => {
  const [isExpand, setIsExpand] = useState(false);
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  let units = ["kg", "pieces", "packet", "liter", "gram", "ml"];

  return (
    <div className={`search-cont ${dark && "search-cont-dark"}`}>
      <div
        className={`d-flex justify-start py-3 px-3 search-container active-search-container ${
          dark && " active-search-container-dark"
        }`}
      >
        <div className="input-group-prepend">
          <span
            className="input-group-text d-flex align-items-center justify-content-between"
            id="basic-addon1"
            style={{
              height: "44px",
              background: "transparent",
              border: "none",
              paddingTop: 20,
            }}
          >
            <button
              onClick={() => onClose()}
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
          </span>
        </div>

        <div
          className={`active-search-title mt-4 ${
            dark && " active-search-title-dark"
          }`}
        >
          <h1 style={{ fontWeight: 600, fontSize: "18px" }}>
            Unlisted Product
          </h1>
          <p
            style={{
              fontWeight: "normal",
              fontSize: "12px",
              whiteSpace: "normal",
            }}
          >
            Enter quantity and add to cart, the store will update avaliablity
            and price...
          </p>
        </div>

        <div className="mb-0 mt-3" style={{ flex: 1 }}>
          <div
            className={`search-area-border ${
              dark && "search-area-border-dark"
            }`}
          >
            <div
              className={`input-group search-inp active-search ${
                dark && "active-search-dark"
              }`}
            >
              <input
                type="text"
                id="searchInputText"
                className="form-control"
                placeholder="Enter product name"
                aria-label="Username"
                required
                autoFocus
                aria-describedby="basic-addon1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="d-flex mt-4">
          <div className="d-flex">
            <div
              className="d-flex align-items-center"
              style={{ height: "fit-content" }}
            >
              <p
                className="mb-0 me-3"
                style={{ color: dark ? "#D6E1EF" : "#6F7A97" }}
              >
                Quantity
              </p>

              <div
                className={`search-area-border w-100 me-3 ${
                  dark && "search-area-border-dark"
                }`}
              >
                <div
                  className={`input-group search-inp active-search ${
                    dark && "active-search-dark"
                  }`}
                >
                  <input
                    type="number"
                    id="searchInputText"
                    className="form-control text-center"
                    placeholder="Enter quantity"
                    maxLength="3"
                    aria-label="Username"
                    required
                    aria-describedby="basic-addon1"
                    value={unitQty}
                    onChange={(e) => setUnitQty(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div
              className={`search-area-border unit-inp ${
                dark && "search-area-border-dark"
              } ${isExpand && "unit-inp-expanded"}`}
              style={{ width: "150px" }}
              onClick={() => setIsExpand(!isExpand)}
            >
              <div
                className={`input-group search-inp active-search py-3 align-items-center justify-content-between unit-inp flex-column ${
                  dark && "active-search-dark"
                } ${isExpand && "unit-inp-expanded"}`}
              >
                {!isExpand && (
                  <p className="m-0">
                    {unit}{" "}
                    <i className={`fas fa-chevron-down ms-2 font-12`}></i>
                  </p>
                )}

                {units.map((unit, i) => {
                  if (isExpand) {
                    return (
                      <Fragment key={i}>
                        <p className="m-0" onClick={() => setUnit(unit)}>
                          {unit}
                        </p>

                        <div
                          className={`unit-line ${dark && "unit-line-dark"}`}
                        ></div>
                      </Fragment>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 
        {isExpand && (
          <div
            className={`search-area-border unit-inp mt-1 ${
              dark && "search-area-border-dark"
            }`}
            style={{ width: "25%", float: "right" }}
          >
            <div
              className={`input-group search-inp active-search unit-inp justify-content-center ${
                dark && "active-search-dark"
              }`}
            >
              <p className="m-0">pieces</p>
            </div>
          </div>
        )} */}

        {/* <p
          className="text-right mt-2"
          style={{
            fontWeight: 200,
            fontSize: "12px",
          }}
        >
          Example: 10kg or 5 liter or 3 packets
        </p> */}

        <div className={`btn-botton-fixed ${dark && "btn-botton-fixed-dark"}`}>
          <div
            className={`btm-fxd-btn-border ${
              dark && "btm-fxd-btn-border-dark"
            }`}
          >
            <div className="d-flex w-100 justify-content-between align-items-center">
              <button
                className={`btm-fxd-btn ${dark && "btm-fxd-btn-dark"}`}
                onClick={() => {
                  setUnlistedModal(true);
                  handleSubmit();
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
