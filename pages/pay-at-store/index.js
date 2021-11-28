import Images from "../../utils/ImageConst";
import Router from "next/router";

const Index = () => {
  return (
    <div className="wrapper">
      <div className="container m-0 p-0">
        <div className="status-bar-cont">
          <div className="d-flex status-bar-inner">
            <div className="status-name" onClick={() => Router.back()}>
              <button>
                <i className="fas fa-chevron-left"></i>
              </button>
              <p className="mb-0">Pay at store</p>
            </div>
          </div>
        </div>

        <div className="page-wrapper px-20 pb-0">
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
              <button
                className="btm-fxd-btn"
                onClick={() => Router.push("/pay-at-store31")}
              >
                Verify Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
