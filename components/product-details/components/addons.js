import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { currency } from "../../../lib/enums";
import { _getTitleFirsLast } from "../../../lib/helpers/common";
import Checkbox from "@material-ui/core/Checkbox";

const addonCmp = (addon, onSelectType, isAdded, showImage) => {
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  const checked = () => {
    return <input type="checkbox" checked="checked" />;
  };

  const unchecked = () => {
    return <input type="checkbox" unchecked="unchecked" />;
  };

  return (
    <div className="toppings-item-flexbox">
      {addon.items.map((item, itemIndex) => {
        return (
          <div
            className={`topping-item ${dark && "topping-item-dark"}`}
            key={itemIndex}
            onClick={() => onSelectType(item, addon)}
          >
            {/* <div
              className={
                isAdded(item) ? "topping-img topping-img-active" : "topping-img"
              }
            >
              {showImage ? (
                <img
                  className="img-fluid"
                  src={item.image_url}
                  alt={item.item_name}
                />
              ) : (
                <div className="img-fluid">
                  {_getTitleFirsLast(item.item_name)}
                </div>
              )}
            </div> */}
            <p>{item.item_name}</p>
            <p
              className={`topping-checkbox ${dark && "topping-checkbox-dark"}`}
              style={{ fontWeight: "bold", fontSize: "10px", color: "#FF118E" }}
            >
              {item.item_price ? `${currency}${item.item_price}` : "Free"}{" "}
              <Checkbox checked={isAdded(item)} />
              {/* <input type="checkbox" name="" id="" checked={isAdded(item)} /> */}
            </p>
          </div>
        );
      })}
    </div>
  );
};
const Index = ({ addons, selected, onSelectType, isAddedAddOn }) => {
  const isAdded = (item) => {
    let addons = selected.addons;

    if (!addons || !isAddedAddOn) {
      return false;
    }
    if (addons.length == 0) {
      return false;
    }

    let lastAddon = addons[addons.length - 1];
    if (lastAddon) {
      let filterData = lastAddon.filter(
        (lastAdd) => lastAdd.item_id == item.item_id
      );
      if (filterData && filterData.length > 0) {
        return true;
      }
    }
    return false;
  };

  const showImage = (data) => {
    let isValid = true;
    let items = data.items;
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      if (!element.image_url) {
        isValid = false;
      }
    }
    return isValid;
  };

  if (addons.length == 0) {
    return <div></div>;
  }

  return addons.map((addon, index, dark) => {
    return (
      <div className="toppings-wrapper" key={index}>
        <div className="toppings-container">
          <div className="fd-sz-head">
            <p
              className={`heading-small mb-0 d-flex align-center ${
                dark && "heading-small-dark"
              }`}
            >
              <div className="addon-dot"></div>
              {addon.name}
            </p>
            <p className={`text-muted mb-0 ${dark && "text-muted-dark"}`}>
              Choose any {addon.items.length > 0} toppings, tap to choosed
            </p>
          </div>
          {addonCmp(addon, onSelectType, isAdded, showImage(addon))}
        </div>
      </div>
    );
  });
};

export default Index;
