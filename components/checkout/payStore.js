import Images from "../../utils/ImageConst";
import Router from "next/router";

const Index = ({ onPaymentSelect, isSelceted, refcode }) => {
  return (
    <div className="payment-section-cont">
      <h3 className="heading-bold-small mb-3">
        Pay at store{" "}
        <span className="heading-supporter">
          ( Pay at store using cash/card/etc )
        </span>{" "}
      </h3>
      <div
        className={`payment-option-name-cont ${
          isSelceted ? "payment-option-name-cont-active" : ""
        }`}
        onClick={() => Router.push(`/pay-at-store?refcode=${refcode}`)}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="pon-icon">
              <img className="img-fluid" src={Images.payAtShop} alt="" />
            </div>
            <p className="pon-name mb-0">Pay at store</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
