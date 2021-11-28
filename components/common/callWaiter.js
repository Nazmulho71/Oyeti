import Images from "../../utils/ImageConst";

const Index = ({ onClose }) => {
  return (
    <div className="log-modal-overlay">
      <div className="log-modal">
        <div className="log-modal-inner">
          <div className="log-modal-header">
            <h3>Success</h3>
          </div>

          <div className="rep-modal-close" onClick={() => onClose()}>
            <i className="fas fa-times"></i>
          </div>

          <div className="page-wrapper px-20 pb-0" style={{ height: "68vh" }}>
            <div className="full-page-image">
              <img className="img-fluid" src={Images.payAtShopImage} alt="" />
            </div>
            <p className="para-small mb-0 text-center">
              <b>We have informed the cashier to meet you</b>
            </p>
            <p className="para-small mb-0 text-center">
              You can pay in cash or card.
            </p>

            <div className="btn-botton-fixed shadow-none px-4">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <button className="btm-fxd-btn" onClick={() => onClose()}>
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
