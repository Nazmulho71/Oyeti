import axios from "axios";
import {
  userAddressesApi,
  userDeleteAddressesApi,
  locationDetailsUrlByLatLong,
  baseLocalURLForm,
  baseLocalURL,
} from "../api/baseUrls";
import loaderAction from "./loader";

export const getAddresses = async (setAddresses) => {
  try {
    loaderAction(true);
    let url = userAddressesApi();
    let data = {
      url,
      requestType: "get",
    };
    let response = await axios.post(baseLocalURLForm, data);
    let resData = response.data.data;
    if (resData.success) {
      setAddresses(resData.addresses);
    }
    loaderAction(false);
  } catch (error) {
    loaderAction(false);
  }
};

export const getPlaceDetaislByLatLong = async (data) => {
  try {
    let url = locationDetailsUrlByLatLong(data.latitude, data.longitude);
    let paydata = {
      url,
      requestType: "get",
    };
    let response = await axios.post(baseLocalURL, paydata);
    let location = response.data.data;
    if (location.plus_code && location.plus_code.compound_code) {
      // setLocation(location.plus_code.compound_code)
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteAddress = async (id, addresses) => {
  try {
    loaderAction(true);
    let url = userDeleteAddressesApi();
    let data = {
      url,
      requestType: "delete",
      payload: {
        id,
      },
    };
    let response = await axios.post(baseLocalURLForm, data);
    let resData = response.data.data;
    if (resData.success) {
      addresses = addresses.filter((add) => add.id != id);
      setAddresses(addresses);
    }
    loaderAction(false);
  } catch (error) {
    loaderAction(false);
  }
};
