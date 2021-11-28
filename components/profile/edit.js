import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { getAuth } from "../../lib/helpers/common";
import { updateProfile } from "../../lib/helpers/home";

import { genderEnums } from "../../lib/enums";

const Index = ({ submit, cancle }) => {
  const [auth, setAuth] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [erros, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  const onChangeKey = (e, key) => {
    if (key == "name") {
      let regex = /^[a-zA-Z\s]*$/;
      if (regex.test(e.target.value)) {
        setName(e.target.value);
      }
    }

    if (key == "email") {
      setEmail(e.target.value);
    }

    if (key == "gender") {
      setGender(e.target.value);
    }
  };

  useEffect(() => {
    let data = getAuth(setAuth);
    if (data) {
      setName(data.name);
      setEmail(data.email);
      setGender(data.gender);
      setPhone(data.phone);
    }
  }, []);

  return (
    <div className="log-modal-overlay" style={{ zIndex: 99999 }}>
      <div className="log-modal">
        <div className={`log-modal-inner ${dark && "log-modal-inner-dark"}`}>
          <div
            className={`d-flex align-items-end justify-content-between log-modal-header ${
              dark && "log-modal-header-dark"
            }`}
            style={{
              borderRadius: "12px 12px 0px 0p",
              boxShadow: dark
                ? "5px 5px 15px rgba(0, 0, 0, 0.35)"
                : "2px 2px 5px rgb(105 141 173 / 40%)",
              padding: "20px 15px 20px 15px",
              marginTop: "-25px",
              marginRight: "-20px",
              marginLeft: "-20px",
            }}
          >
            <div>
              <h3 className="m-0">Edit Profile</h3>
            </div>

            <div
              className="rep-modal-close"
              onClick={() => (loader ? console.log("") : cancle())}
              style={{ cursor: "pointer" }}
            >
              <i
                className="fas fa-times"
                style={{ fontSize: "20px", color: dark ? "#fff" : "#404B69" }}
              ></i>
            </div>
          </div>

          <div className="log-modal-body-wrap">
            {erros && erros.server ? (
              <div style={{ textAlign: "center" }}>
                <button className="mb-0 mt-2 remove-item-btn">
                  <b>{erros.server}</b>
                </button>
              </div>
            ) : null}

            <div className="log-modal-body">
              <div
                className={`log-modal-title ${dark && "log-modal-title-dark"}`}
              >
                <h4 className="mb-3 mt-2">Name</h4>
              </div>

              <div
                className={`log-m-ph-inp-bord ${
                  dark && "log-m-ph-inp-bord-dark"
                }`}
              >
                <div
                  className={`input-group log-m-ph-inp ${
                    dark && "log-m-ph-inp-dark"
                  }`}
                >
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => onChangeKey(e, "name")}
                    className="form-control p-3"
                    placeholder="Enter Your Name"
                  />
                </div>
              </div>

              {erros && erros.name ? (
                <div style={{ textAlign: "center" }}>
                  <button className="mb-0 mt-2 remove-item-btn">
                    <b>{erros.name}</b>
                  </button>
                </div>
              ) : null}

              <div
                className={`log-modal-title mt-4 ${
                  dark && "log-modal-title-dark"
                }`}
              >
                <h4 className="mb-3 mt-2">Email</h4>
              </div>

              <div
                className={`log-m-ph-inp-bord ${
                  dark && "log-m-ph-inp-bord-dark"
                }`}
              >
                <div
                  className={`input-group log-m-ph-inp ${
                    dark && "log-m-ph-inp-dark"
                  }`}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => onChangeKey(e, "email")}
                    className="form-control p-3"
                    placeholder="Enter Your Email"
                  />
                </div>
              </div>

              {erros && erros.email ? (
                <div style={{ textAlign: "center" }}>
                  <button className="mb-0 mt-2 remove-item-btn">
                    <b>{erros.email}</b>
                  </button>
                </div>
              ) : null}

              <div
                className={`radioCustom ${dark && "radioCustom-dark"}`}
                key={auth.gender}
                style={{
                  display: "flex",
                  marginTop: "20px",
                  alignItems: "center",
                }}
              >
                {Object.entries(genderEnums).map((gen, index) => {
                  return (
                    <Fragment key={index}>
                      <input
                        style={{ margin: "5px", color: "#FF118E" }}
                        type="radio"
                        onChange={(e) => onChangeKey(e, "gender")}
                        id="html"
                        defaultChecked={gender == gen[1].checkValue}
                        name="gender"
                        value={gen[1].checkValue}
                      />
                      <label style={{ marginRight: "10px" }} htmlFor="html">
                        {gen[0]}
                      </label>
                      <br></br>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            className={`log-modal-continue-btn ${
              dark && "log-modal-continue-btn-dark"
            }`}
          >
            <div
              className={`log-modal-continue-btn-bord ${
                dark && "log-modal-continue-btn-bord-dark"
              }`}
            >
              <button
                onClick={() =>
                  updateProfile(
                    setLoader,
                    loader,
                    name,
                    email,
                    gender,
                    setErrors,
                    cancle
                  )
                }
              >
                {loader ? "Wait..." : "Done"}
              </button>
            </div>

            <div
              className={`log-modal-continue-btn-bord ${
                dark && "log-modal-continue-btn-bord-dark"
              }`}
              style={{ background: "none", boxShadow: "none" }}
            >
              <button
                onClick={() => (loader ? console.log("") : cancle())}
                style={{
                  background: "none",
                  boxShadow: "none",
                  color: dark ? "white" : "#404B69",
                  paddingBottom: 0,
                }}
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
