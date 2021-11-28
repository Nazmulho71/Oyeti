import React, { useState, useEffect } from "react";

import Images from "../../utils/ImageConst";
import Router from "next/router";
import Rating from "../../components/rating";
import axios from "axios";
import {
  _setIndexFun,
  _handleTouchEndFun,
  _callWaiter,
} from "../../lib/helpers/home";
import {
  _pushMenu,
  setMid,
  _checkStoreOld,
  setTable,
} from "../../lib/helpers/common";
import { _getCategories } from "../../lib/helpers/menu";
import Enums, { flowTypes } from "../../lib/enums";
import { _showURL, baseLocalURL } from "../../lib/api/baseUrls";
import CallWaiter from "../../components/common/callWaiter";
import { getStoreDetails } from "../../lib/helpers/store";
// import LoginCMP from '../../components/login/login'
import nextCookie from "next-cookies";

let imageUrl =
  "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80";
// imageUrl = "https://voice-server.s3.ap-south-1.amazonaws.com/img/momos.gif"
imageUrl = "https://voice-server.s3.ap-south-1.amazonaws.com/img/1.gif";
let staticImage = "https://voice-server.s3.ap-south-1.amazonaws.com/img/1.jpeg";
let isVideoPlaying = true;
let redirectOyeti = parseInt(process.env.NEXT_PUBLIC_IS_REDIRECT_ENABLED);

const App = ({ query, redirectUrl, error, isLoggedIn, asPath, headers }) => {
  const [currentIndex, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [heightOver, setHeightOver] = useState(0);
  const [menuParam, setMenuParam] = useState({});
  const [storeData, setStoreData] = useState({
    assets: [{ asset_type_id: Enums.AssetTypeImage }],
    name: "",
  });
  const [loginOpen, setLoginOpen] = useState(false);
  const [isCallWaiter, setIsCallWaiter] = useState(false);
  const [errors, setErrors] = useState("");

  const _setIndex = (isUp) => {
    let index = currentIndex;
    _setIndexFun(isUp, index, storeData, setIndex);
  };

  const _getStoreData = async () => {
    try {
      getStoreDetails(query.mid, setStoreData, setErrors);
      return;
      let url = _showURL();
      const res = await axios.post(baseLocalURL, {
        payload: {
          id: query.mid,
        },
        url,
      });
      setStoreData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const _checkLogin = () => {
    let mid = query.mid;

    Router.push(`/pay/${mid}`);
    return;
    if (!isLoggedIn) {
      setLoginOpen(true);
    } else {
      Router.push(`/pay/${query.mid}`);
    }
  };

  const handleTouchEnd = () => {
    _handleTouchEndFun(
      heightOver,
      touchStart,
      touchEnd,
      storeData.assets,
      currentIndex,
      _setIndex,
      setHeightOver
    );
  };

  const _checkInitData = () => {
    setMenuParam(query);
    setTable(query.tableNo ? query.tableNo : "");
    if (storeData && storeData.name) {
      localStorage.setItem("store_name", storeData.name ? storeData.name : "");
    }

    setMid(query.mid);
    _checkStoreOld(query.mid);
    // let data = Cookies.get('token', { domain: 'staging.oyeti.com' })
    // console.log(data)
    _getStoreData();
  };

  const _pushMoyeti = () => {
    let locationData = window.location;
    if (locationData.host == "m.oyeti.com" && redirectOyeti) {
      let url = "https://oyeti.com" + locationData.pathname;
      window.location.replace(url);
    } else {
      _checkInitData();
    }
  };

  useEffect(() => {
    _pushMoyeti();
  }, []);

  return (
    <div className="App">
      <div className="wrapper getStartedWrapper">
        <div className="container m-0 p-0">
          <div className="main-container">
            <div className="pt-4 px-3">
              <div className="d-flex justify-content-between">
                <div className="home-screen-text">
                  <p className="text-muted mb-0">Welcome to</p>
                  <h3 className="mb-0">{storeData.name}</h3>
                  <p className="text-muted mb-1">{storeData.address_line_1}</p>
                  <Rating size="small" ratingCount={storeData.star_rating} />

                  {query.tableNo && storeData.name ? (
                    <div
                      className="home-nav-btns"
                      style={{ maxWidth: "50% !important" }}
                    >
                      <button>{"Table No " + query.tableNo}</button>
                    </div>
                  ) : null}
                </div>
                <div className="share-btn text-align-right">
                  {/* <img className="img-fluid" src={Images.share} alt="share" /> */}
                </div>
              </div>
              <div className="bottom-btn-nav-cont px-0 py-3">
                {storeData.name ? (
                  <div className="d-flex justify-content-around">
                    <div className="home-nav-btns">
                      {/* <Link href="/home"> */}
                      {/* <button onClick={() => _pushMenu(menuParam)}>Menu</button> */}
                      <button
                        onClick={() =>
                          Router.push(`/menu/${flowTypes.QSR}/${query.mid}`)
                        }
                      >
                        Menu
                      </button>
                      {/* </Link> */}
                    </div>
                    <div className="home-nav-btns">
                      {/* <Link href="/paybill"> */}
                      <button onClick={() => _checkLogin()}>Pay Bill</button>
                      {/* </Link> */}
                    </div>
                    <div className="home-nav-btns">
                      <button
                        onClick={() =>
                          _callWaiter(query.mid, query.tableNo, setIsCallWaiter)
                        }
                      >
                        Waiter
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {isCallWaiter ? (
            <CallWaiter onClose={() => setIsCallWaiter(false)} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

App.getInitialProps = async (ctx) => {
  const { token } = nextCookie(ctx);
  let isLoggedIn = token ? true : false;
  // let isLoggedIn = true
  const { asPath, query, res, req } = ctx;
  // console.log(req.headers)
  // res.writeHead(302, { Location:  'm.oyeti.com'+asPath})
  // res.end()
  // return

  try {
    let routes = query.slug;
    let mid = routes[1];
    let flow = routes[0];
    let table = routes[2];

    let data = {
      flowId: flow,
      mid: mid,
      tableNo: table,
    };

    // let url = _showURL()
    // const res = await axios.post(baseLocalURL, {
    //     payload: {
    //         id:mid
    //     },
    //     url
    // })
    // const json =  res.data.data
    return {
      storeData: {},
      query: data,
      redirectUrl: asPath,
      isLoggedIn,
      headers: req.headers,
    };
  } catch (error) {
    return { storeData: {}, query, error, isLoggedIn };
  }
};

export default App;
