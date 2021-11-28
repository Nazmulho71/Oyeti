import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { _image } from "../../lib/helpers/common";
import Section from "../../components/helperComponents/Section";
import { BaseStyles } from "../../components/helperComponents/BaseStyles";
import ImageConst from "../../utils/ImageConst";
import {
  View,
  TouchableWithoutFeedback,
  Text,
} from "../../components/helperComponents/RNmigrateHelpers";
import { titleEnums } from "../../lib/enums";

const Index = ({ navigate }) => {
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  return (
    <Section
      title="What would you like to order"
      icon="oyeti"
      iconImage={ImageConst.oyetiQSR}
      childContentWrapperProps={{
        style: {
          ...BaseStyles.flex,
          ...BaseStyles.center,
        },
      }}
    >
      <View className="" style={{ ...BaseStyles.flex, ...BaseStyles.center }}>
        <TouchableWithoutFeedback
          onPress={() => navigate("/shop/" + titleEnums.Food)}
          style={{ flex: 1 }}
        >
          <View
            className="vertical-align align-middle text-small"
            style={{
              ...BaseStyles.flex,
              ...BaseStyles.vertical_align,
              ...BaseStyles.m_r_m,
              ...BaseStyles.center,
              margin: "0 20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                background: dark ? "#2C2F33" : "#E0E5EC",
                boxShadow: dark
                  ? "inset 5px 5px 15px #000000, inset -5px -5px 15px #3B4451"
                  : "inset 2px 2px 5px rgba(136, 165, 191, 0.38), inset -3px -3px 7px #FFFFFF",
                borderRadius: "50%",
                padding: "13px 10px",
                width: "50px",
                height: "50px",
              }}
            >
              <img src={dark ? ImageConst.FoodDark : ImageConst.Food} alt="" />
            </div>
            <Text
              className="no-margin align-middle m-t-xs"
              style={{
                ...BaseStyles.textExtraSmall,
                ...BaseStyles.m_t,
                color: dark ? "white" : "#404B69",
              }}
            >
              Food
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigate("/shop/" + titleEnums.Grocery)}
          style={{ flex: 1 }}
        >
          <View
            className="vertical-align align-middle m-r-l text-small"
            style={{
              ...BaseStyles.flex,
              ...BaseStyles.vertical_align,
              ...BaseStyles.m_r_m,
              ...BaseStyles.center,
              margin: "0 20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                background: dark ? "#2C2F33" : "#E0E5EC",
                boxShadow: dark
                  ? "inset 5px 5px 15px #000000, inset -5px -5px 15px #3B4451"
                  : "inset 2px 2px 5px rgba(136, 165, 191, 0.38), inset -3px -3px 7px #FFFFFF",
                borderRadius: "50%",
                padding: "13px 10px",
                width: "50px",
                height: "50px",
              }}
            >
              <img
                src={dark ? ImageConst.GroceryDark : ImageConst.Grocery}
                alt=""
              />
            </div>

            <Text
              className="no-margin align-middle m-t-xs"
              style={{
                ...BaseStyles.textExtraSmall,
                ...BaseStyles.m_t,
                color: dark ? "white" : "#404B69",
              }}
            >
              Groceries
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => navigate("/shop/" + titleEnums.Retail)}
          style={{ flex: 1 }}
        >
          <View
            className="vertical-align align-middle m-r-l text-small"
            style={{
              ...BaseStyles.flex,
              ...BaseStyles.vertical_align,
              ...BaseStyles.m_r_m,
              ...BaseStyles.center,
              margin: "0 20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                background: dark ? "#2C2F33" : "#E0E5EC",
                boxShadow: dark
                  ? "inset 5px 5px 15px #000000, inset -5px -5px 15px #3B4451"
                  : "inset 2px 2px 5px rgba(136, 165, 191, 0.38), inset -3px -3px 7px #FFFFFF",
                borderRadius: "50%",
                padding: "13px 10px",
                width: "50px",
                height: "50px",
              }}
            >
              <img
                src={dark ? ImageConst.RetailDark : ImageConst.Retail}
                alt=""
              />
            </div>
            <Text
              className="no-margin align-middle m-t-xs"
              style={{
                ...BaseStyles.textExtraSmall,
                ...BaseStyles.m_t,
                color: dark ? "white" : "#404B69",
              }}
            >
              Retail
            </Text>
          </View>
        </TouchableWithoutFeedback>
        {/* <TouchableWithoutFeedback
          onPress={() => navigate("/shop/" + titleEnums.Vegetable)}
          style={{ flex: 1 }}
        >
          <View
            className="vertical-align align-middle text-small"
            style={{
              ...BaseStyles.flex,
              ...BaseStyles.vertical_align,
              ...BaseStyles.m_r_m,
              ...BaseStyles.center,
            }}
          >
            <img src={ImageConst.vegetableIcon} />
            <Text
              className="no-margin align-middle m-t-xs"
              style={{ ...BaseStyles.textExtraSmall, ...BaseStyles.m_t }}
            >
              Vegetable
            </Text>
          </View>
        </TouchableWithoutFeedback> */}
      </View>
    </Section>
  );
};

export default Index;
