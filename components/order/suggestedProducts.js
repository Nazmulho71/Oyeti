import { useEffect, useState } from "react";
import Product from "../menu/product";
import { _getSuggestedProducts } from "../../lib/helpers/common";
const Index = ({ setCarts, carts }) => {
  const [products, setProducts] = useState([]);

  const _getProducts = () => {
    _getSuggestedProducts(setProducts);
  };

  useEffect(() => {
    _getProducts();
  }, []);

  return (
    <div className="suggested-dishes-cont">
      <h3 className="heading-bold-small">Suggested dishes for you</h3>
      <div className="suggested-dishes-flex-container">
        <div className="suggested-dishes-flex-inner">
          {products.map((product, index) => (
            <Product
              product={product}
              key={index}
              carts={carts}
              setCarts={setCarts}
              isSuggested={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
