const Index = ({ onClose, onAction, title }) => {
  return (
    <div className="log-modal-overlay">
      <div className="log-modal">
        <div className="log-modal-inner">
          <div className="log-modal-header d-flex align-items-center justify-content-between">
            <h3>{title}</h3>

            <div className="rep-modal-close" onClick={() => onClose()}>
              <i className="fas fa-times"></i>
            </div>
          </div>

          <div className="log-modal-body-wrap">
            <div className="log-modal-body">
              {/* <p className="cr-prod-name mb-0"> Are you sure</p> <br /> */}
              <p className="text-muted cr-bs-dish">
                Are you sure want to {title}
              </p>
            </div>
          </div>
          <div className="log-modal-continue-btn" style={{ display: "flex" }}>
            <button onClick={() => onAction("yes")}> Yes</button>
            <div style={{ paddingLeft: "7%" }}></div>
            <button onClick={() => onAction("no")}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
