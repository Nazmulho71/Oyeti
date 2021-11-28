import { useEffect } from "react"
import {decodeData} from '../lib/helpers/redirect'

const Index = ({query}) => {
    useEffect(() => {
        decodeData(query.data)
    }, [])

    return null
}

Index.getInitialProps = async (ctx) => {
    const { query } = ctx
    return { query }
}

export default Index

