import { useEffect, useState } from "react";
import Router from "next/router";
import { _searchProducts } from "../../lib/helpers/commonHelper";
import { BaseStyles } from "../helperComponents/BaseStyles";
import { storeFlowTypes } from "../../lib/enums";
import ImageConst from "../../utils/ImageConst";
import { useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";

const Index = ({ onClose, products, title, onProductClick }) => {
  const [searchText, setSearchText] = useState("");
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  let [filterProducts, setFilterProducts] = useState([]);

  const onChangeText = (text) => {
    if (text) {
      _searchProducts(text, setFilterProducts, products);
    } else {
      setFilterProducts([]);
    }
  };

  if (filterProducts.length > 5) {
    filterProducts = filterProducts.slice(0, 5);
  }

  useEffect(() => {
    setFilterProducts(products);
  }, []);

  return (
    // <div>
    //   <div
    //     className="d-flex justify-start py-3 px-3 search-container"
    //     style={{
    //       display: "block",
    //       height: "12%",
    //       marginTop: "-15%",
    //     }}
    //   >
    //     <div className="mb-0" style={{ flex: 1 }}>
    //       <div
    //         className={`search-area-border ${
    //           dark && "search-area-border-dark"
    //         }`}
    //       >
    //         <div
    //           className={`input-group search-inp active-search ${
    //             dark && "active-search-dark"
    //           }`}
    //         >
    //           <input
    //             type="text"
    //             id="searchInputText"
    //             onChange={(e) => {
    //               setSearchText(e.target.value);
    //               onChangeText(e.target.value);
    //             }}
    //             value={searchText}
    //             className="form-control"
    //             placeholder="Search store"
    //             aria-label="Username"
    //             autoFocus
    //             aria-describedby="basic-addon1"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div
    //     className="d-flex justify-start py-3 "
    //     style={{ display: "block", height: "auto", backgroundColor: "#f8f6f2" }}
    //   >
    //     <div className="mb-0 pt-3" style={{ flex: 1 }}>
    //       <div
    //         className="input-group px-3"
    //         style={{
    //           height: "60px",
    //           borderRadius: "0px",
    //           alignItems: "center",
    //         }}
    //       >
    //         <h3>
    //           <b>
    //             {filterProducts.length} {title}
    //           </b>
    //         </h3>
    //       </div>

    //       {filterProducts.map((product, index) => {
    //         return (
    //           <div
    //             index={index}
    //             key={index}
    //             onClick={() =>
    //               onProductClick(
    //                 product.mid,
    //                 product.flow_type == storeFlowTypes.GrocerySearch
    //               )
    //             }
    //             className="px-3 input-group"
    //             style={{
    //               borderRadius: "0px",
    //               alignItems: "center",
    //               background: "#ffff",
    //               height: 56,
    //               ...BaseStyles.flex,
    //               alignItems: "center",
    //               ...BaseStyles.m_b_m,
    //             }}
    //           >
    //             <p style={{ ...BaseStyles.noMargin }}>
    //               <b>{product.name}</b>
    //             </p>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>

    //   <button
    //     className="btn-botton-fixed"
    //     style={{
    //       bottom: "5%",
    //       padding: "0px",
    //       width: "130px",
    //       height: "30px",
    //       borderRadius: 14,
    //       textAlign: "center",
    //       border: "solid",
    //       borderWidth: "thin",
    //       boxShadow: "none",
    //     }}
    //     onClick={() => onClose()}
    //   >
    //     Close
    //   </button>
    // </div>

    <div
      className={`search-cont ${dark && "search-cont-dark"}`}
      style={{ marginTop: "-30%" }}
    >
      <div
        className={`d-flex justify-start py-3 px-3 search-container active-search-container ${
          dark && " active-search-container-dark"
        }`}
      >
        {/* <div
          className={`active-search-title ${
            dark && " active-search-title-dark"
          }`}
        >
          <h1>Search stores</h1>
        </div> */}

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
            >
              <input
                type="text"
                id="searchInputText"
                onChange={(e) => {
                  setSearchText(e.target.value);
                  onChangeText(e.target.value);
                }}
                value={searchText}
                className="form-control"
                placeholder="What are you looking for?"
                aria-label="Username"
                autoFocus
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`d-flex justify-start py-3 search-container active-product ${
          dark && "active-product-dark"
        }`}
        style={{ display: "block", height: "auto" }}
      >
        <div className="mb-0" style={{ flex: 1 }}>
          <div
            className="input-group px-3"
            style={{
              height: "40px",
              borderRadius: "0px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <h3 className={`results-title ${dark && " results-title-dark"}`}>
                <b>{filterProducts.length} results</b>
              </h3>
            </div>
          </div>

          {filterProducts.map((product, index) => {
            const str = product.merchant_name;
            const matches = str.match(/\b(\w)/g);
            const acronym = matches.join("");

            return (
              // <div className="all-search-products">
              //   <div
              //     index={index}
              //     key={index}
              //     onClick={() =>
              //       onProductClick(
              //         product.mid,
              //         product.flow_type == storeFlowTypes.GrocerySearch
              //       )
              //     }
              //     className={`px-3 input-group search-products ${
              //       dark && "search-products-dark"
              //     }`}
              //     style={{
              //       alignItems: "center",
              //       height: "100%",
              //       ...BaseStyles.flex,
              //       ...BaseStyles.m_b_m,
              //     }}
              //   >
              //     <p style={{ ...BaseStyles.noMargin, maxWidth: "250px" }}>
              //       <b>{product.name}</b>
              //     </p>
              //   </div>
              // </div>

              <div
                className="shop-list-container"
                index={index}
                key={index}
                onClick={() =>
                  onProductClick(
                    product.mid,
                    product.flow_type == storeFlowTypes.GrocerySearch
                  )
                }
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 58.8%, rgba(0, 0, 0, 0.8) 67.13%, rgba(0, 0, 0, 0.8) 100%), url(${
                    product.store_image ? product.store_image : null
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
                    product.store_image && "shop-list-address-img"
                  }`}
                >
                  {product.store_image ? null : (
                    <div className="shop-first-char">{acronym}</div>
                  )}
                  <div className="shop-list-name">{product.merchant_name}</div>
                  {/* <div className="shop-list-text-small">
                    {product.address_line_1}
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
                      {product.distance} KM
                    </div>
                    <div>
                      <img
                        className="shop-list-icon"
                        src={ImageConst.clockIcon}
                        alt="clockImg"
                      ></img>
                    </div>
                    <div className="shop-list-text-smaller">
                      {product.start_time} - {product.end_time}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CloseIcon
        className={`btn-botton-fixed ${dark && "btn-botton-fixed-dark"}`}
        style={{
          bottom: "5%",
          padding: "0px",
          width: "70px",
          height: "70px",
          borderRadius: "16px",
          ...BaseStyles.flex,
          ...BaseStyles.center,
        }}
        onClick={() => onClose()}
      />
    </div>
  );
};

export default Index;
