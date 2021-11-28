import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Index = ({ product }) => {
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  return (
    <div className="prod-details-container">
      {product.description ? (
        <div
          className={`prod-details-para ${dark && "prod-details-para-dark"}`}
        >
          <h4 className="mb-3">Details</h4>
          <p>{product.description}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Index;
