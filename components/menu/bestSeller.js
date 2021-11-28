import ImageConst from '../../utils/ImageConst'
import Customizable from './customizable'
import { BaseStyles } from '../helperComponents/BaseStyles'

const Index = ({ is_best_seller, is_custome, isSingle }) => {
    return (
        <div>
            <div className="pt-2 pb-2 d-flex " style={{ ...(isSingle ? { flexDirection: 'row', justifyContent: 'space-between', ...BaseStyles.p_r_m } : { flexDirection: 'column' }) }}>
                {is_best_seller ? <div className="d-flex align-items-center" style={{ flex: 1 }}>
                    <img src={ImageConst.bestSellerDot} style={{ paddingRight: '3.3%' }}></img>
                    <span className="cr-bs-text" style={{ fontSize: '13px' }}>Best Seller</span>
                </div> : null}
                <div>
                    {is_custome && isSingle ? <Customizable /> : null}
                </div>
            </div>
        </div>
    )
}

export default Index