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
  _getItemId,
  getLastData,
} from "../../lib/helpers/menu";
import { useRouter } from "next/router";

let showPopup = true;

const Index = ({ product, cartId }) => {
  const router = useRouter();

  const [toppingModal, setToppingModal] = useState(false);
  const [isDetails, setIsDetails] = useState(false);
  const [size, setSize] = useState(null);
  const [extraCheese, setExtraCheese] = useState(false);
  const [selected, setSelected] = useState({});
  const [currentKey, setCurrentKey] = useState(1);
  const [isAddedAddOn, setIsAddedAddOn] = useState(false);
  const [quantity, setQuantity] = useState(1);

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
    filterCartProduct();
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
            onSelectType={(item, position) => _addAddons(item, position)}
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
