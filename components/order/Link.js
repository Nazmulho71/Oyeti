import React from "react";
import styled from "styled-components";
import { Text, TouchableWithoutFeedback, View } from "../helperComponents/RNmigrateHelpers";
import { BaseStyles } from "./../helperComponents/BaseStyles";

const StyledLink = styled.a`
  font-size: 13px;
  color: #fe346e;
  display: block;
`;

export default function Link(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onClick}>
      <View style={props.wrapperStyle}>
        <Text
          style={{ ...BaseStyles.textPrimary, ...BaseStyles.textSmall, ...BaseStyles.noMargin, ...BaseStyles.flex }}>
          {props.children}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
