import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/common/header";
import Router from "next/router";
import nextCookie from "next-cookies";
import { getAuth } from "../../lib/helpers/common";
import { logout } from "../../middleware/auth";
import styled from "styled-components";
import ImageConst from "../../utils/ImageConst";
import EditCMP from "../../components/profile/edit";
import { getProfile } from "../../lib/helpers/auth";
import { setTheme } from "../../store/actions";

const Index = ({ store }) => {
  const [auth, setAuth] = useState({});
  const [isUpdateProfile, setIsUpdateProfile] = useState(false);
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  useEffect(() => {
    getAuth(setAuth);
    getProfile(setAuth);
  }, []);

  const switchTheme = () => {
    store.dispatch(setTheme(true));
    // window.location.reload();
  };

  return (
    <div className="wrapper" style={{ height: "100vh", background: "#fff" }}>
      <div className="container m-0 p-0" style={{ height: "100%" }}>
        {isUpdateProfile ? (
          <EditCMP
            cancle={() => {
              setIsUpdateProfile(false);
              getAuth(setAuth);
            }}
          />
        ) : null}

        <Header
          title={`Profile`}
          goBack={() => Router.back()}
          // subtitle="Edit"
          // onSubTitileClick={() => Router.push('/profile/edit')}
          // onSubTitileClick={() => setIsUpdateProfile(true)}
        />

        <div className={`profile-container`}>
          <div className={`Userdetails ${dark && "Userdetails-dark"}`}>
            <div className="d-flex align-items-center justify-content-between">
              <div
                className={`profile-usename ${dark && "profile-usename-dark"}`}
              >
                {auth.name}
              </div>
              <div
                className={`profile-edit`}
                onClick={() => setIsUpdateProfile(true)}
              >
                Edit
              </div>
            </div>
            <hr
              style={{
                margin: "3px 23px 3px 23px",
                color: dark ? "#fff" : "#404B69",
              }}
            />
            <div className={`profile-phonegroup`}>
              <div className={`profile-phoneiconRow`}>
                <div className={`profile-icon`}>
                  <img
                    src={
                      dark ? ImageConst.callDarkProfile : ImageConst.callProfile
                    }
                    alt=""
                  />
                </div>
                <div className={`profile-text ${dark && "profile-text-dark"}`}>
                  {auth.phone}
                </div>
              </div>
            </div>
            <div className={`profile-phonegroup`}>
              <div className={`profile-phoneiconRow`}>
                <div className={`profile-icon`}>
                  <img
                    src={
                      dark
                        ? ImageConst.emailDarkProfile
                        : ImageConst.emailProfile
                    }
                    alt=""
                  />
                </div>
                <div className={`profile-text ${dark && "profile-text-dark"}`}>
                  {auth.email}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`profile-placeholder ${
              dark && "profile-placeholder-dark"
            }`}
            style={{ cursor: "pointer" }}
          >
            <div
              className={`profile-placeholder-content`}
              onClick={() => Router.push("/profile/address")}
            >
              <div className="d-flex align-items-center">
                <div className={`profile-icon`}>
                  <img
                    src={
                      dark
                        ? ImageConst.locationDarkProfile
                        : ImageConst.locationProfile
                    }
                    alt=""
                  />{" "}
                </div>
                <div
                  className={`profile-placeholder-text ${
                    dark && "profile-placeholder-text-dark"
                  }`}
                >
                  Manage Address
                </div>
              </div>

              <div className={`profile-placeholder-arrow`}>
                <img
                  className={`profile-image`}
                  src={
                    dark ? ImageConst.arrowDarkProfile : ImageConst.arrowProfile
                  }
                  alt=""
                />
              </div>
            </div>
          </div>

          <div
            className={`profile-placeholder ${
              dark && "profile-placeholder-dark"
            }`}
            style={{ cursor: "pointer" }}
          >
            <div className={`profile-placeholder-content`}>
              <div className="d-flex align-items-center">
                <div className={`profile-icon`}>
                  <img
                    style={{ height: "15px", marginTop: "-2px" }}
                    src={
                      dark
                        ? ImageConst.themeDarkProfile
                        : ImageConst.themeProfile
                    }
                    alt=""
                  />{" "}
                </div>
                <div
                  className={`profile-placeholder-text ${
                    dark && "profile-placeholder-text-dark"
                  }`}
                >
                  Change Theme
                </div>
              </div>
              {/* <div className={`profile-placeholder-arrow`}>
                <img
                  className={`profile-image`}
                  src={ImageConst.arrowProfile}
                  alt=""
                />
              </div> */}
              <div
                className="toggle-item m-0"
                style={
                  {
                    // marginLeft: "32%",
                    // marginRight: "10px",
                  }
                }
              >
                <label
                  className={`form-switch-ios d-flex align-items-center ${
                    dark && "form-switch-ios-dark"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={dark}
                    name="checkedA"
                    onChange={switchTheme}
                  />
                  <i
                    className={`toggle-button m-0 ${
                      dark && "toggle-button-dark"
                    }`}
                  ></i>
                </label>
              </div>
            </div>
          </div>

          <div
            className={`profile-support-border ${
              dark && "profile-support-border-dark"
            }`}
          >
            <div
              className={`profile-placeholder profile-support ${
                dark && "profile-support-dark"
              }`}
              style={{ cursor: "pointer" }}
            >
              <div className={`profile-placeholder-content`}>
                <div className={`profile-icon`}>
                  {" "}
                  <img src={ImageConst.supportProfile} alt="" />{" "}
                </div>
                <div
                  className={`profile-placeholder-text profile-support-text`}
                >
                  How can we help you?
                </div>
                <div className={`profile-placeholder-arrow ms-4`}>
                  {" "}
                  &nbsp;
                  {/* <img
                    className={`profile-image`}
                    src={ImageConst.arrowProfile}
                    alt=""
                  /> */}
                </div>
              </div>
            </div>
          </div>

          {/* <div
            className={`profile-logout`}
            style={{ cursor: "pointer" }}
            onClick={() => logout()}
          >
            <div className={`profile-logout-text`}>Logout</div>
          </div> */}

          <div
            className={`fixed-order-btn-cont ${
              dark && "fixed-order-btn-cont-dark"
            }`}
            style={{ position: "fixed", padding: "10px 15px" }}
          >
            <div
              className={`fixed-order-btn-border ${
                dark && "fixed-order-btn-border-dark"
              }`}
            >
              <div
                className={`fixed-order-btn justify-content-center ${
                  dark && "fixed-order-btn-dark"
                }`}
                onClick={() => logout()}
              >
                <div className="fo-view-order">
                  <p className={`view-order mb-0 ${dark && "view-order-dark"}`}>
                    Logout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Index.getInitialProps = async (ctx) => {
  const { asPath, query } = ctx;
  const { token } = nextCookie(ctx);

  let isLoggedIn = token ? true : false;
  return { isLoggedIn, token, asPath, query };
};

const Logout = styled.span`
  font-family: Overpass;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", "Overpass", sans-serif;

  font-style: normal;
  font-weight: 400;
  color: #400282;
  margin-left: 131px;
  align-self: center;
`;

const Placeholder1 = styled.div`
  margin: 24px;
  height: 52px;
  margin-top: 50px;
  background-color: rgba(247, 249, 255, 1);
  border-radius: 20px;
  flex-direction: column;
  display: flex;
  align-items: center;
`;

const Placeholdertext1 = styled.span`
  font-weight: 400;
  color: #121212;
  margin-top: 18px;
`;

const Placeholder = styled.div`
  display: flex;
  margin: 24px;
  background-color: rgba(247, 249, 255, 1);
  border-radius: 20px;
  margin-top: 20px;
  flex-direction: row;
  height: 52px;
`;

const Icon = styled.img`
  height: 19px;
  object-fit: contain;
`;

const Arrow = styled.img`
  height: 19px;
  object-fit: contain;
  margin-left: 40%;
`;

const Placeholdertext = styled.span`
  font-weight: 400;
  color: #121212;
  margin-left: 15px;
`;

const IconRow = styled.div`
  height: 19px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-left: 23px;
  margin-top: 17px;
`;

const Userdetails = styled.div`
  flex-direction: column;
  display: flex;
  margin: 24px;
  background-color: rgba(247, 249, 255, 1);
  border-radius: 20px;
  margin-top: 100px;
  display: flex;
`;

const UsernameText = styled.span`
  font-weight: 500;
  color: rgba(64, 0, 130, 1);
  font-size: 22px;
  margin-top: 25px;
  margin-left: 23px;
`;

const Phonegroup = styled.div`
  width: 106px;
  height: 16px;
  flex-direction: row;
  display: flex;
  margin-top: 13px;
  margin-left: 23px;
`;

const Phoneicon = styled.img`
  width: 100%;
  height: 15px;
  margin-top: 1px;
  object-fit: contain;
`;

const Userphone = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  margin-left: 17px;
`;

const PhoneiconRow = styled.div`
  height: 16px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
`;

const Emailgroup = styled.div`
  width: 140px;
  height: 16px;
  flex-direction: row;
  display: flex;
  margin-top: 10px;
  margin-left: 23px;
  margin-bottom: 25px;
`;

const Emailicon = styled.img`
  width: 100%;
  height: 9px;
  margin-top: 4px;
  object-fit: contain;
`;

const Useremail = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  margin-left: 13px;
`;

const EmailiconRow = styled.div`
  height: 16px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
`;

export default Index;
