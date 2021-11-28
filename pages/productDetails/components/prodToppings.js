import Images from "../../../utils/ImageConst";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const ProdToppings = () => {
  const [toppingModal, setToppingModal] = useState(true);
  const [size, setSize] = useState(1);
  const [extraCheese, setExtraCheese] = useState(false);
  const [itemCount, setItemCount] = useState(1);
  const toppingModalRef = useRef();

  const handleClickOutside = (e) => {
    if (toppingModalRef && !toppingModalRef.current.contains(e.target)) {
      setToppingModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wrapper">
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
                <p className="prod-name mb-0">Penna Arrabiata</p>
                <p className="text-muted mb-0">
                  <i className="fas fa-star"></i> <b>4.2</b> (1721 ratings)
                </p>
              </div>
              <div className="prod-price-cont">
                <p className="prod-price">
                  <div className="mb-0 prod-price">249</div>
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
                <p className="heading-small mb-0">Select Pizza Size</p>
                <p className="text-muted mb-0">
                  Choose any 5 toppings, tap to choose
                </p>
              </div>
              <div
                className="size-choose-radio custom-radio"
                style={{ marginRight: 3 }}
              >
                <p className="mb-0" onClick={() => setSize(1)}>
                  <input
                    type="radio"
                    id="szradio1"
                    name="radio-group1"
                    checked={size == 1 ? true : false}
                  />
                  <label for="szradio1">6 inch</label>
                </p>
                <p className="mb-0" onClick={() => setSize(2)}>
                  <input
                    type="radio"
                    id="szradio2"
                    name="radio-group1"
                    checked={size == 2 ? true : false}
                  />
                  <label for="szradio2">9 inch</label>
                </p>
                <p className="mb-0" onClick={() => setSize(3)}>
                  <input
                    type="radio"
                    id="szradio3"
                    name="radio-group1"
                    checked={size == 3 ? true : false}
                  />
                  <label for="szradio3">12 inch</label>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="toppings-wrapper">
          <div className="toppings-container">
            <div className="fd-sz-head">
              <p className="heading-small mb-0">Choose Topings</p>
              <p className="text-muted mb-0">
                Choose any 5 toppings, tap to choose
              </p>
            </div>
            <div className="toppings-item-flexbox">
              <div className="topping-item">
                <div className="topping-img topping-img-active">
                  <img className="img-fluid" src={Images.topping} alt="" />
                </div>
                <p>Tomato</p>
              </div>
              <div className="topping-item">
                <div className="topping-img topping-img-active">
                  <img className="img-fluid" src={Images.topping} alt="" />
                </div>
                <p>Tomato</p>
              </div>
              <div className="topping-item">
                <div className="topping-img ">
                  <img className="img-fluid" src={Images.topping} alt="" />
                </div>
                <p>Tomato</p>
              </div>
              <div className="topping-item">
                <div className="topping-img ">
                  <img className="img-fluid" src={Images.topping} alt="" />
                </div>
                <p>Tomato</p>
              </div>
              <div className="topping-item">
                <div className="topping-img ">
                  <img className="img-fluid" src={Images.topping} alt="" />
                </div>
                <p>Tomato</p>
              </div>
            </div>
          </div>
        </div>

        <div className="toppings-wrapper">
          <div className="toppings-container">
            <div className="fd-sz-head">
              <p className="heading-small mb-0">Extra Topings</p>
              <p className="text-muted mb-0">
                Each extra topping will cost ₹XX
              </p>
            </div>
            <div className="toppings-item-flexbox">
              <div className="topping-item">
                <div className="topping-img ">
                  <img className="img-fluid" src={Images.topping} alt="" />
                </div>
                <p>Tomato</p>
              </div>
              <div className="topping-item">
                <div className="topping-img ">
                  <img className="img-fluid" src={Images.topping} alt="" />
                </div>
                <p>Tomato</p>
              </div>
              <div className="topping-item">
                <div className="topping-img ">
                  <img className="img-fluid" src={Images.topping} alt="" />
                </div>
                <p>Tomato</p>
              </div>
              <div className="topping-item">
                <div className="topping-img ">
                  <img className="img-fluid" src={Images.topping} alt="" />
                </div>
                <p>Tomato</p>
              </div>
              <div className="topping-item">
                <div className="topping-img ">
                  <img className="img-fluid" src={Images.topping} alt="" />
                </div>
                <p>Tomato</p>
              </div>
            </div>
          </div>
        </div>

        <div className="special-req-cont">
          <div className="special-req-box d-flex justify-content-between align-items-center">
            <div
              className="sp-req-text custom-radio d-flex align-items-center"
              onClick={() => setExtraCheese(true)}
            >
              <div className="p-0 radio-btn-vcenter">
                <input
                  type="radio"
                  id="extCh1"
                  name="radio-group2"
                  checked={extraCheese ? true : false}
                />
                <label className="" for="extCh1"></label>
              </div>
              <div className="pl-2">
                <h5 className="mb-0">Extra Cheese</h5>
                <p className="text-muted mb-0">
                  Each extra topping will cost ₹XX
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
              <Link href="/prod-details-drink">
                <button>Add to order ₹249</button>
              </Link>
            </div>
          </div>
        </div>

        {/* repeat custom modal */}
        <div
          style={{ display: !toppingModal ? "none" : "block" }}
          className="rep-modal-overlay"
        >
          <div className="rep-modal">
            <div ref={toppingModalRef} className="rep-modal-inner">
              <div className="rep-modal-header">
                <div className="rep-modal-title">
                  <p className="mb-0">Repeat last customisations?</p>
                </div>
                <div
                  onClick={() => setToppingModal(false)}
                  className="rep-modal-close"
                >
                  <i className="fas fa-times"></i>
                </div>
              </div>
              <div className="rep-modal-body">
                <h5 className="r-m-heading">Build your own 5 Veg Pizza</h5>
                <div className="customisation-list">
                  <ul>
                    <li>
                      <b>Toppings : </b>Tomato, Corn, Bellpepper, panner, potato
                    </li>
                    <li>
                      <b>Extra Toppings : </b>Corn
                    </li>
                    <li>
                      <b>Extra Cheese</b>
                    </li>
                  </ul>
                </div>
                <div className="d-flex w-100 justify-content-between align-items-center">
                  <button className="add-new-btn">Add new</button>
                  <button className="repeat-btn">Repeat</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* repeat custom modal ends */}
      </div>
    </div>
  );
};

export default ProdToppings;
