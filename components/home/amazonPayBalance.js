import { useState, useEffect } from "react";
import { View, Text } from "../helperComponents/RNmigrateHelpers";
import styled from "styled-components";
import { BaseStyles } from "../helperComponents/BaseStyles";
import { currency } from "../../lib/enums";
import { _getBalance } from "../../lib/helpers/checkout";
import ImageConst from "../../utils/ImageConst";

const StyledGradientCard = styled(View)`
  /* background: #02023f; */
  /* background: #02023f; */
  border-radius: 16px;
  padding: 12px 12px 24px 12px;
  .logo {
  }
`;

const Index = ({ auth }) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    _getBalance(setBalance);
  }, []);

  return (
    <StyledGradientCard
      style={{
        // background: "#02023f",
        borderRadius: 16,
        padding: "12px 12px 12px 12px",
        margin: 12,
      }}
    >
      <View className="logo" style={{ margin: 12, marginLeft: 0 }}>
        <img src={ImageConst.amazonPay} alt="" />
      </View>
      <View
        className="block-note text-white m-l-m"
        style={{
          textAlign: "start",
          borderLeft: "3px solid white",
          paddingLeft: "10px",
        }}
      >
        <Text
          style={{ ...BaseStyles.noMargin, fontWeight: 600, fontSize: "12px" }}
          className="no-margin text-medium"
        >
          Your Balance
        </Text>
        <Text
          style={{
            ...BaseStyles.noMargin,
            fontWeight: "900",
            fontSize: "15px",
          }}
          className="text-faded text-medium no-margin"
        >{`${currency}${balance}`}</Text>
      </View>
    </StyledGradientCard>
  );
};

export default Index;
