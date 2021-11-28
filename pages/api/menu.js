
const index = async (req, res) => {

    try {
        let data = {
            "products": [
                {
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
                    }
                },
                {
                    "id": "HO8eZ6SERNhhgttt2",
                    "slug": "alfredo_pasta_2",
                    "s_slug": "alfredo_pasta",
                    "name": "Alfredo Pasta 2",
                    "rating": 2.7,
                    "asset_url": "https://material-ui.com/static/images/avatar/3.jpg",
                    "asset_type": 1,
                    "price": 100,
                    "category": "Pasta",
                    "category_id": 2,
                    "max_allow": 100,
                    "item_type": 2,
                    "offered": true,
                    "added_quantity": 0,
                    "is_best_seller": true,
                    "offer": {
                        "value": 10,
                        "is_percentage": true
                    }
                },
                {
                    "id": "HO8eZ6SERNhhgttt3",
                    "slug": "alfredo_pasta_3",
                    "s_slug": "alfredo_pasta",
                    "name": "Alfredo Pasta 3",
                    "rating": 2.7,
                    "asset_url": "https://material-ui.com/static/images/avatar/3.jpg",
                    "asset_type": 3,
                    "price": 100,
                    "category": "Pasta",
                    "category_id": 2,
                    "max_allow": 100,
                    "item_type": 1,
                    "offered": true,
                    "added_quantity": 0,
                    "is_best_seller": false,
                    "offer": {
                        "value": 10,
                        "is_percentage": true
                    }
                },
                {
                    "id": "HO8eZ6SERNhhgttt4",
                    "slug": "alfredo_pasta_4",
                    "s_slug": "alfredo_pasta",
                    "name": "Alfredo Pasta 4",
                    "rating": 2.7,
                    "asset_url": "https://material-ui.com/static/images/avatar/3.jpg",
                    "asset_type": 1,
                    "price": 100,
                    "category": "Burger",
                    "category_id": 3,
                    "max_allow": 100,
                    "item_type": 1,
                    "offered": true,
                    "added_quantity": 0,
                    "is_best_seller": false,
                    "offer": {
                        "value": 10,
                        "is_percentage": true
                    }
                },
                {
                    "id": "HO8eZ6SERNhhgttt6",
                    "slug": "alfredo_pasta_6",
                    "s_slug": "alfredo_pasta",
                    "name": "Alfredo Pasta 6",
                    "rating": 2.7,
                    "asset_url": "https://material-ui.com/static/images/avatar/3.jpg",
                    "asset_type": 1,
                    "price": 100,
                    "category": "Mocktail",
                    "category_id": 4,
                    "max_allow": 100,
                    "item_type": 1,
                    "offered": true,
                    "added_quantity": 0,
                    "is_best_seller": true,
                    "offer": {
                        "value": 10,
                        "is_percentage": true
                    }
                },
                {
                    "id": "HO8eZ6SERNhhgttt7",
                    "slug": "alfredo_pasta_7",
                    "s_slug": "alfredo_pasta",
                    "name": "Alfredo Pasta 7",
                    "rating": 2.7,
                    "asset_url": "https://material-ui.com/static/images/avatar/3.jpg",
                    "asset_type": 1,
                    "price": 100,
                    "category": "Appetiser",
                    "category_id": 5,
                    "max_allow": 100,
                    "item_type": 1,
                    "offered": true,
                    "added_quantity": 0,
                    "is_best_seller": true,
                    "offer": {
                        "value": 10,
                        "is_percentage": true
                    }
                },
                {
                    "id": "HO8eZ6SERNhhgttt8",
                    "slug": "alfredo_pasta_8",
                    "s_slug": "alfredo_pasta",
                    "name": "Alfredo Pasta 8",
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
                    "is_best_seller": false,
                    "offer": {
                        "value": 10,
                        "is_percentage": true
                    }
                },
                {
                    "id": "HO8eZ6SERNhhgttt9",
                    "slug": "alfredo_pasta_9",
                    "s_slug": "alfredo_pasta",
                    "name": "Alfredo Pasta 9",
                    "rating": 2.7,
                    "asset_url": "https://material-ui.com/static/images/avatar/3.jpg",
                    "asset_type": 1,
                    "price": 100,
                    "category": "Pasta",
                    "category_id": 2,
                    "max_allow": 100,
                    "item_type": 2,
                    "offered": true,
                    "added_quantity": 0,
                    "is_best_seller": true,
                    "offer": {
                        "value": 10,
                        "is_percentage": true
                    }
                },
                {
                    "id": "HO8eZ6SERNhhgttt10",
                    "slug": "alfredo_pasta_10",
                    "s_slug": "alfredo_pasta",                      
                    "name": "Alfredo Pasta 10",
                    "rating": 2.7,
                    "asset_url": "https://material-ui.com/static/images/avatar/3.jpg",
                    "asset_type": 1,
                    "price": 100,
                    "category": "Burger",
                    "category_id": 3,
                    "max_allow": 100,
                    "item_type": 2,
                    "offered": true,
                    "added_quantity": 0,
                    "is_best_seller": false,
                    "offer": {
                        "value": 10,
                        "is_percentage": true
                    }
                },
                {
                    "id": "HO8eZ6SERNhhgttt11",
                    "slug": "alfredo_pasta_11",
                    "s_slug": "alfredo_pasta",                      
                    "name": "Alfredo Pasta 11",
                    "rating": 2.7,
                    "asset_url": "https://material-ui.com/static/images/avatar/3.jpg",
                    "asset_type": 1,
                    "price": 100,
                    "category": "Mocktail",
                    "category_id": 4,
                    "max_allow": 100,
                    "item_type": 2,
                    "offered": true,
                    "added_quantity": 0,
                    "is_best_seller": true,
                    "offer": {
                        "value": 10,
                        "is_percentage": true
                    }
                },
                {
                    "id": "HO8eZ6SERNhhgttt12",
                    "slug": "alfredo_pasta_12",
                    "s_slug": "alfredo_pasta",                      
                    "name": "Alfredo Pasta 12",
                    "rating": 2.7,
                    "asset_url": "https://material-ui.com/static/images/avatar/3.jpg",
                    "asset_type": 1,
                    "price": 100,
                    "category": "Appetiser",
                    "category_id": 5,
                    "max_allow": 100,
                    "item_type": 2,
                    "offered": true,
                    "added_quantity": 0,
                    "is_best_seller": false,
                    "offer": {
                        "value": 10,
                        "is_percentage": true
                    }
                },
                {
                    "id": "HO8eZ6SERNhhgttt13",
                    "slug": "alfredo_pasta_13",
                    "s_slug": "alfredo_pasta",                      
                    "name": "Alfredo Pasta 13",
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
                    }
                }
            ],
            "next_page": "menu?shop_slug=little_itely&next=2"
        }
        res.status(200).json({ status: true, data })
    } catch (error) {
        res.status(500).json({  status: false,  message: 'server error' })
    }
}
  
export default index