import { QSRStatus } from "../../lib/enums";

const Index = ({ order }) => {
  const statusData = (status) => {
    if (QSRStatus.Pending == status) {
      return (
        <div className="position-relative time-elements-inner">
          <span className="t-dot t-dot-empty  t-position-0"></span>
          <span className="t-text t-position-1" style={{ left: "20%" }}>
            Pending
          </span>
          <span className="t-dot t-dot-empty t-position-5"></span>
          <span className="t-dot t-dot-empty t-position-10"></span>
        </div>
      );
    }

    if (QSRStatus.Accepted == status) {
      return (
        <div className="position-relative time-elements-inner">
          <span className="t-dot t-dot-full  t-position-0"></span>
          <span className="t-text t-position-1" style={{ left: "20%" }}>
            Accepted
          </span>
          <span
            className="t-dot t-dot-empty t-position-5"
            style={{ left: "60%" }}
          ></span>
          <span className="t-dot t-dot-empty t-position-10"></span>
        </div>
      );
    }

    if (QSRStatus.Ready == status) {
      return (
        <div className="position-relative time-elements-inner">
          <span className="t-dot  t-dot-full  t-position-0"></span>
          <span className="t-dot  t-dot-full  t-position-1"></span>
          <span className="t-text t-position-5" style={{ left: "56%" }}>
            Ready
          </span>
          <span
            className="t-dot t-dot-empty t-position-10"
            style={{ left: "96%" }}
          ></span>
        </div>
      );
    }

    if (QSRStatus.Delivered == status) {
      return (
        <div className="position-relative time-elements-inner">
          <span className="t-dot  t-dot-full  t-position-0"></span>
          <span
            className="t-dot  t-dot-full  t-position-1"
            style={{ left: "30%" }}
          ></span>
          <span className="t-text t-position-5" style={{ left: "56%" }}>
            Delivered
          </span>
          <span
            className="t-dot t-dot-full t-position-10"
            style={{ left: "96%" }}
          ></span>
        </div>
      );
    }
  };

  return null;
  // <div className="order-timeline-container">
  //   <div className="order-timeline-inner position-relative">
  //     <div className="timeline-line"></div>
  //     <div className="timeline-elements">{statusData(1)}</div>
  //   </div>
  // </div>
};

export default Index;
