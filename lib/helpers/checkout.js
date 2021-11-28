import {
  _getAllCategoriesAndStore,
  _getAllProducts,
  _getLocalProducts,
  _getLocalOfferProducts,
  _getStoreData,
  _getCartsDataFun,
  getMid,
  getAuth,
  _addUpi,
  _getLocalUpis,
  isGroceryFun,
  getTable,
  _clearCart,
} from "./common";
import {
  currency,
  businessTypes,
  timeslot,
  appId,
  app_Type,
  api_mode,
  requestType,
  OrderTypeEnums,
  GROCERY_ORDER_STATUSES,
  GROCERY_ORDER_STATUSES_NEW,
  promotionalTypes,
} from "../enums";
import {
  updateOrder,
  updateOrderNa,
  apiTest,
  aplBalance,
  applyCouponAPI,
  placeGroceryOrder,
  baseLocalURL,
  baseLocalURLForm,
} from "../api/baseUrls";
import storeDispatchCheckout from "./storeDispatch";
import { _checkMinAmount, _checkDistance } from "./checkoutCalculation";
import { _getToken } from "../../middleware/auth";
import loaderAction from "./loader";
import Router from "next/router";
import axios from "axios";
import { errorPopup, successPopup } from "./popup";
import { _calculatePromotionalOffer, _getOfferType } from "./offer";
import { _getOrderType } from "./login";

let title = "Opps!";
let text = "Something went wrong, please try again!";
let type = "error";

export const confirmOrder = async (isLoader, setLoader) => {
  let carts = await _getCartsDataFun();
  let storeData = await _getStoreData();
  let userString = localStorage.getItem("user");
  let user = JSON.parse(userString);
};

export const orderTypeString = (type) => {
  if (type == OrderTypeEnums.DineIn) {
    return "Dine In";
  }

  if (type == OrderTypeEnums.Home) {
    return "Home";
  }

  if (type == OrderTypeEnums.Pickup) {
    return "Pickup";
  }

  if (type == OrderTypeEnums.SelfPickup) {
    return "Call Waiter";
  }
};

export const _applyCoupon = async (
  coupon_code,
  amount,
  id,
  onSuccess,
  isGrocery = false
) => {
  try {
    loaderAction(true);
    let url = applyCouponAPI();
    let payloadData = {
      amount,
      coupon_code,
    };

    if (isGrocery) {
      payloadData["code"] = id;
    } else {
      payloadData["id"] = id;
    }

    let payload = {
      url,
      type: requestType.Coupon,
      payload: payloadData,
    };
    let response = await axios.post(baseLocalURLForm, payload);
    let data = response.data.data;
    if (data.discount) {
      successPopup(
        null,
        null,
        `Successfully coupon apply, you saved ${data.discount}`
      );
      onSuccess(coupon_code, data.discount);
    } else {
      text = data.message;
      errorPopup(type, title, text);
    }
    loaderAction(false);
  } catch (error) {
    loaderAction(false);
    errorPopup(type, title, text);
  }
};

export const gstCal = (
  items,
  add_item_quantity,
  item_price,
  onlyTax = false
) => {
  let igst = 0;
  let cgst = 0;
  let taxAmount = 0;
  let item_total = 0;
  items.forEach(({ gst, TAXES }) => {
    if (gst || TAXES) {
      if (TAXES) {
        igst = TAXES.SGST;
        cgst = TAXES.CGST;
      } else {
        taxAmount = parseFloat(((item_price * gst) / 100) * add_item_quantity);
        let amount = parseFloat(
          ((((item_price * gst) / 100) * add_item_quantity) / 2).toFixed(2)
        );
        if (onlyTax) {
          igst = amount + igst;
          cgst = amount + cgst;
        } else {
          let taxes = gst / 2;
          igst = taxes;
          cgst = taxes;
        }
      }
    }
    item_total = item_price * add_item_quantity + taxAmount;
  });

  return {
    gst: {
      CGST: cgst,
      SGST: igst,
      CESS: 0,
    },
    amount: taxAmount,
    item_total,
  };
};

export const _getAddonStr = (element) => {
  let addonStr = [];
  let addons = element.addons;
  for (let index = 0; index < addons.length; index++) {
    const elements = addons[index];
    for (let indexEl = 0; indexEl < elements.length; indexEl++) {
      const element = elements[indexEl];
      addonStr.push(element.item_name);
    }
  }

  addonStr = [...new Set(addonStr)];
  let str = addonStr.join(", ");
  return str;
};

const _getAddonsData = (element, gst) => {
  // addons: (customizations && customizations[0] && customizations[0].addons || []).map(({item_name, item_id, item_type, item_price, offer, gst, packing_charge}) => ({
  //   item_name, item_id, item_type, item_price, offer, totalGST, packing_charge, item_total: item_price,
  //   add_item_quantity: 1,
  // }))
  let amount = 0;
  let addonItems = [];
  let addons = element.addons;
  if (addons.length == 0) {
    return {
      amount,
      addonItems,
    };
  }

  for (let index = 0; index < addons.length; index++) {
    const elements = addons[index];
    for (let indexEl = 0; indexEl < elements.length; indexEl++) {
      const element = elements[indexEl];
      amount =
        amount + element.item_price + (element.gst * element.item_price) / 100;
      let object = {
        item_name: element.item_name,
        item_id: element.item_id,
        item_price: element.item_price,
        offer: element.offer,
        packing_charge: element.packing_charge,
        item_total: element.item_price,
        add_item_quantity: 1,
        totalGST: element.gst,
      };
      addonItems.push(object);
    }
  }

  return {
    amount,
    addonItems,
  };
};

export const _getTitle = (cart) => {
  if (cart && cart.sizes.length > 0) {
    let size = cart.sizes[cart.sizes.length - 1];
    if (size.item_size_name) {
      return `${cart.name}(${size.item_size_name})`;
    }
  }
  return cart.name;
};

export const _getCartPrice = (cart) => {
  let addons = cart.addons;
  let price = cart.price;
  if (addons.length) {
    addons = addons[0];
    for (let index = 0; index < addons.length; index++) {
      const element = addons[index];
      price = price + element.item_price;
    }
  }

  return price;
};

export const _getCheckoutDataFunGroccery = async (
  setCheckoutData,
  setOrderItem,
  setIsGrocery,
  discount = 0,
  address
) => {
  return new Promise(async (resolve, rejct) => {
    let amount = 0;
    let tax = 0;
    let totalPayableAmount = 0;
    let packing_charges = 0;
    let delivery_charges = 0;
    let carts = await _getCartsDataFun();
    let storeData = await _getStoreData();
    let isGrocery = isGroceryFun(storeData.flow);
    let orderType = getOrderTypeLocal();

    setIsGrocery(isGrocery);

    for (let index = 0; index < carts.length; index++) {
      const element = carts[index];

      if (isGrocery) {
        amount = amount + element.price * element.added_quantity;

        if (storeData.is_gst) {
          tax =
            tax +
            (element.gst / (100 + element.gst)) *
              element.price *
              element.added_quantity;
        } else {
          tax =
            tax + (element.gst / 100) * element.price * element.added_quantity;
        }
      }
    }

    if (tax) {
      tax = parseFloat(tax).toFixed(2);
    }

    totalPayableAmount = amount;

    const charges = storeData.charges ? storeData.charges : [];
    const StoreCharges = charges.filter(
      (charge) => charge.charge_type === "Packaging charge"
    );

    const validCharge = StoreCharges.find(
      (charge) => amount > charge.min_value && amount <= charge.max_value
    );

    const StorePackagingCharges = validCharge ? validCharge.price : 0;
    const StoreDeliveryCharges = charges.filter(
      (charge) => charge.charge_type === "Delivery charge"
    );
    const validDeliveryCharge = StoreDeliveryCharges.find(
      (charge) => amount > charge.min_value && amount <= charge.max_value
    );

    const itemDeliveryCharge = validDeliveryCharge
      ? validDeliveryCharge.price
      : 0;

    if (orderType == OrderTypeEnums.Home) {
      let error = _checkMinAmount(totalPayableAmount, storeData.min_bill);
      // let error = _checkMinAmount(totalPayableAmount, 10000)
      storeDispatchCheckout(error);
      if (error.isValid) {
        error = _checkDistance(address, storeData);
        console.log(error);
        storeDispatchCheckout(error);
      }
    }
    // const itemDeliveryCharge = 0

    if (itemDeliveryCharge) {
      totalPayableAmount =
        totalPayableAmount - delivery_charges + itemDeliveryCharge;
      delivery_charges = itemDeliveryCharge;
    }

    if (StorePackagingCharges) {
      totalPayableAmount =
        totalPayableAmount - packing_charges + StorePackagingCharges;
      packing_charges = StorePackagingCharges;
    }

    let items = [];

    for (let index = 0; index < carts.length; index++) {
      const element = carts[index];
      const obj = {
        product_id: element.id,
        quantity: element.added_quantity,
      };
      items.push(obj);
    }

    // const unlistedProd = () => {
    //   if (typeof window !== "undefined") {
    //     let name = localStorage.getItem("Unlisted Product");
    //     return name?.replace(/[^\w.,\s]/g, "");
    //   }
    // };

    // const unlistedQty = () => {
    //   if (typeof window !== "undefined") {
    //     let name = localStorage.getItem("Unlisted Product Quantity");
    //     return name?.replace(/[^\w.,\s]/g, "");
    //   }
    // };

    // const unlistedUnit = () => {
    //   if (typeof window !== "undefined") {
    //     let name = localStorage.getItem("Unlisted Product Unit");
    //     return name?.replace(/[^\w.,\s]/g, "");
    //   }
    // };

    // const unlistedProduct = {
    //   product: unlistedProd(),
    //   quantity: unlistedQty(),
    //   unit: unlistedUnit(),
    // };

    // items.push(unlistedProduct)

    if (discount) {
      totalPayableAmount = totalPayableAmount - discount;
    }

    let itemsData = {
      address_id: address ? address.id : "",
      delivery_type: orderType,
      code: "",
      app_type: app_Type,

      app_id: appId,
      amount: totalPayableAmount,
      id: storeData.req_id,
      comment: "",
      order_type: orderType,
      table_number: "",
      items,
      delivery_charges: itemDeliveryCharge,
      package_charge: StorePackagingCharges,
      discount,
    };

    setOrderItem(itemsData);

    let brakdown = [
      {
        title: "Item Total",
        label: `${currency}${amount}`,
        value: amount,
        charge_id: "total",
      },
      {
        title: "PROMO - Discount",
        label: `${currency}${discount}`,
        value: discount,
        charge_id: "discount",
      },
      {
        title: "Packing Charges",
        label: `${currency}${packing_charges}`,
        value: packing_charges,
        charge_id: "packing_charge",
      },

      {
        title: "Delivery Charges",
        label: `${currency}${delivery_charges}`,
        value: delivery_charges,
        charge_id: "delivery_charge",
      },
      {
        title: "Tax",
        label: `${currency}${tax}`,
        value: tax,
        charge_id: "tax",
      },
    ];

    setOrderItem(itemsData);

    let final = {
      value: totalPayableAmount,
      title: "Total To Pay",
      label: `${currency}${totalPayableAmount}`,
      charge_id: "total_payable_amount",
    };
    let types =
      storeData && storeData.delivery_type
        ? storeData.delivery_type.filter((type) => type != OrderTypeEnums.Home)
        : [];

    setCheckoutData({
      final,
      brakdown,
      deliveryTypes: types,
    });

    resolve(true);
  });
};

//calculate qsr checkout data
export const _getCheckoutDataFun = async (
  setCheckoutData,
  setOrderItem,
  setIsGrocery,
  discount = 0,
  address = null
) => {
  return new Promise(async (resolve, rejct) => {
    let amount = 0;
    let tax = 0;
    // let discount = 0

    let totalPayableAmount = 0;
    let packing_charges = 0;
    let delivery_charges = 0;
    let carts = await _getCartsDataFun();
    let localProducts = await _getLocalProducts();
    let localOfferProducts = await _getLocalOfferProducts();
    let storeData = await _getStoreData();
    let tableNo = getTable();
    let isGrocery = isGroceryFun(storeData.flow);
    let orderType = getOrderTypeLocal();

    setIsGrocery(isGrocery);
    let products = [];

    // calculate price
    for (let index = 0; index < carts.length; index++) {
      const element = carts[index];

      let product = localProducts.filter((data) => data.id == element.item_id);
      if (product && product.length == 0) {
        product = localOfferProducts.filter(
          (data) => data.id == element.item_id
        );
      }

      if (product && product.length > 0) {
        let prElement = product[0];
        // calculate price tax
        let taxData = gstCal(product, element.added_quantity, element.price);

        // calculate price addon
        let addonData = _getAddonsData(element, prElement.gst);

        // let addonAmount = addonData.amount * element.added_quantity
        let addonAmount = 0;

        let pAmount = _getCartPrice(element) * element.added_quantity;
        amount = amount + pAmount + addonAmount;
        let pkgCharge = prElement.packing_charge * element.added_quantity;
        product = {
          ...prElement,
          add_item_quantity: element.added_quantity,
          TAXES: taxData.gst,
          item_total: taxData.item_total,
          total_tax: taxData.amount,
          addons: addonData.addonItems,
          pkgCharge,
        };

        packing_charges = packing_charges + pkgCharge;
        tax = tax + taxData.amount;
        // totalPayableAmount = totalPayableAmount + taxData.amount + pAmount + pkgCharge + addonAmount
        // calculate total price
        totalPayableAmount =
          totalPayableAmount + taxData.amount + pAmount + pkgCharge;

        products.push(product);
      }
    }

    // calculate total charges
    const charges = storeData.charges ? storeData.charges : [];
    const StoreCharges = charges.filter(
      (charge) => charge.charge_type === "Packaging charge"
    );

    const validCharge = StoreCharges.find(
      (charge) => amount > charge.min_value && amount <= charge.max_value
    );

    const StorePackagingCharges = validCharge ? validCharge.price : 0;

    const StoreDeliveryCharges = charges.filter(
      (charge) => charge.charge_type === "Delivery charge"
    );
    const validDeliveryCharge = StoreDeliveryCharges.find(
      (charge) => amount > charge.min_value && amount <= charge.max_value
    );

    const itemDeliveryCharge = validDeliveryCharge
      ? validDeliveryCharge.price
      : 0;
    // const itemDeliveryCharge = 0

    // calculate if deleivery type is home
    if (orderType == OrderTypeEnums.Home) {
      // check min price
      let error = _checkMinAmount(totalPayableAmount, storeData.min_bill);
      // let error = _checkMinAmount(totalPayableAmount, 10000)
      storeDispatchCheckout(error);
      if (error.isValid) {
        // check min distance
        error = _checkDistance(address, storeData);
        storeDispatchCheckout(error);
      }
    }

    // check if item Delivery Charge present
    if (itemDeliveryCharge && orderType == OrderTypeEnums.Home) {
      totalPayableAmount =
        totalPayableAmount - delivery_charges + itemDeliveryCharge;
      delivery_charges = itemDeliveryCharge;
    }

    // check if item Store Packaging Charges present
    if (StorePackagingCharges) {
      totalPayableAmount =
        totalPayableAmount - packing_charges + StorePackagingCharges;
      packing_charges = StorePackagingCharges;
    }

    // pushing data for order placed
    let items = [];
    for (let index = 0; index < products.length; index++) {
      const element = products[index];

      const obj = {
        item_id: element.id,
        item_name: element.name,
        item_type: element.item_type,
        add_item_quantity: element.add_item_quantity,
        offer: "",
        discount: element.discount,
        item_price: element.item_price,
        item_total: element.item_total,
        TAXES: element.TAXES,
        summary: {
          tot_tax: element.total_tax,
          delivery_charges: 0,
          package_charge: element.pkgCharge,
          discount: element.discount,
        },
        addons: element.addons,
      };
      items.push(obj);
    }

    //calculate promotioanl offer

    let offersData = _getOfferType(storeData, products, amount);
    discount = discount + offersData.discount;
    // if any coupon discount present
    if (discount) {
      totalPayableAmount = totalPayableAmount - discount;
    }

    let itemsData = {
      guest: false,
      items,
      api_mode,
      app_Type,
      amount: totalPayableAmount,
      app_id: appId,
      id: storeData.req_id,
      order_type: orderType,
      timeslot,
      address_id: null,
      comment: "",
      table_number: tableNo,
      discount,
      offer_type: null,
      promotion_id: null,
      is_cod: false,
      order_delivery_charge: delivery_charges,
      tax,
      order_package_charge: packing_charges,
      isGrocery,
      item_total: amount,
      _meta: {
        packing_charge: delivery_charges,
        delivery_charge: packing_charges,
        tax_charge: tax,
        item_total: amount,
        total_payable: totalPayableAmount,
        storeId: storeData.business_id,
        businessType: businessTypes.QSR,
        TAXES: {},
        tableNo,
        mid: storeData.mid,
      },
    };

    setOrderItem(itemsData);

    let brakdown = [
      {
        title: "Item Total",
        label: `${currency}${amount}`,
        value: amount,
        charge_id: "total",
      },
      {
        title: "PROMO - Discount",
        label: `${currency}${discount}`,
        value: discount,
        charge_id: "discount",
      },
      {
        title: "Packing Charges",
        label: `${currency}${packing_charges}`,
        value: packing_charges,
        charge_id: "packing_charge",
      },

      {
        title: "Delivery Charges",
        label: `${currency}${delivery_charges}`,
        value: delivery_charges,
        charge_id: "delivery_charge",
      },
      {
        title: "Tax",
        label: `${currency}${tax}`,
        value: tax,
        charge_id: "tax",
      },
    ];

    setOrderItem(itemsData);

    // if (user) {
    //   itemsData.mid = mid
    //   itemsData.phone = user.phone
    //   itemsData.c_app_id = user.app_id

    // }

    // if(tableNo){
    //   itemsData.table_number = tableNo
    // }
    let final = {
      value: totalPayableAmount,
      title: "Total To Pay",
      label: `${currency}${totalPayableAmount}`,
      charge_id: "total_payable_amount",
    };
    // let types = storeData && storeData.delivery_type ? storeData.delivery_type.filter(type => type != OrderTypeEnums.Home) : []
    let types = storeData.delivery_type;

    setCheckoutData({
      final,
      brakdown,
      deliveryTypes: types,
    });

    resolve(true);
  });
};

export const setCheckoutDataType = async (
  setCheckoutData,
  setOrderItem,
  setIsGrocery,
  discount = 0,
  address = null
) => {
  let storeData = await _getStoreData();
  let isGrocery = isGroceryFun(storeData.flow);
  if (isGrocery) {
    await _getCheckoutDataFunGroccery(
      setCheckoutData,
      setOrderItem,
      setIsGrocery,
      discount,
      address
    );
  } else {
    await _getCheckoutDataFun(
      setCheckoutData,
      setOrderItem,
      setIsGrocery,
      discount,
      address
    );
  }
};

export const createOrder = async (orderItem, isloader, setLoader) => {
  try {
    if (isloader) {
      return;
    }
    let url = updateOrder();
    setLoader(true);
    let user = getAuth();
    let mid = getMid();

    if (orderItem.guest) {
      url = updateOrderNa();
    }

    let payload = {
      url,
      user,
      type: requestType.UpdateOrder,
      payload: mid ? { ...orderItem, mid } : { ...orderItem },
    };

    let response = await axios.post(baseLocalURLForm, payload);
    let data = response.data.data;

    let status = true;
    if (data) {
      status = data.success;
      if (status) {
        let refcode = data.data.refcode;
        if (!refcode) {
          status = false;
        } else {
          Router.push(`/payment/` + refcode);
          return;
        }
      }
    } else {
      status = false;
    }

    if (!status) {
      errorPopup(type, title, text);
    }
    setLoader(false);
  } catch (error) {
    console.log(error);
    errorPopup(type, title, text);
    setLoader(false);
  }
};

export const createGroceryOrder = async (
  orderItem,
  isGroceryOrderloader,
  setIsGroceryLoader,
  setGroceryBookinginfo
) => {
  let title = "Opps!";
  let text = "Something went wrong, please try again!";
  let type = "error";

  try {
    if (isGroceryOrderloader) {
      return;
    }
    let url = placeGroceryOrder();
    setIsGroceryLoader(true);
    loaderAction(true);
    let user = getAuth();
    let mid = getMid();
    // if (orderItem.guest) {
    //   url = updateOrderNa()
    // }
    let payload = {
      url,
      user,
      type: requestType.TonetagConvoke,
      payload: orderItem,
    };

    let response = await axios.post(baseLocalURLForm, payload);
    let data = response.data.data;
    loaderAction(false);
    let status = true;
    if (data) {
      status = data.success;
      if (status) {
        let refcode = data.refcode;
        if (!refcode) {
          status = false;
        } else {
          setGroceryBookinginfo({
            status: "success",
            refcode,
          });
          _clearCart();
          return;
        }
      }
    } else {
      setGroceryBookinginfo({
        status: "failed",
      });
      status = false;
    }

    if (!status) {
      errorPopup(type, title, text);
    }
    setIsGroceryLoader(false);
  } catch (error) {
    console.log(error);
    errorPopup(type, title, text);
    setIsGroceryLoader(false);
    loaderAction(false);
  }
};

export const testApi = async (refcode, isloader, setLoader) => {
  try {
    if (isloader) {
      return;
    }

    let url = apiTest();
    setLoader(true);
    loaderAction(true);
    let payload = {
      url,
      type: requestType.TonetagConvoke,
      payload: { transaction_id: refcode },
    };

    let response = await axios.post(baseLocalURLForm, payload);
    let status = response.data.data.success;
    if (status) {
      Router.push(`/payment/success?refcode=${refcode}`);
    } else {
      Router.push(`/payment/failed?refcode=${refcode}`);
    }
    loaderAction(false);
  } catch (error) {
    console.log(error);
    setLoader(false);
    loaderAction(false);
  }
};

export const _getBalance = async (setAplBalance, apl_code = null) => {
  try {
    let user = getAuth();
    let url = aplBalance();
    if (!user.phone) {
      return;
    }
    let payload = {
      url,
      payload: {
        apl_code,
        phone: user.phone,
      },
    };
    let response = await axios.post(baseLocalURL, payload);
    let data = response.data.data;
    if (data.success) {
      let aplBalance = parseFloat(data.apl_balance);
      setAplBalance(aplBalance);
    }
    loaderAction(false);
  } catch (error) {
    console.log(error);
    loaderAction(false);
  }
};

export const _validateUPI = (upi) => {
  let isValid = /^[\w.-]+@[\w.-]+$/.test(upi);
  return isValid;
};

export const getAllUpi = async (setUpis) => {
  let upis = await _getLocalUpis();
  setUpis(upis);
};

export const addUpi = async (upi, upis, setUpis, setError) => {
  let isValid = _validateUPI(upi);
  if (!isValid) {
    setError("upi not valid");
    return false;
  }

  let oldUpis = upis.filter((fUpi) => fUpi.id == upi);
  if (oldUpis && oldUpis.length == 0) {
    let data = {
      id: upi,
      upi,
    };
    upis.push(data);
    setUpis(upis);
    _addUpi(upi);
    return true;
  }
  return false;
};

export const setOrderTypeLocal = (type) => {
  return localStorage.setItem("type", type);
};

export const getOrderTypeLocal = () => {
  return localStorage.getItem("type");
};

export const getGroceryStatusesByOrder = (order) => {
  if (
    order.delivery_type === OrderTypeEnums.DineIn ||
    order.delivery_type === OrderTypeEnums.Pickup ||
    order.delivery_type === OrderTypeEnums.SelfPickup
  ) {
    return [
      GROCERY_ORDER_STATUSES.booked,
      GROCERY_ORDER_STATUSES.accepted,
      GROCERY_ORDER_STATUSES.paid,
      GROCERY_ORDER_STATUSES.ready,
    ];
  }
  if (order.delivery_type === OrderTypeEnums.Home) {
    return [
      GROCERY_ORDER_STATUSES.booked,
      GROCERY_ORDER_STATUSES.accepted,
      GROCERY_ORDER_STATUSES.paid,
      GROCERY_ORDER_STATUSES.ready,
      GROCERY_ORDER_STATUSES.on_the_way,
      GROCERY_ORDER_STATUSES.delivered,
    ];
  }
};

export const getGroceryStatusesByOrderNew = (order) => {
  if (order.delivery_type === OrderTypeEnums.Home) {
    return [
      GROCERY_ORDER_STATUSES_NEW.booked,
      GROCERY_ORDER_STATUSES_NEW.accepted,
      GROCERY_ORDER_STATUSES_NEW.paid,
      GROCERY_ORDER_STATUSES_NEW.ready,
      GROCERY_ORDER_STATUSES_NEW.OutForDelivery,
      GROCERY_ORDER_STATUSES_NEW.delivered,
    ];
  }

  return [
    GROCERY_ORDER_STATUSES_NEW.booked,
    GROCERY_ORDER_STATUSES_NEW.accepted,
    GROCERY_ORDER_STATUSES_NEW.paid,
    GROCERY_ORDER_STATUSES_NEW.ready,
    GROCERY_ORDER_STATUSES_NEW.delivered,
  ];
};
