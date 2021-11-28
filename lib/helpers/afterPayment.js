import axios from "axios"
import { orderRating, fetchMerchantDetails , baseLocalURL} from "../api/baseUrls"
import loaderAction from './loader'
import { flowTypes, storeFlowTypes } from "../enums"
import { getAuth, _getStoreData, getTable } from "./common"

export const _getRedirecturl = async (orderInfo, refcode) => {
    let store = await _getStoreData()

    let flowID = flowTypes.Grocery
    if (orderInfo && orderInfo.flow == storeFlowTypes.QSR) {
        flowID = flowTypes.QSR
        return "/orders/"+refcode +"?feedback=go"
    }else{
        return "/my-order/grocery/"+refcode +"?feedback=go"
    }
    if (flowID == 12) return `/menu/12/${orderInfo.app_id}`
    let tabelNo = getTable()
    let redirectUrl = tabelNo ? `/store/${flowID}/${store.mid}/${tabelNo}` : `/store/${flowID}/${store.mid}`
    return redirectUrl
}


export const _createFeedBack = async (rating, refcode, orderInfo) => {
    let redirectUrl = await _getRedirecturl(orderInfo, refcode)
    try {
        loaderAction(true)
        let user = getAuth()
        let url = orderRating()
        let name = user ? user.name : ''
        let data = {
            url,
            payload: {
                refcode,
                rating,
                name
            }
        }
        await axios.post(baseLocalURL, data)
        window.location.replace(redirectUrl)
    } catch (error) {
        window.location.replace(redirectUrl)
    }
}

export const _getStorePhone = async (refcode, phone, amount) => {
   return new Promise(async(res, rej) => {
        try {
            let url = fetchMerchantDetails()
            let data = {
                url,
                payload: {
                    transaction_id: refcode
                }
            }
            let response = await axios.post(baseLocalURL, data)
            let store = response.data.data
            if (amount && store.success) {
                return res(store.data)
            }
            if (store.success) {
                return getCountryCodePhone(store.data.support_number)
            }
            return getCountryCodePhone(phone)
        } catch (error) {
            console.log(error)
            if (amount) {
                return rej(phone)
            }
            return getCountryCodePhone(phone)
        }
   })
}

export const _getStoreDetails= async (refcode) => {
    return new Promise( async(res, reject) => {
        try {
            let url = fetchMerchantDetails()
            let data = {
                url,
                payload: {
                    transaction_id: refcode
                }
            }
            let response = await axios.post(baseLocalURL, data)
            let store = response.data.data
            if (store.success) {
                return res(store.data)
            }
            return  res({})
        } catch (error) {
            console.log(error)
            return res({})
        }
    })
}

export const _getStoreLatLang = async (refcode, phone) => {
    try {
        let url = fetchMerchantDetails()
        let data = {
            url,
            payload: {
                transaction_id: refcode
            }
        }
        let response = await axios.post(baseLocalURL, data)
        let store = response.data.data
        if (store.success) {
            let data = store.data
            return `${data.lat},${data.long}`
        }
        return ""
    } catch (error) {
        console.log(error)
        return ""
    }
}



export const getCountryCodePhone = phone => {
    phone = phone ? phone.toString() : ''
    let phoneIndex = phone.indexOf('+91')
    if (phoneIndex > -1) {
        return phone
    }
    return `+91${phone}`
}