import { useEffect, useState } from "react";
import Details from "./components/details";
import Header from "./components/header";
import { getMid } from "../../lib/helpers/common";
import { useRouter } from "next/router";
import {
  _addCartFun,
  productCartData,
  addProductToCart,
  _getCartsFun,
} from "../../lib/helpers/menu";
import { currency } from "../../lib/enums";

const Index = ({ product }) => {
  const [filterProduct, setFilterProduct] = useState({});
  const router = useRouter();

  let filterCartProduct = async () => {
    let filterCartProduct = await productCartData(product);
    setFilterProduct(filterCartProduct);
  };

  const _addItemToCart = (added_quantity) => {
    let mid = getMid();
    let data = {
      id: product.id,
      item_id: product.id,
      added_quantity: added_quantity,
      sizes: [],
      addons: [],
      is_reapeat: true,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      mid,
    };
    setFilterProduct(data);
    // _addCartFun(product, carts, setCarts, false)
  };

  const _addCart = (data) => {
    if (!data.added_quantity) {
      return;
    }
    let showPopup = true;
    addProductToCart(data, showPopup, router.back);
  };

  const _getPrice = (quantity) => {
    return quantity ? product.price * quantity : product.price;
  };

  useEffect(() => {
    filterCartProduct();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wrapper">
      <div className="container m-0 p-0">
        <Header product={product} />

        <Details product={product} />

        <div className="fixed-order-btn-con">
          <div className="qt-pr-flexbox">
            {/* <div className="qty-btn-cont">
                            <span className="btn-span" onClick={() => filterProduct.added_quantity >= 1 ? _addItemToCart(filterProduct.added_quantity - 1) : null}><i className="fas fa-minus"></i></span>
                            <span className="qty-span">{filterProduct.added_quantity}</span>
                            <span className="btn-span" onClick={() => _addItemToCart(filterProduct.added_quantity + 1)}><i className="fas fa-plus"></i></span>
                        </div> */}
            <div className="add-ord-btn">
              <button onClick={() => _addCart(filterProduct)}>
                Add to order {currency}
                {_getPrice(filterProduct.added_quantity)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
