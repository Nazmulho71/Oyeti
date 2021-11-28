import React from "react";
import Draggable from "react-draggable";

function Slider({
  width,
  setStarCount,
  starIndex,
  setStarIndex,
  dark,
  setStarted,
}) {
  const handleStart = (e) => {
    // console.log("Started dragging", e);
    setStarted(true);
  };

  const handleDrag = (e) => {
    if (e.changedTouches[0].clientX <= width * (1 / 5)) {
      setStarCount("1");
      setStarIndex(1);
    } else if (e.changedTouches[0].clientX <= width * (2 / 5)) {
      setStarCount("2");
      setStarIndex(2);
    } else if (e.changedTouches[0].clientX <= width * (3 / 5)) {
      setStarCount("3");
      setStarIndex(3);
    } else if (e.changedTouches[0].clientX <= width * (4 / 5)) {
      setStarCount("4");
      setStarIndex(4);
    } else if (e.changedTouches[0].clientX <= width * (5 / 5)) {
      setStarCount("5");
      setStarIndex(5);
    }
    // console.log("Dragging", e);
  };

  const handleStop = (e) => {
    // console.log("Dropped", e);
  };

  return (
    <div
      className={`mt-3 slide-cont-border ${dark && "slide-cont-border-dark"}`}
    >
      <div className={`slide-cont ${dark && "slide-cont-dark"}`}>
        <Draggable
          axis="x"
          handle=".handle"
          defaultPosition={{ x: 0, y: 0 }}
          position={null}
          grid={[75, 75]}
          scale={1}
          onStart={handleStart}
          onDrag={handleDrag}
          onStop={handleStop}
        >
          <div
            className={`handle slide-star-border ${
              dark && "slide-star-border-dark"
            }`}
          >
            <img
              className={`handle slide-star ${dark && "slide-star-dark"}`}
              src={`/assets/img/${dark ? "Star-dark.svg" : "Star.svg"}`}
              alt=""
            />
          </div>
        </Draggable>
      </div>
    </div>
  );
}

export default Slider;
