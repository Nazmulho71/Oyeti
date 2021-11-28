import { useState, useEffect } from "react";
import Images from "../../utils/ImageConst";
import { useSelector } from "react-redux";

const Index = () => {
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  return (
    <div className={`customizable-div ${dark && "customizable-div-dark"}`}>
      <div style={{ marginRight: "5px" }}>
        <img src={Images.customizable} style={{ paddingRight: "3.3%" }}></img>
      </div>
      <div>
        <p>Customizable</p>
      </div>
    </div>
  );
};

export default Index;
