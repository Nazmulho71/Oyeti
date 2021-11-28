import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { currency } from "../../lib/enums";
import GroceryContent from "../common/groceryContent";

const qsrAmountSummary = ({ checkoutData, carts }) => {
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  let taxAmount = 0;
  let totalAmount = 0;
  if (checkoutData.brakdown) {
    taxAmount =
      checkoutData.brakdown.find((property) => property.charge_id === "tax")
        .value ?? 0;
    totalAmount =
      checkoutData.brakdown.find((property) => property.charge_id === "total")
        .value ?? 0;
  }

  return (
    <div>
      <div style={{ paddingLeft: 40, paddingRight: 40 }}>
        <div className="d-flex qsr-tax-wrapper">
          <div className="qsr-tax-label">Taxes & Charges</div>
          <div
            className={`d-flex flex-occupy flex-end total-txt ${
              dark && "total-txt-dark"
            }`}
          >
            {currency}
            {taxAmount}
          </div>
        </div>
        <div className="qsr-total-wrapper mt-3" style={{ marginTop: 12 }}>
          <p
            className={`mb-0 text-center font-18 font-800 total-txt ${
              dark && "total-txt-dark"
            }`}
          >
            Tentative Total {currency} {totalAmount}{" "}
          </p>
          <p
            className={`text-center font-15 total-txt ${
              dark && "total-txt-dark"
            }`}
          >
            Total Items - {carts.length}
          </p>
        </div>
      </div>

      <GroceryContent />
    </div>
  );
};

export default qsrAmountSummary;
