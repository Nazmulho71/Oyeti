import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { currency } from "../../../lib/enums";

const Index = ({ sizes, category, setSize, size }) => {
  if (sizes.length == 0) {
    return <div></div>;
  }

  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  return (
    <div className="food-size-wrapper">
      <div
        className={`food-size-container ${dark && "food-size-container-dark"}`}
      >
        <div className="fd-sz-head">
          <p className={`heading-small mb-0 ${dark && "heading-small-dark"}`}>
            Select {category} Size
          </p>
          <p
            className={`text-muted mb-0 d-flex align-center ${
              dark && "text-muted-dark"
            }`}
          >
            Choose any {sizes.length} toppings, tap to choose
          </p>
        </div>
        <div className="size-choose-radio custom-radio">
          {sizes.map((selectSize, index) => {
            return (
              <p className="mb-0" style={{ marginRight: 6 }} key={index}>
                <input
                  className="sizeClasses"
                  defaultChecked={index == 0}
                  onChange={() => setSize(selectSize)}
                  type="radio"
                  id={"szradio" + index}
                  name={"radio-group"}
                />
                <label
                  className={`size-text ${dark && "size-text-dark"}`}
                  htmlFor={"szradio" + index}
                >
                  {selectSize.item_size_name}(
                  {`${currency}${selectSize.item_size_price}`})
                </label>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
