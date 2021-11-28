import axios from "axios"
import { baseLocalURLForm , userProfileApi} from "../api/baseUrls"
import cookie from 'js-cookie'
import { setAuth } from "./common"

export const getProfile = async (setLocalAuth = null) => {
   return new Promise( async (res, reject) => {
        try {
            let data = {
                url: userProfileApi(),
                requestType: 'get'
            }
            let response = await axios.post(baseLocalURLForm, data)
            let resData = response.data.data
            if (resData && resData.user) {
                if (setLocalAuth) {
                    setLocalAuth(resData.user)
                }
                setAuth(resData.user)
            }
            return res(true)
        } catch (error) {
            return reject(false) 
        }
   })
}


export const _loginByToken = async token => {
    return new Promise( async (response, reject) => {
       try {
            cookie.set('token', token,  { expires: 365 })
            await getProfile()
            return response(true)
       } catch (error) {
            return response(false)
       }
    })
}