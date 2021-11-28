import { useState, useEffect } from "react";
import { _titleCase } from "../../lib/helpers/menu";
import { useSelector } from "react-redux";

const Index = ({
  filterCatID,
  onChangeCategory,
  categories,
  variant = "circle",
  showClear,
}) => {
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  const _image = (cat) => {
    const letters = cat.name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    return (
      <div
        style={{
          borderRadius: "8px",
          border: "hidden !important",
          width: "60px",
          height: "60px",
          background: "#404B69",
          textAlign: "center",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 19,
        }}
      >
        {letters}
      </div>
    );
  };

  return (
    <div className="fix-header fixed-header">
      {/* <!-- scroll story --> */}
      <div className="container px-2">
        <div className="story-flexbox">
          <div className="container-left" style={{ marginLeft: "0%" }}></div>
          {categories.map((category, index) => {
            return (
              <div key={index}>
                <div className="story-item-cont">
                  <div
                    className={`story-item ${
                      variant === "box" ? "box" : "circle"
                    } ${
                      category.id == filterCatID
                        ? "story-active"
                        : "story-active-inacive"
                    } ${dark && "story-item-dark"}`}
                    onClick={() => onChangeCategory(category.id)}
                  >
                    {category.image_url ? (
                      <img src={category.image_url} alt="" />
                    ) : (
                      _image(category)
                    )}
                  </div>

                  <div className={`story-title ${dark && "story-title-dark"}`}>
                    <p
                      style={{ marginTop: "15px", paddingBottom: "7px" }}
                      className={`story-text d-flex mb-1 align-center ${
                        category.id == filterCatID ? "active" : "inactive"
                      } ${
                        category.id == filterCatID
                          ? dark && "active-dark"
                          : dark && "inactive-dark"
                      } ${dark && "story-text-dark"}`}
                      onClick={() => onChangeCategory(category.id)}
                    >
                      <div
                        className={`item-dot-inactive ${
                          category.id == filterCatID && "item-dot-active"
                        } ${
                          dark &&
                          category.id == filterCatID &&
                          "item-dot-active-dark"
                        }`}
                      ></div>
                      {_titleCase(category.name)}
                    </p>
                  </div>
                  {/* <div className={`story-underline `}></div> */}
                </div>
              </div>
            );
          })}

          <div className="container-right"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
