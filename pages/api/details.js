
const index = async (req, res) => {

    try {
        let data = {
            "id": "HO8eZ6SERNhhgttt",
            "slug": "alfredo_pasta_1",
            "s_slug": "alfredo_pasta",
            "name": "Alfredo Pasta 1",
            "rating": 2.7,
            "asset_url": "https://material-ui.com/static/images/avatar/3.jpg",
            "asset_type": 1,
            "price": 100,
            "category": "Pizza",
            "category_id": 1,
            "max_allow": 100,
            "item_type": 1,
            "offered": true,
            "added_quantity": 0,
            "is_best_seller": true,
            "offer": {
                "value": 10,
                "is_percentage": true
            },
            "details": "<h1>Enter the main heading, usually the same as the title.</h1> <p>Be <b>bold</b> in stating your key points. Pu</p>",
            "share_url": "https://7b0ebc1a-2d31-45bc-bf3c-03d4054717a4.mock.pstmn.io/details?p_slug=alfredo_pasta"
        }
        res.status(200).json({ status: true, data })
    } catch (error) {
        res.status(500).json({ status: false, message: 'server error' })
    }
}

export default index