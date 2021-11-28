import { currency } from "../../lib/enums"

const Index = ({tipAmount, setTipAmount}) => {
    return (
        <div className="apply-coupon-cont">
            <div className="cart-list-inner">
                <div className="cart-list-item mb-0">
                    <div className="cart-list-item-flexbox">
                        <div className="cart-list-item-name-cont">
                            <p className="mb-0 cart-list-item-name">Add a tip to your waiter</p>
                            <p className="mb-0 cart-list-item-toppings text-muted w-100 max-w-100">
                                <input style={{ width: '50px' }} type="text" inputMode="numeric"
                                    className="form-control form-input-btm-outline pb-0 text-center" id="tipInp" 
                                    onChange={(e)=>setTipAmount(`${e.target.value}`)}
                                    value={`${tipAmount}`} />
                            </p>
                        </div>
                        <div className="cart-list-item-price">
                            <p className="mb-0 item-price">{currency}{tipAmount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index