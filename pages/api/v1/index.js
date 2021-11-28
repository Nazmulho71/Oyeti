import axios from 'axios'
import { _getUrl } from '../../../lib/helpers/commonHelper'
const Index = async (req, res) => {
    let url = req.body.url
    url = _getUrl(url)
    console.log(url)
    let data = req.body.payload
    let requestType = req.body.requestType
    try {
        if (requestType == 'get' ) {
            let response = await axios.get(url)
            return res.status(200).json({ data: response.data })
        }
        const token = req.cookies.token
        let option = { headers: {"Authorization" : token ?? '' }}

        let response  = null
        if (token) {
            response = await axios.post(url, data, option)
        }else{
            response = await axios.post(url, data)
           
        }
    
        const auth = response.headers.authorization
        return res.status(200).json({ data: response.data, auth })
    } catch (error) {
        return res.status(500).json({ message: "server error", error: error })
    }
}
  
export default Index
  