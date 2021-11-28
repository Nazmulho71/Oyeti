import Header from "../../../components/common/header";
import { useState, useEffect, Fragment } from "react";
import Router from "next/router";
import nextCookie from "next-cookies";
import { getAuth } from "../../../lib/helpers/common";
import { addressTypes } from "../../../lib/enums";

import MapCmp from "../../../components/common/map";
import {
  _getLocation,
  onPressLocationTitle,
  onAddNewAddress,
} from "../../../lib/helpers/home";

const Index = () => {
  const [auth, setAuth] = useState({});
  const [type, setType] = useState("Home");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [name, setName] = useState("");
  const [erros, setErrors] = useState("");
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState([]);
  const [loader, setLoader] = useState(false);
  const [regionData, setRegionData] = useState({});
  const [tonetagPoition, setTonetagPoition] = useState({
    lat: 12.99633559708836,
    lng: 77.69536050481904,
  });
  const [mapKey, setMapKey] = useState(1);

  const onChangeKey = (e, key) => {
    if (key == "address") {
      setAddress(e.target.value);
      _getLocation(e.target.value, setLocations, loader, setLoader);
    }

    if (key == "name") {
      setName(e.target.value);
    }

    if (key == "landmark") {
      setLandmark(e.target.value);
    }

    if (key == "type") {
      setType(e.target.value);
    }
  };

  const onLocationClick = async (loca) => {
    setAddress(loca.structured_formatting.main_text);
    setLocations([]);
    let region = await onPressLocationTitle(loca, loader, setLoader);

    if (region) {
      setRegionData(region);
      setTonetagPoition({ lat: region.latitude, lng: region.longitude });
      let key = mapKey + 1;
      setMapKey(key);
    }
  };

  const _submitAddress = async () => {
    let data = {
      name,
      address_line_1: address,
      address_line_2: "",
      lat: regionData.latitude,
      long: regionData.longitude,
      landmark,
    };
    let response = await onAddNewAddress(data);
    if (response) {
      Router.back();
    }
  };

  useEffect(() => {
    getAuth(setAuth);
  }, []);

  return (
    <div className="wrapper" style={{ height: "100vh" }}>
      <div className="container m-0 p-0">
        <Header
          title={`Add Address`}
          goBack={() => Router.back()}
          subtitle=""
          onSubTitileClick={() => console.log("")}
        />

        <MapCmp key={mapKey} tonetagPoition={tonetagPoition} />

        <div style={{ marginTop: "25%" }}>
          <label>Address</label>
          <input
            type="text"
            value={address}
            placeholder="Enter location"
            onChange={(e) => onChangeKey(e, "address")}
          />
        </div>

        <br />
        <br />

        {locations.map((loca, index) => {
          return (
            <div key={index} onClick={() => onLocationClick(loca)}>
              <h5>
                <b>
                  {loca.structured_formatting
                    ? loca.structured_formatting.main_text
                    : ""}
                </b>
              </h5>
              {/* <p>{loca.structured_formatting ? loca.structured_formatting.main_text : ''}</p> <br /> */}
            </div>
          );
        })}

        <br />
        <br />
        <div>
          <label>House/Flat No</label>
          <input
            type="text"
            value={name}
            placeholder="Enter your house/flat no"
            onChange={(e) => onChangeKey(e, "name")}
          />
        </div>
        <br />
        <br />
        <div>
          <label>Landmark</label>
          <input
            type="text"
            value={landmark}
            placeholder="Enter any landmark"
            onChange={(e) => onChangeKey(e, "landmark")}
          />
        </div>

        <div>
          <br /> <br />
          {Object.entries(addressTypes).map((gen, index) => {
            return (
              <Fragment key={index}>
                <input
                  type="radio"
                  onChange={(e) => onChangeKey(e, "type")}
                  id="html"
                  defaultChecked={gen[1] == type}
                  name="gender"
                  value={gen[1]}
                />
                <label htmlFor="html">{gen[0]}</label>
                <br></br>
              </Fragment>
            );
          })}
        </div>

        <button onClick={() => _submitAddress()}>Add new Address</button>
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

export default Index;
