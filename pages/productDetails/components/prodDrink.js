import Images from "../../../utils/ImageConst";
import { useState, useEffect } from "react";

const ProdDrink = (props) => {
  const [itemCount, setItemCount] = useState(1);
  const [wtype, setWtype] = useState(1);

  return (
    <div className="wrapper position-relative">
      <div className="container m-0 p-0">
        <div className="header-wrapper">
          <div className="header-container">
            <div className="header-nav">
              <img className="img-fluid" src={Images.goBack_alt} alt="" />
              <img className="img-fluid" src={Images.share_alt} alt="" />
            </div>
            <img className="img-fluid" src={Images.prodImg2} alt="" />
          </div>
          <div className="prod-intro-cont">
            <div className="d-flex justify-content-between align-items-center">
              <div className="prod-name-cont">
                <p className="prod-name mb-0">Classic Lemonade</p>
                <p className="text-muted mb-0">
                  <i className="fas fa-star"></i> <b>4.2</b> (1721 ratings)
                </p>
              </div>
              <div className="prod-price-cont">
                <p className="prod-price">
                  <div className="mb-0 prod-price">129</div>
                  {/* <!-- <span className="onwards-text">Onwards</span> --> */}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="food-main-wrapper">
          <div className="food-set-pagination-nav">
            <button className="food-pagination-btn food-pagination-btn-active">
              Your Food
            </button>
            <button className="food-pagination-btn ">Details</button>
          </div>

          <div className="food-size-wrapper">
            <div className="food-size-container">
              <div className="fd-sz-head">
                <p className="heading-small mb-0">Select Base</p>
                <p className="text-muted mb-0">
                  Choose the base for your drink
                </p>
              </div>
              <div
                className="size-choose-radio custom-radio"
                style={{ marginRight: 3 }}
              >
                <p className="mb-0" onClick={() => setWtype(1)}>
                  <input
                    type="radio"
                    id="szradio1"
                    name="radio-group"
                    checked={wtype == 1 ? true : false}
                  />
                  <label for="szradio1">Mineral Water</label>
                </p>
                <p className="mb-0" onClick={() => setWtype(2)}>
                  <input
                    type="radio"
                    id="szradio2"
                    name="radio-group"
                    checked={wtype == 2 ? true : false}
                  />
                  <label for="szradio2">Sparkling water</label>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="special-req-cont">
          <div className="special-req-box d-flex justify-content-between align-items-center">
            <div className="sp-req-text">
              <h5 className="mb-0">Special Request</h5>
              <p className="text-muted mb-0">
                Any Cooking Instructions or request?
              </p>
            </div>
            <div className="sp-req-btn">
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>

        <div className="qt-pr-container">
          <div className="qt-pr-flexbox">
            <div className="qty-btn-cont">
              <span
                className="btn-span"
                onClick={() =>
                  itemCount >= 1 ? setItemCount(itemCount - 1) : null
                }
              >
                <i className="fas fa-minus"></i>
              </span>
              <span className="qty-span">{itemCount}</span>
              <span
                className="btn-span"
                onClick={() => setItemCount(itemCount + 1)}
              >
                <i className="fas fa-plus"></i>
              </span>
            </div>
            <div className="add-ord-btn">
              <button onClick={() => props.history.push("/my-order17")}>
                Add to order ₹249
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdDrink;
