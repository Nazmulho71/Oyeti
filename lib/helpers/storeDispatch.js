import store from '../../store'
import {setCheckoutDataFun, setPromotionalDataFun, setPromotionalPopupFun} from '../../store/actions'
import {getStoreDeliveryType} from  '../../store/actions/cart'

const dispatch = (data) => {
    store.dispatch(setCheckoutDataFun(data))
}

export const dispatchStoreDeliveryType = (data = null) => {
    store.dispatch(getStoreDeliveryType(data))
}

export const promotionalDataDispatch = ( data) => {
    store.dispatch(setPromotionalDataFun(data))
}

export const setPromotionalPopupDispatch= ( data) => {
    store.dispatch(setPromotionalPopupFun(data))
}




export default dispatch