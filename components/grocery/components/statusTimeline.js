import { useState } from "react";
import {
  getGroceryStatusesByOrder,
  getGroceryStatusesByOrderNew,
} from "../../../lib/helpers/checkout";
import { GROCERY_ORDER_STATUSES_NEW } from "../../../lib/enums";

const StatusCircle = ({
  active,
  status,
  index,
  showNextConnector,
  icon,
  current,
  dark,
  isCollapsed,
}) => {
  return (
    <div className="status-badge d-flex align-items-center flex-row mb-2">
      <div className="status-ring-wrapper">
        <div
          className={`status-outer-circle ${active ? "active" : "inactive"}`}
        >
          <div
            className={`status-inner-circle ${active ? "active" : "inactive"}`}
          >
            <div className={`arrow-wrapper ${dark && "arrow-wrapper-dark"}`}>
              <div className={`arrow ${active ? "active" : "inactive"}`}>
                <span className="arrow-text">{index}</span>
              </div>
            </div>
            {/* <img src={icon} alt="" width="20px" /> */}
            <i
              className={`fas ${icon}`}
              style={{ color: dark ? "#ffffff" : "#404b69" }}
            ></i>
          </div>
        </div>
        {showNextConnector && !isCollapsed ? (
          <div
            className={`line ${active && !current ? "active" : "inactive"}`}
          ></div>
        ) : null}
      </div>

      <div
        className={`status-text ${active ? "active" : "inactive"}  ${
          dark && active ? "active-dark" : "inactive-dark"
        } ${dark && "status-text-dark"}`}
      >
        <span>{status}</span>
      </div>
    </div>
  );
};

const StatusTimeline = ({
  orderStatus,
  deliveryType,
  statusId,
  order_status_id,
  dark,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const stages = [];
  let completed = true;

  if (
    statusId == GROCERY_ORDER_STATUSES_NEW.accepted.id &&
    order_status_id == GROCERY_ORDER_STATUSES_NEW.accepted.valueInt
  ) {
    order_status_id = GROCERY_ORDER_STATUSES_NEW.paid.valueInt;
  }

  if (order_status_id == GROCERY_ORDER_STATUSES_NEW.OntheWay.valueInt) {
    order_status_id = GROCERY_ORDER_STATUSES_NEW.ready.valueInt;
  }

  let StagesByDeliveryType = getGroceryStatusesByOrderNew({
    delivery_type: deliveryType,
    order_status_id,
  });

  if (StagesByDeliveryType && StagesByDeliveryType.length > 0) {
    StagesByDeliveryType.forEach((stage, index) => {
      stages.push({
        ...stage,
        completed,
        // current: stage.label.toLowerCase() === orderStatus.toLowerCase(),
        current: stage.valueInt === order_status_id,
        index: index + 1,
      });
      if (stage.valueInt === order_status_id) {
        completed = false;
      }
    });
  } else {
    StagesByDeliveryType = [];
  }

  return (
    <div className="w-100">
      <div
        className="d-flex align-items-center justify-content-between mb-2"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className={`order-status ${dark && "order-status-dark"}`}>
          Order Status
        </div>
        {isCollapsed ? (
          <i
            className={`fas fa-chevron-down down-icon ${
              dark && "down-icon-dark"
            }`}
          ></i>
        ) : (
          <i
            className={`fas fa-chevron-up up-icon ${dark && "up-icon-dark"}`}
          ></i>
        )}
      </div>

      {isCollapsed
        ? stages.map((stage, index) =>
            stage.current ? (
              <StatusCircle
                key={index}
                active={stage.completed}
                status={stage.label}
                index={stage.index}
                showNextConnector={index < stages.length - 1}
                icon={stage.icon}
                current={stage.current}
                dark={dark}
                isCollapsed={isCollapsed}
              />
            ) : null
          )
        : stages.map((stage, index) => (
            <StatusCircle
              key={index}
              active={stage.completed}
              status={stage.label}
              index={stage.index}
              showNextConnector={index < stages.length - 1}
              icon={stage.icon}
              current={stage.current}
              dark={dark}
              isCollapsed={isCollapsed}
            />
          ))}
    </div>
  );
};

export default StatusTimeline;
