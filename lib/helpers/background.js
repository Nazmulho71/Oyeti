
import { _menuUrl} from '../../lib/api/baseUrls'
import {_getAllCategoriesAndStore, _getAllProducts} from '../helpers/common'

export const _backgroundFetch = async () => {
    let id = "menu"
    const registration = await navigator.serviceWorker.ready
    await registration.sync.register("fetchdata")
    // await registration.backgroundsync(id)
}


export const _fetchAllCategories = async () => {
    try {
        let categories = await _getAllCategoriesAndStore()
        categories.forEach(element => {
            _getAllProducts(null, element.id)
        })
    } catch (error) {
        
    }
}