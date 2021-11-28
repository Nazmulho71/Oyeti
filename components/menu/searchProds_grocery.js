import React, { useState } from "react";

function search_prods({
  index,
  dark,
  BaseStyles,
  product,
  currency,
  ProdDetails,
  detailsmodalRef,
  Header,
  setIsDetails,
  isDetails,
  Sizes,
  _titleCase,
  _addSize,
  size,
  Addons,
  isAddedAddOn,
  currentKey,
  _addAddons,
  selected,
  Common,
  setExtraCheese,
  extraCheese,
  setQuantity,
  toppingModal,
  quantity,
  setToppingModal,
  _addItemToCart,
  getLastData,
  addNewData,
  repeatLastCartData,
  Details,
  cardKey,
  filterProduct,
  _addCart,
  _incDecQuantity,
  _getSVG,
}) {
  const [modal, setModal] = useState(false);
  const [count, setCount] = useState(1);
  const onModalClick = () => {
    setModal(!modal);
  };

  return (
    <div className="all-search-products">
      <ProdDetails
        modal={modal}
        product={product}
        detailsmodalRef={detailsmodalRef}
        dark={dark}
        Header={Header}
        onModalClick={onModalClick}
        setIsDetails={setIsDetails}
        isDetails={isDetails}
        Sizes={Sizes}
        _titleCase={_titleCase}
        _addSize={_addSize}
        size={size}
        Addons={Addons}
        isAddedAddOn={isAddedAddOn}
        currentKey={currentKey}
        _addAddons={_addAddons}
        selected={selected}
        Common={Common}
        setExtraCheese={setExtraCheese}
        extraCheese={extraCheese}
        setQuantity={setQuantity}
        toppingModal={toppingModal}
        quantity={quantity}
        setToppingModal={setToppingModal}
        _addItemToCart={_addItemToCart}
        getLastData={getLastData}
        addNewData={addNewData}
        repeatLastCartData={repeatLastCartData}
        Details={Details}
        cardKey={cardKey}
        filterProduct={filterProduct}
        // isImage={isImage}
        setCount={setCount}
        count={count}
        _addCart={_addCart}
        _incDecQuantity={_incDecQuantity}
        _getSVG={_getSVG}
        currency={currency}
      />
      <div
        index={index}
        key={index}
        onClick={onModalClick}
        // onClick={() =>
        //   Router.push("/product-detail/" + product.id)
        // }
        className={`px-3 input-group search-products ${
          dark && "search-products-dark"
        }`}
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          flexWrap: "nowrap",
          ...BaseStyles.flex,
          ...BaseStyles.m_b_m,
        }}
      >
        <div>
          <p
            style={{
              ...BaseStyles.noMargin,
              maxWidth: "250px",
            }}
          >
            <b>{product.name}</b>
          </p>
        </div>

        <div>
          <p
            style={{
              marginLeft: "10px",
              fontWeight: 600,
              fontSize: "15px",
              margin: 0,
            }}
          >
            {currency}
            {product.price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default search_prods;
