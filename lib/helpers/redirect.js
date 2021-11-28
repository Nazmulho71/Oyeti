import axios from 'axios'
import isBase64 from 'validator/lib/isBase64'
import {_apaFetchRestaurants, _fetchMenu} from '../api/baseUrls'
import {_getUserById, _getUserByEmail} from './login'
import {_getStoreDetails} from './afterPayment'
import {_getOrdeInfo} from './payment'
import {redirectEnums, flowTypes, shopType} from '../enums'


const _getMidById = async (mid, flow) => {
    try {
        let url = "/menu/" + flowTypes.QSR + "/" + mid+"?search=true"
        if (flow == shopType.GROCERY) {
          url = "/menu/" + flowTypes.Grocery + "/" + mid+"?search=true"
        }
        console.log(url)
        window.location.replace(url)
    } catch (error) {
        return null
    }
}

export const decodeData = async string => {
    let decodedData = null
    if (isBase64(string)) {
         // decode string
        decodedData = atob(string)
    }

    console.log(decodedData)

    if (decodedData) {
        // split string 
        let data = decodedData.split("/")
        if (data && data.length > 0) {

            if (data[0] == redirectEnums.QSR || data[0] == redirectEnums.Grocery) {
                _getMidById(data[1], data[0])
            }

            if (data[0] == redirectEnums.HomeWithAutoLogin) {
                _getUserById(data[1])
            }

            if (data[0] == redirectEnums.HomeAutoLoginWithEmail) {
                _getUserByEmail(data[1])
            }

            if (data[0] == redirectEnums.CustomizeCart) {
                let url = "/checkout/customize-cart/"+data[1]
                window.location.replace(url)
            }

            if (data[0] == redirectEnums.CustomizeCartGuest) {
                let url = "/checkout/customize-cart/"+data[1]
                window.location.replace(url)
            }
        }
    }

    return null
}

