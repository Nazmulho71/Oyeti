import Images from "../../utils/ImageConst";

const Index = ({ onFilterChange }) => {
  return (
    <div className="card-offer-flexbox px-1 py-0">
      <div
        className="px-1 card-offer-item text-center"
        onClick={() => onFilterChange()}
      >
        <div>
          <img className="img-fluid" src={Images.offers} alt="" />
        </div>
        <div>
          <p className="mb-0 offers-cr-text text-center">Offers</p>
        </div>
      </div>
      <div className="my-2 mx-0 vertical-hr"></div>
      <div className="px-1 card-offer-item text-center">
        <div>
          <img className="img-fluid" src={Images.stars} alt="" />
        </div>
        <div>
          <p className="mb-0 offers-cr-text text-center">Stars</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
