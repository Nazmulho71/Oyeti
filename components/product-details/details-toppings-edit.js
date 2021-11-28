import { useEffect, useState } from "react";
import Sizes from "./components/sizes";
import Addons from "./components/addons";
import Common from "./components/common";
import Details from "./components/details";
import Header from "./components/header";
import {
  _titleCase,
  addProductToCart,
  productCartData,
  productCartDataUpdate,
  _getItemId,
  getLastData,
} from "../../lib/helpers/menu";
import { useRouter } from "next/router";

let showPopup = true;

const Index = ({ product, cartId, currentCartItem }) => {
  const router = useRouter();

  const [toppingModal, setToppingModal] = useState(false);
  const [isDetails, setIsDetails] = useState(false);
  const [size, setSize] = useState(null);
  const [extraCheese, setExtraCheese] = useState(false);
  const [selected, setSelected] = useState({});
  const [currentKey, setCurrentKey] = useState(1);
  const [isAddedAddOn, setIsAddedAddOn] = useState(false);
  const [quantity, setQuantity] = useState(1);

  let filterCartProduct = (data) => {
    if (data) {
      if (data.sizes.length > 0) {
        let sizeData = { ...data.sizes[0] };
        _addSize(sizeData, data);
      }

      if (data.addons.length > 0) {
        let addons = data.addons[0];
        for (let index = 0; index < addons.length; index++) {
          const element = addons[index];

          let addonData = product.addons.find(
            (add) => add.position == element.position
          );

          if (addonData) {
            _addAddons(element, addonData, data);
          }
        }
      }
    }
  };

  const _addSize = (selectedItem, selectedData) => {
    setSize(selectedItem.item_size_id);

    let itemData = selected;
    if (selectedData) {
      itemData = selectedData;
    }

    selectedItem = { ...selectedItem, quantity };
    let sizes = [selectedItem];
    let data = { ...itemData, sizes };
    let newPrice = selectedItem.item_size_price;
    data.price = newPrice;
    setSelected(data);
  };

  const _addAddons = (item, addonData, selectedData) => {
    let itemData = selected;
    if (selectedData) {
      itemData = selectedData;
    }
    let addons = itemData.addons;

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
      selectedAddons = itemData.addons;
      selectedAddons.splice(-1, 1);
      selectedAddons.push(addon);
    } else {
      selectedAddons = [addon];
    }
    let key = currentKey + 1;
    let price =
      itemData.sizes.length > 0
        ? itemData.sizes[0].item_size_price
        : product.price;

    let selectedAddon = selectedAddons[selectedAddons.length - 1];
    if (selectedAddon && selectedAddon.length > 0) {
      for (let index = 0; index < selectedAddon.length; index++) {
        const element = selectedAddon[index];
        price = price + element.item_price;
      }
    }

    let data = { ...itemData, addons: selectedAddons, price };
    setIsAddedAddOn(true);
    setCurrentKey(key);
    setSelected(data);
  };

  const _addItemToCart = () => {
    if (!quantity) {
      return;
    }
    if (selected.is_reapeatt) {
      setToppingModal(true);
    } else {
      let sizes = [{ ...selected.sizes[0], quantity }];
      let price =
        selected.sizes.length > 0
          ? selected.sizes[0].item_size_price
          : product.price;
      let data = {
        ...selected,
        is_reapeat: true,
        sizes,
        added_quantity: quantity,
        price,
      };
      let newData = {
        ...selected,
        addons: [],
        is_reapeat: true,
        quantity,
        sizes: [],
        price,
      };
      setSelected(newData);
      addProductToCart(data, showPopup, router.back);
    }
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
    setSelected(currentCartItem);
    filterCartProduct(currentCartItem);
  }, []);

  return (
    <div className="wrapper">
      <div className="container m-0" style={{ padding: "0 0 70px 0" }}>
        <Header product={product} />

        <div className="pt-3">
          <div className="food-set-pagination-nav">
            <button
              onClick={() => setIsDetails(false)}
              className={
                isDetails
                  ? "food-pagination-btn "
                  : "food-pagination-btn food-pagination-btn-active"
              }
            >
              Your Food
            </button>

            {product.description ? (
              <button
                onClick={() => setIsDetails(true)}
                className={
                  !isDetails
                    ? "food-pagination-btn "
                    : "food-pagination-btn food-pagination-btn-active"
                }
              >
                Details
              </button>
            ) : null}
          </div>

          {isDetails ? null : (
            <Sizes
              sizes={product.sizes}
              category={_titleCase(product.category)}
              setSize={(selectedItem) => _addSize(selectedItem)}
              size={size}
            />
          )}
        </div>

        {isDetails ? null : (
          <Addons
            isAddedAddOn={isAddedAddOn}
            key={currentKey}
            onSelectType={(item, addonData) => _addAddons(item, addonData)}
            addons={product.addons}
            selected={selected}
          />
        )}

        {isDetails ? null : (
          <Common
            key={selected.name}
            setExtraCheese={setExtraCheese}
            extraCheese={extraCheese}
            setItemCount={(added_quantity) => setQuantity(added_quantity)}
            isEdit={cartId ? true : false}
            toppingModal={toppingModal}
            selected={selected}
            quantity={quantity}
            setToppingModal={setToppingModal}
            product={product}
            addProductToCart={() => _addItemToCart()}
            reapeatData={getLastData(selected)}
            addNewData={() => addNewData()}
            repeatLastCartData={() => repeatLastCartData()}
          />
        )}

        {isDetails ? <Details product={product} /> : null}
      </div>
    </div>
  );
};

export default Index;
