
import {currency} from '../enums'
export const rad =  (x) => {
    return (x * Math.PI) / 180
}
  
export const  getDistance =  (p1, p2) => {
    let R = 6378137; 
    let dLat = rad(p2.lat - p1.lat)
    let dLong = rad(p2.lng - p1.lng)
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.lat)) *
        Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    let d = R * c
    return d
}
  
export const _checkDistance = (addressData, store_details) => {
    const p1 = {
      lat: store_details.lat,
      lng: store_details.long,
    }
    const p2 = {
      lat: addressData.lat,
      lng: addressData.long,
    }
    const delivery_range = store_details.delivery_range
    let distance = Math.floor(getDistance(p1, p2)/1000)
    const isHomeDelivery = distance <= delivery_range
    let data = {
      isValid: true,
      error: '',
    }
    if (!isHomeDelivery) {
      let message = "out of range , change address or change delivery type"
      data = {
        isValid: false,
        error: message,
      }
    }
    return data
}

export const _checkMinAmount = (cartItemsTotalPrice, min_bill) => {
    let data = {
      isValid: true,
      error: '',
    }
    if (cartItemsTotalPrice >= min_bill) {
      return data
    }
    let message = `Minmum bill amount for home delivery is ${currency}` + min_bill
    data = {
      isValid: false,
      error: message,
    }
    return data
}