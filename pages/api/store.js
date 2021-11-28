
const index = async (req, res) => {

    try {
        let data = {
            "id": "HO8eZ6SERN",
            "slug": "little_itely",
            "name": "Little Itely",
            "address_line_1": "Sadashiv Nagar",
            "star_rating": 4.5,
            "rating_count": "864",
            "table_name": "Table No. 5",
            "assets": [
                {
                    "asset_type": "image",
                    "asset_type_id": 1,
                    "url": "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80"
                },
                {
                    "asset_type": "gif",
                    "asset_type_id": 2,
                    "url": "https://acegif.com/wp-content/gifs/pizza-18.gif"
                },
                {
                    "asset_type": "video",
                    "asset_type_id": 3,
                    "url": "https://media.istockphoto.com/videos/closeup-of-chef-in-white-gloves-using-a-pizza-cutter-slicing-pizza-video-id1177749579"
                }
            ]
        }
        res.status(200).json({ status: true, data })
    } catch (error) {
        res.status(500).json({  status: false,  message: 'server error' })
    }
}
  
export default index