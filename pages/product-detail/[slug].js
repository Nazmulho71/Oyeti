import { useState, useEffect } from "react"
import ProductDetails from "../../components/product-details"
import DetailsToppings from "../../components/product-details/details-toppings"
import DetailsToppingsEdit from "../../components/product-details/details-toppings-edit"
import {_getProductData, productCartDataUpdate} from '../../lib/helpers/menu'

const Index = ({query}) => {

    const [product, setProduct] = useState({})
    const [selected, setSelected] = useState({})

    useEffect(async () => {
        let cartId = query.edit
        let carts = await productCartDataUpdate()
        setTimeout(() => {
            let findItem = [...carts].filter(cart => cart.id == cartId)
            if (findItem && findItem.length > 0) {
                let item = findItem[findItem.length - 1]
                let addons = item.addons[0]
                let itemData = {...item, addons:[addons] }
                setSelected(itemData)
            }
        }, 1000)
    }, [])


    useEffect(async () => {
        let id = query.slug
        let product = await _getProductData(id)
        setProduct(product)
    }, [])

    if (!product.name) {
        return <p>Loading...</p>
    }
    console.log(selected)
    if (product.addons.length > 0 || product.sizes.length) {
        let cartId = query.edit
        if (cartId) {
            if (selected && selected.id) {
                return <DetailsToppingsEdit currentCartItem={selected} cartId={cartId} product={product} query={query}/>
            }else{
                return <p>Loading...</p>
            }
        }else{
            return <DetailsToppings cartId={cartId} product={product} query={query}/>
        }
    }

    return <ProductDetails product={product} query={query}/>
}

Index.getInitialProps = async ({query}) => {
    return {query}
}


export default Index