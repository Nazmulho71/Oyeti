const PayWithCard = () => {
  return (
    <div className="wrapper">
      <div className="container m-0 p-0">
        <div className="status-bar-cont">
          <div className="d-flex status-bar-inner">
            <div className="status-name">
              <button>
                <i className="fas fa-chevron-left"></i>
              </button>
              <p className="mb-0">Pay with card</p>
            </div>
          </div>
        </div>

        <div className="page-wrapper px-20">
          <p className="text-muted para-small mb-4">
            We accept credit, debit and atm cards from Visa, Mastercards,
            Dinners, American Express, Rupay and Maestro
          </p>

          <div className="payment-section-container">
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control form-input-btm-outline"
                i
                d="exampleInputPassword1"
                placeholder=""
                defaultValue="Skanda SN"
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control form-input-btm-outline"
                i
                d="exampleInputPassword1"
                placeholder=""
                defaultValue="1234 5678 9029 2928"
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="date"
                className="form-control form-input-btm-outline"
                i
                d="exampleInputPassword1"
                placeholder=""
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control form-input-btm-outline"
                i
                d="exampleInputPassword1"
                placeholder=""
                defaultValue="312"
              />
            </div>
          </div>

          <div className="pay-opt-now-btn-cont px-0">
            <button>Pay Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayWithCard;
