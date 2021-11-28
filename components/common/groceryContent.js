import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import Images from "../../utils/ImageConst";

const Index = () => {
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  return (
    <div
      className={`grocery-note-border br-20 mx-20 ${
        dark && "grocery-note-border-dark"
      }`}
    >
      <div
        className={`grocery-note br-20 px-20 py-20 ${
          dark && "grocery-note-dark"
        }`}
      >
        <div className="d-flex align-items-center">
          <div className="mr-12">
            <img src={Images.priceNote} />
          </div>
          <div>
            <p className="font-12 mb-0">
              The price of fruits and non branded products may change, this is
              only a tentative price.
            </p>
          </div>
        </div>

        <div className="d-flex mt-3 align-items-center">
          <div className="mr-12">
            <img src={Images.storeAvailability} />
          </div>
          <div>
            <p className="font-12 mb-0">
              The merchant will confirm the availability of the products once
              you book you order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
