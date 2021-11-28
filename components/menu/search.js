import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Images from "../../utils/ImageConst";
import SearchGrocery from "./search_grocery";

const Index = ({
  onChangeText,
  filters,
  isSearch,
  onBack,
  isGrocery,
  showMic = false,
  showCartIcon = false,
  onClearText = () => {},
  setIsCartPreviewModalOpen,
  carts,
  setCarts,
  products,
  _products,
  getProducts,
  meta = {},
  onAction,
  onReapeat,
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(isSearch);
  const [searchText, setSearchText] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  const _localClear = () => {
    if (searchText) {
      setSearchText("");
      onClearText();
      setSearchText("");
      onChangeText("");
    }
    // setIsSearchExpanded(false)
  };

  return (
    <div className="d-flex justify-content-center align-items-start py-3 px-3 search-container">
      <div className="mb-0 pt-0" style={{ flex: 0, marginRight: "10px" }}>
        <div className="input-group search-inp" style={{ height: "40px" }}>
          <div className="input-group-prepend">
            {/* <span
              className="input-group-text"
              id="basic-addon1"
              onClick={() => onBack()}
              style={{ background: "none", height: "44px" }}
            >
              <button
                className={`back-btn ${dark && "back-btn-dark"}`}
                style={{ background: "none" }}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <img src={ImageConst.searchBACK} />
            </span> */}
            <button
              style={{
                background: "none",
              }}
              onClick={() => onBack()}
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
          </div>
        </div>
      </div>

      {!isSearchExpanded && (
        <div className="pt-2" style={{ flex: 1 }}>
          {filters.map((filter, index) => (
            // <button
            //   key={index}
            //   className="categories-menu"
            //   style={{ padding: "6px 15px", whiteSpace: "nowrap", color:'white' }}
            //   onClick={filter.onAction}
            // >
            //   {filter.label}
            // </button>
            <div
              key={index}
              class={`categories-menu ${dark && "categories-menu-dark"}`}
              style={{
                //   right: "23%",
                bottom: `${carts.length === 0 ? "40px" : "90px"}`,
              }}
            >
              <h3
                // style={{ padding: "10px 25px 10px 25px" }}
                onClick={filter.onAction}
              >
                Browse menu
                {/* <img style={{ margin: "0 20px" }} src={Images.LineImg} alt="" /> */}
                {/* <span>Search</span> */}
              </h3>
            </div>
          ))}
        </div>
      )}

      {searchOpen ? (
        <div className="search-overlay log-modal-overlay">
          {_products(getProducts(products).slice(0, 5)).map((chunkProducts) =>
            chunkProducts.map((product, i) => (
              // {_products(getProducts(products)).map((chunkProducts) =>
              // chunkProducts.map((product, i) => (
              <SearchGrocery
                key={i}
                products={products}
                onClose={() => setSearchOpen(false)}
                searchText={searchText}
                setSearchText={setSearchText}
                onChangeText={onChangeText}
                _products={_products}
                getProducts={getProducts}
                meta={meta}
                onAction={onAction}
                carts={carts}
                setCarts={setCarts}
                onReapeat={onReapeat}
                product={product}
              />
              // ))
              // )}
            ))
          )}
        </div>
      ) : null}

      {isSearchExpanded ? (
        <div className="mb-0" style={{ flex: 1 }}>
          <div
            className={`search-area-border ${
              dark && "search-area-border-dark"
            }`}
          >
            <div
              className={`input-group search-inp active-search ${
                dark && "active-search-dark"
              }`}
              style={{ height: "46px" }}
            >
              {/* {searchText ? (
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="basic-addon1"
                    onClick={() => _localClear()}
                  >
                    <img className="img-fluid"
                                        src={Images.goBack_alt} alt="" />
                    <button>
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                </div>
              ) : null} */}
              <input
                type="text"
                id="searchInputText"
                onChange={(e) => {
                  setSearchText(e.target.value);
                  onChangeText(e.target.value);
                }}
                value={searchText}
                className="form-control"
                placeholder="What would you like to have?"
                aria-label="Username"
                autoFocus
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`srch-mic d-flex justify-content-center align-items-center ${
            dark && "srch-mic-dark"
          }`}
          // onClick={() => setIsSearchExpanded(true)}
          role="button"
        >
          {/* <div className="p-0 m-0">
            <img
              className="img-fluid"
              style={{ verticalAlign: "middle" }}
              src={Images.search}
              alt=""
            />
          </div> */}
          <button
            onClick={() => setSearchOpen(true)}
            style={{
              background: "none",
            }}
          >
            <i
              className={`fas fa-search back-icon ${dark && "back-icon-dark"}`}
            ></i>
          </button>
        </div>
      )}

      {showMic && (
        <div
          className={`srch-mic d-flex justify-content-center align-items-center pt-0 ${
            dark && "srch-mic-dark"
          }`}
        >
          <div className="p-0 m-0">
            <img className="img-fluid" src={Images.mic} alt="" />
          </div>
        </div>
      )}

      {/* {showCartIcon && (
        <div
          className={`srch-mic d-flex justify-content-center align-items-center pt-0 ${
            dark && "srch-mic-dark"
          }`}
          role="button"
          onClick={() => {
            setIsCartPreviewModalOpen(true);
          }}
        >
          <div className="p-0 m-0">
            <img
              className="img-fluid"
              src="/assets/icons/cart.svg"
              alt=""
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Index;
