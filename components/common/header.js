import { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import qsrOrderDetails from "../order/qsrOrderDetails";
import ImageConst from "../../utils/ImageConst";

const Index = ({
  goBack,
  title,
  subtitle,
  dontShowBack,
  onSubTitileClick,
  titleSub,
  onClickTitleSub,
}) => {
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  return (
    <div className={`status-bar-cont ${dark && "status-bar-cont-dark"}`}>
      <div className="d-flex status-bar-inner">
        <div className="status-name">
          <Fragment>
            {dontShowBack ? null : (
              <button onClick={() => goBack()}>
                <div
                  className={`back-icon-bord ${dark && "back-icon-bord-dark"}`}
                >
                  <i
                    className={`fas fa-arrow-left back-icon ${
                      dark && "back-icon-dark"
                    }`}
                  ></i>
                </div>
              </button>
            )}
            {/* <p className="mb-0">{title}</p> */}
          </Fragment>
        </div>
        {subtitle ? (
          <div
            className={`status-btn-border ${dark && "status-btn-border-dark"}`}
          >
            <div className={`status-btn ${dark && "status-btn-dark"}`}>
              <button
                onClick={() =>
                  onSubTitileClick ? onSubTitileClick() : console.log("")
                }
              >
                {subtitle}
              </button>
            </div>
          </div>
        ) : null}
      </div>
      {titleSub ? (
        <div
          className="d-flex align-items-center"
          style={{ marginTop: "-10px" }}
        >
          <img src="/assets/icons/location.svg" alt="" />
          <p
            style={{
              marginBottom: "0px",
              marginLeft: "5px",
              fontWeight: "normal",
              fontSize: "12px",
              fontStyle: "italic",
              color: dark ? "#AAAAAA" : "#6F7A97",
            }}
            onClick={() => onClickTitleSub()}
          >
            {titleSub}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Index;
