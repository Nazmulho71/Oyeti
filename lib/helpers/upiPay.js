
export const createUrl = (type, amount, refId) => {
    // let phonePay = "phonepe://pay?pa=payu@axisbank&pn=DOTPE%20PRIVATE%20LIMITED&tr=13336242477&tid=CY75CKyLC57dOQat&am=588.02&cu=INR&tn=Starbucks%20-%204951614"
    // let googlePay = "tez://upi/pay?pa=dotpe.payu@indus&pn=DOTPE%20PRIVATE%20LIMITED&tr=13334427897&tid=CY5VONInNtZsQccz&am=257.26&cu=INR&tn=Starbucks%20-%204945971";
    let tr =  trPre + refId
    let url =  `${type}?pa=${upi}&pn=${pn}&tr=${tr}&mc=${mc}&am=${amount}&cu=INR`
    return url
}


export const payType = {
    GoolePay: "tez://upi/pay",
    PhonePay: "phonepe://pay"
}


export const upiStaticlist = [
    {
        id: 'Google Pay',
        lable: 'Google Pay',
        isStatic: true,
        image: '/assets/img/gpay.png',
        payType: payType.GoolePay,
        payId: 1,
    },
    {
        id: 'PhonePay',
        lable: 'PhonePay',
        isStatic: true,
        image: '/assets/img/phonepe.png',
        payType: payType.PhonePay,
        payId: 2,
    }
]



export const setPayType = payId => {
    return localStorage.setItem('pay_type', payId)
}

export const getPayType = () => {
    return localStorage.getItem('pay_type')
}

export const clearLocalId = () => {
    return localStorage.removeItem('pay_type')
}

export const getLocalPayType = () => {
    let type = getPayType()
    let findPay = upiStaticlist.find(upi => upi.payId == type)
    if (!findPay) {
        return null
    }
    return findPay.payType
}

export const mc ="5411"
export const trPre = "TON"
export const pn = "ToneTag"
export const upi ="tone.tag@icici"