import axios from 'axios'
import { _getUrl } from '../../lib/helpers/commonHelper'
const {requestType} = require('../../lib/enums')


const _getUpdateOrder = (orderItem, user) => {
    let formData = {
        "items": JSON.stringify(orderItem.items),
        "amount": orderItem.amount,
        "id": orderItem.id,
        "comment": orderItem.comment,
        "order_type": orderItem.order_type,
        "table_number": orderItem.table_number,
        "app_type": orderItem.app_Type.toString(),
        "discount": orderItem.discount,
        "tax":  orderItem._meta.tax_charge,
        "order_package_charge": orderItem.order_package_charge,
        "order_delivery_charge": orderItem.order_delivery_charge,
        "promotion_id":  orderItem.promotion_id,
        "is_cod": orderItem.is_cod,
        "meta": JSON.stringify(orderItem._meta),
        "offer_type": null,
    }

    if (orderItem.guest) {
      formData = {...formData, "mid": orderItem.mid, "phone": user.phone, "c_app_id": user.app_id}
    }

    if (orderItem.order_type == 0) {
      formData = {...formData, "timeslot": orderItem.timeslot, "address_id": orderItem.address_id}
    }

    return formData
}

const Index = async (req, res) => {
    try {
        let url = req.body.url
        url = _getUrl(url)
        console.log(url)
        let data = req.body.payload
        let type = req.body.type
        let methodType = req.body.requestType
       
        const token = req.cookies.token
        
        let formData = {...data}
        if (requestType.UpdateOrder == type) {
            let user = req.body.user
            formData = _getUpdateOrder(data, user)
        }

        if (requestType.TonetagConvoke == type) {
            formData = {...data}
        }

        if (requestType.Coupon == type) {
            formData = {...data}
        }

        if (!formData) {
            return res.status(422).json({ message: "server error"})
        }

        let option = { headers: {"Authorization" : token ?? '' }}
        let response = null
        if (methodType == 'patch') {
            response = await axios.patch(url, formData, option)
        }else if (methodType == 'get') {
            response = await axios.get(url, option)
        }else if (methodType == 'delete') {
            response = await axios({
                method: 'delete',
                url,
                data: formData,
                ...option
              })
        }else{
            response = await axios.post(url, formData, option)
        }

        return res.status(200).json({ data: response.data })
    } catch (error) {
        return res.status(500).json({ message: "server error", error })
    }
}
  
export default Index
  