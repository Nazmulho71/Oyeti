import { useEffect, useState } from "react";
import $ from "jquery";
import chunk from "lodash/chunk";
import HeaderScrollPersistantAnimation from "./components/HeaderScrollPersistantAnimation";
import {
  _getCategoriesFun,
  _filterProducts,
  _getProductsFun,
  _getCartsFun,
  _addCartFun,
  summery,
  _searchProducts,
} from "../../lib/helpers/menu";
import {
  _fetchMenuProductsCategory,
  setMid,
  _checkStoreOld,
} from "../../lib/helpers/common";
import Search from "../../components/menu/search";
import Category from "../../components/menu/category";
import Filter from "../../components/menu/filter";
import Offer from "../../components/menu/offer";
import Product from "../../components/menu/product";
import Cart from "../../components/menu/cart";

const Index = ({ query }) => {
  const [headerScrollAnimation, setHeaderScrollAnimation] = useState("none");
  const [categories, setCategories] = useState([]);
  const [vegOnly, setVegOnly] = useState(true);
  const [includeEgg, setIncludeEgg] = useState(true);
  const [nonveg, setNonveg] = useState(true);
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [menuKey, setMenuKey] = useState(1);
  const [filterCatID, setFilterCatID] = useState(null);
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const [searchProducts, setSearchProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const _getCarts = () => {
    _getCartsFun(setCarts);
  };

  const _filter = async (catID, veg, egg, nonveg) => {
    setFilterCatID(catID);
    setVegOnly(veg);
    setIncludeEgg(egg);
    setNonveg(nonveg);
    await _filterProducts(setProducts, catID, veg, egg, nonveg);
  };

  const _products = (products) => {
    let length = Math.ceil(products.length / 2);
    return chunk(products, length);
  };

  useEffect(() => {
    _checkStoreOld(query.mid);

    let stickySidebar = $(".fixed-header").offset().top;
    $(window).scroll(function () {
      if ($(window).scrollTop() > stickySidebar) {
        $(".fixed-header").addClass("fix-header-active");
        $(".toggle-search-input").removeClass("none");
        $(".card-cont-home").addClass("margintop");

        // setHeaderScrollAnimation('block');
      } else {
        $(".fixed-header").removeClass("fix-header-active");
        $(".toggle-search-input").addClass("none");
        $(".card-cont-home").removeClass("margintop");
        // setHeaderScrollAnimation('none');
      }
    });
    setMid(query.mid);

    _getCarts();
    _fetchMenuProductsCategory(query.mid, setCategories, setProducts);
  }, []);

  return (
    <div className="wrapper">
      <div className="container m-0 p-0">
        <Search
          onChangeText={(text) => {
            _searchProducts(text, setSearchProducts);
            setSearchText(text);
          }}
        />

        <div className="fix-header fixed-header">
          {/* <!-- scroll story --> */}

          <Category
            filterCatID={filterCatID}
            onChangeCategory={(catID) =>
              _filter(catID, vegOnly, includeEgg, nonveg)
            }
            categories={categories}
          />

          {/* <!-- scroll story ends --> */}

          {/* <!-- toggle btn cont --> */}
          <Filter
            onFilterChange={(veg, egg, nonveg) =>
              _filter(filterCatID, veg, egg, nonveg)
            }
            vegOnly={vegOnly}
            includeEgg={includeEgg}
            nonveg={nonveg}
          />
          {/* <!-- toggle btn cont ends --> */}
        </div>

        <HeaderScrollPersistantAnimation display={headerScrollAnimation} />

        {/* <!-- main card cont --> */}
        <div className="container mt-0 p-0 main-card-cont card-cont-home">
          <div className="d-flex px-0 justify-content-between main-card-cont-inner">
            {_products(products).map((chunkProducts, index) => {
              return (
                <div
                  key={index}
                  className={
                    index == 0 ? "card-flex-row" : "card-flex-row pl-1"
                  }
                  style={{ paddingRight: "7px", paddingLeft: "10px" }}
                >
                  {index == 0 ? (
                    <Offer
                      onFilterChange={() =>
                        _filterProducts(
                          setProducts,
                          filterCatID,
                          vegOnly,
                          includeEgg,
                          nonveg,
                          true
                        )
                      }
                    />
                  ) : null}

                  {chunkProducts.map((product, pIndex) => (
                    <Product
                      setCarts={setCarts}
                      carts={carts}
                      key={pIndex}
                      product={product}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        {/* <!-- main card cont ends --> */}

        <Cart key={menuKey} summery={summery(carts)} />
      </div>
    </div>
  );
};

Index.getInitialProps = async ({ query }) => {
  return { query };
};

export default Index;
