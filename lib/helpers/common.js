import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  _categoriesUrl,
  _menuUrl,
  _fetchMenu,
  _apaFetchRestaurants,
  _fetchGroceryMenu,
  baseLocalURL,
} from "../../lib/api/baseUrls";
import sampleSize from "lodash/sampleSize";
import database from "../../lib/enums/db";
import axios from "axios";
import { _intiatDataBase } from "./db";
import {
  getType,
  shopType,
  OrderTypeEnums,
  OrderStatusMap,
  PositionMap,
  OrderChanged,
} from "../enums";
import {
  promotionalDataDispatch,
  setPromotionalPopupDispatch,
} from "./storeDispatch";
import { _getOfferType } from "./offer";
import loaderAction from "./loader";
import ImageConst from "../../utils/ImageConst";
import Router from "next/router";
// import Swal from 'sweetalert2'
import cookies from "js-cookie";
import { dispatchStoreDeliveryType } from "./storeDispatch";

const _updateAdd = (product, objectStore) => {
  if (!product.id) return;
  objectStore.get(product.id).onsuccess = (event) => {
    let result = event.target.result;
    if (result) {
      objectStore.put(product).onsuccess = (e) => {};
    } else {
      objectStore.add(product).onsuccess = (e) => {};
    }
  };
};

export const onPuhsClick = (product, item_id, cart_id) => {
  let id = product.id;
  let url = "/product-detail/" + id;
  if (item_id) {
    url = `/product-detail/${item_id}?edit=${cart_id}`;
  }
  if (product.is_custome) {
    Router.push(url);
    return;
  }
  if (product.image_url) {
    try {
      let http = new XMLHttpRequest();
      http.open("HEAD", product.image_url, false);
      http.send();

      if (http.status == 200) {
        Router.push(url);
      }
    } catch (error) {}
  }
};

export const _getLocalUpis = async () => {
  return new Promise(async (res, reject) => {
    try {
      let db = window.db;
      if (!db) {
        db = await _intiatDataBase();
      }

      let objectStore = db
        .transaction(database.UPI_DB)
        .objectStore(database.UPI_DB);
      objectStore.getAll().onsuccess = function (event) {
        return res(event.target.result);
      };
    } catch (error) {
      console.log(error);
      reject([]);
    }
  });
};

export const _addUpi = (upi) => {
  let products = [
    {
      id: upi,
      upi,
    },
  ];
  let objectStoreData = db
    .transaction([database.UPI_DB], "readwrite")
    .objectStore(database.UPI_DB);
  for (let index = 0; index < products.length; index++) {
    const element = products[index];
    _updateAdd(element, objectStoreData);
  }
};

export const _getLocalCategory = () => {
  return new Promise(async (res, reject) => {
    try {
      let db = window.db;
      if (!db) {
        db = await _intiatDataBase();
      }

      let objectStore = db
        .transaction([database.CATEGORIES_DB], "readwrite")
        .objectStore(database.CATEGORIES_DB);
      objectStore.getAll().onsuccess = function (event) {
        return res(event.target.result);
      };
    } catch (error) {
      console.log(error);
      reject([]);
    }
  });
};

export const _getAllCategoriesAndStore = async (setCategories) => {
  return new Promise(async (res, reject) => {
    try {
      let localRes = await _getLocalCategory();
      if (localRes.length > 0) {
        if (setCategories) {
          setCategories(localRes);
        }
      }

      let slug = "slug";
      let url = _categoriesUrl(slug);
      let response = await axios.get(url);
      let categories = response.data.data;
      if (setCategories) {
        setCategories(categories);
      }

      let db = window.db;
      if (!db) {
        db = await _intiatDataBase();
      }

      let objectStore = db
        .transaction([database.CATEGORIES_DB], "readwrite")
        .objectStore(database.CATEGORIES_DB);
      categories.forEach(function (cat) {
        _updateAdd(cat, objectStore);
      });
      return res(categories);
    } catch (error) {
      console.log(error);
      return reject([]);
    }
  });
};

export const _getLocalProducts = () => {
  return new Promise(async (res, reject) => {
    try {
      let db = window.db;
      if (!db) {
        db = await _intiatDataBase();
      }

      let objectStore = db
        .transaction([database.PRODUCTS_DB], "readwrite")
        .objectStore(database.PRODUCTS_DB);
      objectStore.getAll().onsuccess = function (event) {
        return res(event.target.result);
      };
    } catch (error) {
      console.log(error);
      reject([]);
    }
  });
};

export const _getLocalCarts = () => {
  return new Promise(async (res, reject) => {
    try {
      let db = window.db;
      if (!db) {
        db = await _intiatDataBase();
      }

      let objectStore = db
        .transaction([database.CARTS_DB], "readwrite")
        .objectStore(database.CARTS_DB);
      objectStore.getAll().onsuccess = function (event) {
        return res(event.target.result);
      };
    } catch (error) {
      console.log(error);
      reject([]);
    }
  });
};

export const _getLocalStoreData = () => {
  return new Promise(async (res, reject) => {
    try {
      let db = window.db;
      if (!db) {
        db = await _intiatDataBase();
      }

      let objectStore = db
        .transaction([database.STORE_DB], "readwrite")
        .objectStore(database.STORE_DB);
      objectStore.getAll().onsuccess = function (event) {
        return res(event.target.result);
      };
    } catch (error) {
      console.log(error);
      reject([]);
    }
  });
};

export const _getLocalOfferProducts = () => {
  return new Promise(async (res, reject) => {
    try {
      let db = window.db;
      if (!db) {
        db = await _intiatDataBase();
      }

      let objectStore = db
        .transaction([database.PRODUCTS_OFFER_DB], "readwrite")
        .objectStore(database.PRODUCTS_OFFER_DB);
      objectStore.getAll().onsuccess = function (event) {
        return res(event.target.result);
      };
    } catch (error) {
      console.log(error);
      reject([]);
    }
  });
};

export const _getCartsDataFun = async () => {
  return new Promise(async (res, reject) => {
    try {
      let db = window.db;
      if (!db) {
        db = await _intiatDataBase();
      }

      let objectStore = db
        .transaction(database.CARTS_DB)
        .objectStore(database.CARTS_DB);
      objectStore.getAll().onsuccess = function (event) {
        return res(event.target.result);
      };
    } catch (error) {
      console.log(error);
      reject([]);
    }
  });
};

const _pushGroceryItemToProduct = (itemSections) => {
  const categories = [];
  const subCategoryProducts = {};

  itemSections.forEach(
    ({ category_id, category_name, image_url, sub_categories }) => {
      categories.push({
        id: category_id,
        name: category_name,
        image_url,
        sub_category_ids: sub_categories.map(
          (sub_category) => sub_category.sub_category_id
        ),
      });
      sub_categories.forEach(
        ({ sub_category_id, image_url, products, sub_category_name }) => {
          subCategoryProducts[sub_category_id] = {
            image_url,
            products,
            sub_category_name,
          };
        }
      );
    }
  );
  return {
    categories,
    subCategoryProducts,
  };
};

export const _getTitleFirsLast = (title) => {
  let splitsWord = title.split(" ", 2);
  let image = title[0];
  if (splitsWord.length > 1) {
    image = title[0] + splitsWord[1][0];
  }
  return image.toUpperCase();
};

const _pushItemToProduct = (
  itemLists,
  categories,
  bestSellerCat,
  catId,
  mid,
  business_id,
  flowType = 11
) => {
  let products = [];
  for (let index = 0; index < itemLists.length; index++) {
    catId++;
    const category = itemLists[index];
    categories.push({
      id: catId,
      name: category.category_name,
      mid,
      business_id,
      image_url: category.category_image_url,
      text_image: _getTitleFirsLast(category.category_name),
    });

    for (let pIndex = 0; pIndex < category.category_items.length; pIndex++) {
      let product = category.category_items[pIndex];
      let isBestSeller = bestSellerCat == category.category_name;
      let is_custome = false;
      if (product.addons.length > 0 || product.sizes.length > 0) {
        is_custome = true;
      }
      product = {
        ...product,
        category_name: category.category_name,
        is_best_seller: isBestSeller,
        category: category.category_name,
        category_id: catId,
        rating: 0,
        id: product.item_id,
        item_type_name: product.item_type,
        item_type: getType(product.item_type),
        price: product.item_price,
        name: product.item_name,
        added_quantity: 0,
        is_custome,
        mid,
        business_id,
        flowType,
      };
      if (
        product.is_custome &&
        product.addons.length > 0 &&
        product.sizes.length > 0
      ) {
        // console.log(product)
      }
      products.push(product);
    }
  }

  return { products, categories };
};

export const _getStoreData = async () => {
  let localRes = await _getLocalStoreData();
  if (localRes.length > 0) {
    return localRes[0];
  }
  return {};
};

export const isGroceryFun = (flow) => {
  if (shopType.GROCERY == flow) {
    return true;
  }
  return false;
};

export const _clearCart = async () => {
  localStorage.removeItem("type");

  let carts = await _getLocalCarts();
  if (carts && carts && carts.length > 0) {
    let objectStoreData = db
      .transaction([database.CARTS_DB], "readwrite")
      .objectStore(database.CARTS_DB);
    for (let index = 0; index < carts.length; index++) {
      const element = carts[index];
      objectStoreData.delete(element.id).onsuccess = (e) => {
        console.log("delete");
      };
    }
  }
};

export const _checkStoreOld = async (mid) => {
  let localMid = getMid();

  if (localMid != mid) {
    _clearCart();
  }

  let lacalProducts = await _getLocalProducts();
  if (lacalProducts && lacalProducts.length > 0) {
    let products = lacalProducts.filter((storeData) => storeData.mid != mid);
    let objectStoreData = db
      .transaction([database.PRODUCTS_DB], "readwrite")
      .objectStore(database.PRODUCTS_DB);
    for (let index = 0; index < products.length; index++) {
      const element = products[index];
      objectStoreData.delete(element.id).onsuccess = (e) => {
        console.log("delete");
      };
    }
  }

  let lacalOfferProducts = await _getLocalOfferProducts();
  if (lacalOfferProducts && lacalOfferProducts.length > 0) {
    let products = lacalProducts.filter((storeData) => storeData.mid != mid);
    let objectStoreData = db
      .transaction([database.PRODUCTS_OFFER_DB], "readwrite")
      .objectStore(database.PRODUCTS_OFFER_DB);
    for (let index = 0; index < products.length; index++) {
      const element = products[index];
      objectStoreData.delete(element.id).onsuccess = (e) => {
        console.log("delete");
      };
    }
  }

  let lacalCategories = await _getLocalCategory();
  if (lacalCategories && lacalCategories.length > 0) {
    let products = lacalCategories.filter((storeData) => storeData.mid != mid);
    let objectStoreData = db
      .transaction([database.CATEGORIES_DB], "readwrite")
      .objectStore(database.CATEGORIES_DB);
    for (let index = 0; index < products.length; index++) {
      const element = products[index];
      objectStoreData.delete(element.id).onsuccess = (e) => {
        console.log("delete");
      };
    }
  }

  let localRes = await _getLocalStoreData();
  if (localRes && localRes && localRes.length > 0) {
    let stores = localRes.filter((storeData) => storeData.mid != mid);
    let objectStoreData = db
      .transaction([database.STORE_DB], "readwrite")
      .objectStore(database.STORE_DB);

    for (let index = 0; index < stores.length; index++) {
      const element = stores[index];
      objectStoreData.delete(element.id).onsuccess = (e) => {
        console.log("delete");
      };
    }
  }
};

export const _isSameStore = async (mid) => {
  return new Promise(async (response, reject) => {
    try {
      let storeData = await _getStoreData();
      // _getOfferType(storeData)
      let isSameStore = true;
      let localMid = 0;
      if (storeData && storeData.mid) {
        localMid = storeData.mid;
      }
      if (localMid != mid) {
        isSameStore = false;
      }
      response(isSameStore);
    } catch (error) {
      response(false);
    }
  });
};

export const _fetchMenuProductsCategory = async (
  mid,
  setCategories,
  setProducts,
  flowType,
  idOnly
) => {
  return new Promise(async (res, reject) => {
    try {
      let catId = 0;
      let offerCatId = 0;
      _checkStoreOld(mid);

      let isSameStore = await _isSameStore(mid);

      let localResProduct = await _getLocalProducts();
      if (localResProduct.length > 0 && isSameStore) {
        let localResProduct = await _getLocalProducts();
        if (setProducts) {
          setProducts(localResProduct);
          loaderAction(false);
        }
      }

      let localResCategory = await _getLocalCategory();
      if (localResCategory.length > 0 && isSameStore) {
        if (setCategories) {
          let storeData = await _getStoreData();
          localResCategory.unshift({
            id: catId,
            name: "best seller",
            mid: storeData.mid,
            business_id: storeData.business_id,
            text_image: "BS",
            image_url: ImageConst.bestSeller,
          });
          setCategories(localResCategory);
        }
      }

      let url = _fetchMenu();
      let payload = {
        url,
        payload: {
          mid,
        },
      };

      if (idOnly) {
        url = _apaFetchRestaurants();
        payload = {
          url,
          payload: {
            id: mid,
          },
        };
      }

      const response = await axios.post(baseLocalURL, payload);
      let responseData = response.data.data.data;
      let responseDataStatus = response.data.data;

      if (!responseDataStatus.success) {
        // loaderAction(false)
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: responseDataStatus.message,
        // }).then(() => {
        //     Router.back()
        // })
        reject({
          categories: [],
          products: [],
        });
        return;
      }
      let promotional_offers = [];
      if (
        responseData.promotional_offers &&
        Array.isArray(responseData.promotional_offers) &&
        responseData.promotional_offers.length > 0
      ) {
        // setPromotionalOffers(responseData.promotional_offers)
        promotionalDataDispatch(responseData.promotional_offers);
        promotional_offers = responseData.promotional_offers;
        setPromotionalPopupDispatch(true);
      }

      let itemLists = responseData.item_lists;
      let bestSellers = responseData.best_sellers;
      let offer_items = [responseData.offer_items];
      let id = responseData.id;
      let stroeData = {
        ...responseData.store_details,
        promotional_data: responseData.promotional_data,
        promotional_offers,
      };

      let flow = responseData.flow;

      stroeData = {
        ...stroeData,
        id: stroeData.business_id,
        mid,
        req_id: id,
        flow,
      };
      let business_id = stroeData.business_id;
      stroeData = [stroeData];
      let categoriesOffers = [];

      let bestSellerCat = "";
      if (bestSellers) {
        bestSellerCat = bestSellers.category_name;
      }

      let categories = [];
      let products = [];
      let offerProducts = [];
      let storeData = {};

      categories.unshift({
        id: catId,
        name: "best seller",
        mid,
        business_id,
        text_image: "BS",
        image_url: ImageConst.bestSeller,
      });

      let data = _pushItemToProduct(
        itemLists,
        categories,
        bestSellerCat,
        catId,
        mid,
        business_id,
        flowType
      );
      let offerItemData = _pushItemToProduct(
        offer_items,
        categoriesOffers,
        bestSellerCat,
        offerCatId,
        mid,
        business_id,
        flowType
      );

      categories = data.categories;
      products = data.products;
      offerProducts = offerItemData.products;
      storeData = responseData.store_details;

      dispatchStoreDeliveryType(storeData.delivery_type);

      // for (let index = 0; index < itemLists.length; index++) {
      //     catId++
      //     const category = itemLists[index]
      //     categories.push({
      //         id: catId,
      //         name: category.category_name
      //     })
      //     for (let pIndex = 0; pIndex < category.category_items.length; pIndex++) {
      //         let product = category.category_items[pIndex]
      //         let isBestSeller = bestSellerCat == category.category_name
      //         let is_custome = false
      //         if (product.addons.length > 0 || product.sizes.length >0 ) {
      //             is_custome = true
      //         }
      //         product = {...product, category_name: category.category_name,
      //             is_best_seller: isBestSeller,
      //             category: category.category_name,
      //             category_id: catId,
      //             rating: 0,
      //             id: product.item_id,
      //             item_type_name: product.item_type,
      //             item_type: getType(product.item_type),
      //             price: product.item_price,
      //             name: product.item_name,
      //             added_quantity: 0,
      //             is_custome
      //         }
      //         products.push(product)
      //         if (product.addons.length > 0 && product.sizes.length > 0) {
      //             console.log(product.id)
      //         }
      //     }
      // }

      setCategories(categories);
      setProducts(products);

      let objectStore = db
        .transaction([database.CATEGORIES_DB], "readwrite")
        .objectStore(database.CATEGORIES_DB);
      categories.forEach(function (cat) {
        _updateAdd(cat, objectStore);
      });

      let objectStoreProduct = db
        .transaction([database.PRODUCTS_DB], "readwrite")
        .objectStore(database.PRODUCTS_DB);
      products.forEach(function (product) {
        _updateAdd(product, objectStoreProduct);
      });
      loaderAction(false);
      let objectStoreOfferProduct = db
        .transaction([database.PRODUCTS_OFFER_DB], "readwrite")
        .objectStore(database.PRODUCTS_OFFER_DB);
      offerProducts.forEach(function (product) {
        _updateAdd(product, objectStoreOfferProduct);
      });

      let objectStoreData = db
        .transaction([database.STORE_DB], "readwrite")
        .objectStore(database.STORE_DB);
      stroeData.forEach(function (product) {
        _updateAdd(product, objectStoreData);
      });

      res({
        categories,
        products,
        offerProducts,
        storeData,
      });
    } catch (error) {
      console.log(error);
      reject({
        categories: [],
        products: [],
      });
    }
  });
};

export const _fetchMenuProductsCategoryByMidOnlyResponse = async (
  mid,
  flowType
) => {
  return new Promise(async (res, reject) => {
    try {
      let catId = 0;
      let offerCatId = 0;
      _checkStoreOld(mid);

      let url = _fetchMenu();
      const response = await axios.post(baseLocalURL, {
        payload: {
          mid,
        },
        url,
      });

      let responseData = response.data.data.data;

      let promotional_offers = [];
      if (
        responseData.promotional_offers &&
        Array.isArray(responseData.promotional_offers) &&
        responseData.promotional_offers.length > 0
      ) {
        promotional_offers = responseData.promotional_offers;
      }

      let itemLists = responseData.item_lists;
      let bestSellers = responseData.best_sellers;
      let offer_items = [responseData.offer_items];
      let id = responseData.id;
      let storeData = {
        ...responseData.store_details,
        promotional_data: responseData.promotional_data,
        promotional_offers,
      };
      let flow = responseData.flow;
      storeData = {
        ...storeData,
        id: storeData.business_id,
        mid,
        req_id: id,
        flow,
      };
      let business_id = storeData.business_id;

      let categoriesOffers = [];

      let bestSellerCat = "";
      if (bestSellers) {
        bestSellerCat = bestSellers.category_name;
      }

      let categories = [];
      let products = [];
      let offerProducts = [];

      categories.unshift({
        id: catId,
        name: "best seller",
        mid,
        business_id,
        text_image: "BS",
        image_url: ImageConst.bestSeller,
      });

      let data = _pushItemToProduct(
        itemLists,
        categories,
        bestSellerCat,
        catId,
        mid,
        business_id,
        flowType
      );
      let offerItemData = _pushItemToProduct(
        offer_items,
        categoriesOffers,
        bestSellerCat,
        offerCatId,
        mid,
        business_id,
        flowType
      );

      categories = data.categories;
      products = data.products;
      offerProducts = offerItemData.products;

      res({
        categories,
        products,
        offerProducts,
        storeData,
      });
    } catch (error) {
      console.log(error);
      res({
        categories: [],
        products: [],
        storeData: {},
      });
    }
  });
};

export const _fetchGroceryProductMenu = async (
  mid,
  setCategories,
  setSubCategoryProducts,
  setResponseMeta,
  idOnly
) => {
  return new Promise(async (res, reject) => {
    try {
      let isSameStore = await _isSameStore(mid);
      let localResProduct = await _getLocalProducts();
      // TODO: Optimize this. Pick it from indexedDB
      if (localResProduct.length > 0 && isSameStore) {
        if (setSubCategoryProducts) {
          const prods = {};
          localResProduct.forEach((prod) => {
            prods[prod.id] = prod;
          });
          setSubCategoryProducts(prods);
          loaderAction(false);
        }
      }

      let localResCategory = await _getLocalCategory();
      if (localResCategory.length > 0 && isSameStore) {
        if (setCategories) {
          setCategories(localResCategory);
        }
      }

      let url = _fetchGroceryMenu();
      let response;
      const MOCK_GROCERY_MENU = false;
      let payload = {
        payload: {
          mid,
        },
        url,
      };
      if (MOCK_GROCERY_MENU) {
        response = {
          data: {
            data: grocery_menu,
          },
        };
      } else {
        if (idOnly) {
          payload = {
            url,
            payload: {
              id: mid,
            },
          };
        }

        response = await axios.post(baseLocalURL, payload);
        let storeData = response.data.data.data.store_details;
        dispatchStoreDeliveryType(storeData.delivery_type);
      }

      console.log(response.data.data);
      let resData = response.data.data;
      if (!resData.success) {
        const rejectRes = {
          error: true,
          message: resData.message,
        };
        // loaderAction(false)
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: resData.message,
        // }).then(() => {
        //     Router.back()
        // })
        setResponseMeta(rejectRes);
        reject({
          categories: [],
          products: [],
        });
        return;
      } else {
        setResponseMeta({
          error: false,
        });
      }

      let data = _pushGroceryItemToProduct(response.data.data.data.section);
      let flow = response.data.data.data.flow;
      const { categories, subCategoryProducts } = data;
      setCategories(categories);
      setSubCategoryProducts(subCategoryProducts);

      let objectStore = db
        .transaction([database.CATEGORIES_DB], "readwrite")
        .objectStore(database.CATEGORIES_DB);
      categories.forEach(function (cat) {
        _updateAdd(cat, objectStore);
      });

      let objectStoreProduct = db
        .transaction([database.PRODUCTS_DB], "readwrite")
        .objectStore(database.PRODUCTS_DB);
      Object.entries(subCategoryProducts).forEach(function ([id, subcat]) {
        _updateAdd(
          {
            ...subcat,
            id,
          },
          objectStoreProduct
        );
      });

      loaderAction(false);

      let objectStoreData = db
        .transaction([database.STORE_DB], "readwrite")
        .objectStore(database.STORE_DB);
      _updateAdd(
        { ...response.data.data.data.store_details, id: mid, flow },
        objectStoreData
      );
      res({
        categories,
        subCategoryProducts,
      });
    } catch (error) {
      console.log(error);
      reject({
        categories: [],
        products: [],
      });
      loaderAction(false);
    }
  });
};

export const _getAllProducts = async (setProducts = null, catId = 0) => {
  return new Promise(async (res, reject) => {
    try {
      let localRes = await _getLocalProducts();
      if (localRes.length > 0) {
        if (setProducts) {
          setProducts(localRes);
        }
      }
      let slug = "slug";
      let url = _menuUrl(slug);
      let response = await axios.get(url);
      let products = response.data.data.products;

      if (setProducts) {
        setProducts(products);
      }

      let db = window.db;
      if (!db) {
        db = await _intiatDataBase();
      }

      let objectStore = db
        .transaction([database.PRODUCTS_DB], "readwrite")
        .objectStore(database.PRODUCTS_DB);
      products.forEach(function (product) {
        _updateAdd(product, objectStore);
      });
      return res(products);
    } catch (error) {
      console.log(error);
      return reject([]);
    }
  });
};

export const _getSuggestedProducts = async (setProducts) => {
  return new Promise(async (res, reject) => {
    try {
      let products = [];
      let localRes = await _getLocalProducts();
      if (localRes.length > 0) {
        for (let index = 0; index < localRes.length; index++) {
          const element = localRes[index];
          if (!element.is_custome) {
            products.push(element);
          }
        }
      }
      const random = sampleSize(products, 18);
      setProducts(random);
      return res(products);
    } catch (error) {
      console.log(error);
      return reject([]);
    }
  });
};

export const _pushMenu = ({ flowId, mid, tableNo }) => {
  // mid = "25BCABC4"
  let url = process.env.NEXT_PUBLIC_OYETI_BASE_URL;
  mid = "17849628";
  let token = tableNo
    ? btoa(`${flowId}/${mid}/${tableNo}`)
    : btoa(`${flowId}/${mid}`);
  let baseURL = url + `store/${token}/loading`;
  window.location.href = baseURL;
};

export const _navigatePage = () => {
  let url = process.env.NEXT_PUBLIC_OYETI_BASE_URL;
  let baseURL = url + `pay`;
  window.location.replace(baseURL);
};

export const getMid = () => {
  let mid = localStorage.getItem("mid");
  return mid ? mid : "";
};

export const setMid = (mid) => {
  return localStorage.setItem("mid", mid);
};

export const getTable = () => {
  let table_no = localStorage.getItem("table_no");
  return table_no ? table_no : "";
};

export const setTable = (table_no) => {
  return localStorage.setItem("table_no", table_no);
};

export const getAuth = (setAuth) => {
  let userString = localStorage.getItem("user");
  if (!userString) {
    return {};
  }
  let user = JSON.parse(userString);
  if (setAuth) {
    setAuth(user);
  }
  return user;
};

export const setAuth = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const logOutAuth = () => {
  localStorage.removeItem("user");
  return true;
};

export const _isValidNumberInput = (newPhone, oldPhone, maxLength) => {
  let pattern = /^\d+$/;

  if (pattern.test(newPhone) && newPhone) {
    if (!oldPhone && newPhone == 0) {
      return false;
    }

    if (oldPhone && newPhone.length > maxLength) {
      return false;
    }

    let test = parseFloat(newPhone);

    if (isNaN(test)) {
      return false;
    }

    return true;
  } else {
    if (newPhone == "") {
      return true;
    }
  }

  return false;
};

export const getModifiedOrderAttribute = (product) => {
  if (product.alt_name) return OrderChanged.Item;
  if (
    product.processed_price !== product.price &&
    product.ordered_qty !== product.processed_qty
  )
    return OrderChanged.Both;
  if (product.ordered_qty !== product.processed_qty)
    return OrderChanged.Quantity;
  if (product.processed_price !== product.price) return OrderChanged.Price;
  return "";
};

export const _getGroceryBillingData = (
  orderInfo,
  setBillingData,
  discount = 0
) => {
  if (!orderInfo.items) return;

  const billingData = [];

  const products = [];

  orderInfo.items.forEach((item) => {
    item.sub_categories.forEach((subCategory) => {
      subCategory?.products.forEach((product) => {
        products.push(product);
      });
    });
  });
  const itemTotal = products.reduce((acc, product) => {
    return acc + product.processed_price * product.processed_qty;
  }, 0);

  billingData.push({
    amount: itemTotal,
    label: "Item Total",
    id: "item_total",
  });

  let total_price =
    orderInfo.total_price +
    orderInfo.total_delivery_charge +
    orderInfo.total_packing_charge -
    discount;

  billingData.push({
    amount: total_price,
    label: "Total Amount",
    id: "total",
  });

  billingData.push({
    amount: orderInfo.total_discounted_price + discount,
    label: "Coupon/Discount",
    id: "dicount",
  });

  if (orderInfo.delivery_type === OrderTypeEnums["Home"]) {
    billingData.push({
      amount: orderInfo.total_delivery_charge,
      label: "Delivery Charges",
      id: "delivery_charge",
    });
  }

  billingData.push({
    amount: orderInfo.total_packing_charge,
    label: "Packing Charges",
    id: "packing_charge",
  });

  billingData.push({
    amount: orderInfo.total_gst,
    label: "Tax",
    id: "tax",
  });

  setBillingData(billingData);
};

export const getGroceryProductsGroupByCategory = (
  categories,
  carts,
  setProductsbyCategory
) => {
  const categoriesBucket = {};
  if (carts.length === 0) return;

  carts.forEach(({ meta, ...restProps }) => {
    if (meta) {
      if (categoriesBucket[meta.category_id]) {
        categoriesBucket[meta.category_id].push({ meta, ...restProps });
      } else {
        categoriesBucket[meta.category_id] = [{ meta, ...restProps }];
      }
    }
  });

  const productsCategoryBuckets = [];
  Object.entries(categoriesBucket).forEach(([categoryId, categoryBucket]) => {
    const bucket = {};
    const cat = categories.find(
      (category) => category.id === parseInt(categoryId)
    );
    if (cat) {
      bucket["name"] = cat.name;
      bucket["products"] = categoryBucket;
      productsCategoryBuckets.push(bucket);
    }
  });
  setProductsbyCategory(productsCategoryBuckets);
};

export const _image = (firstLast) => {
  // const theme = useSelector((state) => state.theme);

  return (
    <div
      style={{
        borderRadius: "50%",
        border: "hidden !important",
        width: "43pt",
        height: "43pt",
        background: "#E0E5EC",
        boxShadow:
          "-9px -9px 16px rgba(255, 255, 255, 0.35), 9px 9px 16px rgba(163, 177, 198, 0.35)",
        textAlign: "center",
        color: "#48647D",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 800,
        fontSize: "15px",
      }}
    >
      {firstLast}
    </div>
  );
};

export const getStatusString = (status) => {
  let data = OrderStatusMap.find((order) => order.id == status);
  if (data) {
    return data.title;
  }
  return "";
};

export const getStatusStringPosition = (status, position) => {
  let data = OrderStatusMap.find((order) => order.id == status);
  let postionData = PositionMap.find((p) => p.id == position);
  let statusString = "";
  if (data && postionData) {
    for (let index = 0; index < postionData.positions.length; index++) {
      const element = postionData.positions[index];
      if (element == status) {
        statusString = data.title;
      }
    }
  }
  return statusString;
};

export const getStatusStringClass = (status, position) => {
  let data = OrderStatusMap.find((order) => order.id == status);
  let postionData = PositionMap.find((p) => p.id == position);
  let statusString = "t-dot t-dot-full";
  if (data && postionData) {
    for (let index = 0; index < postionData.positions.length; index++) {
      const element = postionData.positions[index];
      if (element == status) {
        statusString = data.title;
      }
    }
  }
  return statusString;
};
