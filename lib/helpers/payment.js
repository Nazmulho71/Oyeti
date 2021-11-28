import {paymentTypes} from '../enums'
import {validateCardData} from './cardValidate'
import axios from 'axios'
import config from "../config"
import {clearLocalId, getLocalPayType} from './upiPay'
import loaderAction from './loader'

var W3CWebSocket = require("websocket").w3cwebsocket
import {orderUrl, upiPayurl, amazonPay, cancelGroceryOrder, baseLocalURL, baseLocalURLForm} from '../api/baseUrls'
import {getAmazonCallBackUrl} from './actionUrl'
import Router from 'next/router'

const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY
const amazonKey = process.env.NEXT_PUBLIC_AMAZON_PAY_KEY

const currency = "INR"
const email = "tonetag@whatsap.com"
const contact = "9999999999"
const method = "card"
const cardName = "tonetag"
const staticError = "server error"



export const scriptLoaded = () => {

}

export const _loadAmazonScript = () => {

  window.onAmazonLoginReady = function () {
    window.amazon.Login.setClientId(amazonKey)
  }

  const script = document.createElement("script")
  script.src = "https://assets.loginwithamazon.com/sdk/na/login1.js"
  script.async = true
  script.onload = () => scriptLoaded()
  document.body.appendChild(script)
}

export const _loadRazorPayKey = (setMethods, setRazorPay) => {
  let razorpay = new window.Razorpay({key})
  razorpay.once("ready", function (response) {
    if (response) {
      setRazorPay(razorpay)
      setMethods(response.methods)
    }
  })
}

export const _loadRazorPayScript = (setMethods, setRazorPay) => {
  const script = document.createElement("script")
  script.src = "https://checkout.razorpay.com/v1/razorpay.js"
  script.async = true
  script.onload = () =>  _loadRazorPayKey(setMethods, setRazorPay)
  document.body.appendChild(script)
  _loadAmazonScript()
 
}

export const _getOrdeInfo = async (refcode, setOrderInfo) => {
  return new Promise(async(res, reject) => {
    try {
      let url = orderUrl()
      let payload = {
        url,
        payload: {
          refcode: refcode
        }
      }
      let response = await axios.post(baseLocalURL, payload)
      let data = response.data.data
      if (data.success) {
        if (setOrderInfo) {
          setOrderInfo(data.data)
        }
        return res(data.data)
      }
      return res({})

    } catch (error) {
      return res({})
    }
  })
}

export const _cancelOrder = async (refcode, setError) => {
  try {
    let url = cancelGroceryOrder()
    let payload = {
      url,
      payload: {
        refcode
      }
    }
    loaderAction(true)
    await axios.post(baseLocalURLForm, payload)
    loaderAction(false)
    Router.push('/')
  } catch (error) {
    console.log(error)
    setError('server error')
  }
}

export const countdownTimer = setCountdown => {
  let duration = 120 * 1
  let timer = duration,
    minutes,
    seconds;
  if (timer > 0) {
    let interval = setInterval(function () {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10)

      minutes = minutes < 10 ? "0" + minutes : minutes
      seconds = seconds < 10 ? "0" + seconds : seconds

      if (--timer < 0) {
        timer = 0
        clearInterval(interval)
      }
      let textContent = minutes + ":" + seconds;
      setCountdown(textContent)
    }, 1000)
  }
}

export const _upiPaymentProcess  = actionObject => {
  let refcode = actionObject.refcode
  let client = new W3CWebSocket(config.apiGateway.socketPay)
  let connectSoc = JSON.stringify({
    command: "subscribe",
    identifier: JSON.stringify({
      channel: "PaymentChannel",
      refcode: refcode,
    })
  })


  client.onerror = function () {
    console.log("Connection Error");
  }

  client.onopen = function () {
    console.log("WebSocket Client Connected")
    function sendNumber() {
      if (client.readyState === client.OPEN) {
        client.send(connectSoc)
        setTimeout(sendNumber, 1000)
      }
    }
    sendNumber()
  }

  client.onclose = function () {
    console.log("echo-protocol Client Closed")
  }

  client.onmessage = function (e) {
    if (typeof e.data === "string") {
      let data = JSON.parse(e.data)
      if (
        data.message &&
        data.message.notification &&
        data.message.notification
      ) {
        if (
          data.message.notification.success &&
          data.message.notification.transaction
        ) {
          if (
            data.message.notification.data.status == 1 ||
            data.message.notification.data.status == 3
          ) {
           
             // go error page
            Router.push(`/payment/failed?refcode=${refcode}`)
          } else if (data.message.notification.data.status == 4) {
            // go error page
            Router.push(`/payment/failed?refcode=${refcode}`)
          } else if (data.message.notification.data.status == 2) {
            // go success page
            Router.push(`/payment/success?refcode=${refcode}`)
          }
        }
      }
    }
  }
}


export const _payUpi = async (actionObject) => {
  let loaderAction = actionObject.loaderAction
  try {
 
    let refcode = actionObject.refcode
    let upiId = actionObject.upiId
    let amount = parseFloat(actionObject.amount).toFixed(2)  
    loaderAction(true)

    let url = upiPayurl()
    let payload = {
        url,
        payload: {
          amount,
          vpa: upiId,
          refcode,
        }
    }

    let response = await axios.post(baseLocalURL, payload)
    let data = response.data.data
    if (data.success) {
      clearLocalId()
      Router.push(`/payment/loading?refcode=${refcode}`)
    }else{
      actionObject.setError(data.error_description)
    }
    loaderAction(false)
  } catch (error) {
    console.log(error)
    loaderAction(false)
    actionObject.setError(staticError)
  }
}

export const _cardPayment = actionObject => {
    let data = actionObject.cardData
    let razorpay = actionObject.razorpay
    let loaderAction = actionObject.loaderAction
  
    let isValidateCard = validateCardData(data)
   
    if (!isValidateCard.is_valid) {
      actionObject.setError(isValidateCard.message)
      return 
    }

    actionObject.setIsLoader(true)
    loaderAction(true)

    let refcode = actionObject.refcode
    if (
      actionObject.updateRazorpay &&
      actionObject.updateRazorpay.status == 4 &&
      actionObject.updateRazorpay.payment
    ) {
      refcode = actionObject.updateRazorpay.payment.new_refcode
      actionObject.setRefCode(refcode)
    }

    let amount = parseFloat((actionObject.amount * 100).toFixed(2) )
    var paymentData = {
      amount,
      currency,
      key_id: key,
      email:  actionObject.email ? actionObject.email : email,
      contact:actionObject.phone ? actionObject.phone : contact,
    
      method,
      notes: {
        order_id: refcode,
        amount,
      },

      "card[name]": data.cardName ? data.cardName : cardName,
      "card[number]": data.cardNumber,
      "card[cvv]": data.cvv,
      "card[expiry_month]": data.cardDate.substring(0, 2),
      "card[expiry_year]": data.cardDate.substring(2,4),
    }
     
    razorpay.createPayment(paymentData)
   
    razorpay.on("payment.success", function (resp) {
      let payload = {
        payment_id: resp.razorpay_payment_id,
        refcode: refcode,
        // pay_mod: paymentType,
        status: 2,
      }
      // console.log(resp)
      // return 
      // actionObject.setIsLoader(false)
      // loaderAction(false)
      Router.push(`/payment/success?refcode=${refcode}`)

    }) // will pass payment ID, order ID, and Razorpay signature to success handler.

    razorpay.on("payment.error", function (resp) {
      
      let error = resp.error
      if (error) {
        actionObject.setError(error.description)
      }else{
        actionObject.setError(staticError)
      }
      actionObject.setIsLoader(false)
      loaderAction(false)
      _loadRazorPayScript(actionObject.setMethods, actionObject.setRazorPay)
    }) // will pass error object to error handler
    
}


//amazon pay
export const LinkAccount = (url) => {
  let params = ""
  const options = {
    scope: "payments::conduct_silentpay",
    response_type: "code",
    state: params,
    popup: true
  }
  window.amazon.Login.authorize(
    options,
    url
  )
}


export const oncallAmazonPay = (data, actionObject) => {
  let refcode = actionObject.refcode
  if (data && data.status_id === 3 && data.success && data.pay_url) {
    window.open(data.pay_url)
    Router.push(`/payment/loading?refcode=${refcode}`)
  } else if (data && data.status_id === 3 && data.success) {
    alert("loading")
  }

  if (data && !data.success) {
    actionObject.setError(staticError)
  }

  if (data && data.status_id === 2) {
    Router.push(`/payment/success?refcode=${refcode}`)
  }
}

export const callAmazonPay = async (actionObject) => {
  let loaderAction = actionObject.loaderAction
  
  try {
    let user  = actionObject.user
    let phone = user.phone
    let id = actionObject.refcode
    loaderAction(true)

    let url = amazonPay()
    let payload = {
        url,
        payload: {
          phone,
          transaction_id:id
        }
    }

    let response  = await axios.post(baseLocalURL, payload)
    let data = response.data.data
    loaderAction(false)
    if (data.success) {
      oncallAmazonPay(data, actionObject)
    }else{
      actionObject.setError(staticError)
    }
  } catch (error) {
    loaderAction(false)
    actionObject.setError(staticError)
  }

  
  // this.props.dispatch({
  //   type: ActionTypesProfile.AMAZON_PAY,
  //   callback: this.oncallAmazonPay,
  //   code: { id, phone },
  // });
}

export const openCheckout = (actionObject) => {
  actionObject.setError('')
  let  paymentType = actionObject.paymentType
 
  if (actionObject.isLoader || !paymentType) {
    return
  }

  if (paymentType == paymentTypes.AmazonPay) {
    callAmazonPay(actionObject)
    return
  }

  if (paymentType == paymentTypes.UPI) {
    _payUpi(actionObject)
    return
  }
  
  if (paymentType == paymentTypes.CreditDebit) {
    let razorpay = actionObject.razorpay
    if (razorpay) {
      _cardPayment(actionObject)
    }
  }

}
