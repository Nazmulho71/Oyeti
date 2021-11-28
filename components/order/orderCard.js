import Router from "next/router";
import { _getMyOrders } from "../../lib/helpers/home";
import { getTime } from "../../lib/helpers/time";
import {
  _getStorePhone,
  _getStoreLatLang,
} from "../../lib/helpers/afterPayment";
import {
  _image,
  _getTitleFirsLast,
  getStatusString,
} from "../../lib/helpers/common";

const Index = ({ order }) => {
  const callStore = async (e, refCode) => {
    e.preventDefault();
    let phone = await _getStorePhone(refCode);
    window.location.href = "tel://" + phone;
  };

  const direction = async (e, refcode) => {
    e.preventDefault();
    let latLang = await _getStoreLatLang(refcode);
    let url = `https://www.google.com/maps?q=${latLang}`;
    window.open(url);
  };

  const pushDetails = (e, refcode) => {
    e.preventDefault();
    Router.push(`/orders/` + refcode);
  };

  return (
    <div className="cart-list-containr">
      <div className="cart-list-inner">
        <div className="story-item-cont">
          <a href="#" onClick={(e) => pushDetails(e, order.refcode)}>
            <div className={`story-item box}`}>
              {_image(_getTitleFirsLast(order.m_name))}
            </div>
          </a>
        </div>
        <p className="cr-prod-name mb-0">{order.m_name}</p>
        <p className="text-muted cr-bs-dish">Order ID {`${order.order_id}`}</p>
        <p className="text-muted cr-bs-dish">{getTime(order.time)}</p>
        <p className="text-muted cr-bs-dish">
          {getStatusString(order.o_status_id)}
        </p>
        <div>
          <div>
            <a href="#" onClick={(e) => callStore(e, order.refcode)}>
              Call Store
            </a>
          </div>
          <div>
            <a href="#" onClick={(e) => direction(e, order.refcode)}>
              Directions
            </a>
          </div>
          <div>
            <a href="#" onClick={(e) => pushDetails(e, order.refcode)}>
              View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
