import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import Slider from "./Slider";

const stars = [1, 2, 3, 4, 5];
let isGrocery = false;
const Index = ({ createFeedBack }) => {
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);
  const [feedback, setFeedback] = useState("");
  const [starIndex, setStarIndex] = useState(5);
  const [width, setWidth] = useState("");
  const [starCount, setStarCount] = useState("5");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (process.browser) {
      setWidth(document.getElementById("cont").offsetWidth);
    }
  }, []);

  return (
    <div className={`page-wrapper ${isGrocery ? "grocery" : "qsr"}`}>
      <Fragment>
        <div className="cart-list-containr pb-1">
          <p
            className="mb-0 font-600 font-12"
            style={{ color: dark ? "#fff" : "#404b69" }}
          >
            How did you like your order
          </p>
          <h3>&nbsp;</h3>

          <div
            className={`cart-list-inner p-0 rating-info bg-none shadow-none ${
              dark && "cart-list-inner-dark"
            }`}
          >
            {started ? (
              <div className={`rating-face ${dark && "rating-face-dark"}`}>
                {starCount === "1" ? (
                  <img
                    className="star_one"
                    src={`/assets/img/${
                      dark ? "1star-dark.svg" : "1stars.svg"
                    }`}
                    alt=""
                  />
                ) : starCount === "2" ? (
                  <img
                    className="star_two"
                    src={`/assets/img/${
                      dark ? "2star-dark.svg" : "2stars.svg"
                    }`}
                    alt=""
                  />
                ) : starCount === "3" ? (
                  <img
                    className="star_three"
                    src={`/assets/img/${
                      dark ? "3star-dark.svg" : "3stars.svg"
                    }`}
                    alt=""
                  />
                ) : starCount === "4" ? (
                  <img
                    className="star_four"
                    src={`/assets/img/${
                      dark ? "4star-dark.svg" : "4stars.svg"
                    }`}
                    alt=""
                  />
                ) : starCount === "5" ? (
                  <img
                    className="star_five"
                    src={`/assets/img/${
                      dark ? "5star-dark.svg" : "5stars.svg"
                    }`}
                    alt=""
                  />
                ) : (
                  <img
                    className="star_five"
                    src={`/assets/img/${
                      dark ? "5star-dark.svg" : "5stars.svg"
                    }`}
                    alt=""
                  />
                )}
              </div>
            ) : (
              <div
                className={`d-flex align-items-center justify-content-center p-0 rating-face ${
                  dark && "rating-face-dark"
                }`}
                style={{ width: "200px", height: "200px" }}
              >
                <p
                  className="mb-0 font-600 font-18 text-center"
                  style={{ color: dark ? "#fff" : "#404b69" }}
                >
                  Move the slider
                  <br />
                  to rate
                  <br />
                  your order
                </p>
              </div>
            )}
            <br />
            {/* <div>
              {stars.map((star, index) => {
                return (
                  <button
                    className="bg-white"
                    style={{
                      marginRight: 3,
                      color: star <= starIndex ? "burlywood" : "",
                    }}
                    key={index}
                    onClick={() => {
                      setStarIndex(star);
                    }}
                  >
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </button>
                );
              })}
            </div> */}
            <Slider
              width={width}
              setStarCount={setStarCount}
              starIndex={starIndex}
              setStarIndex={setStarIndex}
              dark={dark}
              setStarted={setStarted}
            />

            <div
              className={`stars-count ${dark && "stars-count-dark"}`}
              id="cont"
            >
              {stars.map((star, index) => (
                <p key={index}>{star}</p>
              ))}
            </div>
          </div>
        </div>

        {started ? (
          <div className="cart-list-containr pt-0">
            <div
              className={`cart-list-inner ${dark && "cart-list-inner-dark"}`}
            >
              <div
                className={`special-request-inp-container mt-0 ${
                  dark && "special-request-inp-container-dark"
                }`}
              >
                <input
                  className="px-2"
                  value={feedback}
                  type="text"
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us more..."
                />
              </div>
            </div>
          </div>
        ) : null}

        <div
          className="btn-botton-fixed px-4"
          style={{ background: "none", boxShadow: "none" }}
        >
          {started ? (
            <div className="d-flex w-100 justify-content-between align-items-center">
              <button
                onClick={() => createFeedBack(starIndex)}
                className={`btm-fxd-btn ${dark && "btm-fxd-btn-dark"}`}
              >
                Submit Feedback
              </button>
            </div>
          ) : null}

          <div className="d-flex w-100 justify-content-between align-items-center">
            <button
              onClick={() => createFeedBack(starIndex)}
              className={`btm-fxd-btn ${dark && "btm-fxd-btn-dark"}`}
              style={{
                background: "none",
                boxShadow: "none",
              }}
            >
              Skip
            </button>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default Index;
