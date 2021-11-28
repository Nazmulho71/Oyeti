import axios from "axios"
import { orderWithBill, baseLocalURL, baseLocalURLForm } from "../api/baseUrls"
import loaderAction from '../helpers/loader'

export const _getBill = async (refcode, setData) => {
    try {
      let url = orderWithBill()
      let data = {
        url,
        payload: {
            refcode
        }
      }
      loaderAction(true)
      let response = await axios.post(baseLocalURLForm, data)
      let dataConfig = response.data.data
      if(dataConfig.success){
        setData(dataConfig.data)
      }
      loaderAction(false)
    } catch (error) {
      console.log(error)
      loaderAction(false)
    }
}

export const _shopNow = () => {

}

export const _explore = () => {
  
}


export const _getSubTotal = (data) => {
  let amount = parseFloat(data.amount)
  let discount = parseFloat(data.discount)
  let order_delivery_charge = parseFloat(data.order_delivery_charge)
  let order_package_charge = parseFloat(data.order_package_charge)
  amount = amount - order_delivery_charge
  amount = amount - order_package_charge
  return amount + discount
}

export const _getTotal = (data) => {
  let amount = parseFloat(data.amount)
  return amount
}