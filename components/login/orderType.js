import { _getOrderType } from "../../lib/helpers/login";
const Index = ({ onSetOrderType, orderType, orderTypes }) => {
  return (
    <div className="select-order-type-cont">
      <p className="sot-heading">Select Order Type</p>
      <div className="select-order-type-item-flexbox">
        {orderTypes.map((type, index) => {
          let typeData = _getOrderType(type);

          return (
            <div
              key={index}
              onClick={() => onSetOrderType(type)}
              className={
                orderType == type ? "sot-item sot-item-active" : "sot-item"
              }
            >
              <img className="img-fluid" src={typeData.image} alt="" />
              {/* <SvgFood color={orderType == 1 ? "#FF118E" : "#1A1A1A"} /> */}
              <p className="text-muted">{typeData.lable}</p>
            </div>
          );
          // <div onClick={() => onSetOrderType(2)} className={orderType == 2 ? "sot-item sot-item-active" : "sot-item"}>
          //     <img className="img-fluid" src={Images.lunch} alt="" />
          //     {/* <SvgLunch color={orderType == 2 ? "#FF118E" : "#1A1A1A"} /> */}
          //     <p className="text-muted">Take away</p>
          // </div>
        })}
      </div>
    </div>
  );
};

export default Index;
