import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import StatusIndicator from "./StatusIndicator";
import Link from "./Link";
import moment from "moment";
import random from "random";
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from "../helperComponents/RNmigrateHelpers";
import { BaseStyles } from "../helperComponents/BaseStyles";
// import RightChevron from '../../pages/helperComponents/icons/RightChevron';
import GroceryStatusIndicator from "./GroceryStatusIndicator";
import { baseLocalURLForm, fetchMerchantDetails } from "../../lib/api/baseUrls";
import Router from "next/router";
import ImageConst from "../../utils/ImageConst";
import axios from "axios";

const colors = [
  "#1059FC",
  "#239549",
  "#3F3D9D",
  "#02023F",
  "#EB8213",
  "#225a27",
  "#3b697b",
  "#10375c",
  "#0A97B0",
];

export const OrderStatusMap = [
  ["Pending", 0],
  ["Accepted", 1],
  ["Ready", 2],
  ["Served", 3],
  ["Rejected", 4],
  ["Booked", 5],
  ["Confirmed", 6],
  ["Packing", 7],
  ["Ready", 8],
  ["Packed", 11],
  ["Out For Delivery", 12],
  ["Delivered", 9],
];

const StyledCard = styled(View)`
  text-align: left;
  padding: 16px;
  padding-bottom: 10px;
  min-width: 80%;
  border-radius: 15px;
  .title-container {
    display: flex;
    align-items: center;
    padding: 8px 0;
    margin-bottom: 8px;
    .icon {
      margin-right: 8px;
    }
    .title {
      font-weight: bold;
      font-size: 12px;
      font-style: italic;
      margin: 0;
    }
  }
  .avatar .right-fragment {
    width: 54px;
  }
`;

const StyledCardWithLabel = styled(View)`
  text-align: left;

  width: calc(100% - 20px);
  border-right-top-radius: 6px;
  border-left-top-radius: 6px;
  border-left: none;
  .title-container {
    display: flex;
    align-items: center;
    padding: 8px 0;
    margin-bottom: 8px;
    .icon {
      margin-right: 8px;
    }
    .title {
      font-weight: bold;
      font-size: 12px;
      font-style: italic;
      margin: 0;
    }
  }
  .avatar .right-fragment {
    width: 54px;
  }
`;

const Avatar = ({ randomIndex, children }) => {
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  return (
    <div
      style={{
        background: dark
          ? "none"
          : "linear-gradient(304.83deg, #48647D -3.37%, #6B8299 60.9%, #DAE2EB 118.03%, #8CA2B7 183.73%, #EDF2F7 270.85%)",
        padding: 1,
        borderRadius: "50%",
        height: 50,
        width: 50,
      }}
    >
      <View
        style={{
          background: dark ? "#2C2F33" : "#E0E5EC",
          boxShadow: dark
            ? "-5px -5px 15px rgba(59, 68, 81, 0.35), 5px 5px 15px rgba(0, 0, 0, 0.35)"
            : "-9px -9px 16px rgba(255, 255, 255, 0.35), 9px 9px 16px rgba(163, 177, 198, 0.35)",
          borderRadius: "50%",
          padding: "0 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: 800,
          height: 48,
          width: 48,
          color: dark ? "white" : "#48647D",
          marginRight: 8,
        }}
      >
        {children}
      </View>
    </div>
  );
};

function Section({ order, withLabel = false, history, showStatus = true }) {
  let {
    amount,
    m_name,
    order_id,
    time,
    o_status_id,
    p_status_id,
    flow,
    refcode,
  } = order;

  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  if (flow === 7 && o_status_id === 6 && p_status_id === 2) {
    o_status_id = 7;
  }

  const slug = m_name
    ? m_name.split(" ").map((i) => i.substr(0, 1).toUpperCase())
    : "";

  const [merchantDetails, setMerchantDetails] = React.useState(null);

  const viewOrder = () => {
    if (order.flow === 3) {
      Router.push(`/orders/${order.refcode}`);
    } else {
      Router.push(`/my-order/grocery/${order.refcode}`);
    }
  };

  const getMerchantDetails = (callback) => {
    if (!merchantDetails) {
      let url = fetchMerchantDetails();
      let payload = {
        url,
        type: "POST",
        payload: {
          transaction_id: refcode,
        },
      };

      axios
        .post(baseLocalURLForm, payload)
        .then((res) => res.data)
        .then((res) => {
          const data = res.data.data;

          if (data && data.m_phone) {
            const mDetails = {
              contact: data.m_phone,
              location: {
                lat: data.lat,
                long: data.long,
              },
            };
            callback(mDetails);
            setMerchantDetails(mDetails);
          }
        });
    } else {
      callback(merchantDetails);
    }
  };

  const CallStoreCTA = () => (
    <TouchableWithoutFeedback
      onPress={async () => {
        getMerchantDetails((mDetails) => {
          if (!mDetails || !mDetails.contact) return;
          window.open(`tel:${mDetails.contact}`);
        });
      }}
    >
      <View>
        <Text
          style={{
            ...BaseStyles.noMargin,
            ...BaseStyles.m_r,
            ...BaseStyles.textPrimary,
            ...BaseStyles.m_l,
            fontWeight: 300,
            fontSize: "12px",
            color: dark ? "white" : "#404B69",
          }}
        >
          Call store
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const DirectionsCTA = ({ text, showStatus }) => (
    <TouchableWithoutFeedback
      onPress={async () => {
        getMerchantDetails((mDetails) => {
          if (!mDetails || !mDetails.location) return;
          const { location } = mDetails;
          window.open(
            `http://maps.google.com/?q=${location.lat},${location.long}`
          );
        });
      }}
    >
      <View>
        <Text
          style={{
            ...BaseStyles.noMargin,
            ...BaseStyles.m_r,
            ...BaseStyles.textPrimary,
            ...BaseStyles.m_l,
            fontWeight: 300,
            fontSize: "12px",
            color: dark ? "white" : "#404B69",
            textAlign: "center",
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const GoToStore = ({ text }) => (
    <TouchableWithoutFeedback
      onPress={async () => {
        getMerchantDetails((mDetails) => {
          if (!mDetails || !mDetails.location) return;
          const { location } = mDetails;
          window.open(
            `http://maps.google.com/?q=${location.lat},${location.long}`
          );
        });
        return;
        if (order.flow == 3) {
        } else {
          getMerchantDetails((mDetails) => {
            if (!mDetails || !mDetails.location) return;
            const { location } = mDetails;
            window.open(
              `http://maps.google.com/?q=${location.lat},${location.long}`
            );
          });
        }
      }}
    >
      <View>
        <Text
          style={{
            ...BaseStyles.noMargin,
            ...BaseStyles.m_r,
            ...BaseStyles.textPrimary,
            ...BaseStyles.m_l,
            fontWeight: 300,
            fontSize: "12px",
            color: dark ? "white" : "#404B69",
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  if (withLabel)
    return (
      <View style={{ ...BaseStyles.flex }}>
        <View
          style={{
            position: "relative",
            ...(flow === 3 ? BaseStyles.bgPrimary : BaseStyles.bgPurple),
            width: 20,
            ...BaseStyles.flex,
            ...BaseStyles.textWhite,
            ...BaseStyles.borderTLRadius_m,
            ...BaseStyles.borderBLRadius_m,
            marginBottom: "10px",
            background: flow === 3 ? "#BB2C29" : dark ? "#fff" : "#400082",
          }}
        >
          <Text
            style={{
              ...BaseStyles.noMargin,
              ...BaseStyles.textExtraSmall,
              // transform: [{ rotate: '-90deg'}, {translate: '0, 24px'}],
              ...BaseStyles.textWhite,
              ...BaseStyles.textStrong,
              transform:
                flow === 3
                  ? "rotate(-90deg) translate(-5px, -2px)"
                  : "rotate(-90deg) translate(-4px, -10px)",
              position: "absolute",
              fontWeight: "bold",
              left: 0,
              bottom: "50%",
              color: flow === 3 && dark ? "#BB2C29" : dark ? "#400082" : "#fff",
            }}
          >
            {flow === 3 ? "Food" : "Grocery"}
          </Text>
        </View>
        <StyledCardWithLabel
          style={{
            ...BaseStyles.borderTRRadius_m,
            ...BaseStyles.borderBRRadius_m,
            background: dark ? "#2C2F33" : "#E0E5EC",
            boxShadow: dark
              ? "inset -5px -5px 15px #3B4451, inset 5px 5px 15px #000000"
              : "inset -3px -3px 7px #FFFFFF, inset 2px 2px 5px rgba(136, 165, 191, 0.38)",
            marginBottom: "10px",
          }}
        >
          <View
            style={{
              ...BaseStyles.flex,
              ...BaseStyles.alignMiddle,
            }}
          >
            <View
              style={{
                ...BaseStyles.flex,
                ...BaseStyles.flex_occupy,
                marginTop: "10px",
                marginLeft: "5px",
              }}
            >
              <Avatar
                class="avatar"
                randomIndex={random.int(0, colors.length - 1)}
              >
                <b>
                  {slug[0]}
                  {slug[1]}
                </b>
              </Avatar>
              <View
                style={{ ...BaseStyles.m_l, maxWidth: "calc(100% - 74px)" }}
              >
                <Text
                  style={{
                    ...BaseStyles.noMargin,
                    ...BaseStyles.textStrong,
                    ...BaseStyles.textMedium,
                    color: dark ? "white" : "#404B69",
                  }}
                  numberOfLines={1}
                >
                  {m_name}
                </Text>
                <Text
                  style={{
                    ...BaseStyles.noMargin,
                    ...BaseStyles.textSmall,
                    color: dark ? "#AAAAAA" : "#404B69",
                  }}
                >
                  Order ID - {order_id}
                </Text>
                <Text
                  style={{
                    ...BaseStyles.noMargin,
                    ...BaseStyles.textStrong,
                    ...BaseStyles.textExtraSmall,
                    ...BaseStyles.textFaded,
                    color: dark ? "#AAAAAA" : "#404B69",
                  }}
                >
                  {moment(time.split(" ")[0]).format("LL")} |{" "}
                  {moment(time.split(" ")[1], ["h:mm:s"]).format("HH:mm A")}
                </Text>
              </View>
            </View>
            <View
              class="vertical-align right-fragment align-middle"
              style={{
                ...BaseStyles.textEndAlign,
                marginRight: "10px",
              }}
            >
              {showStatus ? (
                <React.Fragment>
                  <View style={{ width: 64 }}>
                    {flow === 3 ? (
                      <StatusIndicator status={o_status_id} />
                    ) : (
                      <GroceryStatusIndicator status={o_status_id} />
                    )}
                  </View>
                  <Text
                    style={{
                      ...BaseStyles.noMargin,
                      ...BaseStyles.textStrong,
                      ...BaseStyles.textExtraSmall,
                      ...BaseStyles.textFaded,
                    }}
                  >
                    {OrderStatusMap.find((i) => i[1] === o_status_id)
                      ? OrderStatusMap.find(
                          (i) => i[1] === o_status_id
                        )[0].toUpperCase()
                      : null}
                  </Text>
                  <Text
                    style={{
                      ...BaseStyles.noMargin,
                      ...BaseStyles.textStrong,
                      ...BaseStyles.textExtraSmall,
                      ...BaseStyles.textFaded,
                      fontWeight: "900",
                      fontSize: "15px",
                      color: dark ? "#ffffff" : "#404B69",
                    }}
                  >
                    ₹ {amount}
                  </Text>
                </React.Fragment>
              ) : (
                <Text
                  style={{
                    ...BaseStyles.noMargin,
                    ...BaseStyles.textStrong,
                  }}
                >
                  ₹ {amount}
                </Text>
              )}
            </View>
          </View>
          {o_status_id === 3 || o_status_id === 9 ? (
            <View
              class="m-t-xs mt-2 mb-2"
              style={{
                ...BaseStyles.flex,
                ...BaseStyles.m_t_sm,
                alignSelf: "center",
              }}
            >
              <GoToStore text="Go to Store" />

              <Link
                className="m-r-l"
                wrapperStyle={{
                  ...BaseStyles.m_l,
                  ...BaseStyles.m_r,
                  fontSize: "16px",
                  marginLeft: "20px",
                  color: dark ? "white" : "#404B69",
                }}
                onClick={viewOrder}
              >
                <span style={{ color: dark ? "white" : "#404B69" }}>
                  View Details
                </span>
              </Link>
            </View>
          ) : (
            <View
              class="m-t-xs"
              style={{ ...BaseStyles.flex, ...BaseStyles.m_t_sm }}
            >
              <CallStoreCTA />
              <View style={{ ...BaseStyles.flex_occupy }}>
                <DirectionsCTA text="Directions" />
              </View>
              <Link
                className="m-r-l"
                wrapperStyle={{
                  ...BaseStyles.m_l,
                  ...BaseStyles.m_r,
                  marginLeft: "20px",
                  color: dark ? "white" : "#404B69",
                }}
                onClick={viewOrder}
              >
                View Details
              </Link>
            </View>
          )}
        </StyledCardWithLabel>
      </View>
    );

  return (
    <div
      style={{
        background: dark
          ? "none"
          : "linear-gradient(271.62deg, #C9DAED 1.21%, #FFFFFF 97.63%)",
        borderRadius: "16px",
        padding: 1,
        margin: "0 10px",
      }}
    >
      <StyledCard
        style={{
          background: dark ? "#2C2F33" : "#E0E5EC",
          boxShadow: dark
            ? "inset -5px -5px 15px #3B4451, inset 5px 5px 15px #000000"
            : "inset -3px -3px 7px #FFFFFF, inset 2px 2px 5px rgba(136, 165, 191, 0.38)",
          borderRadius: "16px",
        }}
      >
        <View style={BaseStyles.flex}>
          <View style={{ ...BaseStyles.flex, ...BaseStyles.flex_occupy }}>
            <Avatar
              class="avatar"
              randomIndex={random.int(0, colors.length - 1)}
            >
              <b>
                {slug[0]}
                {slug[1]}
              </b>
            </Avatar>
            <View style={{ ...BaseStyles.m_l, paddingRight: 8 }}>
              <Text
                style={{
                  ...BaseStyles.noMargin,
                  ...BaseStyles.textStrong,
                  ...BaseStyles.textMedium,
                  width: "97%",
                  fontWeight: "600",
                  fontSize: "15px",
                  color: dark ? "white" : "#404B69",
                }}
                numberOfLines={1}
              >
                {m_name}
              </Text>
              <Text
                style={{
                  ...BaseStyles.noMargin,
                  ...BaseStyles.textSmall,
                  fontWeight: 300,
                  fontSize: "12px",
                  color: dark ? "#AAAAAA" : "#6F7A97",
                }}
              >
                Order ID - {order_id}
              </Text>
              <Text
                style={{
                  ...BaseStyles.noMargin,
                  ...BaseStyles.textStrong,
                  ...BaseStyles.textExtraSmall,
                  fontWeight: 300,
                  fontSize: "11px",
                  color: dark ? "#AAAAAA" : "#6F7A97",
                }}
              >
                {moment(time.split(" ")[0]).format("LL")} |{" "}
                {moment(time.split(" ")[1], ["h:mm:s"]).format("HH:mm A")}
              </Text>
            </View>
          </View>
          <View
            class="vertical-align right-fragment align-middle"
            style={{ ...BaseStyles.m_b }}
          >
            <View style={{ width: 64 }}>
              {flow === 3 ? (
                <StatusIndicator status={o_status_id} />
              ) : (
                <GroceryStatusIndicator status={o_status_id} />
              )}
            </View>
            <Text
              style={{
                ...BaseStyles.noMargin,
                ...BaseStyles.textStrong,
                ...BaseStyles.textExtraSmall,
                fontWeight: "normal",
                fontSize: "11px",
                color: dark ? "#AAAAAA" : "#404B69",
              }}
            >
              {OrderStatusMap.find((i) => i[1] === o_status_id)
                ? OrderStatusMap.find(
                    (i) => i[1] === o_status_id
                  )[0].toUpperCase()
                : null}
            </Text>
            <Text
              style={{
                ...BaseStyles.noMargin,
                ...BaseStyles.textStrong,
                ...BaseStyles.textExtraSmall,
                ...BaseStyles.textFaded,
                fontWeight: "900",
                fontSize: "15px",
                color: dark ? "#ffffff" : "#404B69",
              }}
            >
              ₹ {amount}
            </Text>
          </View>
        </View>
        {o_status_id === 3 || o_status_id === 9 ? (
          <View
            class="m-t-xs"
            style={{ ...BaseStyles.flex, ...BaseStyles.m_t_sm }}
          >
            <GoToStore text="Go to Store" />
            <Text
              style={{
                color: dark ? "white" : "#404B69",
                flexDirection: "row",
                display: "flex",
                marginLeft: "20px",
              }}
              onClick={viewOrder}
            >
              View Details <img src={ImageConst.rightArrowSvg} />
            </Text>
          </View>
        ) : (
          <View
            class="m-t-xs"
            style={{ ...BaseStyles.flex, ...BaseStyles.m_t_sm }}
          >
            <CallStoreCTA />
            <View style={{ ...BaseStyles.flex_occupy }}>
              <DirectionsCTA text="Directions" />
            </View>

            <View
              style={{
                float: "left",
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                fontWeight: 300,
                fontSize: "12px",
                color: dark ? "white" : "#404B69",
                marginLeft: "20px",
              }}
              onClick={viewOrder}
            >
              View Details
              <img src={ImageConst.rightArrowSvg} height="10px" alt="" />
            </View>
          </View>
        )}
      </StyledCard>
    </div>
  );
}

export default Section;
