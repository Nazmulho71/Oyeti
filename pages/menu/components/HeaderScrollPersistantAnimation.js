import { useState } from "react";
import Images from "../../../utils/ImageConst";

const HeaderScrollPersistantAnimation = (props) => {
  const [activeStory, setActiveStory] = useState(0);
  return (
    <div className={`fix-header fix-header2 ${props.display}`}>
      {/* <!-- scroll story --> */}
      <div className="container py-2 px-2">
        <div className="d-flex story-flexbox">
          {[1, 2, 3, 4, 5, 6, 7].map((e, i) => (
            <div key={`story${i}`} className="story-item-cont">
              <a href="#">
                <div
                  key={`story${i}`}
                  className={`story-item ${activeStory == i && "story-active"}`}
                  onClick={() => setActiveStory(i)}
                >
                  <img src={Images.storyImg} alt="" />
                </div>
                <p className="story-text mb-1">Bestseller</p>
              </a>
            </div>
          ))}
        </div>
      </div>
      {/* <!-- scroll story ends --> */}

      {/* <!-- toggle btn cont --> */}
      <div className="toggle-btns-main-cont container px-2">
        <div className="d-flex align-items-center">
          <div className="toggle-item">
            <label className="form-switch-ios d-flex align-items-center">
              <input type="checkbox" />
              <i></i> Veg only{" "}
            </label>
          </div>
          <div className="toggle-item">
            <label className="form-switch-ios d-flex align-items-center">
              <input type="checkbox" />
              <i></i> Include Egg{" "}
            </label>
          </div>
        </div>
      </div>
      {/* <!-- toggle btn cont ends --> */}
    </div>
  );
};

export default HeaderScrollPersistantAnimation;
