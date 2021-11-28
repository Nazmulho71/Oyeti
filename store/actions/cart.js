import { SET_CARTS, SET_STORE_DELIVERY_DATA } from '../types'
import {_getStoreData} from '../../lib/helpers/common'
import Router from 'next/router'

export const setCart= carts => ({
    type: SET_CARTS,
    payload: carts
})


export const setStoreDeliveryType = data => ({
    type: SET_STORE_DELIVERY_DATA,
    payload: data
})

export const addUpdateCart = (carts, setCarts, item, goback = null) => {
  
    if (!item.added_quantity) {
        carts = carts.filter(cart => cart.id != item.id)
    }else{
        let oldData = carts.filter(cart => cart.id == item.id)
        if (oldData && oldData.length > 0) {
            carts = carts.filter(cart => cart.id != item.id)
            carts.push(item)
        }else{
            carts.push(item)
        }
    }
    
    if (goback) {
        if (carts && carts.length == 0) {
            Router.back()
        }
    }else{
        setCarts(carts)
    }
} 

export const getStoreDeliveryType = (data) => {
    return async (dispatch) => {
        if (data) {
            return  dispatch(setStoreDeliveryType(data))
        }
        let storeData = await _getStoreData()
        let types = storeData && storeData.delivery_type ? storeData.delivery_type : []
        dispatch(setStoreDeliveryType(types))
    }
}



