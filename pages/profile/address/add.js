import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ImageConst from "../../../utils/ImageConst";
import Router from "next/router";
import { getAuth } from "../../../lib/helpers/common";
import {
  _getLocation,
  onPressLocationTitle,
  onAddNewAddress,
  getPlaceDetaislByLatLong,
} from "../../../lib/helpers/home";
import { addressTypesWithImages } from "../../../lib/enums";
import Map from "../../../components/common/newMap";

function Untitled1() {
  const [auth, setAuth] = useState({});
  const [type, setType] = useState("Home");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [name, setName] = useState("");
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
      console.log(e);
      setType(e);
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

  const onMarkerDragEnd = async (region) => {
    let data = {
      latitude: region.lat,
      longitude: region.lng,
      only_data_return: true,
    };
    let response = await getPlaceDetaislByLatLong(loader, setLoader, data);
    if (response.status == "OK") {
      let addressData = response.results[0];
      setAddress(addressData.formatted_address);
      setRegionData(data);
      setTonetagPoition({ lat: region.lat, lng: region.lng });
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
    <>
      <div className={`add-data-container`}>
        <div className={`add-address`}>{address}</div>
        <div className={`add-address-line1`}>
          <div className={`add-address-line-title`}>
            House /Block / Building No.
          </div>
          {/* <div className={`add-text_input`} placeholder="6th floor"></div> */}
          <input
            type="text"
            value={name}
            className={`add-text_input`}
            onChange={(e) => onChangeKey(e, "name")}
          />
        </div>
        <div className={`add-address-line1`}>
          <div className={`add-address-line-title`}>Landmark</div>
          {/* <div className={`add-text_input`} placeholder="Vr Mall"></div> */}
          <input
            type="text"
            value={landmark}
            className={`add-text_input`}
            onChange={(e) => onChangeKey(e, "landmark")}
          />
        </div>

        <div className={`add-address-type-container`}>
          {Object.entries(addressTypesWithImages).map((addre, index) => {
            return (
              <div
                className={`add-address-type-block`}
                key={index}
                onClick={() => onChangeKey(addre[1].title, "type")}
              >
                <div className={`add-address-type-rect`}>
                  <div className={`add-address-type-icon`}>
                    <img src={addre[1].image} />
                  </div>
                  <div className={`add-address-type-text`}>
                    {addre[1].title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button className="add-address-button" onClick={() => _submitAddress()}>
          Add location
        </button>
      </div>

      <div className={`add-mapviewstack`}>
        <div className={`add-mapviewstack`}>
          <Map
            tonetagPoition={tonetagPoition}
            key={mapKey}
            onChangeMap={(region) => onMarkerDragEnd(region)}
          />
        </div>
        <div className={`add-map-search`}>
          <div className={`app-search`}>
            <div className={`app-search-back`}>
              <div className={`app-search-icon`}>
                {" "}
                <img src={ImageConst.searchIcon} />
              </div>
              <input
                className={`app-search-input`}
                value={address}
                placeholder="Search location"
                onChange={(e) => onChangeKey(e, "address")}
              />
            </div>
          </div>
          {locations.map((loca, index) => {
            return (
              <div key={index} onClick={() => onLocationClick(loca)}>
                {/* <h5><b>{loca.structured_formatting ? loca.structured_formatting.main_text : ''}</b></h5> */}
                <p className="app-search-input">
                  {loca.structured_formatting
                    ? loca.structured_formatting.main_text
                    : ""}
                </p>
              </div>
            );
          })}
        </div>

        <div className={`add-back`} onClick={() => Router.back()}>
          <div className={`add-back-icon`}>
            {" "}
            <img src={ImageConst.backIcon} />
          </div>
        </div>
      </div>
    </>
  );
}

const Rect2 = styled.div`
  height: 473px;
  background-color: #fff;
  border-bottom-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-top-width: 1px;
  border-color: #000000;
  flex-direction: column;
  display: flex;
  margin-top: 339px;
  border-style: solid;
`;

const LoremIpsum = styled.span`
  font-weight: 400;
  color: #121212;
  margin-top: 67px;
  margin-left: 41px;
`;

const Group3 = styled.div`
  height: 50px;
  flex-direction: column;
  display: flex;
  margin-top: 21px;
  margin-left: 41px;
  margin-right: 41px;
  border-bottom-width: 1px;
  border-left-width: 0px;
  border-right-width: 0px;

  border-style: solid;
  border-top-width: 0px;
  border-color: #000000;
`;

const LoremIpsum2 = styled.span`
  color: #121212;
  font-weight: lighter;
`;

const TextInput2 = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  color: #121212;
  height: 16px;
  margin-top: 3px;
  border: none;
  background: transparent;
`;

const Rect3 = styled.div`
  width: 296px;
  height: 2px;
  background-color: rgba(0, 0, 0, 1);
  margin-top: 14px;
`;

const Group4 = styled.div`
  height: 50px;
  flex-direction: column;
  display: flex;
  margin-top: 13px;
  margin-left: 41px;
  margin-right: 41px;

  border-bottom-width: 1px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-top-width: 0px;
  border-style: solid;
`;

const LoremIpsum3 = styled.span`
  font-weight: 400;
  color: #121212;
  font-weight: lighter;
`;

const TextInput3 = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  color: #121212;
  height: 16px;
  margin-top: 3px;
  border: none;
  background: transparent;
`;

const Rect4 = styled.div`
  width: 296px;
  height: 1px;
  background-color: rgba(0, 0, 0, 1);
  margin-top: 14px;
`;

const MapView = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 339px;
`;

const Group = styled.div`
  top: 54px;
  left: 78px;
  width: 274px;
  height: 38px;
  position: absolute;
  flex-direction: column;
  display: flex;
`;

const Rect = styled.div`
  width: 274px;
  height: 38px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 12px;
  flex-direction: row;
  display: flex;
`;

const Image2 = styled.img`
  width: 100%;
  height: 17px;
  object-fit: contain;
`;

const TextInput = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  height: 16px;
  margin-left: 12px;
  margin-top: 1px;
  border: none;
  background: transparent;
`;

const Image2Row = styled.div`
  height: 17px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: 132px;
  margin-left: 16px;
  margin-top: 10px;
`;

const Group2 = styled.div`
  top: 52px;
  left: 22px;
  width: 38px;
  height: 38px;
  position: absolute;
  flex-direction: column;
  display: flex;
`;

const Image3 = styled.img`
  top: 13px;
  left: 14px;
  width: 11px;
  height: 11px;
  position: absolute;
  object-fit: contain;
`;

const EllipseStack = styled.div`
  width: 38px;
  height: 38px;
  position: relative;
`;

const MapViewStack = styled.div`
  height: 339px;
  margin-top: -812px;
  position: relative;
`;

const Group7 = styled.div`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 20px;
  border-width: 1px;
  border-color: #000000;
  height: 75px;

  border-style: solid;
`;

const Rect5 = styled.div`
  width: 64px;
  height: 75px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 20px;
  flex-direction: column;
  display: flex;
`;

const Image4 = styled.img`
  width: 16px;
  height: 100%;
  margin-top: 17px;
  margin-left: 24px;
  object-fit: contain;
`;

const Home = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  margin-top: 6px;
  margin-left: 13px;
`;

const Group6 = styled.div`
  width: 64px;
  height: 75px;
  flex-direction: column;
  display: flex;
  margin-left: 16px;
`;

const Rect6 = styled.div`
  width: 64px;
  height: 75px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 20px;
  flex-direction: column;
  display: flex;
`;

const Image5 = styled.img`
  width: 16px;
  height: 100%;
  margin-top: 17px;
  margin-left: 24px;
  object-fit: contain;
`;

const Work = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  margin-top: 6px;
  margin-left: 16px;
`;

const Group5 = styled.div`
  width: 64px;
  height: 75px;
  flex-direction: column;
  display: flex;
  margin-left: 11px;
`;

const Rect7 = styled.div`
  width: 64px;
  height: 75px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 20px;
  flex-direction: column;
  display: flex;
`;

const Image6 = styled.img`
  width: 16px;
  height: 100%;
  margin-top: 17px;
  margin-left: 24px;
  object-fit: contain;
`;

const Other = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  margin-top: 6px;
  margin-left: 15px;
`;

const Group7Row = styled.div`
  height: 75px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin: 24px;
`;

const Rect8 = styled.div`
  width: 36px;
  height: 38px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 12px;
  flex-direction: column;
  display: flex;
`;

const Image7 = styled.img`
  width: 11px;
  height: 100%;
  margin-top: 13px;
  margin-left: 12px;
  object-fit: contain;
`;

export default Untitled1;
