import { login } from "../../middleware/auth";
import {
  _orderaheadReference,
  _loginUrl,
  _generateOtp,
  _generateOTPUpdatePhone,
  _updatePhoneVerify,
  _updateAuthUserPhone,
  baseLocalURL,
  baseLocalURLForm,
} from "../api/baseUrls";
import { getAuth, setAuth, _getLocalStoreData } from "../helpers/common";
import loaderAction from "./loader";
import {
  OTPTypes,
  orderImage,
  OrderTypeEnums,
  ORDERS_SCREEN,
} from "../../lib/enums";
import axios from "axios";
let otpBaseUrl = process.env.NEXT_PUBLIC_OYETI_BASE_URL;

export const otpDatas = [
  {
    id: "digit-1",
    value: "",
  },
  {
    id: "digit-2",
    value: "",
  },
  {
    id: "digit-3",
    value: "",
  },
  {
    id: "digit-4",
    value: "",
  },
];
const _isValidNo = (phone) => {
  if (!phone || phone.length != 10) {
    return "Enter a valid phone no";
  }

  let test = parseFloat(phone);
  if (isNaN(test)) {
    return "Enter a valid phone no";
  }

  return null;
};

export const _updateUserPhone = async (phone, callback = null) => {
  return new Promise(async (res, rej) => {
    try {
      let url = _updateAuthUserPhone();
      let payload = {
        url,
        payload: {
          phone,
        },
      };
      let response = await axios.post(baseLocalURL, payload);
      if (response.data.data.success) {
        let user = getAuth();
        user.phone = phone;
        setAuth(user);
        res("success");
      } else {
        rej(response.data.data.message);
      }
    } catch (error) {
      rej("failed");
    }
  });
};

export const _getUserByEmail = async (email, callback = null) => {
  return new Promise(async (res, rej) => {
    try {
      loaderAction(true);
      let url = _loginUrl();
      let payload = {
        url,
        payload: {
          email,
        },
      };
      let response = await axios.post(baseLocalURL, payload);
      let { auth, data } = response.data;
      setAuth(data.user);
      login(auth, "/", callback);
      res("success");
    } catch (error) {
      //    window.location.replace('/')
      rej("failed");
    }
  });
};

export const _getUserById = async (id, callback = null) => {
  try {
    loaderAction(true);
    let url = _orderaheadReference();
    let payload = {
      url,
      payload: {
        id,
      },
    };
    let user = await axios.post(baseLocalURL, payload);
    if (user.data.data.success) {
      let phone = user.data.data.data.phone;

      url = _loginUrl();
      payload = {
        url,
        payload: {
          number_validated: "true",
          phone,
        },
      };
      let response = await axios.post(baseLocalURL, payload);

      let { auth, data } = response.data;
      setAuth(data.user);
      login(auth, "/", null);
    } else {
      window.location.replace("/");
    }
  } catch (error) {
    window.location.replace("/");
  }
};

export const _setPhone = (self) => {
  let { phone } = self.state;
  let _isValidError = _isValidNo(phone);
  if (_isValidError) {
    self.setState({
      errors: _isValidError,
    });
    return;
  }
  generateOTP(self);
};

export const generateOTP = async (self) => {
  try {
    let { submiting, phone, otpType } = self.state;
    if (submiting) {
      return;
    }

    let _isValidError = _isValidNo(phone);
    if (_isValidError) {
      self.setState({
        errors: _isValidError,
      });
      return;
    }

    self.setState({
      submiting: true,
      errors: null,
      otp: "",
    });

    let isUpdatePhone = self.props.updatePhone;

    // let url =  otpType == OTPTypes.WhatsApp ? "api/v1/users/generate_whapp_otp"  : "api/v1/users"
    let url = isUpdatePhone
      ? _generateOTPUpdatePhone(otpType)
      : _generateOtp(otpType);

    let payload = {
      phone,
    };

    if (isUpdatePhone) {
      payload = {
        phone,
        type: otpType,
      };
    }

    let data = {
      url,
      payload,
    };
    await axios.post(baseLocalURL, data);
    self.setState({
      submiting: false,
      phoneSet: true,
      errors: null,
    });
  } catch (error) {
    self.setState({
      submiting: false,
      errors: "server error",
    });
  }
};

export const _setOtp = (e, self) => {
  let otpDatas = [...self.state.otpDatas];
  otpDatas = otpDatas.filter((data) => data.id != e.id);
  let otpData = {
    id: e.id,
    value: e.value,
  };
  otpDatas.push(otpData);
  self.setState({ otpDatas });
};

export const _getOtp = (self) => {
  let otpDatas = [...self.state.otpDatas];
  let otp = "";
  for (let index = 0; index < otpDatas.length; index++) {
    const element = otpDatas[index];
    otp += element.value;
  }
  return otp;
};

export const _loginUser = async (self, payLoadData) => {
  try {
    let { redirect } = self.state;
    let url = _loginUrl();
    let payload = {
      url,
      payload: payLoadData,
    };

    let response = await axios.post(baseLocalURL, payload);
    // cookies.set('phone', phone)
    let { auth, data } = response.data;
    // cookies.set('app_id', data.user.app_id)
    setAuth(data.user);
    login(auth, redirect, self.props.onSuccessLogin);
  } catch (error) {
    console.log(error);
    self.setState({
      submiting: false,
      errors: "OTP is not valid",
    });
  }
};

export const _updatePhoneVerifyOTP = async (self, payLoadData) => {
  return new Promise(async (res, rej) => {
    try {
      let url = _updatePhoneVerify();
      let payload = {
        url,
        payload: payLoadData,
      };
      await axios.post(baseLocalURL, payload);
      await _getUserByEmail(self.props.email, self.onSuccessEmailLogin);
      await _updateUserPhone(self.state.phone);
      self.props.onSuccessLogin();
    } catch (error) {
      let message = "otp is not valid";
      if (typeof error == "string") {
        message = "Phone already exists.";
      }
      self.setState({
        submiting: false,
        errors: message,
      });
      rej({ errors: message });
    }
  });
};

export const submitOTP = async (self) => {
  try {
    let { submiting, phone, selectedType } = self.state;
    if (submiting || !phone) {
      return;
    }

    // if (!selectedType && !self.props.dontShowType) {
    //   self.setState({
    //     errors: "Select order type",
    //   });
    //   return;
    // }

    let otp = _getOtp(self);
    if (otp.length != 4) {
      self.setState({
        errors: "Enter a valid OTP",
      });
      return;
    }

    let _isValidError = _isValidNo(phone);
    if (_isValidError) {
      self.setState({
        errors: _isValidError,
      });
      return;
    }

    self.setState({
      submiting: true,
      errors: "",
    });

    let payload = {
      phone,
      otp,
    };

    let isUpdatePhone = self.props.updatePhone;
    if (isUpdatePhone) {
      _updatePhoneVerifyOTP(self, payload);
    } else {
      _loginUser(self, payload);
    }
  } catch (error) {
    console.log(error);
    self.setState({
      submiting: false,
      errors: "OTP is not valid",
    });
  }
};

export const _getLable = (phoneSet, submiting) => {
  if (submiting) {
    return "Wait...";
  }
  if (phoneSet) {
    return "Continue";
  } else {
    return "Request OTP";
  }
};

export const _getOrderType = (type) => {
  if (OrderTypeEnums.DineIn == type) {
    return {
      value: type,
      lable: ORDERS_SCREEN.dineIn,
      image: orderImage.dineIn,
    };
  }

  if (OrderTypeEnums.Home == type) {
    return {
      value: type,
      lable: ORDERS_SCREEN.homeDelivery,
      image: orderImage.homeDelivery,
    };
  }

  if (OrderTypeEnums.Pickup == type) {
    return {
      value: type,
      lable: ORDERS_SCREEN.selfPickup,
      image: orderImage.selfPickup,
    };
  }

  if (OrderTypeEnums.SelfPickup == type) {
    return {
      value: type,
      lable: ORDERS_SCREEN.selfPickup,
      image: orderImage.selfPickup,
    };
  }

  return {
    value: OrderTypeEnums.Pickup,
    lable: ORDERS_SCREEN.selfPickup,
    image: orderImage.selfPickup,
  };
};
