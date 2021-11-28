import Images from "../../utils/ImageConst";

const Index = ({ onFilterChange }) => {
  return (
    <div className="card-offer-flexbox px-1 py-0">
      <div
        className="px-1 card-offer-item text-center"
        onClick={() => onFilterChange()}
      >
        <a href="#">
          <img className="img-fluid" src={Images.offers} alt="" />
          <p className="mb-0 offers-cr-text text-center">Offers</p>
        </a>
      </div>
      <div className="my-2 mx-0 vertical-hr"></div>
      <div className="px-1 card-offer-item text-center">
        <a href="#">
          <img
            className="img-fluid"
            style={{ paddingBottom: "2px" }}
            src={Images.stars}
            alt=""
          />
          <p className="mb-0 mt-1 offers-cr-text text-center">Stars</p>
        </a>
      </div>
    </div>
  );
};

export default Index;
