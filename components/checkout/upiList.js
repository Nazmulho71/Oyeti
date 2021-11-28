import Images from "../../utils/ImageConst";
import { upiStaticlist, setPayType } from "../../lib/helpers/upiPay";
import Router from "next/router";

const Index = ({
  onAddNew,
  upis,
  onSelectUpi,
  isSelceted,
  selectedUpi,
  amount,
  refCode,
}) => {
  const _customPay = (payId) => {
    setPayType(payId);
    console.log(payId);
    Router.push(`/payment/loading?refcode=${refCode}`);
  };

  let upiList = [...upis, ...upiStaticlist];
  return (
    <div className="payment-section-cont">
      {upis.length > 0 ? (
        <h3 className="heading-bold-small mb-3">
          UPI <span className="heading-supporter">( Select UPI service )</span>
        </h3>
      ) : null}

      {upiList.map((upi, index) => {
        return (
          <div
            className={`payment-option-name-cont mb-3 ${
              isSelceted && selectedUpi == upi.id
                ? "payment-option-name-cont-active"
                : ""
            }`}
            key={index}
            onClick={() =>
              upi.isStatic ? _customPay(upi.payId) : onSelectUpi(upi.id)
            }
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div className="pon-icon">
                  <img
                    className="img-fluid pay-icon-img"
                    src={upi.isStatic ? upi.image : Images.amazonPay}
                    alt=""
                  />
                </div>
                <p className="pon-name mb-0">{upi.id}</p>
              </div>
            </div>
          </div>
        );
      })}

      <div className="add-pay-opt-cont" onClick={() => onAddNew()}>
        <div className="mr-3">
          <img className="img-fluid" src={Images.addCircle} alt="" />
        </div>
        <div className="m-0 new-pay-opt-add-text">
          <p className="mb-0">Add new UPI Id</p>
          <p className="mb-0 text-muted">You need to have registered UPI ID</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
