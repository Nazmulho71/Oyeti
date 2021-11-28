import {
  SET_LOADING_STATUS,
  SET_USERS,
  SET_LOGOUT,
  SET_MY_PRODUCTS,
  SET_CARTS,
  SET_CHECKOUT_DATA,
  SET_STORE_DELIVERY_DATA,
  SET_STORE_PROMOTIONAL_DATA,
  SET_STORE_PROMOTIONAL_POPUP_DATA,
  SWITCH_THEME,
} from "../types";

let theme;

if (process.browser) {
  if (!localStorage.getItem("theme")) localStorage.setItem("theme", "dark");
  theme = localStorage.getItem("theme");
}

const initialState = {
  isLoading: false,
  userData: {},
  isLoggedIn: false,
  myProducts: [],
  carts: [],
  deliveryTypes: [],
  promotionalOffers: [],
  promotionalOffersPopup: false,
  checkoutData: {
    isValid: false,
    error: "",
  },
  theme: theme,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_STATUS:
      return { ...state, isLoading: action.payload };
    case SET_CARTS:
      return { ...state, carts: action.payload };
    case SET_USERS:
      return { ...state, userData: action.payload, isLoggedIn: true };
    case SET_LOGOUT:
      return { ...state, userData: {}, isLoggedIn: false };
    case SET_MY_PRODUCTS:
      return { ...state, myProducts: action.payload };
    case SET_CHECKOUT_DATA:
      return { ...state, checkoutData: action.payload };
    case SET_STORE_DELIVERY_DATA:
      return { ...state, deliveryTypes: action.payload };
    case SET_STORE_PROMOTIONAL_DATA:
      return { ...state, promotionalOffers: action.payload };
    case SET_STORE_PROMOTIONAL_POPUP_DATA:
      return { ...state, promotionalOffersPopup: action.payload };
    case SWITCH_THEME:
      console.log(">>>", state, action);

      const root = document.getElementsByTagName("body")[0];
      root.className = "";

      if (state.theme === "dark") {
        root.className = "light";
        localStorage.setItem("theme", "light");

        return {
          ...state,
          theme: "light",
        };
      }

      root.className = "dark";
      localStorage.setItem("theme", "dark");

      return {
        ...state,
        theme: "dark",
      };
    default:
      return state;
  }
};

export default rootReducer;
