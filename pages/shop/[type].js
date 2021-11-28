import dynamic from 'next/dynamic'
import {titleEnums} from '../../lib/enums'

const ShopCMP = dynamic(
  () => import('../../components/shop'),
  { ssr: false }
)

const Index = ({ query, isShop }) => {
  return (
    <ShopCMP isShop={isShop} query={query}/>
  )
}



Index.getInitialProps = async (ctx) => {
  const { asPath, query } = ctx

  let isShop = false
  if (titleEnums.Food == query.type || titleEnums.Grocery == query.type || titleEnums.Retail == query.type || titleEnums.Vegetable == query.type) {
    isShop = true
  }

  return { asPath, query, isShop }
}

export default Index