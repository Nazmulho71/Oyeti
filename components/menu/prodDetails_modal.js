import React from "react";

function prodDetails({
  modal,
  product,
  detailsmodalRef,
  dark,
  Header,
  onModalClick,
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
  // isImage,
  setCount,
  count,
  _addCart,
  _incDecQuantity,
  _getSVG,
  currency,
}) {
  return (
    <div>
      {modal ? (
        <div className="details-modal-overlay">
          {product.is_custome ? (
            <div className="customizable-modal">
              <div
                ref={detailsmodalRef}
                className={`customizable-modal-inner ${
                  dark && "customizable-modal-inner-dark"
                }`}
              >
                <div
                  className={`customizable-modal-header ${
                    dark && "customizable-modal-header-dark"
                  }`}
                >
                  <Header onModalClick={onModalClick} product={product} />
                </div>
                <div className="customizable-modal-body-wrap">
                  <div className="customizable-modal-body">
                    <div className="pt-3">
                      <div className="food-set-pagination-nav">
                        <button
                          onClick={() => setIsDetails(false)}
                          className={`${
                            isDetails
                              ? "food-pagination-btn "
                              : "food-pagination-btn food-pagination-btn-active"
                          } ${
                            isDetails
                              ? dark && "food-pagination-btn-dark "
                              : dark &&
                                "food-pagination-btn-dark food-pagination-btn-dark-active"
                          }`}
                        >
                          <div
                            className={`${
                              isDetails
                                ? "pagination-dot "
                                : "pagination-dot pagination-dot-active"
                            } ${
                              isDetails
                                ? dark && "pagination-dot-dark "
                                : dark &&
                                  "pagination-dot-dark pagination-dot-dark-active"
                            }`}
                          ></div>
                          Your Food
                        </button>

                        {product.description ? (
                          <button
                            onClick={() => setIsDetails(true)}
                            className={`${
                              !isDetails
                                ? "food-pagination-btn "
                                : "food-pagination-btn food-pagination-btn-active"
                            } ${
                              !isDetails
                                ? dark && "food-pagination-btn-dark "
                                : dark &&
                                  "food-pagination-btn-dark food-pagination-btn-dark-active"
                            }`}
                          >
                            <div
                              className={`${
                                !isDetails
                                  ? "pagination-dot "
                                  : "pagination-dot pagination-dot-active"
                              } ${
                                !isDetails
                                  ? dark && "pagination-dot-dark "
                                  : dark &&
                                    "pagination-dot-dark pagination-dot-dark-active"
                              }`}
                            ></div>
                            Details
                          </button>
                        ) : null}
                      </div>

                      {isDetails ? null : (
                        <Sizes
                          sizes={product.sizes}
                          category={_titleCase(product.category)}
                          setSize={(selectedItem) => _addSize(selectedItem)}
                          size={size}
                        />
                      )}
                    </div>

                    {isDetails ? null : (
                      <Addons
                        isAddedAddOn={isAddedAddOn}
                        key={currentKey}
                        onSelectType={(item, position) =>
                          _addAddons(item, position)
                        }
                        addons={product.addons}
                        selected={selected}
                      />
                    )}

                    {isDetails ? null : (
                      <Common
                        key={selected.name}
                        setExtraCheese={setExtraCheese}
                        extraCheese={extraCheese}
                        setItemCount={(added_quantity) =>
                          setQuantity(added_quantity)
                        }
                        toppingModal={toppingModal}
                        selected={selected}
                        quantity={quantity}
                        setToppingModal={setToppingModal}
                        product={product}
                        addProductToCart={() => _addItemToCart()}
                        reapeatData={getLastData(selected)}
                        addNewData={() => addNewData()}
                        repeatLastCartData={() => repeatLastCartData()}
                      />
                    )}

                    {isDetails ? <Details product={product} /> : null}

                    {isDetails ? null : (
                      <div
                        className={`feedback-inp ${
                          dark && "feedback-inp-dark"
                        }`}
                      >
                        {/* <h3>Any Spacial Requests? Let us know.</h3> */}
                        <input
                          type="text"
                          placeholder="Any Spacial Requests? Let us know."
                        />
                      </div>
                    )}

                    <div
                      className={`add-ord-btn ${dark && "add-ord-btn-dark"}`}
                    >
                      <div
                        style={{
                          flex: 5,
                          margin: "15px",
                          marginRight: "10px",
                        }}
                      >
                        <button
                          className={`cr-add-btn ${dark && "cr-add-btn-dark"}`}
                          style={{
                            position: "relative",
                            border: "none",
                            height: "auto",
                          }}
                          key={cardKey}
                        >
                          {filterProduct.added_quantity ? (
                            <div
                              className={`cr-add-btn-mod-active ${
                                dark && "cr-add-btn-mod-active-dark"
                              }`}
                            >
                              <i
                                className="fas fa-minus"
                                // _incDecQuantity(
                                //   filterProduct.added_quantity - 1,
                                //   false
                                // )
                                onClick={() => setCount(count - 1)}
                              ></i>
                              <span>{count}</span>
                              {/* <span>{filterProduct.added_quantity}</span> */}
                              <i
                                className="fas fa-plus"
                                // _incDecQuantity(
                                //   filterProduct.added_quantity + 1,
                                //   true
                                // )
                                onClick={() => setCount(count + 1)}
                              ></i>
                            </div>
                          ) : (
                            <div
                              className={`cr-add-btn-mod-active ${
                                dark && "cr-add-btn-mod-active-dark"
                              }`}
                            >
                              <i
                                className="fas fa-minus"
                                // _incDecQuantity(
                                //   filterProduct.added_quantity - 1,
                                //   false
                                // )
                                onClick={() => setCount(count - 1)}
                              ></i>
                              {/* {filterProduct.added_quantity == "0" ? (
                                <span>1</span>
                              ) : (
                                <span>{filterProduct.added_quantity}</span>
                              )} */}
                              <span>{count}</span>
                              <i
                                className="fas fa-plus"
                                // _incDecQuantity(
                                //   filterProduct.added_quantity + 1,
                                //   true
                                // )
                                onClick={() => setCount(count + 1)}
                              ></i>
                            </div>
                          )}
                        </button>
                      </div>
                      <div
                        style={{
                          flex: 5,
                          margin: "15px",
                          marginLeft: "10px",
                        }}
                      >
                        <button
                          onClick={() => {
                            _addCart(filterProduct);
                            _incDecQuantity(
                              filterProduct.added_quantity + count,
                              true
                            );
                            onModalClick();
                          }}
                          style={{
                            width: "200px",
                            color: dark ? "#FF118E" : "white",
                            background: dark ? "#2C2F33" : "#FF118E",
                            fontWeight: "bold",
                            fontSize: "18px",
                            padding: "8px",
                          }}
                        >
                          Add Item
                          {/* : {currency} 
                          {_getPrice(filterProduct.added_quantity)}*/}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="details-modal">
              <div
                ref={detailsmodalRef}
                className={`details-modal-inner ${
                  dark && "details-modal-inner-dark"
                }`}
              >
                <div
                  className={`details-modal-header ${
                    dark && "details-modal-header-dark"
                  }`}
                >
                  <div
                    className="prod-intro-cont"
                    style={{
                      // isImage
                      ...(product.image_ur
                        ? { position: "absolute", bottom: -50 }
                        : {}),
                    }}
                  >
                    <div
                      className={`prod-det ${dark && "prod-det-dark"}`}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="justify-content-between align-items-center">
                        <div className="prod-name-cont">
                          <p
                            className={`prod-name mb-0 ${
                              dark && "prod-name-dark"
                            }`}
                          >
                            {product.name}
                          </p>
                          {product.rating ? (
                            <p className="text-muted mb-0">
                              <i className="fas fa-star"></i>{" "}
                              <b>{product.rating}</b> ({product.rating} ratings)
                            </p>
                          ) : null}
                        </div>

                        <div
                          className="d-flex align-items-start"
                          style={{ marginTop: "5px" }}
                        >
                          {/* {imageLoadingError && _getSVG(product) ? ( */}
                          <img
                            style={{
                              width: "15px",
                              bottom: 7,
                              marginRight: "5px",
                            }}
                            src={_getSVG(product)}
                            alt=""
                          />
                          {/* ) : null} */}
                          <div
                            className={`pagination-dot-active ${
                              dark && "pagination-dot-dark-active"
                            }`}
                          ></div>
                          <div className="prod-price-cont">
                            <p
                              className={`prod-price ${
                                dark && "prod-price-dark"
                              }`}
                            >
                              {currency}
                              {product.price}
                            </p>
                          </div>
                        </div>
                      </div>
                      <i onClick={onModalClick} className="fas fa-times"></i>
                    </div>
                  </div>
                </div>
                <div className="details-modal-body-wrap">
                  <div className="details-modal-body">
                    <div className="prod-details-container">
                      {product.description ? (
                        <div
                          className={`prod-details-para ${
                            dark && "prod-details-para-dark"
                          }`}
                        >
                          <h4 className="mb-3">Details</h4>
                          <p>{product.description}</p>
                        </div>
                      ) : null}
                    </div>

                    <div
                      className={`feedback-inp ${dark && "feedback-inp-dark"}`}
                    >
                      <input
                        type="text"
                        placeholder="Any Spacial Requests? Let us know."
                      />
                    </div>

                    <div
                      className={`add-ord-btn ${dark && "add-ord-btn-dark"}`}
                    >
                      <div
                        style={{
                          flex: 5,
                          margin: "15px",
                          marginRight: "10px",
                        }}
                      >
                        <button
                          className={`cr-add-btn ${dark && "cr-add-btn-dark"}`}
                          style={{
                            position: "relative",
                            border: "none",
                            height: "auto",
                          }}
                          key={cardKey}
                        >
                          {filterProduct.added_quantity ? (
                            <div
                              className={`cr-add-btn-mod-active ${
                                dark && "cr-add-btn-mod-active-dark"
                              }`}
                            >
                              <i
                                className="fas fa-minus"
                                // _incDecQuantity(
                                //   filterProduct.added_quantity - 1,
                                //   false
                                // )
                                onClick={() => setCount(count - 1)}
                              ></i>
                              <span>{count}</span>
                              {/* <span>{filterProduct.added_quantity}</span> */}
                              <i
                                className="fas fa-plus"
                                // _incDecQuantity(
                                //   filterProduct.added_quantity + 1,
                                //   true
                                // )
                                onClick={() => setCount(count + 1)}
                              ></i>
                            </div>
                          ) : (
                            <div
                              className={`cr-add-btn-mod-active ${
                                dark && "cr-add-btn-mod-active-dark"
                              }`}
                            >
                              <i
                                className="fas fa-minus"
                                // _incDecQuantity(
                                //   filterProduct.added_quantity - 1,
                                //   false
                                // )
                                onClick={() => setCount(count - 1)}
                              ></i>
                              {/* {filterProduct.added_quantity == "0" ? (
                                <span>1</span>
                              ) : (
                                <span>{filterProduct.added_quantity}</span>
                              )} */}
                              <span>{count}</span>
                              <i
                                className="fas fa-plus"
                                // _incDecQuantity(
                                //   filterProduct.added_quantity + 1,
                                //   true
                                // )
                                onClick={() => setCount(count + 1)}
                              ></i>
                            </div>
                          )}
                        </button>
                      </div>
                      <div
                        style={{
                          flex: 5,
                          margin: "15px",
                          marginLeft: "10px",
                        }}
                      >
                        <button
                          onClick={() => {
                            _addCart(filterProduct);
                            _incDecQuantity(
                              filterProduct.added_quantity + count,
                              true
                            );
                            onModalClick();
                          }}
                          style={{
                            width: "200px",
                            color: "white",
                            background: "#FF118E",
                            fontWeight: "bold",
                            fontSize: "18px",
                            padding: "8px",
                          }}
                        >
                          Add Item
                          {/* : {currency} 
                          {_getPrice(filterProduct.added_quantity)}*/}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default prodDetails;
