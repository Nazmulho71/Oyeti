
import dynamic from 'next/dynamic'
import nextCookie from 'next-cookies'

const LoaderCMP = dynamic(
    () => import('../../components/payment/loader'),
    { ssr: false }
)

const Index = ({query, amount}) => {
    return (
        <LoaderCMP query={query} amount={amount}/>
    )
}

Index.getInitialProps = async (ctx) => {
    const {asPath, query} =  ctx
    let { amount } = nextCookie(ctx)
    return {  asPath, query, amount}
}

export default Index