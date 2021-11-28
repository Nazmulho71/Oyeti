
const index = async (req, res) => {

    try {
        let categories = [
            {
               "id": 0,
               "name": "Best Seller",
               "asset_url": "https://image.freepik.com/free-vector/best-seller-golden-label-badge-design_1017-12390.jpg",
               "asset_type": 1
           },
       
           {
               "id": 1,
               "name": "Pizza",
               "asset_url": "https://image.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg",
               "asset_type": 1
           },
           {
               "id": 2,
               "name": "Pasta",
               "asset_url": "https://image.freepik.com/free-photo/penne-pasta-tomato-sauce-with-meat-tomatoes-decorated-with-pea-sprouts-dark-table_2829-3411.jpg",
               "asset_type": 1
           },
           {
               "id": 3,
               "name": "Burger",
               "asset_url": "https://image.freepik.com/free-photo/front-view-burger-stand_141793-15542.jpg",
               "asset_type": 1
           },
           {
               "id": 4,
               "name": "Mocktail",
               "asset_url": "https://image.freepik.com/free-photo/cocktail-with-orange-zest_141793-1156.jpg",
               "asset_type": 1
           },
           {
               "id": 5,
               "name": "Appetiser",
               "asset_url": "https://image.freepik.com/free-photo/tikka-kebab-with-french-fries-salad_140725-10791.jpg",
               "asset_type": 1
           }
        ]
        res.status(200).json({ status: true, data: categories })
    } catch (error) {
        res.status(500).json({  status: false,  message: 'server error' })
    }
}
  
export default index