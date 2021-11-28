import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import $, { isPlainObject } from "jquery";
import chunk from "lodash/chunk";
// import HeaderScrollPersistantAnimation from "../components/HeaderScrollPersistantAnimation";
import {
  _getCategoriesFun,
  _filterProducts,
  _getProductsFun,
  _getCartsFun,
  _addCartFun,
  summery,
  _searchProducts,
} from "../../../lib/helpers/menu";
import {
  _fetchGroceryProductMenu,
  setMid,
  _checkStoreOld,
} from "../../../lib/helpers/common";
import Search from "../../../components/menu/search";
import Category from "../../../components/menu/category";
import Filter from "../../../components/menu/filter";
import Offer from "../../../components/menu/offer";
import Product from "../../../components/menu/product";
import Cart from "../../../components/menu/cart";
import loaderAction from "../../../lib/helpers/loader";
import Router from "next/router";
import CartPreviewModal from "../components/CartPreviewModal";
import Masonry from "react-masonry-css";
import { useRouter } from "next/router";
import SelectType from "../../../components/checkout/deliveryTypes";
import {
  setOrderTypeLocal,
  setCheckoutDataType,
} from "../../../lib/helpers/checkout";
import { OrderTypeEnums } from "../../../lib/enums";

const Index = ({ query }) => {
  const router = useRouter();
  // location
  const { name } = router.query;
  const [headerScrollAnimation, setHeaderScrollAnimation] = useState("none");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [responseMeta, setResponseMeta] = useState({});
  const [carts, setCarts] = useState([]);
  const [menuKey, setMenuKey] = useState(1);
  const [filterCatID, setFilterCatID] = useState(null);
  const [filterSubCatID, setFilterSubCatID] = useState(null);
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const [searchProducts, setSearchProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [isCartPreviewModalOpen, setIsCartPreviewModalOpen] = useState(false);
  const [orderType, setOrderType] = useState("");
  const [selectTypePopup, setSelectTypePopup] = useState(true);
  const [isAddressSelect, setisAddressSelect] = useState(false);
  const [address, setAddress] = useState({});
  const [checkoutData, setCheckoutData] = useState({});
  const [orderItem, setOrderItem] = useState({});
  const [isGrocery, setIsGrocery] = useState(true);
  const [isLoadingInit, setIsLoadingInit] = useState(true);
  const [product, setProduct] = useState();
  const [selected, setSelected] = useState({});
  const [toppingModal, setToppingModal] = useState(false);
  const [modal, setModal] = useState(false);
  const onModalClick = () => {
    setModal(!modal);
  };
  const menumodalRef = useRef();
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  const _getCarts = () => {
    _getCartsFun(setCarts);
  };

  const _filter = async (catID) => {
    setFilterCatID(catID);
    setFilterSubCatID(
      categories
        .find((cat) => cat.id === catID)
        ?.sub_category_ids.filter((x) => !!x)[0]
    );
    document
      .querySelector(".subcat-scroll-container > .story-flexbox")
      .scrollTo(0, 0);
  };

  const _products = (products) => {
    let length = Math.ceil(products.length / 2);
    return chunk(products, length);
  };

  useEffect(() => {
    if (carts.length === 0) {
      setIsCartPreviewModalOpen(false);
    }
  }, [carts]);

  useEffect(() => {
    loaderAction(true);
    _checkStoreOld(query.mid);
    let idOnly = false;
    if (!query.search) {
      setMid(query.mid);
    } else {
      idOnly = true;
    }
    _getCarts();
    _fetchGroceryProductMenu(
      query.mid,
      (cats) => {
        setCategories(cats);
        setFilterCatID(cats[0].id);
        setFilterSubCatID(
          cats[0].sub_category_ids.filter((subCatID) => !!subCatID)[0]
        );
      },
      setProducts,
      setResponseMeta,
      idOnly
    );
  }, []);

  // useEffect(() => {
  //   _filter(null);
  // }, []);

  let filterSubCatIDs = [];
  if (filterCatID) {
    let categoryData = categories.find((cat) => cat.id === filterCatID)[
      "sub_category_ids"
    ];
    if (categoryData) {
      filterSubCatIDs = categoryData.filter((subCatID) => !!subCatID);
    }
  }

  const getProducts = () => {
    if (searchText !== "") return searchProducts;

    if (!filterSubCatID || Object.keys(products).length === 0) return [];

    return products[filterSubCatID].products;
  };

  const handleSubCatChange = (subCatID) => {
    setFilterSubCatID(subCatID);
  };

  if (responseMeta.error) {
    return (
      <div className="wrapper">
        <div className="container m-0 p-0">
          <h1>{responseMeta.message}</h1>
        </div>
      </div>
    );
  }

  const openFilterCategoryModal = () => {
    setFilterModalOpen(true);
  };

  const filters = [
    {
      label: "Shop By Category",
      onAction: openFilterCategoryModal,
    },
  ];

  const _keySet = () => {
    let menu = menuKey + 1;
    setMenuKey(menu);
  };

  const _getCheckoutCartsData = async (onRemove, addr) => {
    if (onRemove && carts.length == 1) {
      Router.back();
      return;
    }
    loaderAction(true);
    if (address && address.name) {
      addr = address;
    }
    await setCheckoutDataType(
      setCheckoutData,
      setOrderItem,
      setIsGrocery,
      0,
      addr
    );
    setTimeout(() => {
      loaderAction(false);
      setIsLoadingInit(false);
    }, 1000);
  };

  const onTypeSelect = (type) => {
    setOrderType(type);
    // setLoginStatus(true);
    setSelectTypePopup(false);
    setOrderTypeLocal(type);
    if (type == OrderTypeEnums.Home) {
      setisAddressSelect(true);
    } else {
      _getCheckoutCartsData();
    }
  };

  const _onSelectType = (type) => {
    if (type == OrderTypeEnums.Home) {
      setSelectTypePopup(false);
      setisAddressSelect(true);
      setOrderTypeLocal(type);
      setOrderType(type);
    } else {
      onTypeSelect(type);
    }
  };

  // setTimeout(function () {
  //   if (process.browser) {
  //     const mod = document.getElementById("ordMod");
  //     mod.classList.remove("hideMod");
  //   }
  // }, 3000)

  const _repeatAction = (data, cartData) => {
    setProduct(data);
    setSelected(cartData);
    setToppingModal(true);
  };

  const orderTypeLabel = () => {
    if (typeof window !== "undefined") {
      let label = localStorage.getItem("typeLabel");
      return label?.replace(/[^\w.,\s]/g, "");
    }
  };

  const merchantName = () => {
    if (typeof window !== "undefined") {
      let label = localStorage.getItem("Merchant Name");
      return label?.replace(/[^\w.,\s]/g, "");
    }
  };

  return (
    <div className="wrapper">
      <div className="container m-0 p-0">
        <div
          style={{
            position: "fixed",
            width: "100%",
            top: "0",
            left: "0",
            background: dark ? "#2C2F33" : "#e0e5ec",
            borderBottom: `${
              dark ? "1px solid #1E2328" : "1px solid rgba(107, 130, 153, 0.7)"
            }`,
            zIndex: "4",
          }}
        >
          <Search
            showMic={false}
            onBack={() => Router.back()}
            showCartIcon={carts.length > 0}
            isGrocery={true}
            filters={filters}
            isSearch={false}
            onChangeText={(text) => {
              _searchProducts(
                text,
                setSearchProducts,
                true,
                setFilterCatID,
                setFilterSubCatID
              );
              setSearchText(text);
            }}
            setIsCartPreviewModalOpen={setIsCartPreviewModalOpen}
            carts={carts}
            setCarts={setCarts}
            products={products}
            _products={_products}
            getProducts={getProducts}
            meta={{
              category_id: filterCatID,
              sub_category_id: filterSubCatID,
            }}
            onAction={() => _keySet()}
            onReapeat={(data, filterCartProduct) =>
              _repeatAction(data, filterCartProduct)
            }
          />

          <div className="shop-list-address-menu" style={{ margin: "1rem" }}>
            <div
              className={`shop-list-name-menu ${
                dark && "shop-list-name-menu-dark"
              }`}
            >
              {/* {name} */}
              {merchantName()}
            </div>
            <div
              className={`shop-list-text-small-menu mt-1 ${
                dark && "shop-list-text-small-menu-dark"
              }`}
            >
              {orderTypeLabel()}
              {/* {location} */}
            </div>
          </div>
        </div>

        {/* <div id="ordMod" className="showMod hideMod"> */}
        {selectTypePopup ? (
          <SelectType
            name={name}
            onClose={() => onTypeSelect(orderType)}
            onSelectType={(type) => _onSelectType(type)}
            orderTypes={
              checkoutData.deliveryTypes ? checkoutData.deliveryTypes : []
            }
          />
        ) : null}
        {/* </div> */}

        <Masonry
          breakpointCols={2}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column w-100"
          style={{ marginTop: "50%" }}
        >
          <div className="container mt-0 p-0 main-card-cont card-cont-home">
            <div
              className="d-flex px-0 justify-content-between main-card-cont-inner"
              style={{
                padding: carts.length === 0 ? "0 0 20px 0" : "0 0 80px 0",
              }}
            >
              {_products(getProducts(products)).map((chunkProducts, index) => {
                return (
                  <div
                    key={index}
                    className={
                      index == 0 ? "card-flex-row" : "card-flex-row pl-1"
                    }
                    style={{ paddingLeft: 0, paddingRight: "20px" }}
                  >
                    {index == 0 ? (
                      <Offer
                        onFilterChange={() =>
                          _filterProducts(setProducts, filterCatID, true)
                        }
                      />
                    ) : null}

                    {chunkProducts.map((product, pIndex) => (
                      <Product
                        isGrocery={true}
                        onAction={() => _keySet()}
                        setCarts={setCarts}
                        carts={carts}
                        key={pIndex}
                        product={product}
                        meta={{
                          category_id: filterCatID,
                          sub_category_id: filterSubCatID,
                        }}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </Masonry>

        <Cart key={menuKey} summery={summery(carts)} isGrocery={true} />
        {isCartPreviewModalOpen && (
          <CartPreviewModal
            carts={carts}
            setCarts={setCarts}
            isCartPreviewModalOpen={isCartPreviewModalOpen}
            setIsCartPreviewModalOpen={setIsCartPreviewModalOpen}
            dark={dark}
          />
        )}
        <div
          style={{ display: filterModalOpen ? "block" : "none" }}
          className="rep-modal-overlay"
        >
          <div className="rep-modal" onClick={() => setFilterModalOpen(false)}>
            <div
              className={`rep-modal-inner pb-0 ${
                dark && "rep-modal-inner-dark"
              }`}
            >
              <div className="rep-modal-header">
                <div
                  className={`rep-modal-title ${
                    dark && "rep-modal-title-dark"
                  }`}
                >
                  {/* <p className="mb-0">
                    Category Selected -{" "}
                    {filterCatID &&
                      categories.find((cat) => cat.id === filterCatID).name}
                  </p> */}
                  <p className="mb-0">Browse menu</p>
                </div>
                <div
                  role="button"
                  onClick={() => setFilterModalOpen(false)}
                  className="rep-modal-close"
                >
                  <i
                    className={`fas fa-times cross-icon ${
                      dark && "cross-icon-dark"
                    }`}
                  ></i>
                </div>
              </div>
              <div className="rep-modal-body">
                <Category
                  variant="box"
                  filterCatID={filterCatID}
                  onChangeCategory={(catID) => _filter(catID)}
                  categories={categories}
                />
                {/* <h5 className="r-m-heading my-2">Refine Search</h5> */}
                <div className="container subcat-scroll-container px-0 mt-0 mb-4">
                  <div
                    className="d-flex align-items-center story-flexbox"
                    style={{ paddingBottom: "20px" }}
                  >
                    {[...filterSubCatIDs].map((subCatID) => (
                      <button
                        key={subCatID}
                        className={`mx-2 ${
                          filterSubCatID === subCatID
                            ? "repeat-btn active-category"
                            : "add-new-btn inactive-category"
                        } ${dark && "repeat-btn-dark add-new-btn-dark"}`}
                        style={{ padding: "10px 25px", whiteSpace: "nowrap" }}
                        onClick={() => handleSubCatChange(subCatID)}
                      >
                        {products[subCatID] &&
                          products[subCatID]["sub_category_name"]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Index.getInitialProps = async ({ query }) => {
  return { query };
};

export default Index;
