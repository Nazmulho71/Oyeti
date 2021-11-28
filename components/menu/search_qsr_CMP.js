import Router from "next/router";
import { useState, useEffect, useRef } from "react";
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
import ProdDetails from "./prodDetails_modal";
import Sizes from "../product-details/components/sizes";
import Header from "../product-details/components/header";
import Addons from "../product-details/components/addons";
import Common from "../product-details/components/common";
import Details from "../product-details/components/details";
import SearchProds from "./searchProds_qsr";
import { getMid } from "../../lib/helpers/common";
import { addUpdateCart } from "../../store/actions/cart";

const Index = ({
  onClose,
  store,
  // addProductToCart,
  onClearText = () => {},
  meta = {},
  carts,
  setCarts,
  onAction,
  onReapeat,
  product,
}) => {
  const [searchText, setSearchText] = useState("");
  let [products, setProducts] = useState([]);

  let showPopup = true;
  const router = useRouter();
  const detailsmodalRef = useRef();
  // const [product, setProduct] = useState(false);
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

  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  const onChangeText = (text) => {
    if (text) {
      _searchProducts(text, setProducts);
    } else {
      setProducts([]);
    }
  };

  if (products.length > 5) {
    products = products.slice(0, 5);
  }

  const _localClear = () => {
    if (searchText) {
      setSearchText("");
      onClearText();
    }
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

  const _actionAfterProductAction = (data) => {
    let key = cardKey + 1;
    onAction();
    setCardKey(key);
    addUpdateCart(carts, setCarts, data);
    addProductToCart(data);
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

  return (
    <div className={`search-cont ${dark && "search-cont-dark"}`}>
      <div
        className={`d-flex justify-start py-3 px-3 search-container active-search-container ${
          dark && " active-search-container-dark"
        }`}
      >
        <div className="input-group-prepend">
          <span
            className="input-group-text"
            id="basic-addon1"
            onClick={() => onClose()}
            style={{
              height: "44px",
              background: "transparent",
              border: "none",
              paddingTop: 20,
            }}
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
                <b>{products.length} results</b>
              </h3>
            </div>
          </div>

          {products.map((product, index) => {
            return (
              <SearchProds
                index={index}
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
            );
          })}
        </div>
      </div>

      {/* <button
        className="btn-botton-fixed"
        style={{
          bottom: "5%",
          padding: "0px",
          width: "130px",
          height: "30px",
          borderRadius: 14,
          ...BaseStyles.flex,
          ...BaseStyles.center,
        }}
        onClick={() => onClose()}
      >
        Close
      </button> */}
    </div>
  );
};

export default Index;
