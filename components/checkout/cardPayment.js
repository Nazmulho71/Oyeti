import Images from "../../utils/ImageConst";

const Index = ({ onPaymentSelect }) => {
  return (
    <div className="payment-section-cont">
      <h3 className="heading-bold-small mb-3">
        Cards{" "}
        <span className="heading-supporter">( Enter details to pay )</span>{" "}
      </h3>
      <div
        className="payment-option-name-cont"
        onClick={() => onPaymentSelect()}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="pon-icon">
              <img className="img-fluid" src={Images.credit_card} alt="" />
            </div>
            <p className="pon-name mb-0">Credit, Debit, ATM, etc.</p>
          </div>
          <p className="pon-amount mb-0">
            <i className="fas fa-arrow-right"></i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
