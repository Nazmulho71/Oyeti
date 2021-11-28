import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { _image, _getTitleFirsLast } from "../../lib/helpers/common";
import { _getStores } from "../../lib/helpers/home";

let variant = "circle";

const Index = () => {
  const [stores, setStores] = useState([]);
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  useEffect(() => {
    _getStores(setStores);
  }, []);

  return (
    <div className="container py-0 px-0">
      <div
        className="d-flex story-flexbox"
        style={{ height: "110px", marginTop: "-10px" }}
      >
        {stores.map((store, index) => {
          return (
            <div className="story-item-cont" key={index}>
              <a href="#">
                <div
                  className={`story-item ${
                    variant === "box" ? "box" : "circle"
                  }`}
                  style={{
                    background: "none",
                    boxShadow: "none",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "50%",
                      border: "hidden !important",
                      width: "43pt",
                      height: "43pt",
                      background: dark ? "#2C2F33" : "#E0E5EC",
                      boxShadow: dark
                        ? "-5px -5px 15px rgba(59, 68, 81, 0.35), 5px 5px 15px rgba(0, 0, 0, 0.35)"
                        : "-9px -9px 16px rgba(255, 255, 255, 0.35), 9px 9px 16px rgba(163, 177, 198, 0.35)",
                      textAlign: "center",
                      color: dark ? "white" : "#48647D",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: 800,
                      fontSize: "15px",
                    }}
                  >
                    {_getTitleFirsLast(store.merchant_name)}
                  </div>
                </div>
                <p
                  className={`story-text mb-1  inactive`}
                  style={{ color: dark ? "white" : "#404B69" }}
                >
                  {store.merchant_name}
                </p>
                {/* <div className={`story-underline `}></div> */}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
