import { OTPTypes } from "../enums";

let baseURL = process.env.NEXT_PUBLIC_BASE_URL;
let shopBaseUrl = process.env.NEXT_PUBLIC_SHOP_BASE_URL;
let menuUrl = process.env.NEXT_PUBLIC_OYETI_BASE_URL;
let updatePhoneUrl = process.env.NEXT_PUBLIC_UPDATE_PHONE_BASE_URL;

export const APIKEY_PLACE = process.env.NEXT_PUBLIC_GOOGLE_MAP_PLACE_KEY;
export const APIKEY_MAP = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;

export const _homeUrl = (queryParam) => {
  return `${baseURL}store?shop_slug=${queryParam}`;
};

export const _orderaheadReference = () => {
  return `${menuUrl}api/v1/profiles/orderahead_reference`;
};

export const _loginUrl = () => {
  return `${menuUrl}api/v1/users/sign_in`;
};

export const _generateOtp = (type) => {
  if (OTPTypes.SMS == type) {
    return `${menuUrl}api/v1/users`;
  }
  return `${menuUrl}api/v1/users/generate_whapp_otp`;
};

export const _generateOTPUpdatePhone = () => {
  return `${updatePhoneUrl}otp_gen`;
};

export const _updatePhoneVerify = () => {
  return `${updatePhoneUrl}otp_verify`;
};

export const _showURL = () => {
  return shopBaseUrl;
};

export const _categoriesUrl = (queryParam) => {
  return `${baseURL}categories?shop_slug=${queryParam}`;
};

export const _menuUrl = (queryParam) => {
  return `${baseURL}menu?shop_slug=${queryParam}`;
};

export const _productDetailsUrl = (queryParam) => {
  return `${baseURL}details?p_slug=${queryParam}`;
};

export const _fetchMenu = () => {
  return `${menuUrl}api/v1/qsr/na_fetch_menu`;
  //return `${menuUrl}api/v1/qsr/fetch_menu`
};

export const _apaFetchRestaurants = () => {
  return `${menuUrl}api/v1/qsr/app_fetch_restaurants`;
};

export const _naOutlet = () => {
  return `${menuUrl}api/v1/qsr/na_outlet`;
};

export const updateOrder = () => {
  return `${menuUrl}api/v1/qsr/update_order`;
};

export const cancelGroceryOrder = () => {
  return `${menuUrl}api/v1/payments/cancel_grocery_order`;
};

export const placeGroceryOrder = () => {
  return `${menuUrl}api/v1/grocery/place_order`;
};

export function apiTest() {
  return `${menuUrl}callbacks/tonetag_convoke`;
}

export const updateOrderNa = () => {
  return `${menuUrl}api/v1/qsr/na_update_order?`;
};

export const aplBalance = () => {
  return `${menuUrl}api/v1/profiles/fetch_apl_balance`;
};

export const _fetchGroceryMenu = () => {
  return `${menuUrl}api/v1/grocery/fetch_menu`;
};

export const _orderInfoUrl = () => {
  return `${menuUrl}api/v1/qsr/order_info`;
};

export const orderUrl = () => {
  return `${menuUrl}api/v1/profiles/order`;
};

export const orderRating = () => {
  return `${menuUrl}api/v1/qsr/order_rating`;
};

export const upiPayurl = () => {
  return `${menuUrl}api/v1/merchant_seller/upi_collect_money`;
};

export const amazonPay = () => {
  return `${menuUrl}api/v1/transactions/amazon_pay?`;
};

export const applyCouponAPI = () => {
  return `${menuUrl}api/v1/payments/apply_coupon`;
};

export const fetchMerchantDetails = () => {
  return `${menuUrl}api/v1/profiles/fetch_merchant_details`;
};

export const myOrders = () => {
  return `${menuUrl}api/v1/profiles/orders`;
};

export const appNearbyMerchants = () => {
  return `${menuUrl}api/v1/profiles/app_nearby_merchants`;
};

export const googleAutoComplete = () => {
  return `${menuUrl}api/v1/profiles/google_auto_complete?input_str=`;
};

export function locationDetailsUrl() {
  return `${menuUrl}api/v1/profiles/google_place_detail?place_id=`;
}

export function locationDetailsUrlByLatLong(latitude, longitude) {
  return `${menuUrl}maps/api/geocode?key=${APIKEY_PLACE}&latlng=${latitude},${longitude}`;
}

export function updateProfileApi() {
  return `${menuUrl}api/v1/profiles/update`;
}

export const _updateAuthUserPhone = () => {
  return `${menuUrl}api/v1/profiles/update_phone`;
};

export function userProfileApi() {
  return `${menuUrl}api/v1/profiles/details`;
}

export function userAddressesApi() {
  return `${menuUrl}api/v1/profiles/addresses`;
}

export function userDeleteAddressesApi() {
  return `${menuUrl}api/v1/profiles/delete_address`;
}

export function userAddAddressesApi() {
  return `${menuUrl}api/v1/profiles/add_address`;
}

export function orderWithBill() {
  return `${baseURL}api/v1/profiles/order_with_bill`;
}

export function unlistedProductApi() {
  return `${menuUrl}api/v1/grocery/create_merchant_master_product`;
}

export const getNotificationUrl = process.env.NEXT_PUBLIC_WAITER_CALL_API;
export const baseLocalURL = baseURL + "request";
export const baseLocalURLForm = baseURL + "form";
