// import '../styles/globals.css'
import React, { Fragment } from "react";
import { connect } from "react-redux";
import ImageConst from "../../utils/ImageConst";

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state } = this.props;

    return (
      <Fragment>
        {state.isLoading ? (
          <div className="log-modal-overlay">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // display: state.isLoading  ? 'flex' : '',

                /* align-items: center; */
                /* justify-content: center; */
                /* margin: auto; */
                // position: "absolute",
                /* top: 50%; */
                /* left: 50%; */
                // margin: "-25px 0 0 -25px",
              }}
            >
              <img
                style={{
                  margin: "75%",
                  borderRadius: "20px",
                  width: "150px",
                }}
                src={ImageConst.loading}
                alt=""
              />
            </div>
          </div>
        ) : null}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  state: state,
});

export default connect(mapStateToProps, null)(Index);
