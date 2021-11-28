import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/common/header";
import { BaseStyles } from "../../components/helperComponents/BaseStyles";
import Router from "next/router";
import {
  _getLocation,
  onPressTitle,
  getCurrentLocation,
} from "../../lib/helpers/home";

const Index = () => {
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState([]);
  const [loader, setLoader] = useState(false);
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  return (
    <div
      className="wrapper"
      id="location_wrapper"
      style={{ height: "100vh", ...BaseStyles.bgWhite }}
    >
      <div className="container m-0 p-0">
        <Header
          title={`Search Your Location`}
          goBack={() => Router.back()}
          subtitle=""
          onSubTitileClick={() => console.log("")}
        />

        <div
          className={`input-group-prepend`}
          style={{ position: "fixed", zIndex: 999, top: 30, right: 20 }}
          onClick={() => getCurrentLocation(loader, setLoader)}
        >
          <span
            className="input-group-text"
            id="basic-addon1"
            style={{ height: "44px", border: "none" }}
          >
            <button
              style={{
                background: "none",
                marginBottom: "20px",
              }}
            >
              <div
                className={`back-icon-bord ${dark && "back-icon-bord-dark"}`}
              >
                <i className={`back-icon ${dark && "back-icon-dark"}`}>
                  <img
                    src={`/assets/icons/${dark ? "gps-dark.svg" : "gps.svg"}`}
                    alt=""
                    height="25px"
                  />
                </i>
              </div>
            </button>
          </span>
        </div>

        <div style={{ margin: "100px 5% 0 5%" }}>
          <div className="shop-list-address-menu">
            <div
              id="searchText"
              className={`shop-list-name-menu ${
                dark && "shop-list-name-menu-dark"
              }`}
            >
              Search Your Location
            </div>
          </div>

          <div className="mb-0 pt-0" id="search">
            <div
              className={`search-area-border ${
                dark && "search-area-border-dark"
              }`}
            >
              <div
                id="searchInputText"
                className={`input-group search-inp search-area ${
                  dark && "search-area-dark"
                }`}
                style={{
                  width: "100%",
                  height: "56px",
                  borderRadius: "16px",
                  color: dark ? "white" : "#404B69",
                }}
                // onClick={onSearchFocused}
              >
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="basic-addon1"
                    // onClick={() => (searchText ? _localClear() : console.log(""))}
                    style={{ background: "#f8f6f2", height: "44px" }}
                  >
                    <button
                      style={{
                        background: "none",
                        marginBottom: "-5px",
                      }}
                    >
                      <i
                        className={`fas fa-search search-icon ${
                          dark && "search-icon-dark"
                        }`}
                        style={{
                          fontSize: "22px",
                          marginLeft: "20px",
                        }}
                      ></i>
                    </button>
                    {/* <button><i className={`fas  ${searchText ? 'fa-times' :'fa-search'}` }></i></button> */}
                    {/* <img src={ImageConst.search} /> */}
                  </span>
                </div>

                <input
                  style={{
                    background: "#f8f6f2",
                    height: "44px",
                    color: dark ? "white" : "#404B69",
                  }}
                  type="text"
                  id="searchInputText"
                  onChange={(e) => {
                    setSearch(e.target.value);
                    _getLocation(
                      e.target.value,
                      setLocations,
                      loader,
                      setLoader
                    );
                  }}
                  value={search}
                  className="form-control"
                  placeholder=""
                  aria-label="Username"
                  autoFocus
                  aria-describedby="basic-addon1"
                />
                {/* {searchText ? <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1" onClick={() => _localClear()}>
                            <button><i className="fas fa-times"></i></button>
                        </span>
                    </div> : null } */}
              </div>
            </div>
          </div>

          {!search && (
            <div className="text-center mt-4 pt-4">
              <img
                src={`/assets/img/${
                  dark ? "search-location-dark.svg" : "search-location.svg"
                }`}
                alt=""
              />
            </div>
          )}
        </div>

        <div
          className={`d-flex justify-start py-3 px-3 search-container active-search-container ${
            dark && " active-search-container-dark"
          }`}
        >
          {/* <div
          className={`active-search-title ${
            dark && " active-search-title-dark"
          }`}
        >
          <h1>Search stores</h1>
        </div> */}
        </div>

        {/* <div
          className="d-flex justify-start py-3 px-3 search-container"
          id="search-container_single"
          style={{ display: "block", height: "12%" }}
        >
          <div className="mb-0 pt-3" style={{ flex: 1 }}>
            <div className="input-group search-inp" id="input-single_inp">
              <button
                onClick={() => Router.back()}
                style={{ background: "none" }}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <input
                type="text"
                id="searchInputText"
                onChange={(e) => {
                  setSearch(e.target.value);
                  _getLocation(e.target.value, setLocations, loader, setLoader);
                }}
                value={search}
                className="form-control"
                placeholder="Search for an address"
                aria-label="Username"
                autoFocus
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div> */}

        {/* {search ? null : (
          <button
            onClick={() => getCurrentLocation(loader, setLoader)}
            id="location_button"
          >
            <div
              style={{
                height: "40px",
                width: "40px",
                padding: "5px",
                display: "inherit",
                justifyContent: "center",
                WebkitBoxPack: "center",
              }}
            >
              <img
                src="/assets/img/aim.svg"
                style={{ width: "100%", height: "20px" }}
                alt=""
              />
            </div>
            <b>Use current location.</b> Using GPS{" "}
          </button>
        )} */}
        <div style={{ margin: "20px", color: dark ? "white" : "#404B69" }}>
          {loader ? "Loading...." : null}
        </div>
        {locations.map((loca, index) => {
          return (
            <div
              key={index}
              onClick={() => onPressTitle(loca, loader, setLoader)}
              className={`search-locations ${dark && "search-locations-dark"}`}
            >
              {/* {index == 0 ? (
                <div
                  style={{
                    marginBottom: "10px",
                    height: "1px",
                    color: "#686b78",
                    boxShadow: "rgb(232 232 232) 0px -0.5px 0px inset",
                  }}
                  onClick={() => {
                    return false;
                  }}
                >
                  <img
                    src="/assets/img/google.png"
                    style={{
                      position: "absolute",
                      top: "62px",
                      right: "0px",
                      height: "5%",
                      padding: "10px",
                    }}
                    onClick={() => {
                      return false;
                    }}
                    alt=""
                  />
                </div>
              ) : null} */}
              <p
                onClick={() => onPressTitle(loca, loader, setLoader)}
                style={{
                  // marginLeft: "10px",
                  // marginRight: "10px",
                  marginBottom: "0px",
                  fontWight: 600,
                  fontSize: "12px",
                  color: dark ? "white" : "#404B69",
                  fontWeight: "500",
                }}
              >
                {loca.structured_formatting
                  ? loca.structured_formatting.main_text
                  : ""}
              </p>
              <p
                onClick={() => onPressTitle(loca, loader, setLoader)}
                style={{
                  // borderBottom: "0.5px solid #686b78",
                  marginBottom: "0px",
                  // marginLeft: "10px",
                  // marginRight: "10px",
                  fontWight: 600,
                  fontSize: "12px",
                  color: dark ? "white" : "#404B69",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {loca.structured_formatting
                  ? loca.structured_formatting.secondary_text
                  : ""}
              </p>{" "}
            </div>
          );

          // if (index == 0) {

          // }
          // return (
          //     <>

          //         <div key={index} onClick={() => onPressTitle(loca, loader, setLoader)} style={{ background: "none" }}>
          //             <p style={{ marginLeft: "10px", marginRight: "10px", marginBottom: "0px",fontSize: '1rem', color:'#282c3f', fontWeight:'500' }}>{loca.structured_formatting ? loca.structured_formatting.main_text : ''}</p>
          //             <p style={{ borderBottom: "0.5px solid #686b78",marginBottom:'0px', marginLeft: "10px", marginRight: "10px",fontSize:'0.93rem', color:'#686b78', textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap'}}>{loca.structured_formatting ? loca.structured_formatting.secondary_text : ''}</p> <br />

          //         </div>

          //     </>)
        })}
      </div>
    </div>
  );
};

export default Index;
