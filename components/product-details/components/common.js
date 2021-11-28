import { currency } from "../../../lib/enums";
import LastRepeatPopup from "./lastRepeatPopup";
import { BaseStyles } from "../../helperComponents/BaseStyles";
const Index = ({
  setItemCount,
  toppingModal,
  setToppingModal,
  selected,
  addProductToCart,
  product,
  reapeatData,
  addNewData,
  repeatLastCartData,
  quantity,
  isEdit,
}) => {
  return (
    <>
      <div className="fixed-order-btn-cont">
        <div className="qt-pr-flexbox" style={{ ...BaseStyles.center }}>
          {/* <div className="qty-btn-cont">
                        <span className="btn-span" onClick={() => quantity >= 1 ? setItemCount(quantity - 1) : null}>
                            <i className="fas fa-minus"></i></span>
                        <span className="qty-span">{quantity}</span>
                        <span className="btn-span" onClick={() => setItemCount(quantity + 1)}><i className="fas fa-plus"></i></span>
                    </div> */}
          {/* <div className="add-ord-btn"> */}
          {/* <Link href="/prod-details-drink"> */}
          {/* <button onClick={() => addProductToCart()}>
              Add to order {currency}
              {selected.price}
            </button> */}
          {/* </Link> */}
          {/* </div> */}
        </div>
      </div>

      {toppingModal ? (
        <LastRepeatPopup
          onToppingModal={() => setToppingModal(false)}
          reapeatData={reapeatData}
          name={product.name}
          onAddNewData={() => addNewData()}
          onRepeatLastCartData={() => repeatLastCartData()}
        />
      ) : null}
    </>
  );
};

export default Index;
