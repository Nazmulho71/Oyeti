import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import $ from "jquery";
import Router from "next/router";
import LastRepeatPopup from "../../../components/product-details/components/lastRepeatPopup";
// import HeaderScrollPersistantAnimation from 'components/HeaderScrollPersistantAnimation'

import { flowTypes, OrderTypeEnums } from "../../../lib/enums";
import {
  _products,
  _filterProducts,
  _getCartsFun,
  summery,
  _searchProducts,
  getItemForAction,
  addProductToCart,
  getLastData,
} from "../../../lib/helpers/menu";
import {
  setMid,
  _checkStoreOld,
  _fetchMenuProductsCategory,
} from "../../../lib/helpers/common";
import PromotionalOffers from "../../../components/menu/promotionalOffers";
import Search from "../../../components/menu/search_qsr";
import SearchQsrCMP from "../../../components/menu/search_qsr_CMP";
import Category from "../../../components/menu/category";
import Filter from "../../../components/menu/filter";
import Offer from "../../../components/menu/offer_new";
import Product from "../../../components/menu/product";
import Cart from "../../../components/menu/cart";
import loaderAction from "../../../lib/helpers/loader";
import { setPromotionalPopupDispatch } from "../../../lib/helpers/storeDispatch";
import { addUpdateCart } from "../../../store/actions/cart";
import { useSelector } from "react-redux";
import Masonry from "react-masonry-css";
import { _titleCase } from "../../../lib/helpers/menu";
import { Fragment } from "react/cjs/react.production.min";
import SelectType from "../../../components/checkout/deliveryTypes";
import {
  setOrderTypeLocal,
  setCheckoutDataType,
} from "../../../lib/helpers/checkout";
import { useRouter } from "next/router";
import Scrollspy from "react-scrollspy";
import AOS from "aos";
import "aos/dist/aos.css";

const Index = ({
  query,
  subtitle,
  onSubTitileClick,
  // isLoggedIn,
  // filterCatID,
  // categories,
}) => {
  const [categories, setCategories] = useState([]);
  const [vegOnly, setVegOnly] = useState(false);
  const [includeEgg, setIncludeEgg] = useState(false);
  const [nonveg, setNonveg] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const [carts, setCarts] = useState([]);
  let [menuKey, setMenuKey] = useState(1);
  const [filterCatID, setFilterCatID] = useState(0);
  const [toppingModal, setToppingModal] = useState(false);
  const [selected, setSelected] = useState({});
  const [searchFocused, setSearchFocused] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [orderType, setOrderType] = useState("");
  // const [loginStatus, setLoginStatus] = useState(isLoggedIn);
  const [selectTypePopup, setSelectTypePopup] = useState(true);
  const [isAddressSelect, setisAddressSelect] = useState(false);
  const [address, setAddress] = useState({});
  const [checkoutData, setCheckoutData] = useState({});
  const [orderItem, setOrderItem] = useState({});
  const [isGrocery, setIsGrocery] = useState(true);
  const [isLoadingInit, setIsLoadingInit] = useState(true);
  const [catArr, setCatArr] = useState([]);
  const [filterSubCatID, setFilterSubCatID] = useState(null);
  const menumodalRef = useRef();

  const router = useRouter();
  // location
  const { name } = router.query;

  const [modal, setModal] = useState(false);
  const onModalClick = () => {
    setModal(!modal);
  };

  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  const promotionalOffersPopup = useSelector(
    (state) => state.promotionalOffersPopup
  );
  const promotionalOffers = useSelector((state) => state.promotionalOffers);

  const _getCarts = () => {
    _getCartsFun(setCarts);
  };

  // const _localClear = () => {
  //   if (searchText) {
  //     setSearchText("");
  //     onClearText();
  //   }
  // };

  const _filter = async (catID, veg, egg, nonveg) => {
    console.log(catID);
    setFilterCatID(catID);
    setVegOnly(veg);
    setIncludeEgg(egg);
    setNonveg(nonveg);
    await _filterProducts(setProducts, catID, veg, egg, nonveg);
  };

  // const isSafari =
  //   typeof window !== "undefined"
  //     ? /constructor/i.test(window.HTMLElement) ||
  //       (function (p) {
  //         return p.toString() === "[object SafariRemoteNotification]";
  //       })(
  //         !window["safari"] ||
  //           (typeof safari !== "undefined" && window["safari"].pushNotification)
  //       )
  //     : null;

  useEffect(() => {
    const fetch = async () => {
      _checkStoreOld(query.mid);

      let stickySidebar =
        $(".fixed-header") && $(".fixed-header").offset()
          ? $(".fixed-header").offset().top
          : 0;
      // $(window).scroll(function () {
      //   if ($(window).scrollTop() > stickySidebar) {
      //     $('.fixed-header').addClass('fix-header-active')
      //     $('.toggle-search-input').removeClass('none')
      //     $('.card-cont-home').addClass('margintop')
      //     setHeaderScrollAnimation('block');
      //   } else {
      //     $('.fixed-header').removeClass('fix-header-active')
      //     $('.toggle-search-input').addClass('none')
      //     $('.card-cont-home').removeClass('margintop')
      //     setHeaderScrollAnimation('none');
      //   }
      // });
      let idOnly = false;
      if (!query.search) {
        setMid(query.mid);
      } else {
        idOnly = true;
      }
      _getCarts();
      loaderAction(true);
      await _fetchMenuProductsCategory(
        query.mid,
        setCategories,
        setProducts,
        flowTypes.QSR,
        idOnly
      );
      _filter(null, false, false);

      // const newOne = await _fetchMenuProductsCategory(
      //   query.mid,
      //   setCategories,
      //   setProducts,
      //   flowTypes.QSR,
      //   false
      // );
    };

    fetch();
  }, []);

  const _keySet = () => {
    let menu = menuKey + 1;
    setMenuKey(menu);
  };

  const _repeatAction = (data, cartData) => {
    setProduct(data);
    setSelected(cartData);
    setToppingModal(true);
  };

  const addNewData = () => {
    Router.push("/product-detail/" + product.id);
  };

  const focusSearch = () => {
    setSearchFocused(true);
    setTimeout(() => {
      document.getElementById("searchInputText").focus();
    }, 100);
  };

  const repeatLastCartData = async () => {
    let reduce = false;
    let data = await getItemForAction(product, reduce);
    addUpdateCart(carts, setCarts, data);
    setToppingModal(false);
    addProductToCart(data);
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
    // setSelectTypePopup(false);
    setOrderTypeLocal(type);
    if (type == OrderTypeEnums.Home) {
      setisAddressSelect(true);
    } else {
      _getCheckoutCartsData();
    }
  };

  const _onSelectType = (type) => {
    if (type == OrderTypeEnums.Home) {
      // setSelectTypePopup(false);
      setisAddressSelect(true);
      setOrderTypeLocal(type);
      setOrderType(type);
    } else {
      onTypeSelect(type);
    }
  };

  if (process.browser) {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".showCat a");

    sections.forEach((section) => {
      section.addEventListener("touchstart", nav);
      section.addEventListener("touchmove", nav);
      section.addEventListener("touchcancel", nav);
      section.addEventListener("touchend", nav);

      function nav() {
        const id = this.getAttribute("id");
        const navActive = document.querySelector(`a[href="#${id}"]`);
        navLinks.forEach((link) => link.classList.remove("activeCat"));
        navActive.classList.add("activeCat");
        navActive.scrollIntoView({
          behavior: "smooth",
          inline: "start",
        });
      }
    });
  }

  useEffect(() => {
    const stickyText = document.getElementById("stickyText");
    const scrollStickyText = function () {
      var y = window.scrollY;
      if (y >= 200) {
        stickyText.className = "";
        // if (dark) stickyText.classList.add("showCat-dark");
        // else stickyText.classList.add("showCat");
        stickyText.classList.add("showCat");
        stickyText.style.marginTop = "21%";
      } else {
        // if (dark) stickyText.className = "hideCat hideCat-dark";
        // else stickyText.className = "hideCat";
        stickyText.className = "hideCat";
        stickyText.style.marginTop = "-10%";
      }
    };

    window.addEventListener("scroll", scrollStickyText);
    return () => window.removeEventListener("scroll", scrollStickyText);
  }, [dark]);

  // setTimeout(function () {
  //   if (process.browser) {
  //     const mod = document.getElementById("ordMod");
  //     mod.classList.remove("hideMod");
  //   }
  // }, 3000);

  useEffect(() => {
    if (categories.length > 0) {
      let arr = [];
      for (let i = 0; i < categories.length; i++) {
        arr.push(i + 1);
      }
      setCatArr(arr);
    }
  }, [categories]);

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
    AOS.refresh();
  }, []);

  console.log("products", products);

  return (
    <div className={`wrapper ${dark && "wrapper-dark"}`}>
      <div
        className="container m-0"
        style={{ padding: carts.length === 0 ? "0 0 20px 0" : "0 0 80px 0" }}
      >
        {searchOpen ? (
          <div className="search-overlay log-modal-overlay">
            {products.map((product, i) => (
              <SearchQsrCMP
                key={i}
                products={products}
                onClose={() => setSearchOpen(false)}
                carts={carts}
                setCarts={setCarts}
                meta={{
                  category_id: filterCatID,
                  sub_category_id: filterSubCatID,
                }}
                onAction={() => _keySet()}
                onReapeat={(data, filterCartProduct) =>
                  _repeatAction(data, filterCartProduct)
                }
                product={product}
              />
            ))}
          </div>
        ) : null}
        {searchOpen ? null : (
          <div
            className={`fix-header fixed-header cat-header ${
              dark && "cat-header-dark"
            }`}
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              zIndex: "4",
              width: "100%",
              background: dark ? "#2C2F33" : "#E0E5EC",
              paddingBottom: "1px",
              borderBottom: `${
                dark
                  ? "1px solid #1E2328"
                  : "1px solid rgba(107, 130, 153, 0.7)"
              }`,
            }}
          >
            {!searchFocused ? null : (
              <Search
                onSearchFocused={() => setSearchOpen(true)}
                onBack={() => Router.back()}
                isSearchExpanded={true}
                isSearch={true}
                onClearText={() => _searchProducts("", setProducts)}
                onChangeText={(text) => {
                  _searchProducts(text, setProducts);
                }}
              />
            )}

            {/* <Category
              filterCatID={filterCatID}
              showClear={true}
              onChangeCategory={(catID) => _filter(catID, vegOnly, includeEgg, nonveg)}
              categories={categories}
            /> */}

            <Filter
              searchFocused={searchFocused}
              onClickSearch={() => focusSearch()}
              onFilterChange={(veg, egg, nonveg) =>
                _filter(filterCatID, veg, egg, nonveg)
              }
              vegOnly={vegOnly}
              includeEgg={includeEgg}
              nonveg={nonveg}
            />

            {/* <div
              className={`showCat ${dark && "showCat-dark"}`}
              style={{
                top: "auto",
                left: "auto",
                position: "relative",
              }}
            >
              {categories.map((category, i) => {
                category.counts = 0;

                products.forEach((p) => {
                  if (p.category_id === category.id) category.counts += 1;
                });
                return (
                  <>
                    {category.counts ? (
                      <div
                        key={i}
                        className={`catBord ${dark && "catBord-dark"}`}
                      >
                        <a href={`#${i}`}>{category.name}</a>
                      </div>
                    ) : null}
                  </>
                );
              })}
            </div> */}
          </div>
        )}
        {promotionalOffersPopup && (
          <PromotionalOffers
            onClose={() => setPromotionalPopupDispatch(false)}
            offers={promotionalOffers}
          />
        )}
        {/* <div id="stickyText" className={`hide ${"activeCat"}`}>
          {categories.map((category, i) => {
            return (
              <Fragment key={i}>
                <p>{category.name}</p>
              </Fragment>
            );
          })}
        </div> */}
        {/* <HeaderScrollPersistantAnimation display={'none'} /> */}
        {/* <!-- main card cont --> */}

        <div id="stickyText" className="hide">
          {categories.map((category, i) => {
            category.counts = 0;

            products.forEach((p) => {
              if (p.category_id === category.id) category.counts += 1;
            });
            return (
              <>
                {category.counts ? (
                  <div key={i} className={`catBord ${dark && "catBord-dark"}`}>
                    <a href={`#${i}`}>{category.name}</a>
                  </div>
                ) : null}
              </>
            );
          })}
        </div>

        {/* <div id="stickyText" className="hide">
          <Scrollspy items={catArr} currentClassName="is-current">
            {categories.map((category, i) => {
              category.counts = 0;

              products.forEach((p) => {
                if (p.category_id === category.id) category.counts += 1;
              });
              return (
                <>
                  {category.counts ? (
                    <li key={i} className={`catBord ${dark && "catBord-dark"}`}>
                      <a href={`#${i}`}>{category.name}</a>
                    </li>
                  ) : null}
                </>
              );
            })}
          </Scrollspy>
        </div> */}

        {/* <div className="bord"></div> */}
        <div className={"card-flex-row-offer pl-1"}>
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
        </div>

        {/* <div id="ordMod" className="showMod hideMod"> */}
        {selectTypePopup ? (
          <SelectType
            name={name}
            orderType={orderType}
            setSelectTypePopup={setSelectTypePopup}
            onClose={() => onTypeSelect(orderType)}
            onSelectType={(type) => _onSelectType(type)}
            orderTypes={
              checkoutData.deliveryTypes ? checkoutData.deliveryTypes : []
            }
          />
        ) : null}
        {/* </div> */}

        <div style={{ marginTop: "89%" }}>
          {categories.map((category, i) => {
            category.counts = 0;

            products.forEach((p) => {
              if (p.category_id === category.id) category.counts += 1;
            });

            if (category.counts) {
              return (
                <section id={i} className={category.mid} key={i}>
                  {/* {category.counts ? (
                  <div
                    className={`d-flex align-items-center category_txt ${
                      dark && "category_txt-dark"
                    }`}
                  >
                    <i
                      class="fas fa-arrow-right"
                      style={{ fontSize: "14px" }}
                    ></i>
                    <p className="m-0">{category.name}</p>
                  </div>
                  ) : null} */}
                  {/* {category.counts ? ( */}
                  <div
                    className={`category-name ${dark && "category-name-dark"}`}
                  >
                    <p
                      style={{
                        marginTop: category.name[0] ? "2rem" : "0",
                      }}
                    >
                      {category.name}
                    </p>
                    <hr />
                  </div>
                  {/* ) : null} */}

                  <Masonry
                    breakpointCols={2}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                    style={{ marginTop: "25px" }}
                  >
                    {products.map((product, index) => {
                      if (product.category_id === category.id)
                        return (
                          <div
                            // data-aos="fade-up"
                            // data-aos-once="true"
                            className="container mt-0 p-0 main-card-cont card-cont-home"
                            key={index}
                            style={{
                              paddingBottom: "0px !important",
                              width: "100%",
                            }}
                          >
                            <div className="d-flex px-0 justify-content-between main-card-cont-inner w-100">
                              <div
                                className={
                                  products.length == 2
                                    ? "card-flex-row w-100"
                                    : "card-flex-offer pl-1 w-100"
                                }
                                style={{
                                  display: "contents",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Product
                                  key={index}
                                  onReapeat={(data, filterCartProduct) =>
                                    _repeatAction(data, filterCartProduct)
                                  }
                                  onAction={() => _keySet()}
                                  setCarts={setCarts}
                                  carts={carts}
                                  product={product}
                                />
                              </div>
                            </div>
                          </div>
                        );
                    })}
                  </Masonry>
                </section>
              );
            }
          })}
        </div>

        {/* id="stickyText" className="hide" */}
        {/* <div key={i} className={`catBord ${dark && "catBord-dark"}`}> */}

        {/* <Scrollspy
          style={{
            width: "100%",
            display: "flex",
            position: "fixed",
            overflow: "auto",
            top: 10,
            left: 0,
            background: "green",
            zIndex: "99999",
          }}
          items={catArr}
          currentClassName="is-current"
        >
          {categories.map((category, i) => {
            category.counts = 0;

            products.forEach((p) => {
              if (p.category_id === category.id) category.counts += 1;
            });

            if (category.counts)
              return (
                <li key={i}>
                  <a href={`#${i}`}> {category.name}</a>
                </li>
              );
          })}
        </Scrollspy> */}

        {/* {isSafari ? (
          <div
            onClick={onModalClick}
            class="categories-menu"
            style={{ marginBottom: "120px" }}
          >
            <h3>Browse menu</h3>
          </div>
        ) : ( */}
        <div
          onClick={onModalClick}
          style={{ bottom: `${carts.length === 0 ? "40px" : "90px"}` }}
          class={`categories-menu ${dark && "categories-menu-dark"}`}
        >
          <h3>Browse menu</h3>
        </div>
        {/* )} */}
        {modal ? (
          <div id="modalDialog" className="menu-modal-overlay">
            <div className="menu-modal" onClick={onModalClick}>
              <div
                ref={menumodalRef}
                className={`menu-modal-inner ${
                  dark && "menu-modal-inner-dark"
                }`}
              >
                <div
                  style={{ background: "none", boxShadow: "none" }}
                  className={`menu-modal-header ${
                    dark && "menu-modal-header-dark"
                  }`}
                >
                  <h3>Browse menu</h3>
                  <i
                    onClick={onModalClick}
                    className={`fas fa-times cross-icon ${
                      dark && "cross-icon-dark"
                    }`}
                  ></i>
                </div>
                <div className="menu-modal-body-wrap">
                  <div className="menu-modal-body">
                    <Category
                      filterCatID={filterCatID}
                      showClear={true}
                      onChangeCategory={(catID) =>
                        _filter(catID, vegOnly, includeEgg, nonveg)
                      }
                      categories={categories}
                    />

                    {/* <Filter
                      onFilterChange={(veg, egg, nonveg) =>
                        _filter(filterCatID, veg, egg, nonveg)
                      }
                      vegOnly={vegOnly}
                      includeEgg={includeEgg}
                      nonveg={nonveg}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {/* <!-- main card cont ends --> */}
        {!toppingModal ? <Cart key={menuKey} summery={summery(carts)} /> : null}
      </div>
      {toppingModal ? (
        <LastRepeatPopup
          onToppingModal={() => setToppingModal(false)}
          reapeatData={getLastData(selected)}
          name={"product.name"}
          onAddNewData={() => addNewData()}
          onRepeatLastCartData={() => repeatLastCartData()}
        />
      ) : null}
    </div>
  );
};

Index.getInitialProps = async ({ query }) => {
  return { query };
};

export default Index;
