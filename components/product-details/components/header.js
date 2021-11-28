import { useState, useEffect } from "react";
import Images from "../../../utils/ImageConst";
import { useRouter } from "next/router";
import { currency } from "../../../lib/enums";
import { isVegOnly, isNonVegOnly } from "../../../lib/helpers/menu";
import { useSelector } from "react-redux";

// <div className="header-container">
//   <div className="header-nav">
//     <img
//       onClick={() => router.back()}
//       className="img-fluid"
//       src={Images.goBack_alt}
//       alt=""
//     />
//     {/* <img className="img-fluid" src={Images.share_alt} alt="" /> */}
//   </div>
//   {product.image_ur && isImage ? (
//     <img
//       onError={() => setIsimage(false)}
//       className="img-fluid"
//       src="https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Pizza-from-Scratch_EXPS_FT20_8621_F_0505_1_home.jpg"
//       alt=""
//     />
//   ) : (
//     <div style={{ height: 70 }} className="img-fluid_noimage" alt="" />
//   )}
// </div>;

const Index = ({ product, onModalClick }) => {
  const router = useRouter();

  const [imageLoadingError, setImageLoadingError] = useState(false);
  const [isImage, setIsimage] = useState(true);

  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  const _getSVG = (pro) => {
    if (isVegOnly(pro)) {
      return Images.grSquare;
    }

    if (isNonVegOnly(pro)) {
      return Images.nonveg;
    }
    return "";
  };

  return (
    <div className="header-wrapper">
      <div
        className="prod-intro-cont"
        style={{
          ...(product.image_ur && isImage
            ? { position: "absolute", bottom: -50 }
            : {}),
        }}
      >
        <div
          className={`prod-det ${dark && "prod-det-dark"}`}
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="justify-content-between align-items-center">
            <div className="prod-name-cont">
              <p className={`prod-name mb-0 ${dark && "prod-name-dark"}`}>
                {product.name}
              </p>
              {product.rating ? (
                <p className="text-muted mb-0">
                  <i className="fas fa-star"></i> <b>{product.rating}</b> (
                  {product.rating} ratings)
                </p>
              ) : null}
            </div>
            <div className="d-flex" style={{ marginTop: "5px" }}>
              {/* {imageLoadingError && _getSVG(product) ? ( */}
              <img
                style={{ alignItems: "center", marginRight: "5px" }}
                src={_getSVG(product)}
                alt=""
              />
              {/* ) : null} */}
              <div
                className={`pagination-dot-active ${
                  dark && "pagination-dot-dark-active"
                }`}
              ></div>
              <div className="prod-price-cont">
                <p className={`prod-price ${dark && "prod-price-dark"}`}>
                  {currency}
                  {product.price}
                </p>
              </div>
            </div>
          </div>
          <i onClick={onModalClick} className="fas fa-times"></i>
        </div>
      </div>
    </div>
  );
};

export default Index;
