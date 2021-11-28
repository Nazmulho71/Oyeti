import {  Fragment } from "react"
import { currency } from "../../lib/enums"

let isGrocery = false

const Index = ({ goback, storeInfo, amount, refcode}) => {

    return (
        <div className={`page-wrapper ${isGrocery ? 'grocery' : 'qsr'}`}>
            <Fragment>

                <div className="cart-list-containr">
                    <div className="cart-list-inner rating-info">
                        <img src="/assets/img/five_star_rating.png" height="160" />
                    </div>
                </div>

                <div>
                    <h5>Successfully payment done</h5>
                    <h6>Amount : <span>{currency}{amount}</span></h6>
                    <h6>Ref Id : <span>{refcode}</span></h6>
                    <h6>Merchant : <span>{storeInfo.m_name}</span></h6>

                </div>

                <div className="btn-botton-fixed">
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <button onClick={() => goback()} className="btm-fxd-btn">okay</button>
                    </div>
                </div>

            </Fragment>
        </div>
    )
}

export default Index