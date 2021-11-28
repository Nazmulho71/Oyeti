import cookies from 'js-cookie'
import axios from 'axios'
let baseUrl = process.env.NEXT_PUBLIC_OYETI_BASE_URL
import {flowId } from '../enums'
import { baseLocalURL } from '../api/baseUrls'

export const _clearCookie = () => {
    cookies.remove('redirect')
    cookies.remove('amount')
}

export const _getNumberPadValue = (value, amount, setAmount) => {
    
    if (!amount) {
        if (value == 0 || value == 'back') {
            return
        }
        setAmount(value.toString())
        return
    }

    if (value == 'back' ) {
        amount = amount.toString()
        let finalValue = amount.slice(0, -1)
        setAmount(finalValue)
    }else{
        let finalValue = amount.toString() + value.toString()
        if(finalValue.split(".").length > 2){
            return
        }

        let splits = finalValue.split(".")
        if (splits.length == 2 && splits[1].length > 2) {
            return
        }

        setAmount(finalValue)
    }
}

export const _payNow = async (setPaying, setMessage, isPaying, amount, query) => {
    try {

        if (isPaying || !amount) {
            return
        }

        let isOnLine = window.navigator.onLine
        if (!isOnLine) {
            setMessage("you are offline")
            setPaying(false)
            return
        }

        if(isNaN(parseFloat(amount)) || !parseFloat(amount)){
            setMessage("amount not valid, try again")
            setPaying(false)
            return
        }

        setPaying(true)
        setMessage('')

        // let app_id = cookies.get('app_id')
        // let phone = cookies.get('phone')

        let app_id = process.env.NEXT_PUBLIC_PAY_BILL_API_ID
        let phone = process.env.NEXT_PUBLIC_PAY_BILL_PHONE

        if (!app_id && process.env.NODE_ENV == 'development' ) {
            app_id = "18C5D2B9"
        }

        let data = {
            url: baseUrl+  'api/v1/profiles/generate_oyeti_txn?',
            payload: {
                amount: parseFloat(amount),
                c_app_id: app_id,
                flow_id: 11,
                app_master_id: 1,
                mid: query.mid,
            },
        }

        let response = await axios.post(baseLocalURL, data)
        let responseData = response.data.data
        if (responseData) {
            let {txn_id} = responseData
            let refId = txn_id
            if (txn_id) {
                let clientUrl = process.env.NEXT_PUBLIC_OYETI_BASE_URL
                let menuPath = localStorage.getItem('table_no')
                let store_name = localStorage.getItem('store_name')

                if (!menuPath || typeof menuPath == 'undefined' || menuPath == undefined) {
                    menuPath = ''
                }

                if (!store_name || typeof store_name == 'undefined' || store_name == undefined) {
                    store_name = ''
                }
    
                // console.log(`${phone}/${amount}/${app_id}/${refId}/${menuPath}/${flowId}/${query.mid}/${store_name}`)
                let stringData = btoa(`${phone}/${amount}/${app_id}/${refId}/${menuPath}/${flowId}/${query.mid}/${store_name}`)
                let url = `/store/${flowId}/${query.mid}` 
                if (menuPath) {
                    url = `/store/${flowId}/${query.mid}/${menuPath}` 
                }
                cookies.set('amount', amount)
                cookies.set('redirect', url)

                let baseURL = `${clientUrl}payment/${stringData}/loading`
                window.location.replace(`/payment/`+refId)
            }else{
                setPaying(false)
                setMessage("server error, try again")
            }
        }else{
            setPaying(false)
            setMessage("server error, try again")
        }
    } catch (error) {
        console.log(error)
        setPaying(false)
        setMessage("server error, try again")
    }
}


export const _goBackPay = (mid, router) => {
    let menuPath = localStorage.getItem('table_no')
    let url = `/store/${flowId}/${mid}`
    if (!menuPath || typeof menuPath == 'undefined' || menuPath == undefined) {
        menuPath = ''
    }else{
        url = `/store/${flowId}/${mid}/${menuPath}`
    }
    router.replace(url)
}