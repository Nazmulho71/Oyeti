import {
  getGroceryProductsGroupByCategory,
  _getLocalCategory,
} from "../../../lib/helpers/common";
import { useState, useEffect } from "react";
import Images from "../../../utils/ImageConst";
import DeleteIcon from "./DeleteIcon";
import { addProductToCart, _getCartsFun } from "../../../lib/helpers/menu";
import Link from "next/link";
import { _getCheckoutDataFunGroccery } from "../../../lib/helpers/checkout";
import { currency } from "../../../lib/enums";
import { addUpdateCart } from "../../../store/actions/cart";

const CartPreviewModal = ({
  setCarts,
  carts,
  isCartPreviewModalOpen,
  setIsCartPreviewModalOpen,
  dark
}) => {
  const [productsbyCategory, setProductsbyCategory] = useState([]);
  const [localCategories, setLocalCategories] = useState([]);
  const [checkoutData, setCheckoutData] = useState([]);

  const _addItemToCart = async (cart, qty) => {
    let data = { ...cart, added_quantity: qty };
    addUpdateCart(carts, setCarts, data);
    await addProductToCart(data);
    // await _getCartsFun(setCarts)
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
    async function _updateCheckoutData() {
      await _getCheckoutDataFunGroccery(
        setCheckoutData,
        () => {},
        () => {}
      );
    }
    _updateCheckoutData();
  }, [carts, localCategories]);

  let totalAmount = 0;

  if (checkoutData.brakdown) {
    totalAmount =
      checkoutData.brakdown.find((property) => property.charge_id === "total")
        .value ?? 0;
  }
  if (carts.length === 0) {
    return <h1>Nothing in cart</h1>;
  }
  return (
    <div
      style={{ display: isCartPreviewModalOpen ? "block" : "none" }}
      className="rep-modal-overlay"
    >
      <div className="rep-modal">
        <div className="rep-modal-inner px-0 py-0">
          <div
            className="rep-modal-header"
            style={{ padding: "25px 20px 0 20px" }}
          >
            <div className="rep-modal-title full-width">
              <div className="d-flex">
                <p className="flex-occupy text-center">My Basket</p>
                <div
                  role="button"
                  onClick={() => setIsCartPreviewModalOpen(false)}
                  className="rep-modal-close"
                >
                  <i className="fas fa-times"></i>
                </div>
              </div>
              <div className="d-flex">
                <p className="mb-0 pt-10 flex-occupy">Items - {carts.length}</p>
                <p className="mb-0 pt-10 flex-occupy text-right">
                  {currency} {totalAmount}
                </p>
              </div>
            </div>
          </div>
          <div
            className="rep-modal-body"
            style={{ height: 400, overflow: "scroll", paddingBottom: 70 }}
          >
            <div className="cart-list-containr pb-0 px-0">
              <div>
                {productsbyCategory.map((category, index) => (
                  <div className="category--cart--container" key={index}>
                    <div className="category--header br-0">
                      <div className="category--title">
                        <p>{category.name}</p>
                      </div>
                      <div className="category--cart-count">
                        <p>{category.products.length}</p>
                      </div>
                    </div>
                    <div className="category--items-container">
                      {category.products.map((product, pIndex) => (
                        <div
                          className="category--item-wrapper flex-occupy"
                          key={pIndex}
                        >
                          <div className="category--item-left">
                            <div className="img-container">
                              <img
                                src={product.image_url}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = Images.food;
                                }}
                              />
                            </div>
                            <div className="d-flex">
                              <div
                                className="cr-add-btn-active"
                                style={{ transform: "rotate(-90deg)" }}
                              >
                                <div>
                                  <i
                                    style={{ transform: "rotate(90deg)" }}
                                    className="fas fa-minus"
                                    onClick={() =>
                                      product.is_custome
                                        ? router.push(
                                            "/product-detail/" + product.id
                                          )
                                        : _addItemToCart(
                                            product,
                                            product.added_quantity - 1
                                          )
                                    }
                                  ></i>
                                </div>
                                <span
                                  style={{
                                    transform: "rotate(90deg)",
                                    background: "#F8F6F2",
                                    borderRadius: 5,
                                  }}
                                >
                                  {product.added_quantity}
                                </span>
                                <div>
                                  <i
                                    className="fas fa-plus"
                                    onClick={() =>
                                      product.is_custome
                                        ? router.push(
                                            "/product-detail/" + product.id
                                          )
                                        : _addItemToCart(
                                            product,
                                            product.added_quantity + 1
                                          )
                                    }
                                  ></i>
                                </div>
                              </div>
                              <span style={{ marginRight: 12, marginTop: 8 }}>
                                X
                              </span>
                            </div>
                          </div>
                          <div className="d-flex flex-occupy">
                            <div className="category--item--right flex-occupy">
                              <div className="category--item-right--left">
                                <div className="category--item--title">
                                  <p>{product.name}</p>
                                </div>
                                <div className="category--item--quantity">
                                  {`${product.added_quantity} ${
                                    product.added_quantity > 1
                                      ? "pieces"
                                      : "piece"
                                  }`}
                                </div>
                                <div className="category--item--price">
                                  ₹{product.price} / unit
                                </div>
                              </div>
                              <div className="category--item--right-right flex-end">
                                <div className="category--item--total-price">
                                  <p style={{color: dark ?"white":"#404b69"}}>
                                    ₹{product.price * product.added_quantity}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex align-center px-3">
                              <button
                                class="mb-0 remove-item-btn-red"
                                onClick={() => _addItemToCart(product, 0)}
                              >
                                <DeleteIcon />
                              </button>
                            </div>
                          </div>
                          <div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="btn-botton-fixed">
          <Link href="/checkout">
            <a>
              <div className="d-flex w-100 justify-content-between align-items-center">
                <button className="btm-fxd-btn">Book Now</button>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPreviewModal;
