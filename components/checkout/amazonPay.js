import Images from "../../utils/ImageConst";
import { currency } from "../../lib/enums";

const Index = ({ aplBalance, isSelceted, onSelect, onLinkWallet }) => {
  return (
    <div className="payment-section-cont">
      <h3 className="heading-bold-small mb-3">
        Wallets{" "}
        <span className="heading-supporter">( select wallet to pay form )</span>{" "}
      </h3>
      <div
        className={`payment-option-name-cont ${
          isSelceted ? "payment-option-name-cont-active" : ""
        }`}
      >
        <div
          className="d-flex justify-content-between align-items-center"
          onClick={() => onSelect()}
        >
          <div className="d-flex align-items-center">
            <div className="pon-icon">
              <img
                className="img-fluid pay-icon-img"
                src={Images.apay}
                alt=""
              />
            </div>
            <p className="pon-name mb-0">Amazon Pay</p>
          </div>

          <p className="pon-amount mb-0">
            {aplBalance ? `${currency}${aplBalance}` : "Link Now"}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
