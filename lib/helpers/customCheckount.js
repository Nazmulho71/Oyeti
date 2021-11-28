
import {_fetchMenuProductsCategoryByMidOnlyResponse, getTable} from './common'
import { currency, businessTypes, timeslot, appId, app_Type, api_mode, 
  OrderTypeEnums, 
  flowTypes} from '../enums'
import storeDispatchCheckout from './storeDispatch'
import {_checkMinAmount, _checkDistance} from './checkoutCalculation'
import { _getToken } from '../../middleware/auth'
import {_calculatePromotionalOffer, _getOfferType} from './offer'
import {_loadRazorPayScript, _getOrdeInfo} from './payment'
import {_getStoreDetails} from './afterPayment'
import {getOrderTypeLocal} from './checkout'
import  { dispatchStoreDeliveryType } from './storeDispatch'


export const _createCartsFromItems = (products, offerProducts, items, mid) => {
  return new Promise((res, rejct) => {
    let carts = []
    
    for (let index = 0; index < items.length; index++) {
      const element = items[index]
      let product = products.filter(data => data.id == element.item_id)
      if (product && product.length == 0) {
        product = offerProducts.filter(data => data.id == element.item_id)
      }
      if (product && product.length > 0) {
        product = product[0]
        let data = {
          added_quantity: element.add_item_quantity,
          addons: element.addons,
          id: product.id,
          image_url: product.image_url,
          is_custome: true,
          is_reapeat: true,
          item_id:  product.id,
          mid: mid,
          name: product.item_name,
          price: product.item_price,
          sizes: product.sizes ?  product.sizes : [],
          summary: element.summary,
          item_type: product.item_type,
          TAXES: product.TAXES,
          element
        }
        carts.push(data)
      }
    }
    res(carts)
  })
}

export const _getCartsAndStoreData = async (query, setCustomizeData, setCarts) => {
  return new Promise(async (re, rej) => {
    try {
     
      let refcode = query.refcode
      let response =  await _getOrdeInfo(refcode)
      let storeDetails = await _getStoreDetails(refcode)
      let mid = storeDetails.app_id
      let items = response.items
      let flowType = flowTypes.QSR
      let storeDataResponse = await _fetchMenuProductsCategoryByMidOnlyResponse(mid, flowType)
     
      let localProducts = storeDataResponse.products
      let localOfferProducts = storeDataResponse.offerProducts
      let storeData = storeDataResponse.storeData
      let carts = await _createCartsFromItems(localProducts, localOfferProducts, items, mid)
      
      setCarts(carts)
      setCustomizeData({
        carts, localProducts, localOfferProducts, storeData,
        c_comment: response.c_comment,
        delivery_type: response.delivery_type,
        table_number: response.table_number
      })
     
      re({carts, localProducts, localOfferProducts, storeData})
    } catch (error) {
      console.log(error)
      rej('NOT')
      
    }
  })
}

//calculate qsr checkout data for customize item
export const _getCheckoutDataFunForCustomize = async (data, setCheckoutData, setOrderItem, discount = 0, address = null) => {
  return new Promise(async (resolve, rejct) => {
  
    let amount = 0
    let tax = 0
    let totalPayableAmount = 0
    let packing_charges = 0
    let delivery_charges = 0
    let storeData = data.storeData
    
    let products = data.carts
   
    let orderType = getOrderTypeLocal()
    let tableNo = getTable()
  
    for (let index = 0; index < products.length; index++) {
      const element = products[index]
      let pAmount = element.price * element.added_quantity
      amount = amount + pAmount
      let summary = element.summary
      let pkgCharge = summary.package_charge
      packing_charges = packing_charges + pkgCharge
      tax = tax + summary.tot_tax
      totalPayableAmount = totalPayableAmount + summary.tot_tax + pAmount + pkgCharge
    }

    // calculate total charges
    const charges = storeData.charges ? storeData.charges : []
    const StoreCharges = charges.filter(charge => charge.charge_type === 'Packaging charge');

    const validCharge = StoreCharges.find(charge => amount > charge.min_value && amount <= charge.max_value)

    const StorePackagingCharges = validCharge ? validCharge.price : 0

    const StoreDeliveryCharges = charges.filter(charge => charge.charge_type === 'Delivery charge')
    const validDeliveryCharge = StoreDeliveryCharges.find(charge => amount > charge.min_value && amount <= charge.max_value)

    const itemDeliveryCharge = validDeliveryCharge ? validDeliveryCharge.price : 0
    // const itemDeliveryCharge = 0

    // calculate if deleivery type is home 
    if (orderType == OrderTypeEnums.Home) {
      // check min price
      let error = _checkMinAmount(totalPayableAmount, storeData.min_bill)
      // let error = _checkMinAmount(totalPayableAmount, 10000)
      storeDispatchCheckout(error)
      if (error.isValid) {
           // check min distance
        error = _checkDistance(address, storeData)
        storeDispatchCheckout(error)
      }
    }

    // check if item Delivery Charge present
    if (itemDeliveryCharge) {
      totalPayableAmount = (totalPayableAmount - delivery_charges) + itemDeliveryCharge
      delivery_charges = itemDeliveryCharge
    }

    // check if item Store Packaging Charges present
    if (StorePackagingCharges) {
      totalPayableAmount = (totalPayableAmount - packing_charges) + StorePackagingCharges
      packing_charges = StorePackagingCharges
    }

    // pushing data for order placed
    let items = []
    for (let index = 0; index < products.length; index++) {
      const element = products[index]
      let item_total =  element.added_quantity * element.price
      const obj = {
        item_id: element.id,
        item_name: element.name,
        item_type: element.item_type,
        add_item_quantity: element.added_quantity,
        offer: "",
        discount: element.summary.discount,
        item_price: element.price,
        item_total: item_total,
        TAXES: element.TAXES,
        summary: element.summary,
        addons: element.addons
      }
      items.push(obj)
    }
    
    // if any coupon discount present 
    if (discount) {
      totalPayableAmount = totalPayableAmount - discount
    }

    let itemsData = {
      guest: false,
      items,
      api_mode,
      app_Type,
      amount: totalPayableAmount,
      app_id: appId,
      id: storeData.req_id,
      order_type: orderType,
      timeslot,
      address_id: null,
      comment: '',
      table_number: tableNo,
      discount,
      offer_type: null,
      promotion_id: null,
      is_cod: false,
      order_delivery_charge: delivery_charges,
      tax,
      order_package_charge: packing_charges,
      isGrocery: false,
      item_total: amount,
      _meta: {
        packing_charge: delivery_charges,
        delivery_charge: packing_charges,
        tax_charge: tax,
        item_total: amount,
        total_payable: totalPayableAmount,
        storeId: storeData.business_id,
        businessType: businessTypes.QSR,
        TAXES: {},
        tableNo: '',
        mid: storeData.mid
      }
    }

    setOrderItem(itemsData)

    let brakdown = [
      {
        title: 'Item Total',
        label: `${currency}${amount}`,
        value: amount,
        charge_id: 'total'
      },
      {
        title: 'PROMO - Discount',
        label: `${currency}${discount}`,
        value: discount,
        charge_id: 'discount'
      },
      {
        title: 'Packing Charges',
        label: `${currency}${packing_charges}`,
        value: packing_charges,
        charge_id: 'packing_charge'
      },

      {
        title: 'Delivery Charges',
        label: `${currency}${delivery_charges}`,
        value: delivery_charges,
        charge_id: 'delivery_charge'
      },
      {
        title: 'Tax',
        label: `${currency}${tax}`,
        value: tax,
        charge_id: 'tax'
      }
    ]

    setOrderItem(itemsData)
    let final = {
      value: totalPayableAmount,
      title: 'Total To Pay',
      label: `${currency}${totalPayableAmount}`,
      charge_id: 'total_payable_amount'
    }

    let types = storeData.delivery_type
    dispatchStoreDeliveryType(types)
    setCheckoutData({
      final,
      brakdown,
      deliveryTypes: types
    })

    resolve(true)
  })
}
