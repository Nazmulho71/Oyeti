import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

// import FoodIcon from "./icons/FoodIcon";
// import OyetiIcon from "./icons/OyetiIcon";
// import TopPicksIcon from "./icons/TopPicksIcon";
// import TrackOrderIcon from "./icons/TrackOrderIcon";
// import VegIcon from "./icons/VegIcon";
// import GroceryIcon from "./icons/GroceryIcon";
import { BaseStyles } from "./BaseStyles";
// import LocationPin from "./icons/locationPin";
// import CartIcon from "./icons/cart";
// import BackIcon from "./icons/BackIcon";
// import CallIcon from "./icons/CallIcon";

const View = ({ children, ...rest }) => <div {...rest}>{children}</div>;

const TouchableWithoutFeedback = ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
);

const Text = ({ children, ...rest }) => <p {...rest}>{children}</p>;

export const IconMap = {
  // food: FoodIcon,
  // oyeti: OyetiIcon,
  // top_picks: TopPicksIcon,
  // track_order: TrackOrderIcon,
  // veg: VegIcon,
  // grocery: GroceryIcon,
  // location: LocationPin,
  // cart: CartIcon,
  // back: BackIcon,
  // call: CallIcon,
};

const StyledSection = styled.div`
  .title-container {
    display: flex;
    align-items: center;
    padding: 8px 0;
    margin-bottom: 8px;
    .icon {
      margin-right: 18px;
    }
    .title {
      font-weight: bold;
      font-size: 12px;
      font-style: italic;
      margin: 0;
    }
  }
`;

export default function Section(props) {
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  // const IconComponent = props.icon ? IconMap[props.icon] : null;
  return (
    <StyledSection
      style={{
        ...BaseStyles.m_t_m,
        ...BaseStyles.m_b_m,
        textAlign: "left",
        margin: "10px 0",
        padding: "0 10px",
        background: "none",
        ...(props.style ? props.style : {}),
      }}
    >
      <View style={{ ...BaseStyles.flex, ...BaseStyles.alignMiddle }}>
        <View
          className={`title-container ${dark && "title-container-dark"}`}
          style={{
            ...BaseStyles.flex_occupy,
            ...BaseStyles.flex,
            ...BaseStyles.alignMiddle,
            display: "flex",
            alignItems: "center",
            padding: "8px 0",
            marginBottom: 8,
          }}
        >
          {props.icon && (
            <View className="icon" style={{ marginRight: 6 }}>
              {/* <IconComponent fill="#fe346e" /> */}
              <img src={props.iconImage} alt="" />
            </View>
          )}
          <Text
            className={`title ${dark && "title-dark"}`}
            style={{
              color: dark ? "white" : "#404B69",
              fontWeight: "bold",
              fontSize: "12px",
              fontStyle: "italic",
              margin: "0px !important",
            }}
            {...props.titleProps}
          >
            {props.title}
          </Text>
        </View>
        <View style={{ ...BaseStyles.m_r }}>{props.cta}</View>
      </View>
      <View className="child-content" {...props.childContentWrapperProps}>
        {props.children}
      </View>
    </StyledSection>
  );
}
