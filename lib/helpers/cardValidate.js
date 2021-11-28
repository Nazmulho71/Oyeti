export const validateCard = (card) => {
    let masterCard = /^(?:5[1-5][0-9]{14})$/
    let visaCard = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
    let americanExpress = /^(?:3[47][0-9]{13})$/
    let dinerCard = /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/
    let discoverCard = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/
    let jcbCard = /^(?:(?:2131|1800|35\d{3})\d{11})$/

    if (card.match(masterCard)) {
        return {
            is_valid: true,
            type: "MasterCard",
            message: ""
        }
    }

    if (card.match(visaCard)) {
        return {
            is_valid: true,
            type: "Visa",
            message: ""
        }
    }

    if (card.match(americanExpress)) {
        return {
            is_valid: true,
            type: "American Express",
            message: ""
        }
    }

    if (card.match(dinerCard)) {
        return {
            is_valid: true,
            type: "DinerCard",
            message: ""
        }
    }

    if (card.match(discoverCard)) {
        return {
            is_valid: true,
            type: "DiscoverCard",
            message: ""
        }
    }

    if (card.match(jcbCard)) {
        return {
            is_valid: true,
            type: "JCBCard",
            message: ""
        }
    }

    return {
        is_valid: false,
        type: "",
        message: "Card not valid"
    }
}

export const validateCardDate = (cardDate) => {

    if (cardDate.toString().length != 4) {
        return {
            is_valid: false,
            type: "",
            message: "Expire date not validate"
        }
    }

    let expiry_month =  cardDate.substring(0, 2)
    let expiry_year =  "20"+cardDate.substring(2,4)
    if (parseInt(expiry_month) > 12) {
        return {
            is_valid: false,
            type: "",
            message: "Expire month not validate"
        }
    }

    let current = new Date()
    let currentYear = current.getFullYear()
    let currentMonth = current.getMonth()


    if (parseInt(expiry_year) < currentYear) {
        return {
            is_valid: false,
            type: "",
            message: "Expire year not validate"
        }
    }

    if (parseInt(expiry_year) == currentYear) {
        if (parseInt(expiry_month) < currentMonth) {
            return {
                is_valid: false,
                type: "",
                message: "Expire month not validate"
            } 
        }
    }

    return {
        is_valid: true,
        type: "",
        message: ""
    }
}

export const validateCCV = (ccv) => {

    if (ccv.toString().length != 3) {
        return {
            is_valid: false,
            type: "",
            message: "CCV not valid"
        }
    }

    return {
        is_valid: true,
        type: "",
        message: ""
    }
}


export const validateCardData = (cardData) => {

    let isValidateCard = validateCard(cardData.cardNumber.toString())
   
    if (!isValidateCard.is_valid) {
        return isValidateCard
    }

    let isValidateCardDate = validateCardDate(cardData.cardDate)
    if (!isValidateCardDate.is_valid) {
        return isValidateCardDate
    }

    let isValidateCardCCV = validateCCV(cardData.cvv)
    if (!isValidateCardCCV.is_valid) {
        return isValidateCardCCV
    }

    return {
        is_valid: true,
        type: "",
        message: ""
    }
}