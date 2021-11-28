import { baseLocalURL, _showURL } from "../api/baseUrls";
import Enums from "../enums";
import axios from "axios";
// import Swal from 'sweetalert2'

export const getStoreDetails = async (mid, setStoreData) => {
  try {
    let url = _showURL();
    const res = await axios.post(baseLocalURL, {
      payload: {
        mid: mid,
      },
      url,
    });

    let data = res.data.data;

    if (data.success) {
      data = data.data.store_details;
      let storedata = {
        id: data.business_id,
        slug: data.name,
        name: data.name,
        address_line_1: data.address,
        address_line_2: data.address_2,
        star_rating: data.star_rating,
        rating_count: "",
        assets: [{ asset_type_id: Enums.AssetTypeImage }],
      };
      setStoreData(storedata);
    } else {
      // Swal.fire({
      //     icon: 'error',
      //     title: 'Oops...',
      //     text: data.message,
      // })
    }
  } catch (error) {
    console.log(error);
  }
};
