import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import { getAddresses } from "../../lib/helpers/address";

const Index = ({ onClose, onSelectAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const isLoading = useSelector((state) => state.isLoading);
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  useEffect(() => {
    getAddresses(setAddresses);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className="log-modal-overlay">
      <div className="log-modal">
        <div
          className={`log-modal-inner ${dark && "log-modal-inner-dark"}`}
          style={{ height: "100%", overflow: "auto", borderRadius: "0" }}
        >
          <div
            className={`log-modal-header d-flex align-items-center justify-content-between p-0 ${
              dark && "log-modal-header-dark"
            }`}
          >
            <div className="rep-modal-close" onClick={() => onClose()}>
              {/* <i className="fas fa-times"></i> */}
              <button style={{ background: "none" }}>
                <div
                  className={`back-icon-bord ${dark && "back-icon-bord-dark"}`}
                >
                  <i
                    className={`fas fa-arrow-left back-icon ${
                      dark && "back-icon-dark"
                    }`}
                  ></i>
                </div>
              </button>
            </div>

            <div>
              <h3>Select an Address</h3>
            </div>

            <div className="rep-modal-close" style={{ opacity: "0" }}>
              <button style={{ background: "none" }}>
                <div
                  className={`back-icon-bord ${dark && "back-icon-bord-dark"}`}
                >
                  <i
                    className={`fas fa-arrow-left back-icon ${
                      dark && "back-icon-dark"
                    }`}
                  ></i>
                </div>
              </button>
            </div>
          </div>

          <div className="log-modal-body-wrap">
            <div className="log-modal-body">
              {addresses.length == 0 ? (
                <p>No Address found</p>
              ) : (
                addresses.map((address, index) => {
                  return (
                    <div
                      className={`log-modal-body-items ${
                        dark && "log-modal-body-items-dark"
                      }`}
                      key={index}
                      onClick={() => onSelectAddress(address)}
                    >
                      <div
                        className="d-flex align-items-center justify-content-between"
                        style={{ marginBottom: "-20px" }}
                      >
                        <button style={{ background: "none" }}>
                          <h4 className="text-capitalize m-0">
                            {address.landmark}
                          </h4>
                        </button>
                        <img
                          // height="25"
                          // style={{ marginRight: "15px" }}
                          src={`/assets/img/${
                            dark ? "addHomeDark.svg" : "addHome.svg"
                          }`}
                          alt=""
                        />
                      </div>
                      <br />
                      <hr
                        style={{
                          borderTop: dark
                            ? "1px solid #EDF2F7"
                            : "1px solid #48647D",
                          marginTop: "2px",
                        }}
                      ></hr>
                      <p style={{ marginBottom: "-20px" }}>
                        {address.address_line_1 + " " + address.address_line_2}
                      </p>
                      <br />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div
            onClick={() => Router.push("/profile/address/add")}
            class={`categories-menu ${dark && "categories-menu-dark"}`}
            style={{ bottom: "50px", width: "125px", height: "40px" }}
          >
            <h3>Add new</h3>
          </div>

          {/* <div className="log-modal-continue-btn" style={{ display: "flex" }}>
            <button
              onClick={() => Router.push("/profile/address/add")}
              style={{ position: "sticky" }}
            >
              Add new
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Index;
