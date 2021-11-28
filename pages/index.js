import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import nextCookie from "next-cookies";
import LoginCMP from "../components/login/login";
import Header from "../components/common/header";
import MenuOrder from "../components/home/menuOrder";
import BottomMenu from "../components/home/bottomMenu";
import AmazonPayBalance from "../components/home/amazonPayBalance";
import Orders from "../components/home/orders";
import PickForYou from "../components/home/picksForYou";
import Offers from "../components/home/offers";
import { getAuth } from "../lib/helpers/common";
import {
  getLocation,
  getCurrentLocation,
  getLocationLatLong,
} from "../lib/helpers/home";
import Section from "../components/helperComponents/Section";
import { BaseStyles } from "../components/helperComponents/BaseStyles";
import ImageConst from "../utils/ImageConst";
import Router from "next/router";
import LocationErrorCMP from "../components/common/locationError";
import {
  View,
  TouchableWithoutFeedback,
  Text,
} from "../components/helperComponents/RNmigrateHelpers";

const Index = ({ asPath, isLoggedIn, host }) => {
  const [auth, setAuth] = useState({});
  const [loginStatus, setLoginStatus] = useState(false);
  const [balanceKEY, setBalanceKEY] = useState(1);
  const [locationText, setLocationText] = useState("");
  const [loader, setLoader] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  const _pushProfile = () => {
    if (auth.name) {
      Router.push("/profile");
    } else {
      setLoginStatus(true);
    }
  };

  const _getInitLocation = () => {
    if (isLoggedIn) {
      let location = getLocationLatLong();
      if (!location) {
        getCurrentLocation(loader, setLoader, locationStatus);
      }
    }
  };

  const locationStatus = (data) => {
    if (!data) {
      return;
    }
    if (!data.status) {
      setLocationError(true);
    } else {
      let location = getLocation();
      setLocationText(location);
      let key = balanceKEY + 2;
      setBalanceKEY(key);
    }
  };

  const _onSuccessLogin = () => {
    setLoginStatus(false);
    getAuth(setAuth);
    getCurrentLocation(loader, setLoader, locationStatus);
    locationStatus();
    let key = balanceKEY + 2;
    setBalanceKEY(key);
  };

  useEffect(() => {
    getAuth(setAuth);
    let location = getLocation();
    setLocationText(location);
    _getInitLocation();
  }, []);

  return (
    <div className="wrapper" style={{ height: "100vh", ...BaseStyles.bgWhite }}>
      <div className="container m-0 p-0">
        <Header
          key={"header" + balanceKEY}
          titleSub={locationText}
          onClickTitleSub={() => Router.push("/searchlocation")}
          title={`Hello ${auth && auth.name ? auth.name : "Guest"}`}
          goBack={() => console.log("")}
          dontShowBack={true}
          subtitle={
            <img
              src={`/assets/icons/${dark ? "profile-dark.svg" : "profile.svg"}`}
              alt=""
              height="18px"
              style={{ margin: "0 -10px" }}
            />
          }
          onSubTitileClick={() => _pushProfile()}
        />
      </div>

      <h5
        style={{
          margin: "30px 0 0 20px",
          position: "fixed",
          zIndex: 4,
          fontWeight: "600",
          fontSize: "18px",
          color: dark ? "white" : "#404B69",
        }}
      >{`Hello ${auth && auth.name ? auth.name : "Guest"}`}</h5>

      <View
        className="content"
        style={{
          ...BaseStyles.p_t,
          ...BaseStyles.baseContentWrapper,
        }}
      >
        <AmazonPayBalance key={"balance" + balanceKEY} auth={auth} />

        <MenuOrder navigate={(route) => Router.push(route)} />

        {true && (
          <Section
            childContentWrapperProps={{
              style: {
                paddingBottom: 0,
              },
            }}
            title="Track your Order"
            iconImage={ImageConst.trackIcon}
            icon="track_order"
            cta={
              <TouchableWithoutFeedback onPress={() => Router.push("/orders")}>
                <Text
                  style={{
                    ...BaseStyles.textPurple,
                    ...BaseStyles.textSmall,
                    ...BaseStyles.m_b,
                    color: dark ? "white" : "#404B69",
                  }}
                >
                  VIEW ALL
                </Text>
              </TouchableWithoutFeedback>
            }
            style={{ marginBottom: "30px !important", marginTop: "4px" }}
          >
            <View style={{ ...BaseStyles.flex }}>
              {auth.name ? <Orders key={"orders" + balanceKEY} /> : null}
            </View>
          </Section>
        )}
        <View></View>
        <Section
          title="Top Picks for you"
          icon="top_picks"
          iconImage={ImageConst.topPicsIcon}
          titleProps={{
            style: BaseStyles.p_t_sm,
          }}
        >
          <View
            style={{
              ...BaseStyles.flex,
              ...BaseStyles.center,
              ...BaseStyles.p_t,
              ...BaseStyles.p_b,
              marginLeft: 6,
            }}
          >
            <PickForYou key={"picks" + balanceKEY} />
          </View>
        </Section>

        <BottomMenu query={asPath} />
      </View>

      {locationError ? <LocationErrorCMP /> : null}

      {!auth.name && loginStatus ? (
        <LoginCMP
          onClose={() => setLoginStatus(false)}
          onSuccessLogin={() => _onSuccessLogin()}
          orderType={""}
          orderTypes={[]}
          dontShowType={true}
          onSetType={() => console.log("")}
          dark={dark}
        />
      ) : null}
    </div>
  );
};

Index.getInitialProps = async (ctx) => {
  const { asPath, query, req } = ctx;
  const { token } = nextCookie(ctx);
  let host = "";
  if (req && req.headers) {
    host = req.headers.host;
  }

  let isLoggedIn = token ? true : false;
  return { isLoggedIn, token, asPath, query, host };
};

export default Index;
