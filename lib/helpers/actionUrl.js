const baseUrl = process.env.NEXT_PUBLIC_BASEURL 
const whatsAppOtpUrl = process.env.NEXT_PUBLIC_WHATSAPP_OTP_URL

export const isProduction = () => {
  // return true
  if(window.location.origin === 'https://oyeti.com') 
    return true
  return false
}

export const getWhatsAppOtpUrl  = () => {
  return whatsAppOtpUrl
}


export const  getAmazonCallBackUrl  = () => {
  return baseUrl+"/payment"
}


export const getNewQSRURL = () => {
  return baseUrl
}

export const getSMSurl = () => {
  if (isProduction()) {
    return "https://8gvfppglb0.execute-api.ap-south-1.amazonaws.com/apl/apl-details"
  }else{
    return "https://t2p1sjmzzg.execute-api.ap-south-1.amazonaws.com/aplstaging/apl-details"
  }
}


