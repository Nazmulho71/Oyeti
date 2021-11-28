import {_getTitleFirsLast} from '../../lib/helpers/common'
import { useState } from "react"

const Index = ({shop}) => {
    const [imageLoadingError, setImageLoadingError] = useState(false)

    if (!imageLoadingError && shop.image_url ) {
        return (
            <img

                width={55}
                height={55}
                loading="lazy"
                src={shop.image_url}

                onError={() => setImageLoadingError(true)}
                style={
                    {objectFit:'cover', borderRadius: '10px'}
                }
            />
        )
       
    }

    return <b>{_getTitleFirsLast(shop.merchant_name)}</b>
    
}

export default Index