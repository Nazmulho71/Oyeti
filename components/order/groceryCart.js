import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addUpdateCart } from "../../store/actions/cart";
import loaderAction from "../../lib/helpers/loader";
import { amountFix } from "../../lib/helpers/commonHelper";
import { addProductToCart, _getCartsFun } from "../../lib/helpers/menu";
import {
  _getAllProductsList,
  _getLocalCategory,
  getGroceryProductsGroupByCategory,
} from "../../lib/helpers/common";
import Images from "../../utils/ImageConst";
import { currency } from "../../lib/enums";

const Index = ({ carts, setCarts, onItemRemoved, onChangeData, query }) => {
  const [productsbyCategory, setProductsbyCategory] = useState([]);
  const [localCategories, setLocalCategories] = useState([]);
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  const _addItemToCart = async (cart, qty) => {
    loaderAction(true);
    let data = { ...cart, added_quantity: qty };
    let goback = true;
    await addProductToCart(data);
    addUpdateCart(carts, setCarts, data, goback);
    await _getCartsFun(setCarts);
    onChangeData();
    loaderAction(false);
  };

  useEffect(() => {
    _getLocalCategory().then((categories) => {
      setLocalCategories(categories);
    });
  }, []);

  useEffect(() => {
    if (localCategories.length > 0) {
      getGroceryProductsGroupByCategory(
        localCategories,
        carts,
        setProductsbyCategory
      );
    }
  }, [carts, localCategories]);

  const unlistedProd = () => {
    if (typeof window !== "undefined") {
      let name = localStorage.getItem("Unlisted Product");
      return name?.replace(/[^\w.,\s]/g, "");
    }
  };

  const unlistedQty = () => {
    if (typeof window !== "undefined") {
      let name = localStorage.getItem("Unlisted Product Quantity");
      return name?.replace(/[^\w.,\s]/g, "");
    }
  };

  const unlistedUnit = () => {
    if (typeof window !== "undefined") {
      let name = localStorage.getItem("Unlisted Product Unit");
      return name?.replace(/[^\w.,\s]/g, "");
    }
  };

  return (
    <div className="cart-list-containr py-0">
      <div>
        {productsbyCategory.map((category, index) => (
          <div
            className={`category--cart--container ${
              dark && "category--cart--container-dark"
            }`}
            key={index}
          >
            <div
              className={`category--header-border ${
                dark && "category--header-border-dark"
              }`}
            >
              <div
                className={`category--header ${
                  dark && "category--header-dark"
                }`}
              >
                <div className="category--title">
                  <p>{category.name}</p>
                </div>
                <div className="category--cart-count">
                  <p>{category.products.length}</p>
                </div>
              </div>
            </div>

            <div className="category--items-container">
              {category.products.map((product, pIndex) => (
                <div className="category--item-wrapper" key={pIndex}>
                  {/* <div
                    className="img-container"
                    style={{ marginRight: "-20px" }}
                  >
                    <img
                      src={product.image_url}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = Images.food;
                      }}
                      alt=""
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "4px",
                      }}
                    />
                  </div> */}

                  <div
                    className={`cart-add-btn-border ${
                      dark && "cart-add-btn-border-dark"
                    }`}
                    style={{
                      transform: "rotate(-90deg)",
                      marginRight: "-20px",
                      marginLeft: "-20px",
                    }}
                  >
                    <button
                      className={`cart-add-btn ${dark && "cart-add-btn-dark"}`}
                      style={{
                        position: "relative !important",
                        border: "none",
                      }}
                    >
                      {/* {filterProduct.added_quantity && ( */}
                      <div
                        className={`cart-add-btn-mod-active ${
                          dark && "cart-add-btn-mod-active-dark"
                        }`}
                      >
                        <i
                          style={{
                            fontSize: "10px",
                            transform: "rotate(90deg)",
                            color: dark ? "#fff" : "#404B69",
                          }}
                          className="fas fa-minus"
                          onClick={() =>
                            product.is_custome
                              ? router.push("/product-detail/" + product.id)
                              : _addItemToCart(
                                  product,
                                  product.added_quantity - 1
                                )
                          }
                        ></i>
                        {/* {filterProduct.added_quantity} */}
                        <div
                          className={`cart-span-border ${
                            dark && "cart-span-border-dark"
                          }`}
                        >
                          <span
                            style={{
                              display: "block",
                              fontSize: "13px",
                              transform: "rotate(90deg)",
                              padding: "2px 7px",
                            }}
                          >
                            {product.added_quantity}
                          </span>
                        </div>
                        <i
                          style={{
                            fontSize: "10px",
                            transform: "rotate(90deg)",
                            color: dark ? "#fff" : "#404B69",
                          }}
                          className="fas fa-plus"
                          onClick={() =>
                            product.is_custome
                              ? router.push("/product-detail/" + product.id)
                              : _addItemToCart(
                                  product,
                                  product.added_quantity + 1
                                )
                          }
                        ></i>
                      </div>
                    </button>
                  </div>

                  <div className="category--item-right--left">
                    <div className="category--item--title">
                      <p>{product.name}</p>
                    </div>
                    <div className="category--item--quantity">
                      {`${product.added_quantity} ${
                        product.added_quantity > 1 ? "pieces" : "piece"
                      }`}
                      <div
                        className={`pagination-dot-active ${
                          dark && "pagination-dot-dark-active"
                        }`}
                      ></div>
                      {currency}
                      {product.price}
                    </div>
                    {/* <div className="category--item--price">
                      {currency}
                      {product.price} / unit
                    </div> */}
                  </div>

                  {/* <div className="category--item--right"> */}

                  <div className="category--item--right-right">
                    <div className="category--item--total-price">
                      <p style={{ color: dark ? "white" : "#404b69" }}>
                        {currency}
                        {amountFix(product.price * product.added_quantity)}
                      </p>
                    </div>
                  </div>
                  {/* </div> */}
                  <div></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {typeof window !== "undefined" &&
      localStorage.getItem("Unlisted Product") !== null ? (
        <div>
          <div className={`cart-title ms-0 ${dark && "cart-title-dark"}`}>
            <h3>Unlisted Products</h3>
          </div>

          <div
            className={`unlisted-cart-prod ${
              dark && "unlisted-cart-prod-dark"
            }`}
          >
            <p>{unlistedProd()}</p>
            <p style={{ color: dark ? "#E0E5EC" : "#404b69" }}>
              {unlistedQty() + " " + unlistedUnit()}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Index;
