import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import {
  _getAddonStr,
  _getTitle,
  _getCartPrice,
  setCheckoutDataType,
} from "../../lib/helpers/checkout";
import {
  addProductToCart,
  _getCartsFun,
  withProductCartData,
  productCartData,
  getItemForAction,
} from "../../lib/helpers/menu";
import { onPuhsClick, getMid } from "../../lib/helpers/common";
import { currency } from "../../lib/enums";
import { addUpdateCart } from "../../store/actions/cart";
import loaderAction from "../../lib/helpers/loader";
import Router from "next/router";
import { amountFix } from "../../lib/helpers/commonHelper";

const Index = ({
  product,
  carts,
  setCarts,
  onItemRemoved,
  custome,
  ordPrice,
  setOrdPrice,
}) => {
  const [checkoutData, setCheckoutData] = useState({});
  const [orderItem, setOrderItem] = useState({});
  const [isGrocery, setIsGrocery] = useState(true);
  const [address, setAddress] = useState({});
  const [isAddressSelect, setisAddressSelect] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(true);
  const [cardKey, setCardKey] = useState(1);
  let [menuKey, setMenuKey] = useState(1);
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  let filterProduct = withProductCartData(product, carts);
  const [qty, setQty] = useState(filterProduct.added_quantity);

  // const _addItemToCart = async (cart) => {
  //   let data = { ...cart, added_quantity: 0 };
  //   if (custome) {
  //     onItemRemoved(cart);
  //     return;
  //   }
  //   await addProductToCart(data);
  //   await _getCartsFun(setCarts);
  //   onItemRemoved();
  // };

  const _getCheckoutCartsData = async (onRemove, addr) => {
    if (onRemove && carts.length == 1) {
      Router.back();
      return;
    }
    loaderAction(true);
    if (address && address.name) {
      addr = address;
    }
    await setCheckoutDataType(
      setCheckoutData,
      setOrderItem,
      setIsGrocery,
      0,
      addr
    );
    setTimeout(() => {
      loaderAction(false);
      setIsLoadingInit(false);
    }, 1000);
  };

  const _onAddressSelect = (address) => {
    setAddress(address);
    setisAddressSelect(false);
    _getCheckoutCartsData(null, address);
  };

  const _addItemToCart = async (cart, qty) => {
    loaderAction(true);
    let data = { ...cart, added_quantity: qty };
    let goback = true;
    await addProductToCart(data);
    addUpdateCart(carts, setCarts, data, goback);
    await _getCartsFun(setCarts);
    setCheckoutDataType(
      setCheckoutData,
      setOrderItem,
      setIsGrocery,
      0,
      address
    );
    loaderAction(false);
  };

  // const _addItemToCart = (added_quantity) => {
  //   let mid = getMid();
  //   let data = {
  //     id: product?.id,
  //     added_quantity,
  //     sizes: [],
  //     addons: [],
  //     is_reapeat: true,
  //     item_id: product?.id,
  //     price: product?.price,
  //     name: product?.name,
  //     meta: {},
  //     mid,
  //     image_url: product?.image_url,
  //     gst: product?.gst,
  //   };

  //   _actionAfterProductAction(data);
  // };

  const _pushItem = (e, cart) => {
    e.preventDefault();
    onPuhsClick(cart, cart.item_id, cart.id);
  };

  const _getPrice = (quantity) => {
    return quantity ? product.price * quantity : product.price;
  };

  const _keySet = () => {
    let menu = menuKey + 1;
    setMenuKey(menu);
  };

  const _actionAfterProductAction = (data) => {
    let key = cardKey + 1;
    _keySet();
    setCardKey(key);
    addUpdateCart(carts, setCarts, data);
    addProductToCart(data);
  };

  const decreaseItem = async () => {
    let reduce = true;
    let data = await getItemForAction(product, reduce);
    _actionAfterProductAction(data);
  };

  const _incDecQuantity = async (added_quantity, isIncrease) => {
    // const elem = document.getElementById(`qty-${product?.id}`);
    // elem.innerText = added_quantity;

    setQty(added_quantity);

    if (isIncrease) {
      // const added = elem.innerText ? parseInt(elem.innerText) + 1 : 1;
      // elem.innerText = added;

      if (product?.is_custome) {
        let filterCartProduct = await productCartData(product);
        // if (filterCartProduct && filterCartProduct.is_reapeat) {
        //   onReapeat(product, filterCartProduct);
        // } else {
        //   // Router.push("/product-detail/" + product.id);
        // }
      } else {
        _addItemToCart(added_quantity);
      }
    } else {
      // const removed = elem.innerText ? parseInt(elem.innerText) - 1 : 1;
      // elem.innerText = removed;

      if (product?.is_custome) {
        decreaseItem();
      } else {
        _addItemToCart(added_quantity);
      }
    }
  };

  // useEffect(() => {
  //   Object.values(carts).map(function (cart) {
  //     setOrdPrice(amountFix(cart.price * cart.added_quantity));
  //   });
  // }, []);

  return (
    <div className="cart-list-containr">
      <div
        className={`cart-list-inner-border ${
          dark && "cart-list-inner-border-dark"
        }`}
      >
        <div className={`cart-list-inner ${dark && "cart-list-inner-dark"}`}>
          {carts.map((cart, index) => {
            return (
              <Fragment key={index}>
                <div
                  className="cart-list-item"
                  style={{ paddingTop: "10px", paddingBottom: "10px" }}
                >
                  <div className="cart-list-item-flexbox">
                    <div
                      className={`cart-add-btn-border ${
                        dark && "cart-add-btn-border-dark"
                      }`}
                      style={{
                        transform: "rotate(-90deg)",
                        margin: "20px -10px 20px -20px",
                      }}
                    >
                      <button
                        className={`cart-add-btn ${
                          dark && "cart-add-btn-dark"
                        }`}
                        style={{
                          position: "relative !important",
                          border: "none",
                        }}
                        key={cardKey}
                      >
                        <div
                          className={`cart-add-btn-mod-active ${
                            dark && "cart-add-btn-mod-active-dark"
                          }`}
                        >
                          <i
                            style={{
                              fontSize: "10px",
                              transform: "rotate(90deg)",
                            }}
                            className="fas fa-minus"
                            onClick={() =>
                              // _incDecQuantity(
                              //   filterProduct.added_quantity - 1,
                              //   false
                              // )
                              _addItemToCart(cart, cart.added_quantity - 1)
                            }
                          ></i>
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
                              {cart.added_quantity}
                              {/* {filterProduct.added_quantity} */}
                            </span>
                          </div>
                          <i
                            style={{
                              fontSize: "10px",
                              transform: "rotate(90deg)",
                            }}
                            className="fas fa-plus"
                            onClick={() =>
                              // _incDecQuantity(
                              //   filterProduct.added_quantity + 1,
                              //   true
                              // )
                              _addItemToCart(cart, cart.added_quantity + 1)
                            }
                          ></i>
                        </div>
                      </button>
                    </div>

                    <div className="cart-list-item-name-cont w-100">
                      <p
                        className={`mb-0 cart-list-item-name ${
                          dark && "cart-list-item-name-dark"
                        }`}
                      >
                        {/* {cart.added_quantity} X */}
                        {/* <Link href={"/product-detail/"+cart.item_id}> */}
                        <a href="#" onClick={(e) => _pushItem(e, cart)}>
                          {" "}
                          {_getTitle(cart)}
                        </a>
                        {/* </Link> */}
                        {/* {_getPrice(filterProduct.added_quantity)} */}
                      </p>
                      {cart.addons.length > 0 ? (
                        <p className="mb-0 cart-list-item-toppings text-muted">
                          {_getAddonStr(cart)}{" "}
                        </p>
                      ) : null}
                    </div>

                    {/* <div>
                      <i
                        style={{ color: "#FF118E", margin: "0 10px 0 10px" }}
                        class="far fa-trash-alt"
                        onClick={() => _addItemToCart(cart)}
                      ></i>
                    </div> */}

                    <div className="cart-list-item-price">
                      <p
                        className={`mb-0 item-price ${
                          dark && "item-price-dark"
                        }`}
                      >
                        {currency}
                        {amountFix(cart.price * cart.added_quantity)}
                        {/* {cart.price} */}
                        {/* {_getCartPrice(cart)} */}
                      </p>
                      {/* <button
                        className="mb-0 remove-item-btn"
                        onClick={() => _addItemToCart(cart)}
                      >
                        x
                      </button> */}
                    </div>
                  </div>
                  {/* <div className={`extra-cost ${dark && "extra-cost-dark"}`}>
                    Extra :{" "}
                  </div> */}
                </div>
                {/* {index != cart.length - 1 ? (
                <hr className="mt-0 hr-thin" />
              ) : null} */}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
