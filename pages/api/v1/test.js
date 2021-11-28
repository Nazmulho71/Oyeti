
const _getUrl = url => {
    let webUrl = process.env.NEXT_PUBLIC_WEB_API
    url = "https://stageweb.oyeti.com/api/v1/merchant_seller/upi_collect_money"
    let usrDatas = url.split("merchant_seller/upi_collect_moneyddd")
    console.log(webUrl)
}

_getUrl()