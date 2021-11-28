import database from "../../lib/enums/db";
import {
  _getAllCategoriesAndStore,
  _getAllProducts,
  _getLocalProducts,
  _getLocalOfferProducts,
  _getCartsDataFun,
  getMid,
} from "./common";
import { _fetchMenu } from "../api/baseUrls";
import { _intiatDataBase } from "./db";
import { FilterList } from "../enums";
import chunk from "lodash/chunk";
import startCase from "lodash/startCase";
import { successPopup } from "../helpers/popup";
import Router from "next/router";

export const _pushItemFun = (item, carts, setCarts) => {
  let findItem = carts.find((cart) => cart.id == item.id);
  if (typeof findItem === "undefined") {
    let cartsItems = [...carts];
    cartsItems.push(item);
    setCarts(cartsItems);
  } else {
    let items = carts.map((cart) => {
      if (cart.id == item.id) {
        cart.added_quantity = item.added_quantity;
      }
      return cart;
    });
    setCarts(items);
  }
};

export const summery = (carts) => {
  let totalQuantity = 0;
  let totalAmount = 0;
  for (let index = 0; index < carts.length; index++) {
    const element = carts[index];
    totalQuantity += element.added_quantity;
    totalAmount += element.added_quantity * element.price;
  }
  return { totalQuantity, totalAmount };
};

export const _isAddedToCart = (item, carts) => {
  let findItem = carts.find((cart) => cart.id == item.id);
  return findItem ? findItem : item;
};

export const withProductCartData = (product, carts) => {
  let mid = getMid();
  if (product?.is_custome) {
    let findItems = carts.filter((cart) => cart.item_id == product?.id);
    if (findItems.length > 0) {
      let added_quantity = 0;
      for (let index = 0; index < findItems.length; index++) {
        const element = findItems[index];
        added_quantity = added_quantity + element.added_quantity;
      }
      let findItem = { ...findItems[findItems.length - 1], added_quantity };
      return findItem;
    }
  }

  let findItem = carts.find((cart) => cart.id == product?.id);
  return findItem
    ? findItem
    : {
        id: product?.id,
        added_quantity: 0,
        sizes: [],
        addons: [],
        item_id: product?.id,
        name: product?.name,
        price: product?.price,
        mid,
      };
};

export const _getItemId = (product) => {
  let stringId = product.id;
  let split = stringId.split("-")[1];
  let lastItem = parseInt(split) + 1;
  return product.item_id + "-" + lastItem;
};

export const productCartDataUpdate = async (cart_id) => {
  let carts = await _getCartsDataFun();
  return carts;
};

export const productCartData = async (product, onlyObject) => {
  let mid = getMid();
  let carts = await _getCartsDataFun();
  let findItem = carts.filter((cart) => cart.item_id == product.id);
  if (findItem && findItem.length > 0) {
    let item = findItem[findItem.length - 1];
    if (item.is_custome && !onlyObject) {
      let id = _getItemId(item);
      item = { ...item, id };
    }
    return item;
  }
  return {
    id: product.is_custome ? product.id + "-1" : product.id,
    added_quantity: 0,
    item_id: product.id,
    is_reapeat: false,
    sizes: [],
    addons: [],
    name: product.name,
    price: product.price,
    mid,
    image_url: product.image_url,
  };
};

export const getLastData = (selected) => {
  let sizes = selected.sizes;
  let addons = selected.addons;
  if (addons && addons.length > 0) {
    addons = addons[addons.length - 1];
  }
  let sizeString = "";
  let addonsString = "";
  if (selected.sizes) {
    sizes.forEach((element) => {
      sizeString += `, ${element.item_size_name}`;
    });
  }
  if (addons) {
    addons.forEach((el) => {
      addonsString += `, ${el.item_name}`;
    });
  }
  return {
    addonsString,
    sizeString,
  };
};

export const getItemForAction = async (product, isReduce) => {
  let onlyObject = true;
  let filterCartProduct = await productCartData(product, onlyObject);

  let quantity = filterCartProduct.added_quantity - 1;
  if (!isReduce) {
    quantity = filterCartProduct.added_quantity + 1;
  }
  let size = filterCartProduct.sizes[0];
  let sizes = [{ ...size, quantity }];
  let data = { ...filterCartProduct, sizes, added_quantity: quantity };

  return data;
};

export const addProductToCart = async (
  productData,
  showPopup,
  goBack = null
) => {
  return new Promise(async (response, reject) => {
    let db = window.db;
    if (!db) {
      db = await _intiatDataBase();
    }

    let objectStore = db
      .transaction([database.CARTS_DB], "readwrite")
      .objectStore(database.CARTS_DB);
    objectStore.get(productData.id).onsuccess = (event) => {
      let result = event.target.result;
      if (result) {
        if (productData.added_quantity < 1) {
          objectStore.delete(productData.id).onsuccess = (e) => {
            console.log("delete");
          };
        } else {
          objectStore.put(productData).onsuccess = (e) => {
            console.log("updated");
          };
        }
      } else {
        objectStore.add(productData).onsuccess = (e) => {
          console.log("added");
        };
      }
    };

    if (showPopup) {
      let type = "success";
      let title = "Added!";
      let text = "Item added to your cart!";
      successPopup(type, title, text);
    }

    if (goBack) {
      goBack();
    }
    response(true);
  });
};

export const _products = (products) => {
  let length = Math.ceil(products.length / 2);
  let chunksProducts = [];
  let smallChunk = [];
  for (let index = 0; index < products.length; index++) {
    const element = products[index];
    let length = element.name.length;
    if (length > 32) {
      smallChunk = [];
      chunksProducts.push([element]);
    } else {
      if (smallChunk.length == 1) {
        smallChunk.push(element);
        chunksProducts.push(smallChunk);
        smallChunk = [];
      } else {
        smallChunk.push(element);
      }
    }
  }

  return chunksProducts;
  return chunk(products, length);
};

export const _getCartsFun = async (setCarts, goBack = null) => {
  return new Promise(async (response, reject) => {
    setTimeout(async () => {
      let db = window.db;
      if (!db) {
        db = await _intiatDataBase();
      }
      let objectStore = db
        .transaction(database.CARTS_DB)
        .objectStore(database.CARTS_DB);
      objectStore.getAll().onsuccess = function (event) {
        if (setCarts) {
          setCarts(event.target.result);
          if (goBack) {
            if (event.target.result && event.target.result.length == 0) {
              Router.back();
            }
          }
          return event.target.result;
        }
      };
      response(true);
    }, 1000);
  });
};

export const _addCartFun = async (item, carts, setCarts, isAdd = false) => {
  if (isAdd) {
    item.added_quantity = item.added_quantity + 1;
  } else {
    item.added_quantity = item.added_quantity - 1;
  }

  let db = window.db;
  if (!db) {
    db = await _intiatDataBase();
  }

  let objectStore = db
    .transaction([database.CARTS_DB], "readwrite")
    .objectStore(database.CARTS_DB);
  objectStore.get(item.id).onsuccess = (event) => {
    let result = event.target.result;
    if (result) {
      if (item.added_quantity < 1) {
        objectStore.delete(item.id).onsuccess = (e) => {
          const filteredItems = carts.filter((cart) => item.id !== cart.id);
          setCarts(filteredItems);
          console.log("delete");
        };
      } else {
        objectStore.put(item).onsuccess = (e) => {
          _pushItemFun(item, carts, setCarts);
          console.log("updated");
        };
      }
    } else {
      objectStore.add(item).onsuccess = (e) => {
        console.log("added");
        _pushItemFun(item, carts, setCarts);
      };
    }
  };
};

export const _filterProducts = async (
  setProducts,
  catID,
  vegOnly,
  includeEgg,
  offers
) => {
  if (offers) {
    let offerFilterProducts = await _getLocalOfferProducts();
    setProducts(offerFilterProducts);
    return;
  }
  let filterProducts = await _getLocalProducts();
  if (catID !== null) {
    if (catID == FilterList.BEST_SELLER_ID) {
      filterProducts = filterProducts.filter((prod) => prod.is_best_seller);
    } else {
      filterProducts = filterProducts.filter(
        (prod) => prod.category_id == catID
      );
    }
  }

  if (vegOnly && includeEgg) {
    filterProducts = filterProducts.filter(
      (prod) =>
        prod.item_type == FilterList.VEG_ONLY ||
        prod.item_type == FilterList.INCLUDE_EGG
    );
  } else if (vegOnly && !includeEgg) {
    filterProducts = filterProducts.filter(
      (prod) => prod.item_type == FilterList.VEG_ONLY
    );
  } else if (!vegOnly && includeEgg) {
    filterProducts = filterProducts.filter(
      (prod) => prod.item_type == FilterList.INCLUDE_EGG
    );
  }

  setProducts(filterProducts);
};

export const _getProductData = async (id) => {
  let filterProducts = await _getLocalProducts();
  let product = filterProducts.filter((product) => product.id == id);

  if (product.length > 0) {
    return product[0];
  } else {
    filterProducts = await _getLocalOfferProducts();
    product = filterProducts.filter((product) => product.id == id);
    if (product.length > 0) {
      return product[0];
    }
  }

  return {};
};

export const isVegOnly = (product) => {
  return product.item_type == FilterList.VEG_ONLY;
};

export const isNonVegOnly = (product) => {
  return product.item_type == FilterList.INCLUDE_EGG;
};

export const isBestSeller = (product) => {
  return product.item_type == FilterList.BEST_SELLER_ID;
};

export const _searchProducts = async (text, setProducts, isGrocery) => {
  let filterProducts = await _getLocalProducts();

  if (isGrocery) {
    let subCategoryProducts = [];
    filterProducts.forEach((subCategory) => {
      subCategoryProducts = [...subCategoryProducts, ...subCategory?.products];
    });

    if (!text) {
      setProducts(filterProducts);
      return;
    }

    filterProducts = subCategoryProducts.filter((product) => {
      let index = product.name.toLowerCase().search(text.toLowerCase());
      if (index > -1) {
        return product;
      }
    });
    setProducts(filterProducts);
  } else {
    if (!text) {
      setProducts(filterProducts);
      return;
    }
    filterProducts = filterProducts.filter((product) => {
      let index = product.name.toLowerCase().search(text.toLowerCase());
      if (index > -1) {
        return product;
      }
    });
    setProducts(filterProducts);
  }
};

export const _titleCase = (title) => {
  return startCase(title);
};
