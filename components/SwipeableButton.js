// import React, { useState, useEffect, Component } from "react";
// import { useSelector } from "react-redux";

// const slider = React.createRef();
// const container = React.createRef();
// const isTouchDevice =
//   process.browser && "ontouchstart" in document.documentElement;

// // export default class SwipeableButton extends Component {
// const SwipeableButton = () => {
//   const [unlocked, setUnlocked] = useState();
//   const [color, setColor] = useState();
//   const [text, setText] = useState();
//   // const [containerWidth, setContainerWidth] = useState();

//   const theme = useSelector((state) => state.theme);
//   const [dark, setDark] = useState(false);
//   useEffect(() => {
//     setDark(theme === "dark");
//   }, [theme]);
//   // state = {};

//   useEffect(() => {
//     if (isTouchDevice) {
//       document.addEventListener("touchmove", onDrag);
//       document.addEventListener("touchend", stopDrag);
//     } else {
//       document.addEventListener("mousemove", onDrag);
//       document.addEventListener("mouseup", stopDrag);
//     }
//     let containerWidth = container.current.clientWidth - 50;
//   }, []);

//   const onDrag = (e) => {
//     if (unmounted || unlocked) return;
//     if (isDragging) {
//       if (isTouchDevice) {
//         sliderLeft = Math.min(
//           Math.max(0, e.touches[0].clientX - startX),
//           containerWidth
//         );
//       } else {
//         sliderLeft = Math.min(Math.max(0, e.clientX - startX), containerWidth);
//       }
//       updateSliderStyle();
//     }
//   };

//   const updateSliderStyle = () => {
//     if (unmounted || unlocked) return;
//     slider.current.style.left = sliderLeft + 50 + "px";
//   };

//   const stopDrag = () => {
//     if (unmounted || unlocked) return;
//     if (isDragging) {
//       isDragging = false;
//       if (sliderLeft > containerWidth * 0.9) {
//         sliderLeft = containerWidth;
//         if (onSuccess) {
//           onSuccess();
//           onSuccess();
//         }
//       } else {
//         sliderLeft = 0;
//         if (onFailure) {
//           onFailure();
//         }
//       }
//       updateSliderStyle();
//     }
//   };

//   const startDrag = (e) => {
//     if (unmounted || unlocked) return;
//     isDragging = true;
//     if (isTouchDevice) {
//       startX = e.touches[0].clientX;
//     } else {
//       startX = e.clientX;
//     }
//   };

//   const onSuccess = () => {
//     container.current.style.width = container.current.clientWidth + "px";
//     setState({
//       unlocked: true,
//     });
//   };

//   const getText = () => {
//     return unlocked ? text_unlocked || "Processing..." : text || "SLIDE";
//   };

//   const reset = () => {
//     if (unmounted) return;
//     setState({ unlocked: false }, () => {
//       sliderLeft = 0;
//       updateSliderStyle();
//     });
//   };

//   useEffect(() => {
//     unmounted = true;
//   }, []);

//   return (
//     <div className="fixed-swip-btn">
//       <div className="ReactSwipeButton">
//         <div
//           className={"rsbContainer " + (unlocked ? "rsbContainerUnlocked" : "")}
//           ref={container}
//         >
//           <div
//             className="rsbcSlider"
//             ref={slider}
//             onMouseDown={startDrag}
//             style={{ background: color }}
//             onTouchStart={startDrag}
//           >
//             <span className="rsbcSliderText">{getText()}</span>
//             <span className="rsbcSliderArrow"></span>
//             <span
//               className="rsbcSliderCircle"
//               style={{ background: color }}
//             ></span>
//           </div>
//           <div className="rsbcText">{getText()}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SwipeableButton;

import React, { Component } from "react";
// import './SwipeableButton.css'

const slider = React.createRef();
const container = React.createRef();
const isTouchDevice =
  process.browser && "ontouchstart" in document.documentElement;

export default class SwipeableButton extends Component {
  state = {};

  componentDidMount() {
    if (isTouchDevice) {
      document.addEventListener("touchmove", this.onDrag);
      document.addEventListener("touchend", this.stopDrag);
    } else {
      document.addEventListener("mousemove", this.onDrag);
      document.addEventListener("mouseup", this.stopDrag);
    }
    this.containerWidth = container.current.clientWidth - 50;
  }

  onDrag = (e) => {
    if (this.unmounted || this.state.unlocked) return;
    if (this.isDragging) {
      if (isTouchDevice) {
        this.sliderLeft = Math.min(
          Math.max(0, e.touches[0].clientX - this.startX),
          this.containerWidth
        );
      } else {
        this.sliderLeft = Math.min(
          Math.max(0, e.clientX - this.startX),
          this.containerWidth
        );
      }
      this.updateSliderStyle();
    }
  };

  updateSliderStyle = () => {
    if (this.unmounted || this.state.unlocked) return;
    slider.current.style.left = this.sliderLeft + 50 + "px";
  };

  stopDrag = () => {
    if (this.unmounted || this.state.unlocked) return;
    if (this.isDragging) {
      this.isDragging = false;
      if (this.sliderLeft > this.containerWidth * 0.9) {
        this.sliderLeft = this.containerWidth;
        if (this.props.onSuccess) {
          this.props.onSuccess();
          this.onSuccess();
        }
      } else {
        this.sliderLeft = 0;
        if (this.props.onFailure) {
          this.props.onFailure();
        }
      }
      this.updateSliderStyle();
    }
  };

  startDrag = (e) => {
    if (this.unmounted || this.state.unlocked) return;
    this.isDragging = true;
    if (isTouchDevice) {
      this.startX = e.touches[0].clientX;
    } else {
      this.startX = e.clientX;
    }
  };

  onSuccess = () => {
    container.current.style.width = container.current.clientWidth + "px";
    this.setState({
      unlocked: true,
    });
  };

  getText = () => {
    return this.state.unlocked
      ? this.props.text_unlocked || "Processing..."
      : this.props.text || "Slide ->";
  };

  reset = () => {
    if (this.unmounted) return;
    this.setState({ unlocked: false }, () => {
      this.sliderLeft = 0;
      this.updateSliderStyle();
    });
  };

  componentWillUnmount() {
    this.unmounted = true;
  }

  render() {
    return (
      <div
        className={`fixed-swip-btn ${this.props.dark && "fixed-swip-btn-dark"}`}
      >
        <div className="ReactSwipeButton">
          <div
            className={
              `rsbContainer ${this.props.dark && "rsbContainer-dark"}` +
              (this.state.unlocked ? "rsbContainerUnlocked" : "")
            }
            ref={container}
          >
            <div
              className="rsbcSlider"
              ref={slider}
              onMouseDown={this.startDrag}
              style={{ background: this.props.color }}
              onTouchStart={this.startDrag}
            >
              <span className="rsbcSliderText">{this.getText()}</span>
              <span className="rsbcSliderArrow"></span>
              <span
                className="rsbcSliderCircle"
                style={{ background: this.props.color }}
              ></span>
            </div>
            <div className={`rsbcText ${this.props.dark && "rsbcText-dark"}`}>
              {this.getText()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
