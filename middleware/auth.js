import { Component } from "react";
import Router from "next/router";
import nextCookie from "next-cookies";
import cookie from "js-cookie";
import axios from "axios";

let appIDURL = process.env.NEXT_PUBLIC_AMAZON_PAY_BASE_URL;
let appMode = process.env.NEXT_PUBLIC_AMAZON_LOGIN_PAY_API_MODE;
let deviceID = process.env.NEXT_PUBLIC_DEVICE_ID;

export const _getAppId = async () => {
  try {
    return;
    let appID = cookie.get("app_id");
    let phone = cookie.get("phone");
    console.log(appID);
    if (appID !== "undefined" || !phone) {
      return;
    }

    let data = {
      api_mode: parseFloat(appMode),
      phone,
      fcm_id: "",
      sdk_code: "",
      validated: false,
      name: "",
      referral_code: "",
      device_id: parseFloat(deviceID),
    };
    let response = await axios.post(appIDURL, data);
    let { app_id, referral_credit, is_apl_registered, apl_balance } =
      response.data;

    cookie.set("app_id", app_id);
    cookie.set("phone", phone);
    cookie.set("referral_credit", referral_credit);
    cookie.set("is_apl_registered", is_apl_registered);
    cookie.set("apl_balance", apl_balance);
  } catch (error) {
    console.log(error);
    this.setState({
      submiting: false,
      errors: "OTP is not valid",
    });
  }
};

export const login = async (token, url, onSuccessLogin) => {
  cookie.set("token", token, { expires: 365 });

  if (onSuccessLogin) {
    onSuccessLogin();
  } else {
    window.location.replace(url);
  }
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const signup = async (token, expires) => {
  cookie.set("token", token, { expires });
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  location.reload();
};

export const logout = () => {
  cookie.remove("token");
  window.localStorage.clear();
  window.location.replace("/");
};

export const isLogin = () => {
  let isLogin = cookie.get("token");
  if (isLogin) {
    return true;
  } else {
    return false;
  }
};

export const _getToken = () => {
  let token = cookie.get("token");
  return token;
};

// Gets the display name of a JSX component for dev tools
const getDisplayName = (Component) =>
  Component.displayName || Component.name || "Component";

export const withAuthSync = (WrappedComponent) =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx) {
      const token = auth(ctx);
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, token };
    }

    constructor(props) {
      super(props);
      this.syncLogout = this.syncLogout.bind(this);
    }

    componentDidMount() {
      window.addEventListener("storage", this.syncLogout);
    }

    componentWillUnmount() {
      window.removeEventListener("storage", this.syncLogout);
      window.localStorage.removeItem("logout");
    }

    syncLogout(event) {
      if (event.key === "logout") {
        Router.push("/login");
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export const withoutAuthSync = (WrappedComponent) =>
  class extends Component {
    static displayName = `withoutAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx) {
      const token = guest(ctx);
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, token };
    }

    constructor(props) {
      super(props);
      this.syncLogout = this.syncLogout.bind(this);
    }

    componentDidMount() {
      window.addEventListener("storage", this.syncLogout);
    }

    componentWillUnmount() {
      window.removeEventListener("storage", this.syncLogout);
      window.localStorage.removeItem("logout");
    }

    syncLogout(event) {
      if (event.key === "logout") {
        // Router.push('/login')
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export const auth = (ctx) => {
  const { token } = nextCookie(ctx);

  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: "/login?redirect=" + ctx.req.url });

    ctx.res.end();
    return;
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    Router.push("/login?redirect=" + ctx.asPath);
  }

  return token;
};

export const guest = (ctx) => {
  const { token } = nextCookie(ctx);
  if (ctx.req && token) {
    let url = "/";
    if (ctx.query && ctx.query.redirect) {
      url = ctx.query.redirect;
    }
    ctx.res.writeHead(302, { Location: url });
    ctx.res.end();
    return;
  }

  if (token) {
    console.log(ctx);
    // Router.push('/login?redirect='+ctx.asPath)
  }

  return token;
};
