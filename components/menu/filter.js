import { useState, useEffect } from "react";
import Images from "../../utils/ImageConst";
import { useSelector } from "react-redux";

const Index = ({
  vegOnly,
  includeEgg,
  nonveg,
  onFilterChange,
  onClickSearch,
}) => {
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  const _filterData = (veg, egg, nonveg) => {
    if (veg) {
      onFilterChange(veg, false, false);
      return;
    }

    if (egg) {
      onFilterChange(false, egg, false);
      return;
    }

    if (nonveg) {
      onFilterChange(false, false, nonveg);
      return;
    }
    onFilterChange(veg, egg, nonveg);
  };

  useEffect(() => {
    const hideFilt = document.getElementById("filter");

    const scrollHideFilt = function () {
      var y = window.scrollY;
      if (y >= 100) {
        hideFilt.style.opacity = "0";
        hideFilt.style.height = "0";
        hideFilt.style.transition = "0.3s";
        hideFilt.style.display = "none";
      } else {
        hideFilt.style.opacity = "100";
        hideFilt.style.height = "auto";
        hideFilt.style.transition = "0.3s";
        hideFilt.style.display = "block";
      }
    };

    window.addEventListener("scroll", scrollHideFilt);

    return () => window.removeEventListener("scroll", scrollHideFilt);
  }, []);

  return (
    <div className="toggle-btns-main-cont container px-2" id="filter">
      <div className="d-flex align-items-center justify-content-between">
        <div className="mx-0 d-flex align-items-center">
          <div className="toggle-item mx-2">
            <label
              className={`form-switch-ios d-flex align-items-center ${
                dark && "form-switch-ios-dark"
              }`}
            >
              <input
                type="checkbox"
                checked={vegOnly}
                name="checkedA"
                onChange={() => _filterData(!vegOnly, false, false)}
              />
              <i
                className={`toggle-button ${dark && "toggle-button-dark"}`}
              ></i>{" "}
              <div
                className={`toggle-dot ${dark && " toggle-dot-dark"}
                ${vegOnly && " toggle-dot-active"}
                }`}
              ></div>{" "}
              <p style={{ marginBottom: "-1px" }}>Veg</p>
            </label>
          </div>

          <div className="toggle-item mx-2">
            <label
              className={`form-switch-ios switch-yellow d-flex align-items-center ${
                dark && "form-switch-ios-dark"
              }`}
            >
              <input
                type="checkbox"
                checked={includeEgg}
                name="checkedB"
                onChange={() => _filterData(false, !includeEgg, false)}
              />
              <i
                className={`toggle-button ${dark && "toggle-button-dark"}`}
              ></i>{" "}
              <div
                className={`toggle-dot ${dark && " toggle-dot-dark"}
                ${includeEgg && " toggle-dot-active"}
                }`}
              ></div>{" "}
              <p style={{ marginBottom: "-1px" }}>Egg</p>
            </label>
          </div>

          <div className="toggle-item mx-2">
            <label
              className={`form-switch-ios d-flex align-items-center ${
                dark && "form-switch-ios-dark"
              }`}
            >
              <input
                type="checkbox"
                checked={nonveg}
                name="checkedC"
                onChange={() => _filterData(false, false, !nonveg)}
              />
              <i
                className={`toggle-button ${dark && "toggle-button-dark"}`}
              ></i>{" "}
              <div
                className={`toggle-dot ${dark && " toggle-dot-dark"}
                ${nonveg && " toggle-dot-active"}
                }`}
              ></div>{" "}
              <p style={{ marginBottom: "-1px" }}>Non veg</p>
            </label>
          </div>
        </div>
        <div
          className="mx-2 toggle-search-input none"
          onClick={() =>
            onClickSearch ? onClickSearch() : window.scroll(0, 0)
          }
        >
          <img
            style={{ width: "26.22px" }}
            src={Images.searchCircle}
            alt="search"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
