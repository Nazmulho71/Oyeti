import { useState, useEffect, useRef } from "react";
import Images from "../../utils/ImageConst";
import Customizable from "./customizable";
import BestSeller from "./bestSeller";
import Rating from "../rating";
import Router from "next/router";
import { currency } from "../../lib/enums";
import { getMid } from "../../lib/helpers/common";
import {
  _isAddedToCart,
  _addCartFun,
  isVegOnly,
  _titleCase,
  addProductToCart,
  _getCartsFun,
  withProductCartData,
  productCartData,
  getItemForAction,
  isNonVegOnly,
  isBestSeller,
  getLastData,
} from "../../lib/helpers/menu";
import { addUpdateCart } from "../../store/actions/cart";
import ImageConst from "../../utils/ImageConst";
import { BaseStyles } from "../helperComponents/BaseStyles";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Sizes from "../product-details/components/sizes";
import Header from "../product-details/components/header";
import Addons from "../product-details/components/addons";
import Common from "../product-details/components/common";
import Details from "../product-details/components/details";
import Link from "next/link";
import Skeleton from "@material-ui/lab/Skeleton";
import ProdDetails from "./prodDetails_modal";
import { _getItemId } from "./../../lib/helpers/menu";

const Index = ({
  carts,
  onAction,
  product,
  isGrocery,
  isSingle,
  setCarts,
  isSuggested = false,
  meta = {},
  onReapeat,
  width,
}) => {
  let showPopup = true;

  const [cardKey, setCardKey] = useState(1);
  const [imageLoadingError, setImageLoadingError] = useState(false);

  const detailsmodalRef = useRef();
  const [modal, setModal] = useState(false);
  const onModalClick = () => {
    setModal(!modal);
  };

  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  // const [filterProduct, setFilterProduct] = useState({});

  const router = useRouter();

  const [toppingModal, setToppingModal] = useState(false);
  const [isDetails, setIsDetails] = useState(false);
  const [size, setSize] = useState(null);
  const [extraCheese, setExtraCheese] = useState(false);
  const [selected, setSelected] = useState({});
  const [currentKey, setCurrentKey] = useState(1);
  const [isAddedAddOn, setIsAddedAddOn] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);

  let filterProduct = withProductCartData(product, carts);
  const [qty, setQty] = useState(filterProduct.added_quantity);

  let filterCartProduct = async () => {
    let filterCartProduct = await productCartData(product);
    filterCartProduct = { ...filterCartProduct, is_custome: true };
    if (filterCartProduct.sizes && filterCartProduct.sizes.length > 0) {
      let sizeData =
        filterCartProduct.sizes[filterCartProduct.sizes.length - 1];
      if (sizeData) {
        // setSize(sizeData.item_size_id)
      }
    } else {
      if (product.sizes.length > 0) {
        let firstSize = { ...product.sizes[0], quantity };
        filterCartProduct.sizes.push(firstSize);
      }
    }
    setSelected(filterCartProduct);
    // setFilterProduct(filterCartProduct);
  };

  const _addSize = (selectedItem) => {
    setSize(selectedItem.item_size_id);
    let sizes = selected.sizes.filter(
      (item) => item.item_size_id == selectedItem.item_size_id
    );
    if (sizes.length > 0) {
      return;
    }

    let oldPrcie = 0;
    selected.sizes.forEach((el) => {
      oldPrcie = el.item_size_price + oldPrcie;
    });

    selectedItem = { ...selectedItem, quantity };
    sizes = [selectedItem];
    let data = { ...selected, sizes };
    let newPrice = selectedItem.item_size_price;
    data.price = newPrice;
    setSelected(data);
  };

  const _addAddons = (item, addonData) => {
    let addons = selected.addons;
    item = { ...item, position: addonData.position };
    let addon = [];
    if (addons.length) {
      addons = addons[addons.length - 1];
      addon = addons.filter((add) => add.item_id == item.item_id);
      if (addon && addon.length > 0) {
        addon = addons.filter((add) => add.item_id != item.item_id);
      } else {
        addons.push(item);
        addon = [...addons];
      }
    } else {
      addon.push(item);
    }

    let selectedAddons = [];
    if (addons.length) {
      selectedAddons = selected.addons;
      selectedAddons.splice(-1, 1);
      selectedAddons.push(addon);
    } else {
      selectedAddons = [addon];
    }
    let key = currentKey + 1;
    let price =
      item.sizes.length > 0 ? item.sizes[0].item_size_price : product.price;
    let selectedAddon = selectedAddons[selectedAddons.length - 1];
    if (selectedAddon && selectedAddon.length > 0) {
      for (let index = 0; index < selectedAddon.length; index++) {
        const element = selectedAddon[index];
        price = price + element.item_price;
      }
    }
    let data = { ...selected, addons: selectedAddons, price };
    setIsAddedAddOn(true);
    setCurrentKey(key);
    setSelected(data);
  };

  // const _addItemToCart = () => {
  //   if (!quantity) {
  //     return;
  //   }
  //   if (selected.is_reapeatt) {
  //     setToppingModal(true);
  //   } else {
  //     let sizes = [{ ...selected.sizes[0], quantity }];
  //     let price =
  //       selected.sizes.length > 0
  //         ? selected.sizes[0].item_size_price
  //         : product.price;
  //     let data = {
  //       ...selected,
  //       is_reapeat: true,
  //       sizes,
  //       added_quantity: quantity,
  //       price,
  //     };
  //     let newData = {
  //       ...selected,
  //       addons: [],
  //       is_reapeat: true,
  //       quantity,
  //       sizes: [],
  //       price,
  //     };
  //     setSelected(newData);
  //     addProductToCart(data, showPopup, router.back);
  //   }
  // };
  const _addItemToCart = (added_quantity) => {
    let mid = getMid();
    let data = {
      id: product.id,
      added_quantity,
      sizes: [],
      addons: [],
      is_reapeat: true,
      item_id: product.id,
      price: product.price,
      name: product.name,
      meta,
      mid,
      image_url: product.image_url,
      gst: product.gst,
    };

    _actionAfterProductAction(data);
  };

  const addNewData = () => {
    setToppingModal(false);
    let sizes = [{ ...selected.sizes[0], quantity }];
    let price =
      selected.sizes.length > 0
        ? selected.sizes[0].item_size_price
        : product.price;
    let id = _getItemId(selected);
    let data = {
      ...selected,
      is_reapeat: true,
      added_quantity: quantity,
      id,
      sizes,
      price,
    };
    let newData = {
      ...selected,
      addons: [],
      is_reapeat: false,
      sizes: [],
      quantity,
      price,
    };
    setSelected(newData);
    setQuantity(1);
    setSize(null);
    addProductToCart(data, showPopup, router.back);
  };

  const repeatLastCartData = async () => {
    setToppingModal(false);
    let filterCartProduct = await productCartData(product);
    let id = _getItemId(filterCartProduct);
    let data = { ...filterCartProduct, id };
    setSelected(data);
    addProductToCart(data, showPopup, router.back);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    filterCartProduct();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  // let filterCartProduct = async () => {
  // };

  // let filterProduct = withProductCartData(product, carts);

  const _actionAfterProductAction = (data) => {
    let key = cardKey + 1;
    onAction();
    setCardKey(key);
    addUpdateCart(carts, setCarts, data);
    addProductToCart(data);
  };

  const decreaseItem = async () => {
    let reduce = true;
    let data = await getItemForAction(product, reduce);
    _actionAfterProductAction(data);
  };

  const _getSVG = (pro) => {
    if (isVegOnly(pro)) {
      return Images.grSquare;
    }

    if (isNonVegOnly(pro)) {
      return Images.nonveg;
    }

    if (isBestSeller(pro)) {
      return Images.bestSeller;
    }
    return "";
  };

  const _incDecQuantity = async (added_quantity, isIncrease) => {
    // const elem = document.getElementById(`qty-${product?.id}`);
    // elem.innerText = added_quantity;

    setQty(added_quantity);

    if (isIncrease) {
      // const added = elem.innerText ? parseInt(elem.innerText) + 1 : 1;
      // elem.innerText = added;

      if (product.is_custome) {
        let filterCartProduct = await productCartData(product);
        if (filterCartProduct && filterCartProduct.is_reapeat) {
          onReapeat(product, filterCartProduct);
        } else {
          // Router.push("/product-detail/" + product.id);
        }
      } else {
        _addItemToCart(added_quantity);
      }
    } else {
      // const removed = elem.innerText ? parseInt(elem.innerText) - 1 : 1;
      // elem.innerText = removed;

      if (product.is_custome) {
        decreaseItem();
      } else {
        _addItemToCart(added_quantity);
      }
    }
  };

  const _pushDetails = (e) => {
    e.preventDefault();
    if (isGrocery) {
      return;
    }
    if (product.is_custome) {
      // Router.push("/product-detail/" + product.id);
    } else {
      if (product.image_url) {
        // Router.push("/product-detail/" + product.id);
      }
    }
  };

  const _getPrice = (quantity) => {
    return quantity ? product.price * quantity : product.price;
  };

  const _addCart = (data) => {
    if (!data.added_quantity) {
      return;
    }
    let showPopup = true;
    // router.back
    addProductToCart(data, showPopup, null);
  };

  const LongText = ({ content, limit }) => {
    const [showAll, setShowAll] = useState(false);

    const showMore = () => setShowAll(true);
    const showLess = () => setShowAll(false);

    if (content.length <= limit) {
      return <div>{content}</div>;
    }
    if (showAll) {
      return (
        <div>
          {content}
          <button onClick={showLess}></button>
        </div>
      );
    }
    const toShow = content.substring(0, limit) + "...";
    return (
      <div>
        {toShow}
        <button onClick={showMore}></button>
      </div>
    );
  };

  if (isSuggested) {
    return (
      <div className="suggested-dish-item">
        <div className="sdi-img">
          <img src={Images.suggested_dish} alt="" />
        </div>
        <div className="adi-details-cont">
          <p className="mb-0 sdi-name">{product.name}</p>
          <button className="cr-add-btn" key={cardKey}>
            {filterProduct.added_quantity ? (
              <div
                className={`cr-add-btn-active ${
                  dark && "cr-add-btn-active-dark"
                }`}
              >
                <i
                  className="fas fa-minus"
                  onClick={() =>
                    _incDecQuantity(filterProduct.added_quantity - 1, false)
                  }
                ></i>
                <span>{filterProduct.added_quantity}</span>
                <i
                  className="fas fa-plus"
                  onClick={() =>
                    _incDecQuantity(filterProduct.added_quantity + 1, true)
                  }
                ></i>
              </div>
            ) : (
              <a
                onClick={() =>
                  _incDecQuantity(filterProduct.added_quantity + 1, true)
                }
              >
                <img className="img-fluid" src={Images.plus} alt="" /> Add
              </a>
            )}
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className={`prod-card ${dark && "prod-card-dark"}`}
        style={{
          height: "fit-content",
          width: width + "%",
          ...BaseStyles.flex,
          ...BaseStyles.vertical_align,
        }}
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={70}
          style={{ borderRadius: "16px" }}
        />
      </div>
    );
  } else {
    return (
      <div
        className={`prod-card ${dark && "prod-card-dark"}`}
        style={{
          height: "fit-content",
          width: width + "%",
          ...BaseStyles.flex,
          ...BaseStyles.vertical_align,
        }}
      >
        <div className="prod-img position-relative">
          {/* <div
        className={`prod-img ${
          product.image_url ? "position-relative" : "position-absolute"
        }`}
      > */}
          {/* {!imageLoadingError && ( */}
          {/* <Link href={"/product-detail/"+product.id}> */}
          {product.image_url ? (
            <a
              onClick={(e) => {
                _pushDetails(e);
                onModalClick();
              }}
            >
              {!imageLoadingError && (
                <img
                  className="img-fluid"
                  loading="lazy"
                  src={product.image_url}
                  // && product.image_url != ""? product.image_url : Images.prodImg
                  width="170"
                  height="170"
                  onError={() => setImageLoadingError(true)}
                  style={{
                    width: "100%",
                    /* padding: 20px; */
                    // borderStartStartRadius: "22px",
                    // borderStartEndRadius: "22px",
                    borderRadius: "12px 12px 0px 0px",
                  }}
                  alt=""
                />
              )}
              {/* <object className="img-fluid" data={Images.prodImg} type="image/png">
                                </object> */}
              {/* {_getSVG(product) ? (
              <>
                {!imageLoadingError && (
                  <img
                    className="img-fluid food-dot-img"
                    style={{ bottom: 7, width: "20px" }}
                    src={_getSVG(product)}
                    alt=""
                  />
                )}
              </>
            ) : null} */}
            </a>
          ) : null}
          {/* </Link> */}
          {/* )} */}
        </div>

        <ProdDetails
          modal={modal}
          product={product}
          detailsmodalRef={detailsmodalRef}
          dark={dark}
          Header={Header}
          onModalClick={onModalClick}
          setIsDetails={setIsDetails}
          isDetails={isDetails}
          Sizes={Sizes}
          _titleCase={_titleCase}
          _addSize={_addSize}
          size={size}
          Addons={Addons}
          isAddedAddOn={isAddedAddOn}
          currentKey={currentKey}
          _addAddons={_addAddons}
          selected={selected}
          Common={Common}
          setExtraCheese={setExtraCheese}
          extraCheese={extraCheese}
          setQuantity={setQuantity}
          toppingModal={toppingModal}
          quantity={quantity}
          setToppingModal={setToppingModal}
          _addItemToCart={_addItemToCart}
          getLastData={getLastData}
          addNewData={addNewData}
          repeatLastCartData={repeatLastCartData}
          Details={Details}
          cardKey={cardKey}
          filterProduct={filterProduct}
          // isImage={isImage}
          setCount={setCount}
          count={count}
          _addCart={_addCart}
          _incDecQuantity={_incDecQuantity}
          _getSVG={_getSVG}
          currency={currency}
        />

        {/* <div
        className={`prod-card-details position-relative ${
          imageLoadingError ? "pt-3 px-3" : ""
        }`}
        style={{
          ...BaseStyles.flex,
          ...BaseStyles.vertical_align,
          ...BaseStyles.flex_occupy,
        }}
      > */}
        <div
          style={{
            // marginBottom: 20,
            padding: 10,
            paddingBottom: 0,
            paddingTop: 0,
            ...BaseStyles.flex,
            ...BaseStyles.vertical_align,
            ...BaseStyles.flex_occupy,
          }}
        >
          {/* onClick={(e) => _pushDetails(e)} */}
          <div
            className="pt-2 pb-1 d-flex "
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            {/* {imageLoadingError ? null : (
            <div className="d-flex">
              <img
                style={{ bottom: 7, marginRight: "5px", width: "12px" }}
                src={_getSVG(product)}
                alt=""
              />
            </div>
          )} */}

            <a onClick={onModalClick}>
              <p className={`cr-prod-name mb-0 ${dark && "cr-prod-name-dark"}`}>
                <LongText content={`${product.name}`} limit={40} />
              </p>
            </a>
          </div>

          <div
            style={{
              ...BaseStyles.flex,
              ...BaseStyles.m_t_l,
              marginTop: "10px",
            }}
          >
            {/* {imageLoadingError ? null : (
                <div
                  className={`pagination-dot-active ${
                    dark && "pagination-dot-dark-active"
                  }`}
                ></div>
              )} */}

            <p
              className={`cr-prod-price ${dark && "cr-prod-price-dark"}`}
              style={{
                ...BaseStyles.flex_occupy,
                // marginLeft: 5,
                marginBottom: 0,
              }}
            >
              {currency}
              {product.price}
            </p>
          </div>

          {/* <div className=" d-flex">
            {" "}
            <span
              className="text-muted cr-bs-dish"
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {" "}
            </span>
          </div> */}
          {/* {_titleCase(product.category).length > 19 ? _titleCase(product.category).substr(0, 16) + '...' : _titleCase(product.category)}*/}

          {/* {imageLoadingError  ?  <img style={{ bottom: 7 }} src={_getSVG(product)}  alt="" /> : null}
           */}

          {/* <BestSeller
            is_best_seller={product.is_best_seller}
            isSingle={isSingle}
            is_custome={product.is_custome}
          /> */}
          {/* {product.is_custome && !isSingle ? <Customizable /> : null} */}

          {/* <Rating ratingCount={product.rating} /> */}
        </div>
        {/* </div> */}
        {product.is_custome ? (
          <div
            className="d-flex justify-content-end"
            style={{ marginTop: "-23px" }}
          >
            <div
              className={`cr-add-btn-border ${
                dark && "cr-add-btn-border-dark"
              }`}
            >
              <button
                onClick={onModalClick}
                className={`cr-add-btn ${dark && "cr-add-btn-dark"}`}
                style={{ position: "relative" }}
                key={cardKey}
              >
                {filterProduct.added_quantity ? (
                  <div
                    className={`cr-add-btn-active ${
                      dark && "cr-add-btn-active-dark"
                    }`}
                  >
                    <i
                      className="fas fa-minus"
                      onClick={() =>
                        _incDecQuantity(filterProduct.added_quantity - 1, false)
                      }
                    ></i>
                    <span>{filterProduct.added_quantity}</span>
                    <i
                      className="fas fa-plus"
                      onClick={() =>
                        _incDecQuantity(filterProduct.added_quantity + 1, true)
                      }
                    ></i>
                  </div>
                ) : (
                  <i
                    onClick={() =>
                      _incDecQuantity(filterProduct.added_quantity + 1, true)
                    }
                    style={{ fontSize: "16px", marginTop: "1px" }}
                    class="fas fa-plus"
                  ></i>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div
            className="d-flex justify-content-end"
            style={{ marginTop: "-23px" }}
          >
            <div
              className={`cr-add-btn-border ${
                dark && "cr-add-btn-border-dark"
              }`}
              style={{
                borderRadius: `${
                  filterProduct.added_quantity ? "15px" : "50%"
                }`,
              }}
            >
              <button
                className={`cr-add-btn ${dark && "cr-add-btn-dark"} ${
                  filterProduct.added_quantity && "cr-added-btn"
                } ${
                  filterProduct.added_quantity && dark && "cr-added-btn-dark"
                }`}
                key={cardKey}
                style={{
                  position: "relative",
                  borderRadius: `${
                    filterProduct.added_quantity ? "15px" : "50%"
                  }`,
                  // width: `${filterProduct.added_quantity ? "60px" : "50px"}`,
                }}
              >
                {filterProduct.added_quantity ? (
                  <div className="text-center" onClick={() => setModal(!modal)}>
                    <a>Added</a>
                  </div>
                ) : (
                  <i // onClick={() =>
                    //   _incDecQuantity(filterProduct.added_quantity + 1, true)
                    // }
                    onClick={() => setModal(!modal)}
                    style={{ fontSize: "16px", marginTop: "1px" }}
                    class="fas fa-plus"
                  ></i>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Index;
