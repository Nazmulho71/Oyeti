import { useEffect, useState } from "react";
import {
  _getBill,
  _getSubTotal,
  _getTotal,
  _shopNow,
  _explore,
} from "../../lib/helpers/bill";
import Router from "next/router";
import Header from "../../components/common/header";
import { getBilTime } from "../../lib/helpers/time";
import { currency } from "../../lib/enums";
import ImageConst from "../../utils/ImageConst";

const Index = ({ query }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    _getBill(query.refcode, setData);
  }, []);

  var Width = 0;
  var Height = 0;
  if (typeof window !== "undefined") {
    Width = window.innerWidth;
    Height = window.innerHeight;
  }

  // For UI Only
  var SCRWidth = Width - 60;
  var loopCount = parseInt(parseInt(SCRWidth / 15) / 2);
  var temp = [];
  for (var i = 0; i <= loopCount; i++) {
    temp.push({ url: ImageConst.round });
  }

  return (
    <div className="wrapper">
      <div className="container m-0 p-0">
        <Header
          title={`Bill`}
          goBack={() => Router.back()}
          subtitle=""
          onSubTitileClick={() => console.log("")}
        />
        <div className="receiptContainer">
          <div
            style={{
              marginTop: 60,
              paddingTop: 30,
              marginBottom: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{
                textAlign: "center",
                flex: 1,
                display: "block",
                fontSize: 16,
                color: "#000",
              }}
            >
              {"Thank you for shopping at "}
            </span>
            <h6
              style={{
                textAlign: "center",
                fontFamily: "sans-serif",
                marginTop: 5,
                color: "#000",
                fontWeight: "700",
              }}
            >
              {data.m_name}
            </h6>
          </div>
          <div
            style={{
              flexWrap: "wrap",
              height: "auto",
              width: Width > 360 ? 360 : Width,
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <span
              style={{
                position: "absolute",
                zIndex: 1,
                top: 15,
                width: 180,
                textAlign: "left",
                fontSize: 15,
                fontFamily: "sans-serif",
                fontWeight: "700",
                right: Width > 320 ? 15 : 5,
                color: "#282828",
              }}
            >
              <span
                style={{ fontWeight: "500", fontSize: 13, textAlign: "left" }}
              >
                {"Get daily essentials from "}
              </span>
              {data.m_name + `\n`}
              <span
                style={{ fontWeight: "500", fontSize: 13, textAlign: "left" }}
              >
                {"delivered home or schedule a pickup."}
              </span>
            </span>
            <button
              onClick={() => _shopNow()}
              style={{
                fontWeight: "700",
                color: "#fff",
                position: "absolute",
                background: "transparent",
                bottom: Width > 320 ? 17 : 17,
                right: 15,
                zIndex: 1,
                fontFamily: "sans-serif",
              }}
            >
              {"Shop Now!"}
            </button>
            <img
              resizemode={"contain"}
              className="offerBanner"
              src={ImageConst.offerHeader}
              style={{
                maxWidth: "100%",
                height: 175,
                width: Width,
                padding: "0 10px",
              }}
            />
          </div>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
              margin: 15,
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#DBDBDB",
              height: 100,
              padding: 15,
              borderRadius: 20,
            }}
          >
            <div style={{ flex: 1, alignItems: "flex-start" }}>
              <span
                style={{
                  fontSize: 11,
                  color: "#747474",
                  marginBottom: 15,
                  display: "block",
                }}
              >
                {getBilTime(data.time + "Z")}
              </span>
              {data.refcode && (
                <span
                  style={{
                    fontSize: 11,
                    display: "block",
                    color: "#282828",
                    marginBottom: 5,
                    textAlign: "left",
                  }}
                >
                  {"Tnx ID -" + data.refcode}
                </span>
              )}
              {data.bill_data != "" && data.bill_data?.data && (
                <span
                  style={{
                    fontSize: 11,
                    display: "block",
                    color: "#747474",
                    marginBottom: 5,
                  }}
                >
                  {"Invoice no. " + data.bill_data?.data?.invoice_number}
                </span>
              )}
            </div>
            <div style={{ flex: 1, alignItems: "flex-end" }}>
              <span
                style={{
                  display: "block",
                  fontSize: 11,
                  color: "#747474",
                  marginBottom: 15,
                  textAlign: "right",
                }}
              >
                Customer details
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: 11,
                  color: "#282828",
                  marginBottom: 5,
                  textAlign: "right",
                }}
              >
                {data.m_name}
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: 11,
                  color: "#747474",
                  marginBottom: 5,
                  textAlign: "right",
                }}
              >
                {data.m_phone}
              </span>
            </div>
          </div>
          <div
            style={{
              margin: "0px 15px",
              position: "relative",
              borderRadius: 7,
              borderBottom: "1px solid #EBEBEB",
              backgroundColor: "#F7F9FF",
              padding: 15,
            }}
          >
            {data.bill_data != "" &&
              data.bill_data?.data &&
              orders.bill_data?.data?.items?.length != 0 && (
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      color: "#747474",
                      marginBottom: 5,
                      alignItems: "flex-end",
                    }}
                  >
                    {"ITEMS"}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#747474",
                      marginBottom: 5,
                      alignItems: "flex-end",
                    }}
                  >
                    {"PRICE"}
                  </span>
                </div>
              )}
            {data.bill_url == "" && (
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <span
                  style={{
                    color: "#FE346E",
                    fontSize: 15,
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  No Bill Found
                </span>
              </div>
            )}
            <img
              src={ImageConst.round}
              style={{
                width: 15,
                height: 15,
                zIndex: 1,
                borderRadius: "50%",
                position: "absolute",
                bottom: -7.5,
                left: -7.5,
              }}
            />
            <img
              src={ImageConst.round}
              style={{
                width: 15,
                height: 15,
                zIndex: 1,
                borderRadius: "50%",
                position: "absolute",
                bottom: -7.5,
                right: -7.5,
              }}
            />
          </div>
          <div
            style={{
              position: "relative",
              margin: "0px 15px",
              border: "1px solid #F1F1F1",
              backgroundColor: "#fff",
              padding: 15,
            }}
          >
            <div style={{ borderBottom: "1px solid #DBDBDB" }}>
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 15,
                }}
              >
                <span
                  style={{
                    alignItems: "flex-start",
                    fontSize: 15,
                    color: "#5C5C5C",
                  }}
                >
                  Subtotal
                </span>
                <span
                  style={{
                    alignItems: "flex-end",
                    fontSize: 15,
                    color: "#5C5C5C",
                    fontWeight: "700",
                  }}
                >
                  {currency} {_getSubTotal(data)}
                </span>
              </div>
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 15,
                }}
              >
                <span
                  style={{
                    alignItems: "flex-start",
                    fontSize: 15,
                    color: "#5C5C5C",
                  }}
                >
                  Discount
                </span>
                <span
                  style={{
                    alignItems: "flex-end",
                    fontSize: 15,
                    color: "#FE346E",
                    fontWeight: "700",
                  }}
                >
                  -{currency} {data.discount}
                </span>
              </div>
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 15,
                }}
              >
                <span
                  style={{
                    alignItems: "flex-start",
                    fontSize: 15,
                    color: "#5C5C5C",
                  }}
                >
                  Delivery Charge
                </span>
                <span
                  style={{
                    alignItems: "flex-end",
                    fontSize: 15,
                    color: "#5C5C5C",
                    fontWeight: "700",
                  }}
                >
                  +{currency} {data.order_delivery_charge}
                </span>
              </div>
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 15,
                }}
              >
                <span
                  style={{
                    alignItems: "flex-start",
                    fontSize: 15,
                    color: "#5C5C5C",
                  }}
                >
                  Package Charge
                </span>
                <span
                  style={{
                    alignItems: "flex-end",
                    fontSize: 15,
                    color: "#5C5C5C",
                    fontWeight: "700",
                  }}
                >
                  +{currency} {data.order_package_charge}
                </span>
              </div>
            </div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                margin: "20px 0px",
              }}
            >
              <span
                style={{
                  alignItems: "flex-start",
                  fontSize: 15,
                  color: "#282828",
                  fontWeight: "700",
                }}
              >
                Total
              </span>
              <span
                style={{
                  alignItems: "flex-end",
                  fontSize: 15,
                  color: "#282828",
                  fontWeight: "700",
                }}
              >
                {currency} {_getTotal(data)}
              </span>
            </div>
            <img
              src={ImageConst.round}
              style={{
                width: 15,
                height: 15,
                borderRadius: "50%",
                position: "absolute",
                bottom: -7.5,
                left: -7.5,
              }}
            />
            <img
              src={ImageConst.round}
              style={{
                width: 15,
                height: 15,
                borderRadius: "50%",
                position: "absolute",
                bottom: -7.5,
                right: -7.5,
              }}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                position: "absolute",
                bottom: -7.5,
                width: "100%",
              }}
            >
              {temp.map((data, i) => {
                return (
                  <img
                    key={i}
                    style={{ borderRadius: "50%", width: 15, height: 15 }}
                    src={ImageConst.round}
                  />
                );
              })}
            </div>
          </div>
          <div
            style={{
              height: 6,
              backgroundColor: "#fff",
              border: "1px solid #DBDBDB",
              margin: "15px 0px",
            }}
          ></div>
          <div
            style={{
              position: "relative",
              width: 277,
              height: 156,
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <span
              style={{
                fontFamily: "sans-serif",
                position: "absolute",
                zIndex: 1,
                top: 30,
                width: 130,
                right: 20,
                textAlign: "left",
                lineHeight: 1.3,
                fontSize: 10,
                fontWeight: "800",
                color: "#282828",
                textAlign: "left",
              }}
            >
              {
                "Enjoy rewards on your purchase at oyeti store using Amazon Pay."
              }
            </span>
            <div
              style={{
                fontFamily: "sans-serif",
                position: "absolute",
                right: 10,
                bottom: 20,
                zIndex: 1,
                height: 26,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 25,
                  width: 95,
                  color: "#fff",
                  borderRadius: 15,
                  fontWeight: "700",
                  fontSize: 9,
                  lineHeight: "25px",
                  fontFamily: "sans-serif",
                  boxShadow: "0px 2px 2px 1px #ce8a0e ",
                  backgroundColor: "#FF9300",
                  textAlign: "center",
                }}
                onClick={() => _explore()}
              >
                Explore Rewards
              </button>
            </div>
            <img
              resizemode={"contain"}
              style={{
                maxWidth: "100%",
                height: 156,
                width: Width,
                borderRadius: 20,
                margin: "auto",
              }}
              src={ImageConst.offerbanner}
            />
            <span
              style={{
                position: "absolute",
                zIndex: 1,
                bottom: 7,
                fontSize: 7,
                right: 50,
                fontWeight: "700",
                color: "#282828",
              }}
            >
              {"* Terms and Conditions apply."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Index.getInitialProps = async (ctx) => {
  const { asPath, query } = ctx;
  return { asPath, query };
};

export default Index;
