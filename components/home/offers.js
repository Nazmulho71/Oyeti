import SliderCMP from "../common/slider";
let imageUrl = `https://ttoyeti.s3.ap-south-1.amazonaws.com/AppBanner/image-`;
let offers = [1, 2, 3, 4, 5];

const Index = () => {
  return (
    <div className="container py-2 px-0">
      <div className="d-flexd story-flexboxd">
        {
          <SliderCMP>
            {offers.map((offer, index) => {
              return (
                <div className="cart-list-inner" key={index}>
                  <img src={`${imageUrl}${offer}.png`} width="100%"></img>
                </div>
              );
            })}
          </SliderCMP>
        }
      </div>
    </div>
  );
};

export default Index;
