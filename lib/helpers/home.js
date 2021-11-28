import {getNotificationUrl, myOrders, appNearbyMerchants, 
  googleAutoComplete, locationDetailsUrl, locationDetailsUrlByLatLong, updateProfileApi, userAddAddressesApi, _naOutlet, baseLocalURL, baseLocalURLForm} from '../../lib/api/baseUrls'
import {_getAllCategoriesAndStore} from './common'
import { titleEnums, shopType , flowTypes} from '../../lib/enums'
import debounce from 'lodash/debounce'
import loaderAction from './loader'
import axios from 'axios'
import Router from 'next/router'

export const _getCategoriesFun = async () => {
  try {
      await _getAllCategoriesAndStore()
  } catch (error) {
      console.log(error)
  }
}

export const _setIndexFun = (isUp, currentIndex, storeData,  setIndex) => {
    let index = currentIndex
    if (storeData.assets) {
      if (isUp ) {
        index = index + 1
        if (storeData.assets && index == storeData.assets.length) {
          index = 0
        }
      }else{
        index = index - 1
        if (index < 0) {
          index = storeData.assets ?  storeData.assets.length - 1 : 0
        }
      }
    }
    setIndex(index)
}

export const _handleTouchEndFun = (heightOver, touchStart, touchEnd, assets, currentIndex, _setIndex, setHeightOver) => {
  let height = heightOver

  if (touchStart - touchEnd > 150) {
    height = height - 100
    if (assets && currentIndex == assets.length - 1) {
      return
    }
    _setIndex(true)
  }

  if (touchStart - touchEnd < -150) {
    height = height + 100
    if (currentIndex == 0) {
      return
    }
    _setIndex(false)
  }
  
  setHeightOver(height)
}


export const _callWaiter = async (mid,  tableNo, setIsCallWaiter= null) => {
  try {
    loaderAction(true)
    let url = getNotificationUrl
    let data = {
      url,
      payload: {
        query:tableNo ? tableNo : '',
        mid
      }
    }
    await axios.post(baseLocalURL, data)
    loaderAction(false)
    if (setIsCallWaiter) {
      setIsCallWaiter(true)
    }
  } catch (error) {
    console.log(error)
    loaderAction(false)
  }
}


export const _getMyOrders = async (setMyOrders, setLoader) => {
  try {
    let url = myOrders()
    let data = {
      url,
      payload: {
        page: 1
      }
    }
    if (setLoader) {
      loaderAction(true)
    }
    let response = await axios.post(baseLocalURLForm, data)
    let dataConfig = response.data.data
    if(dataConfig.success){
      setMyOrders(dataConfig.data.orders)
    }
    loaderAction(false)
  } catch (error) {
    loaderAction(false)
  }
}


export const _getStores = async (setStores, setLoader, business_type = 'all', page = 1) => {
  try {
    let url = appNearbyMerchants()
    let locationData = getLocationLatLong()
    if (!locationData) {
      return
    }
    titleEnums.type = business_type

    let data = {
      url,
      payload: {
        lat: locationData.lat,
        long: locationData.lng,
        business_type: titleEnums.businessType,
        page
      }
    }
    if (setLoader) {
      loaderAction(true)
    }
    let response = await axios.post(baseLocalURLForm, data)
    let dataConfig = response.data.data
    if(dataConfig.success){
      setStores(dataConfig.data)
    }
    loaderAction(false)
  } catch (error) {
    console.log(error)
    loaderAction(false)
  }
}

export const _redirectCheck = (dataConfig, setStores) => {
 
  if (dataConfig.data &&  Array.isArray(dataConfig.data) && dataConfig.data.length > 0) {  
    setStores(dataConfig.data)
  }else{
    let data = dataConfig.data
    let mid = data.mid
    if (! data.mid) {
      mid = data.id
    }
    let url = "/menu/" + flowTypes.QSR + "/" + mid+"?search=true"
    if (data && data.flow == shopType.GROCERY) {
      url = "/menu/" + flowTypes.Grocery + "/" + data.mid 
    }
    window.location.replace(url)
  }
}


export const _getSearchStores = async (setStores, setErrror, store) => {
  return new Promise(async(res, rej) => {
    try {
      let url = _naOutlet()
      let data = {
        url,
        payload: {
          store
        }
      }

      loaderAction(true)
      let response = await axios.post(baseLocalURLForm, data)
      let dataConfig = response.data.data
     
      if(dataConfig.success){
        _redirectCheck(dataConfig, setStores) 
        res(dataConfig.data)
      }else{
        setErrror(dataConfig.message)
        rej(dataConfig.message)
      }
      loaderAction(false)
      // ViveksGeneralStore636458660
    } catch (error) {
      
      loaderAction(false)
      setErrror("server error")
      rej("server error")
    }
  })
}


export const _getLocation = debounce( async (text, setLocations, loader, setLoader) => {
  try {
    
    if (loader) {
      return
    }
   
    if (!text) {
      setLoader(false)
      setLocations([])
      return
    }
    setLoader(true)
    let url = googleAutoComplete() + text
    let data = {
      url
    }

    let response = await axios.post(baseLocalURL, data)
   
    let resData = response.data.data
    let status = resData.success
    setLoader(false)
    if (status) {
      setLocations(resData.data.predictions)
    }
  } catch (error) {
    console.log(error)
    setLoader(false)
  }
}, 1000)


export const onAddNewAddress = async (payload) => {
  try {
    loaderAction(true)
    let url = userAddAddressesApi()
    let data = {
      url,
      payload
    }
    let response = await axios.post(baseLocalURL, data)
    let resData = response.data.data
    loaderAction(false)
    return resData
  } catch (error) {
    loaderAction(false)
    return null
  }
}

export const onPressLocationTitle = async (item, loader, setLoader) => {
  try {
    if (loader) {
      return
    }
    setLoader(true)
    let id = item.place_id
    let url = locationDetailsUrl() + id
    let data = {
      url
    }
    let response = await axios.post(baseLocalURL, data)
    let resData = response.data.data
    setLoader(false)
    if (resData.success) {
      let region = (({ lat, lng }) => ({ latitude: lat, longitude: lng }))(resData.data.result.geometry.location)
      return region
    }
    return null
  } catch (error) {
    setLoader(false)
    return null
  }
}

export const onPressTitle = async (item, loader, setLoader) => {
  try {
    if (loader) {
      return
    }
    setLoader(true)
    setLocation(item.structured_formatting.main_text)
    let id = item.place_id
    let url = locationDetailsUrl() + id
    let data = {
      url
    }
    let response = await axios.post(baseLocalURL, data)
    let resData = response.data.data
    if (resData.success) {
      let region = (({ lat, lng }) => ({ latitude: lat, longitude: lng }))(resData.data.result.geometry.location)
      setLoader(false)
      if(region != null && region !='undefined'){
        setLocationLatLong(region)
        Router.push('/')
      }
    }else{
      setLoader(false)
    }
  } catch (error) {
    console.log(error)
    setLoader(false)
  }
}


export const getPlaceDetaislByLatLong = async (loader, setLoader, data) => {
  return new Promise(async (res, rejcet) => {
    try {

      if (loader) {
        return
      }
      setLoader(true)
      let url = locationDetailsUrlByLatLong(data.latitude, data.longitude)
     
      let paydata = {
        url,
        requestType: 'get'
      }
      let response = await axios.post(baseLocalURL, paydata)
      let location = response.data.data
      setLoader(false)
      if (data.only_data_return) {
        return res(location)
      }
      if (location.results && location.results.length > 0) {
        setLocationLatLong(data)
        let locationString = location.results[0].formatted_address
        

        //finding locaality 
        for (let index = 0; index < location.results.length; index++) {
          const element = location.results[index]
          if (element.types && element.types) {
            for (let index = 0; index < element.types.length; index++) {
              const type = element.types[index]
              if (type == "locality") {
                locationString = element.formatted_address
                let address_components = element.address_components

                if (address_components && address_components.length > 0) {
                  for (let index = 0; index < address_components.length; index++) {
                    const addElement = address_components[index]
                    const addTypes =  addElement.types
                    for (let index = 0; index < addTypes.length; index++) {
                      const addType = addTypes[index]
                      if (addType == "locality") {
                        locationString = addElement.long_name
                      }
                    }
                  }
                }

              }
            }
          }
        }
        setLocation(locationString)
       
        if (data.callback) {
          data.callback({
            status: true
          })
        }else{
          Router.push('/')
        }
      }
    } catch (error) {

      if (data.only_data_return) {
        return res(location)
      }
      setLoader(false)
      if (data.callback) {
        data.callback({
          status: false
        })
      }else{
        Router.push('/')
      }
    }
  })
}

export const getCurrentLocation = (loader, setLoader, callback) => {
  try {
    if (loader) {
      return
    }
    setLoader(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat= position.coords.latitude
        let lng = position.coords.longitude
        let data = {
          latitude: lat,
          longitude: lng,
          callback
        }
        setLoader(false)
        getPlaceDetaislByLatLong(loader, setLoader, data)
      },
      (error) => {
        console.log(error)
        setLoader(false)
        if (callback) {
          callback({
            status: false
          })
        }else{
          alert("Please enable location permission from settings")
        }
      },
      {enableHighAccuracy: true, timeout: 5000}
    )
  } catch (error) {
    setLoader(false)
    callback({
      status: false
    })
  }
}

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase())
}

export const updateProfile = async (setloader, loader, name, email, gender, setErrors, cancle) => {
  try {
    if (loader) {
      return
    }
    let error = {}
    setErrors({})
    if (!name) {
      error.name = 'name required'
      setErrors(error)
      return
    }

    if (!email) {
      error.email = 'email required'
      setErrors(error)
      return
    }

    let emailValid = validateEmail(email)
    if (!emailValid) {
      error.email = 'email not valid'
      setErrors(error)
      return
    }

    if (!gender) {
      error.gender = 'gender required'
      setErrors(error)
      return
    }
    
    setloader(true)
    let url = updateProfileApi()
    gender = gender[0].toLowerCase()
    
    let payload = {
      url,
      requestType: 'patch',
      payload: {
        name, email, gender, phone: "7696446312"
      }
    }

    let response = await axios.post(baseLocalURLForm, payload)
    let {data} = response.data
    localStorage.setItem('user', JSON.stringify(data.user))
    setloader(false)
    cancle()
    // Router.push('/profile')
  } catch (error) {
    error.server = 'server error'
    setErrors(error)
    setloader(false)
  }
}

export const setLocationLatLong = region => {
  localStorage.setItem('lat', region.latitude)
  localStorage.setItem('lng', region.longitude)
  return 
}

export const getLocationLatLong = () => {
  let lat = localStorage.getItem('lat')
  let lng  = localStorage.getItem('lng')
  if (lat && lng) {
    return  {
      lat, lng
    }
  }
  return null
}

export const setLocation = location => {
  return localStorage.setItem('location', location)
}

export const getLocation = () => {
  let location = localStorage.getItem('location')
  return location  ?? 'Setup your location'
}