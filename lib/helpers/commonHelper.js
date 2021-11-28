

export const amountFix  = amount => {
   return  parseFloat(amount).toFixed(2)
}

export const _searchProducts = async (text, setProducts, products) => {
   if (!text) {
      setProducts(products)
      return
   }
   products = products.filter(product => {
      let index = product.name.toLowerCase().search(text.toLowerCase())
      if (index > -1) {
          return product
      }
   })
   setProducts(products)
   return
}

export const _getUrl = url => {
   try {
    let webUrl = process.env.NEXT_PUBLIC_WEB_API
    let mapUrl = process.env.NEXT_PUBLIC_GOOGLE_MAP_API
    let whatsAppAPI = process.env.NEXT_PUBLIC_WHATSAPP_API
    let apiUrl = process.env.NEXT_PUBLIC_BASE_API
    let apiBaseUrl = process.env.NEXT_PUBLIC_OYETI_BASE_URL
   
    if (!url) {
        console.log(url)
        return url
    }

    let usrDatas = url.split("merchant_seller/upi_collect_money")
    if (usrDatas.length == 2) {
        return webUrl + "/api/v1/merchant_seller/upi_collect_money"
    }
 
    usrDatas = url.split("v1/transactions/amazon_pay")
    if (usrDatas.length == 2) {
        return webUrl + "/api/v1/transactions/amazon_pay?"
    }
 
    usrDatas = url.split("transactions")
    if (usrDatas.length == 2) {
        return webUrl + "/api/v1/transaction"
    }
 
    usrDatas = url.split("tonetag_convoke")
    if (usrDatas.length == 2) {
        return webUrl + "/callbacks/tonetag_convoke"
    }
 
 
    usrDatas = url.split("api/geocode")
    if (usrDatas.length == 2) {
         return mapUrl +""+ usrDatas[1]
       
    }
 
    usrDatas = url.split("/users/generate_whapp_otp")
    if (usrDatas.length == 2) {
        return whatsAppAPI
    }
 
    usrDatas = url.split("notifications/app_to_web")
    if (usrDatas.length == 2) {
        return webUrl + "/api/v1/notifications/app_to_web?"
    }
 
    usrDatas = url.split("/api/v1")
    if (usrDatas.length == 2) {
        usrDatas = url.split(apiBaseUrl)
        return apiUrl +"/"+ usrDatas[1]
    }
    
    return url
   } catch (error) {
       console.log(error)
       return url
   }
}