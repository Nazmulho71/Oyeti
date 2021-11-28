import ImageConst from "../../utils/ImageConst";

export default {
  AssetTypeImage: 1,
  AssetTypeGif: 2,
  AssetTypeVideo: 3,
};

export const BEST_SELLER_ID = 0;

export const FilterList = {
  VEG_ONLY: 1,
  INCLUDE_EGG: 2,
  BEST_SELLER_ID: 0,
};

export const shopType = {
  QSR: 3,
  GROCERY: 7,
};

export const getType = (type) => {
  if (type == "Veg") {
    return FilterList.VEG_ONLY;
  }

  if (type == "Non-Veg") {
    return FilterList.INCLUDE_EGG;
  }

  return 3;
};

export const OrderTypeEnums = {
  Home: 0,
  Pickup: 1,
  DineIn: 2,
  SelfPickup: 3,
};

export const OrderDeliverEnums = {
  0: "Delivery",
  2: "Dine In",
  3: "Pick Up",
};

export const OrderChanged = {
  Quantity: "quantity",
  Price: "price",
  Both: "both",
  Item: "item",
};

export const units = [
  "Gram",
  "Litre",
  "ml",
  "kg",
  "Piece",
  "Pack",
  "Packet",
  "Bundle",
  "Bunch",
  "Carton",
  "Box",
  "Bottle",
  "Can",
];

export const orderImage = {
  homeDelivery: "/assets/img/delivery.svg",
  selfPickup: "/assets/img/take_away.svg",
  dineIn: "/assets/img/dine_In.svg",
  groceryStorePickup: "/assets/icons/lunch.svg",
  groceryhomeDelivery: "/assets/icons/food.svg",
};

export const ORDERS_SCREEN = {
  homeDelivery: "Delivery",
  selfPickup: "Take-Away",
  dineIn: "Dine-In",
};

export const paymentTypes = {
  CreditDebit: 1,
  UPI: 2,
  InStore: 3,
  AmazonPay: 4,
};

export const getPaymentType = (type) => {
  if (type == paymentTypes.CreditDebit) {
    return "card";
  }

  if (type == paymentTypes.UPI) {
    return "upi";
  }
};

export const actionTypes = {
  NewUPI: 1,
  CardPayment: 2,
};

export const assistantPaymentTypes = {
  AmazonPay: 1,
  Other: 2,
};

export const OTPTypes = {
  SMS: 1,
  WhatsApp: 2,
};

export const businessTypes = {
  QSR: "oyeti",
  Grocery: "grocery",
};

export const requestType = {
  UpdateOrder: "1",
  TonetagConvoke: "2",
  Coupon: "3",
};

export const flowId = 11;

export const flowTypes = {
  QSR: 11,
  Grocery: 12,
};

export const titleEnums = {
  Food: "food",
  Grocery: "grocery",
  Retail: "retail",
  Vegetable: "vegetable",
  type: null,
  get businessType() {
    if (this.type == this.Food) {
      return "oyeti";
    }

    if (this.type == this.Grocery) {
      return "onlinegrocery";
    }

    if (this.type == this.Retail) {
      return "retail";
    }

    if (this.type == this.Vegetable) {
      return "vegetable";
    }
    return "oyeti";
  },
};

export const addressTypes = {
  Home: "Home",
  Office: "Office",
  Other: "Other",
};

export const addressTypesWithImages = {
  Home: { title: "Home", image: ImageConst.homeIcon },
  Office: { title: "Office", image: ImageConst.workIcon },
  Other: { title: "Other", image: ImageConst.locationImage },
};

export const genderEnums = {
  Male: { title: "Male", value: "m", checkValue: "Male" },
  Female: { title: "Female", value: "f", checkValue: "Female" },
  Other: { title: "Other", value: "o", checkValue: "Others" },
};

export const storeFlowTypes = {
  QSR: 3,
  Grocery: 11,
  GrocerySearch: 7,
};

export const redirectEnums = {
  Interaction: 10,
  QSR: 3,
  Payment: 2,
  Grocery: 7,
  AutoLogin: 9,
  BuyGrocery: 11,
  HomeWithAutoLogin: 12,
  CustomizeCart: 13,
  CustomizeCartGuest: 16,
  HomeAutoLoginWithEmail: 15,
};

export const completedOrderStatus = {
  QSRCompleted: 3,
  GroceryCompleted: 9,
};

export const promotionalTypes = {
  BOGOOffer: "BOGO Offer",
  DirectOffer: "Direct Offer",
  PromotionalOffer: "Promotional Offer",
};

export const homeShops = [
  { title: "Food", firstLast: "F", icon: "asstes", url: "/search/food" },
  {
    title: "Groceries",
    firstLast: "G",
    icon: "asstes",
    url: "/search/grocery",
  },
  { title: "Retail", firstLast: "R", icon: "asstes", url: "/search/retail" },
  {
    title: "Vegetable",
    firstLast: "V",
    icon: "asstes",
    url: "/search/vegetable",
  },
];

export const OrderStatusMap = [
  { title: "Pending", id: 0 },
  { title: "Accepted", id: 1 },
  { title: "Ready", id: 2 },
  { title: "Served", id: 3 },
  { title: "Rejected", id: 4 },
  { title: "Booked", id: 5 },
  { title: "Confirmed", id: 6 },
  { title: "Packing", id: 7 },
  { title: "Ready", id: 8 },
  { title: "Delivered", id: 9 },
  { title: "Packed", id: 11 },
  { title: "Out For Delivery", id: 12 },
];

export const QSRStatus = {
  Pending: 0,
  Accepted: 1,
  Ready: 2,
  Delivered: 3,
};

export const PositionMap = [
  { positions: [0], id: 1 },
  { positions: [1], id: 2 },
  { positions: [2], id: 3 },
  { positions: [12], id: 4 },
];

export const timeslot = "0to0";

export const appId = "23709";

export const api_mode = 9;

export const app_Type = 0;

export const currency = "₹";

export const GROCERY_ORDER_STATUSES = {
  booked: {
    id: 2,
    label: "Booked",
    // icon: "/assets/icons/Booked.svg",
    // iconDark: "/assets/icons/Booked-dark.svg",
    icon: "fa-bookmark",
  },
  accepted: {
    id: 5,
    label: "Confirmed",
    // icon: "/assets/icons/Confirmed.svg",
    // iconDark: "/assets/icons/Confirmed-dark.svg",
    icon: "fa-clipboard-check",
  },
  paid: {
    id: 5,
    label: "Paid",
    // icon: "/assets/icons/Paid.svg",
    // iconDark: "/assets/icons/Paid-dark.svg",
    icon: "fa-credit-card",
  },
  ready: {
    id: 5,
    label: "Ready",
    // icon: "/assets/icons/Ready.svg",
    // iconDark: "/assets/icons/Ready-dark.svg",
    icon: "fa-box",
  },
  on_the_way: {
    id: 5,
    // label: "On the Way",
    // icon: "/assets/icons/on_the_way.svg",
    icon: "fa-truck",
  },
  delivered: {
    id: 6,
    label: "Delivered",
    // icon: "/assets/icons/Delivered.svg",
    // iconDark: "/assets/icons/Delivered-dark.svg",
    icon: "fa-truck-loading",
  },
  confirmed: {
    id: 3,
    label: "Confirmed",
    // icon: "/assets/icons/Delivered.svg",
    // iconDark: "/assets/icons/Delivered-dark.svg",
    icon: "fa-clipboard-check",
  },
};

export const GROCERY_ORDER_STATUSES_NEW = {
  booked: {
    id: 1,
    label: "Booked",
    // icon: "/assets/icons/Booked.svg",
    // iconDark: "/assets/icons/Booked-dark.svg",
    icon: "fa-bookmark",
    value: "Booked",
    valueInt: 5,
  },
  accepted: {
    id: 2,
    label: "Confirmed",
    // icon: "/assets/icons/Confirmed.svg",
    // iconDark: "/assets/icons/Confirmed-dark.svg",
    icon: "fa-clipboard-check",
    value: "Confirmed",
    valueInt: 6,
  },
  paid: {
    id: 3,
    label: "Paid",
    // icon: "/assets/icons/Paid.svg",
    // iconDark: "/assets/icons/Paid-dark.svg",
    icon: "fa-credit-card",
    value: "Success",
    valueInt: 7,
  },
  ready: {
    id: 4,
    label: "Ready",
    // icon: "/assets/icons/Ready.svg",
    // iconDark: "/assets/icons/Ready-dark.svg",
    icon: "fa-box",
    value: "Waiting for Delivery",
    valueInt: 8,
  },
  delivered: {
    id: 5,
    label: "Delivered",
    // icon: "/assets/icons/Delivered.svg",
    // iconDark: "/assets/icons/Delivered-dark.svg",
    icon: "fa-truck-loading",
    value: "Delivered",
    valueInt: 9,
  },
  OntheWay: {
    id: 6,
    label: "On the Way",
    // icon: "/assets/icons/Delivered.svg",
    // iconDark: "/assets/icons/Delivered-dark.svg",
    icon: "fa-truck",
    value: "Waiting on pickup",
    valueInt: 11,
  },
  OutForDelivery: {
    id: 7,
    label: "Out for delivery",
    // icon: "/assets/icons/Delivered.svg",
    // iconDark: "/assets/icons/Delivered-dark.svg",
    icon: "fa-truck-moving",
    value: "Out for delivery",
    valueInt: 12,
  },
};
