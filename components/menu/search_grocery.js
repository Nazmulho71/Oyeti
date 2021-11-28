import { useState, useEffect, useRef } from "react";
import Router from "next/router";
import axios from "axios";
import { useRouter } from "next/router";
import {
  _searchProducts,
  isVegOnly,
  isNonVegOnly,
  addProductToCart,
  _titleCase,
  getLastData,
  _getItemId,
  productCartData,
  withProductCartData,
  getItemForAction,
  isBestSeller,
} from "../../lib/helpers/menu";
import { currency } from "../../lib/enums";
import { BaseStyles } from "../helperComponents/BaseStyles";
import { useSelector } from "react-redux";
import Images from "../../utils/ImageConst";
import UnlistedProd from "./unlisted_prod";
import ProdDetails from "./prodDetails_modal";
import Sizes from "../product-details/components/sizes";
import Header from "../product-details/components/header";
import Addons from "../product-details/components/addons";
import Common from "../product-details/components/common";
import Details from "../product-details/components/details";
import { getMid } from "../../lib/helpers/common";
import { addUpdateCart } from "../../store/actions/cart";
import SearchProds from "./searchProds_grocery";
import Link from "next/link";
import { unlistedProductApi, baseLocalURLForm } from "../../lib/api/baseUrls";

const Index = ({
  onClose,
  store,
  // addProductToCart,
  searchText,
  setSearchText,
  onChangeText,
  products,
  _products,
  getProducts,
  meta,
  onAction,
  carts,
  setCarts,
  onReapeat,
  product,
}) => {
  let showPopup = true;
  const router = useRouter();
  const { mid } = router.query;
  const detailsmodalRef = useRef();
  let filterProduct = withProductCartData(product, carts);
  const [isDetails, setIsDetails] = useState(false);
  const [size, setSize] = useState(null);
  const [selected, setSelected] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isAddedAddOn, setIsAddedAddOn] = useState(false);
  const [currentKey, setCurrentKey] = useState(1);
  const [extraCheese, setExtraCheese] = useState(false);
  const [toppingModal, setToppingModal] = useState(false);
  const [cardKey, setCardKey] = useState(1);
  const [qty, setQty] = useState(filterProduct.added_quantity);
  const [unlistedProduct, setUnlistedProduct] = useState(false);
  const [unlistedModal, setUnlistedModal] = useState(false);
  const [name, setName] = useState();
  const [unit, setUnit] = useState("kg");
  const [unitQty, setUnitQty] = useState();

  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

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

  const _actionAfterProductAction = (data) => {
    let key = cardKey + 1;
    onAction();
    setCardKey(key);
    addUpdateCart(carts, setCarts, data);
    addProductToCart(data);
  };

  const _addCart = (data) => {
    if (!data.added_quantity) {
      return;
    }
    let showPopup = true;
    // router.back
    addProductToCart(data, showPopup, null);
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

  const setLocal = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("Unlisted Product", JSON.stringify(name));
      localStorage.setItem(
        "Unlisted Product Quantity",
        JSON.stringify(unitQty)
      );
      localStorage.setItem("Unlisted Product Unit", JSON.stringify(unit));
    }
  };

  const handleSubmit = async () => {
    try {
      let url = unlistedProductApi();
      let data = {
        url,
        requestType: "post",
        mid: mid,
        name: name,
        unit: unit,
        unit_quantity: unitQty,
      };
      let response = await axios.post(baseLocalURLForm, data);
      let resData = response.data.data;
      if (resData.success) {
        console.log(resData);
      }
    } catch (error) {
      console.log(error);
    }

    setLocal();
  };

  // useEffect(() => {
  //   localStorage.removeItem("Unlisted Product");
  //   localStorage.removeItem("Unlisted Product Quantity");
  //   localStorage.removeItem("Unlisted Product Unit");
  // }, []);

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

            <div
              className={`status-btn-border ${
                dark && "status-btn-border-dark"
              }`}
              style={{
                marginBottom: "20px",
                background:
                  "linear-gradient(271.62deg, #c9daed 1.21%, #ffffff 97.63%)",
              }}
            >
              <div className={`status-btn ${dark && "status-btn-dark"}`}>
                <button onClick={() => setUnlistedProduct(true)}>
                  Request a new product
                </button>
              </div>
            </div>

            {unlistedProduct ? (
              <div className="search-overlay log-modal-overlay">
                <UnlistedProd
                  onClose={() => setUnlistedProduct(false)}
                  setUnlistedModal={setUnlistedModal}
                  _addCart={_addCart}
                  filterProduct={filterProduct}
                  _incDecQuantity={_incDecQuantity}
                  handleSubmit={handleSubmit}
                  name={name}
                  setName={setName}
                  unit={unit}
                  setUnit={setUnit}
                  unitQty={unitQty}
                  setUnitQty={setUnitQty}
                />
              </div>
            ) : null}
          </span>

          {unlistedModal && (
            <div className="details-modal-overlay">
              <div className="details-modal">
                <div
                  className={`details-modal-inner ${
                    dark && "details-modal-inner-dark"
                  }`}
                >
                  <div
                    className={`details-modal-header pt-4 pb-0 justify-content-center ${
                      dark && "details-modal-header-dark"
                    }`}
                    style={{
                      boxShadow: "none",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      What does ‘Add to cart’ mean?
                    </p>
                  </div>
                  <div className="details-modal-body-wrap">
                    <div
                      className="details-modal-body pb-0"
                      style={{ padding: "30px" }}
                    >
                      <div
                        className={`d-flex align-items-center justify-content-between mb-4 unlisted-modal-items ${
                          dark && "unlisted-modal-items-dark"
                        }`}
                      >
                        <img
                          src={`/assets/icons/${
                            dark ? "cartmean1-dark.svg" : "cartmean1.svg"
                          }`}
                          alt=""
                        />
                        <p>
                          This product is not listed by the store, however the
                          store might sill have it.
                        </p>
                      </div>

                      <div
                        className={`d-flex align-items-center justify-content-between mb-4 unlisted-modal-items ${
                          dark && "unlisted-modal-items-dark"
                        }`}
                      >
                        <img
                          src={`/assets/icons/${
                            dark ? "cartmean2-dark.svg" : "cartmean2.svg"
                          }`}
                          alt=""
                        />
                        <p>
                          The store will check their stock and update the
                          availabity and price.
                        </p>
                      </div>

                      <div
                        className={`d-flex align-items-center justify-content-between mb-4 unlisted-modal-items ${
                          dark && "unlisted-modal-items-dark"
                        }`}
                      >
                        <img
                          src={`/assets/icons/${
                            dark ? "cartmean3-dark.svg" : "cartmean3.svg"
                          }`}
                          alt=""
                        />
                        <p>
                          You still have total control on the order, choose what
                          you want to keep and then pay to complet the order.
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between p-2">
                      <button
                        class={`add-new-btn ${dark && "add-new-btn-dark"}`}
                        style={{ flex: 0.3 }}
                        onClick={() => {
                          onClose();
                          setUnlistedProduct(false);
                          setUnlistedModal(false);
                        }}
                      >
                        Menu
                      </button>

                      <Link href="/checkout">
                        <div
                          className={`btm-fxd-btn-border ${
                            dark && "btm-fxd-btn-border-dark"
                          }`}
                          style={{ flex: 0.7, margin: "10px" }}
                        >
                          <button
                            className={`btm-fxd-btn w-100 ${
                              dark && "btm-fxd-btn-dark"
                            }`}
                            onClick={() => {
                              // _addCart(filterProduct);
                              // _incDecQuantity(
                              //   filterProduct.added_quantity + count,
                              //   true
                              // );
                            }}
                          >
                            View Cart
                          </button>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* <div
          className={`active-search-title ${
            dark && " active-search-title-dark"
          }`}
        >
          <h1>Dominos' Pizza</h1>
        </div> */}

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

              {/* {searchText ? (
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="basic-addon1"
                    onClick={() => _localClear()}
                  >
                    <button>
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                </div>
              ) : null} */}
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
        {searchText ? (
          <div className="mb-0" style={{ flex: 1 }}>
            {/* {_products(getProducts(products).slice(0, 5)).map( */}
            {/* (chunkProducts, index) => { */}
            {/* return ( */}
            {/* <div key={index}> */}
            {/* {chunkProducts.map((product, index) => { */}
            {/* return ( */}
            <SearchProds
              // index={index}
              dark={dark}
              BaseStyles={BaseStyles}
              product={product}
              currency={currency}
              ProdDetails={ProdDetails}
              detailsmodalRef={detailsmodalRef}
              Header={Header}
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
              _addCart={_addCart}
              _incDecQuantity={_incDecQuantity}
              _getSVG={_getSVG}
            />
            {/* ); */}
            {/* })} */}
            {/* </div> */}
            {/* ); */}
            {/* } */}
            {/* )} */}
          </div>
        ) : (
          <div className="w-100 text-center" style={{ marginTop: "10%" }}>
            <img
              src={dark ? Images.searchProdDark : Images.searchProd}
              alt=""
            />
            <p
              className="text-center mt-3"
              style={{
                fontWeight: "600",
                fontSize: "12px",
                color: dark ? "#FFFFFF" : "#404B69",
              }}
            >
              Search products
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
