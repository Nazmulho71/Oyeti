// 1 = if offer_cat and parent_cat true => anything buy will lower will be free 
// 2 = parent_cat true and offer_cat false then he must buy from offer_cat 
// 3 = if offer_cat and parent_cat false =>  then he must buy from parent cat and then if buy from offer_cat then lowerst will be free 
// 3 = if offer_cat and parent_cat false =>  then he must buy from parent cat and then check offer_cat if offer_cat  empty then check item_details one will free from item_details

// direct discount 

// check promotional data first 
// then check bogo if taken then ignore direct offer 
// if bogo ignore then use durect offer 

import  {promotionalTypes } from '../enums'
   
//getitems for acording to  category
export const _getCategoryItems = (items, category) => {
    let offersItems = []
    for (let index = 0; index < items.length; index++) {
        const element = items[index]
        if (category.name.toLowerCase() == element.category_name.toLowerCase()) {
            offersItems.push(element)
        }
    }

    return offersItems
}

//calculate discount for promotional 
export const _calculatePromotionalOffer =( storeData, product) => {
    let offers = storeData.promotional_offers
    let discount = 0
    let offer = {}
    if (offers &&  Array.isArray(offers)) {
      for (let index = 0; index < offers.length; index++) {
        const element = offers[index]
        if (element.item_details.item_id == product.id && promotionalTypes.BOGOOffer == element.offer_type) {
          discount = element.item_details.item_price
          offer = element.id
        }
      }
    }
    return {discount, offer}
}


//calculate bogoOffer
export const _calculateBogoOffer =(items, offer) => {
    items = items.sort((a, b) => a.price - b.price)
   
    if (offer.is_offer_cat && offer.is_parent_cat) {
        return {
            discount:  items[0].price,
            discount_id: offer.promotion_id
        }
    }else if(!offer.is_offer_cat && !offer.is_parent_cat){
        let parentCat = offer.parent_cat
        let offerCat = offer.offer_cat
        let itemDetails = offer.item_details
        let offersItems = _getCategoryItems(items, parentCat)

        if (offersItems.length >0) {
            if (offerCat.id) {
                offersItems = _getCategoryItems(items, offerCat)
                return {
                    discount: offersItems.length > 0 ?  offersItems[0].price : 0,
                    discount_id: offer.promotion_id
                }
            }

            if (itemDetails && itemDetails.item_id) {
                for (let index = 0; index < items.length; index++) {
                    const element = items[index]
                    if (element.id == itemDetails.item_id) {
                        return {
                            discount: element.price,
                            discount_id: offer.promotion_id
                        }
                    }
                    
                }
            }
        }
    }else if (offer.is_offer_cat && !offer.is_parent_cat) {
        let parentCat = offer.parent_cat
        let offersItems = _getCategoryItems(items, parentCat)
        items = items.sort((a, b) => a.price - b.price)
        return {
            discount:  offersItems.length > 0 ?  items[0].price : 0,
            discount_id: offer.promotion_id
        }
    }else if (!offer.is_offer_cat && offer.is_parent_cat) {
        let offerCat = offer.offer_cat
        if (offerCat.id) {
            let offersItems =  _getCategoryItems(items, offerCat)
            return {
                discount:  offersItems.length > 0 ?  offersItems[0].price : 0,
                discount_id: offer.promotion_id
            }
        }

        let itemDetails = offer.item_details
        if (itemDetails && itemDetails.item_id) {
            for (let index = 0; index < items.length; index++) {
                const element = items[index]
                if (element.id == itemDetails.item_id) {
                    return {
                        discount: element.price,
                        discount_id: offer.promotion_id
                    }
                }
            }
        }

    }

    return {
        discount: 0,
        discount_id: offer.promotion_id
    }
}

export const _getOfferType = (storeData, items, total) => {
    try {
        //check first if prmotioanl data exist or not if present then calculate
        let promotionalData = storeData.promotional_data
        let promotionalDataExists = isPromotionalDataExists(promotionalData, items)
        if (promotionalDataExists) {
            return {
                discount: promotionalData.item_price - 1,
                discount_id: ""
            }
        }

        //check first if bogo offer exits and  calculate acording 
        let promotionalOffers = storeData.promotional_offers
        let getGogoOfferData  = getPromotionalOffer(promotionalOffers, promotionalTypes.BOGOOffer) 
        if (getGogoOfferData) {
            let calculatedData = _calculateBogoOffer(items, getGogoOfferData)
            if (calculatedData.discount) {
                return calculatedData
            }
        }

        //check first if direct offer exits and calculate acording 
        let directOfferData  = getPromotionalOffer(promotionalOffers, promotionalTypes.DirectOffer) 
        if (directOfferData) {
            if (total  >= directOfferData.min_purchase_amount) {
                if(directOfferData.disc_amount){
                    return {
                        discount: directOfferData.disc_amount,
                        discount_id: directOfferData.promotion_id
                    }
                }else if(directOfferData.disc_percentage){
                    let discount = (total * directOfferData.disc_percentage) / 100
                    if (discount && discount <= directOfferData.max_disc_amount) {
                        return {
                            discount: discount,
                            discount_id: directOfferData.promotion_id
                        }
                    }else{
                        return {
                            discount: directOfferData.max_disc_amount,
                            discount_id: directOfferData.promotion_id
                        }
                    }
                }
            }
        }
        
        return {
            discount: 0,
            discount_id: ""
        }

    } catch (error) {
        return {
            discount: 0,
            discount_id: ""
        }
    }
}


export const isPromotionalDataExists = (promotionalData, items) => {
    if (promotionalData && promotionalData.visit_count && promotionalData.category_name) {
        if (promotionalData.visit_count + 1 >= promotionalData.required_count) {
            for (let index = 0; index < items.length; index++) {
                const item = items[index]
                return item.id == promotionalData.item_id
            }
        }
    }
    return false
}

export const isPromotionalGoGoDataExists = (promotionalData, items) => {
    if (promotionalData && promotionalData.visit_count && promotionalData.category_name) {
        if (promotionalData.visit_count + 1 >= promotionalData.required_count) {
            for (let index = 0; index < items.length; index++) {
                const item = items[index]
                return item.id == promotionalData.item_id
            }
        }
    }
    return false
}


export const isOfferOfTheDayItemExits = (qsrOfferItems, items) => {
    for (let index = 0; index < items.length; index++) {
        const item = items[index]
        for (let index = 0; index < qsrOfferItems.length; index++) {
            const offerCategoryItem = qsrOfferItems[index]
            return offerCategoryItem.id == item.id
        }
    }
    return false
}

export const getPromotionalOffer = (offers, offerType) => {
    for (let index = 0; index < offers.length; index++) {
        const element = offers[index]
        if (element.offer_type == offerType) {
            return element
        }
    }
    return null
}