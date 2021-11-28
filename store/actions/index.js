import {
  SET_LOADING_STATUS,
  SET_USERS,
  SET_MY_PRODUCTS,
  SET_CHECKOUT_DATA,
  SET_STORE_PROMOTIONAL_DATA,
  SET_STORE_PROMOTIONAL_POPUP_DATA,
} from "../types";

import axios from "axios";
import { SWITCH_THEME } from "./../types/index";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const setLoadingStatus = (status) => ({
  type: SET_LOADING_STATUS,
  payload: status,
});

export const setMyProductdData = (data) => ({
  type: SET_MY_PRODUCTS,
  payload: data,
});

export const setUsersData = (userData) => ({
  type: SET_USERS,
  payload: userData,
});

export const setCheckoutDataFun = (data) => ({
  type: SET_CHECKOUT_DATA,
  payload: data,
});

export const setPromotionalDataFun = (data) => ({
  type: SET_STORE_PROMOTIONAL_DATA,
  payload: data,
});

export const setPromotionalPopupFun = (data) => ({
  type: SET_STORE_PROMOTIONAL_POPUP_DATA,
  payload: data,
});

export const setTheme = (data) => ({
  type: SWITCH_THEME,
  payload: data,
});

export const onMyProductRequest = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingStatus(true));
      let url = baseURL + "user/my-products";
      let response = await axios.get(url);
      dispatch(setMyProductdData(response.data.orders));
      dispatch(setLoadingStatus(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoadingStatus(false));
    }
  };
};

export const onUserRequest = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingStatus(true));
      let url = baseURL + "user/auth";
      let response = await axios.get(url);
      dispatch(setUsersData(response.data.data));
      dispatch(setLoadingStatus(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoadingStatus(false));
    }
  };
};
