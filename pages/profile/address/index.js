import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../../components/common/header";
import Router from "next/router";
import { getAddresses, deleteAddress } from "../../../lib/helpers/address";
import Confirm from "../../../components/common/confirm";
import nextCookie from "next-cookies";
import ImageConst from "../../../utils/ImageConst";
import styled from "styled-components";

const Index = () => {
  const [addresses, setAddresses] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [actionAddress, setActionAddress] = useState({});
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  const _onAction = (type) => {
    setShowConfirm(false);
    if (type == "yes") {
      deleteAddress(actionAddress.id);
    }
  };

  useEffect(() => {
    getAddresses(setAddresses);
  }, []);

  return (
    <div className="wrapper" style={{ height: "100vh" }}>
      <div className="container m-0 p-0">
        <Header
          title={`Manage Address`}
          goBack={() => Router.back()}
          subtitle="Add New"
          onSubTitileClick={() => Router.push("/profile/address/add")}
        />

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            color: dark ? "white" : "#404B69",
            marginLeft: "-10px",
            marginTop: "-45px",
            zIndex: 99,
          }}
        >
          Saved addresses
        </div>

        {/* <div className={`manage-container`}>
          <div className={`manange-saved-address`}>
            <div>Saved addresses</div>
          </div>
          <div className={`manage-divider`}></div>
          <div
            className={`manage-container-content`}
            onClick={() => Router.push("/profile/address/add")}
          >
            <div className={`manage-container-image`}>
              {" "}
              <img className={`profile-image`} src={ImageConst.addIcon} />
            </div>

            <div style={{ color: "#FE346E" }}>Add New</div>
          </div>
        </div> */}

        <div style={{ marginTop: "80px", padding: "25px 20px" }}>
          {addresses.map((address, index) => {
            return (
              <div
                className={`log-modal-body-items ${
                  dark && "log-modal-body-items-dark"
                }`}
                key={index}
              >
                <div
                  className="d-flex align-items-center justify-content-between"
                  style={{ marginBottom: "-20px" }}
                >
                  <button style={{ background: "none" }}>
                    <h4 className="text-capitalize m-0">{address.landmark}</h4>
                  </button>
                  <img
                    onClick={() => {
                      setShowConfirm(true);
                      setActionAddress(address);
                    }}
                    height="20"
                    // style={{ marginRight: "15px" }}
                    src={`/assets/icons/deleteAddress.svg`}
                    alt=""
                  />
                </div>
                <br />
                <hr
                  style={{
                    borderTop: dark ? "1px solid #EDF2F7" : "1px solid #48647D",
                    marginTop: "2px",
                  }}
                ></hr>
                <p style={{ marginBottom: "-20px" }}>
                  {address.address_line_1 + " " + address.address_line_2}
                </p>
                <br />
              </div>
            );
          })}
        </div>

        {/* <div>
          {addresses.map((address, index) => {
            return (
              <div key={index}>
                <div className={`manage-container-list`}>
                  <div className={`manange-saved-address`}>
                    <div className={`manage-container-image`}>
                      {" "}
                      <img src={ImageConst.locationIcon} />
                    </div>
                    <div>{address.name}</div>
                  </div>
                  <div className={`manage-divider`}></div>
                  <div className={`manage-container-content`}>
                    <div
                      className={`manage-container-image`}
                      onClick={() => {
                        setShowConfirm(true);
                        setActionAddress(address);
                      }}
                    >
                      <img
                        className={`profile-image`}
                        src={ImageConst.deleteIcon}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className={`manage-container-address`}>
                  {address.address_line_1}
                </div>
              </div>
            );
          })}
        </div> */}
      </div>

      {showConfirm ? (
        <Confirm
          title="Delete Address"
          onClose={() => setShowConfirm(false)}
          onAction={(type) => _onAction(type)}
        />
      ) : null}
    </div>
  );
};

Index.getInitialProps = async (ctx) => {
  const { asPath, query } = ctx;
  const { token } = nextCookie(ctx);

  let isLoggedIn = token ? true : false;
  return { isLoggedIn, token, asPath, query };
};

export default Index;
