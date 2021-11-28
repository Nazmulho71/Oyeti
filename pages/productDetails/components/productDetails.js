import Images from "../../../utils/ImageConst";
import { useEffect, useState } from "react";
import Link from "next/link";

const ProdDetails = () => {
  const [itemCount, setItemCount] = useState(1);

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
            <img className="img-fluid" src={Images.prodImg12} alt="" />
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
                <p className="prod-price">249</p>
              </div>
            </div>
          </div>
        </div>

        <div className="prod-details-container">
          <div className="prod-details-para">
            <h4 className="mb-3">Details</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A
              quibusdam officiis non earum totam qui dolorum, blanditiis
              voluptate autem laudantium!
            </p>
          </div>
          <div className="prod-details-para">
            <h4 className="mb-3">Details</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A
              quibusdam officiis non earum totam qui dolorum, blanditiis
              voluptate autem laudantium!
            </p>
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
              <Link href="/prod-details2">
                <button>Add to order ₹249</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdDetails;
